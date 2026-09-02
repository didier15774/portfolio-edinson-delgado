# Shared helpers — Portfolio Edinson Delgado (static Astro → Hostinger)

function Initialize-ConsoleEncoding {
    try {
        $utf8NoBom = New-Object System.Text.UTF8Encoding $false
        [Console]::OutputEncoding = $utf8NoBom
        [Console]::InputEncoding  = $utf8NoBom
        $script:OutputEncoding     = $utf8NoBom
    } catch {
    }
}

function Initialize-DeployEnvironment {
    $script:DeployRoot  = Split-Path $PSScriptRoot -Parent
    $script:ProjectRoot = Split-Path $DeployRoot -Parent

    $script:ConfigFile        = Join-Path $DeployRoot 'deploy.config.ps1'
    $script:ConfigExampleFile = Join-Path $DeployRoot 'deploy.config.example.ps1'
    $script:ArtifactsDir      = Join-Path $DeployRoot 'artifacts'
    $script:LogsDir           = Join-Path $DeployRoot 'logs'
    $script:StagingDir        = Join-Path $ProjectRoot '_deploy-staging'
    $script:DistDir           = Join-Path $ProjectRoot 'dist'

    Ensure-Directory $ArtifactsDir
    Ensure-Directory $LogsDir
}

function Write-DeployStep([string]$Message) {
    Write-Host ">> $Message" -ForegroundColor Cyan
}

function Write-DeployOk([string]$Message) {
    Write-Host "OK  $Message" -ForegroundColor Green
}

function Write-DeployWarn([string]$Message) {
    Write-Host "!!  $Message" -ForegroundColor Yellow
}

function Ensure-Directory([string]$Path) {
    if (-not (Test-Path -LiteralPath $Path)) {
        New-Item -ItemType Directory -Path $Path -Force | Out-Null
    }
}

function Normalize-LinuxPath([string]$Path) {
    if ([string]::IsNullOrWhiteSpace($Path)) {
        return $Path
    }
    return ($Path -replace '\\', '/').TrimEnd('/')
}

function Join-LinuxPath {
    param([Parameter(Mandatory = $true)][string[]]$Segments)

    $parts = foreach ($segment in $Segments) {
        (Normalize-LinuxPath $segment).Trim('/')
    }
    $parts = $parts | Where-Object { $_ -ne '' }
    return '/' + ($parts -join '/')
}

function Normalize-DeployConfig($Config) {
    $pathKeys = @('RemoteAppPath', 'RemoteDeployPath', 'DomainPath')
    foreach ($key in $pathKeys) {
        if ($Config.ContainsKey($key) -and -not [string]::IsNullOrWhiteSpace([string]$Config[$key])) {
            $Config[$key] = Normalize-LinuxPath ([string]$Config[$key])
        }
    }

    if (-not $Config.ContainsKey('SiteUrl') -or [string]::IsNullOrWhiteSpace([string]$Config.SiteUrl)) {
        $Config.SiteUrl = 'https://edinson.proyectocolmena.com/'
    }

    if (-not $Config.ContainsKey('PreserveRemoteFiles') -or $null -eq $Config.PreserveRemoteFiles) {
        $Config.PreserveRemoteFiles = @('api/contact.config.php')
    }

    return $Config
}

function Get-DeployConfig {
    if (-not (Test-Path -LiteralPath $ConfigFile)) {
        throw @"
No existe Deploy/deploy.config.ps1.

Copie deploy.config.example.ps1 a deploy.config.ps1 y configure SSH.
"@
    }

    $config = & $ConfigFile
    if ($config -isnot [hashtable]) {
        throw 'deploy.config.ps1 debe retornar un hashtable (@{ ... }).'
    }

    if ($env:DEPLOY_SSH_PASSWORD) {
        $config.SshPassword = $env:DEPLOY_SSH_PASSWORD
    }

    $config = Normalize-DeployConfig $config

    $required = @('SshHost', 'SshPort', 'SshUser', 'RemoteAppPath', 'RemoteDeployPath', 'DomainPath')
    foreach ($key in $required) {
        if (-not $config.ContainsKey($key) -or [string]::IsNullOrWhiteSpace([string]$config[$key])) {
            throw "Falta o esta vacio el parametro '$key' en deploy.config.ps1"
        }
        if ([string]$config[$key] -match '\\') {
            throw "La ruta '$key' contiene backslash. Use solo rutas Linux con /."
        }
    }

    if ([string]::IsNullOrWhiteSpace([string]$config.SshKeyPath) -and [string]::IsNullOrWhiteSpace([string]$config.SshPassword)) {
        throw 'Configure SshPassword en deploy.config.ps1 o DEPLOY_SSH_PASSWORD.'
    }

    # Safety: never deploy into sibling product domains
    $forbidden = @(
        'clicks.proyectocolmena.com',
        'aprobar.proyectocolmena.com',
        'a-probar',
        'aprobar-prod'
    )
    $appPath = [string]$config.RemoteAppPath
    foreach ($bad in $forbidden) {
        if ($appPath -like "*$bad*") {
            throw "ABORT: RemoteAppPath apunta a otro producto ($bad): $appPath"
        }
    }

    if ($appPath -notlike '*edinson.proyectocolmena.com*') {
        throw "ABORT: RemoteAppPath debe contener edinson.proyectocolmena.com. Actual: $appPath"
    }

    return $config
}

function Ensure-PoshSSHModule {
    if (-not (Get-Module -ListAvailable -Name Posh-SSH)) {
        Write-DeployStep 'Instalando modulo Posh-SSH (solo la primera vez)'
        Install-Module -Name Posh-SSH -Scope CurrentUser -Force -AllowClobber -ErrorAction Stop
    }
    Import-Module Posh-SSH -ErrorAction Stop
}

function New-DeployCredential {
    param($Config)

    if (-not [string]::IsNullOrWhiteSpace([string]$Config.SshKeyPath)) {
        return $null
    }

    $secure = ConvertTo-SecureString -String ([string]$Config.SshPassword) -AsPlainText -Force
    return New-Object System.Management.Automation.PSCredential([string]$Config.SshUser, $secure)
}

function New-DeploySshSession {
    param($Config, $Credential)

    $sessionParams = @{
        ComputerName = [string]$Config.SshHost
        Port         = [int]$Config.SshPort
        AcceptKey    = $true
        Force        = $true
    }

    if ($Credential) {
        $sessionParams.Credential = $Credential
    } else {
        $sessionParams.KeyFile = [string]$Config.SshKeyPath
    }

    $session = New-SSHSession @sessionParams
    if (-not $session) {
        throw 'No se pudo establecer sesion SSH con el servidor.'
    }
    return $session
}

function Invoke-RemoteCommand {
    param(
        $Session,
        [string]$Command,
        [switch]$AllowFailure
    )

    if ($Command -match '\\') {
        throw "Comando remoto contiene backslash: $Command"
    }

    $result = Invoke-SSHCommand -SessionId $Session.SessionId -Command $Command -TimeOut 600

    if ($result.ExitStatus -ne 0 -and -not $AllowFailure) {
        $errorOutput = ($result.Error | Where-Object { $_ }) -join "`n"
        $stdOutput   = ($result.Output | Where-Object { $_ }) -join "`n"
        throw "Comando remoto fallo (exit $($result.ExitStatus)):`n$errorOutput`n$stdOutput"
    }

    return $result
}

function Invoke-RemoteBashScript {
    param($Session, [string]$Script)

    # Hostinger bash fails on Windows CRLF — normalize to LF
    $normalized = ($Script -replace "`r`n", "`n") -replace "`r", "`n"
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($normalized)
    $b64   = [Convert]::ToBase64String($bytes)
    $cmd   = "echo '$b64' | base64 -d | bash"
    return Invoke-RemoteCommand -Session $Session -Command $cmd
}

function Invoke-RemoteBashInline {
    param($Session, [string]$Script)

    $normalized = (($Script -replace "`r`n", "`n") -replace "`r", "`n").Trim()
    # Avoid embedding complex quotes: base64 pipe
    return Invoke-RemoteBashScript -Session $Session -Script $normalized
}

function Test-YesNoResponse {
    param([string]$Response)
    return $Response -match '^[Ss]$'
}
