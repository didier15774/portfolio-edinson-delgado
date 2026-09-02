#Requires -Version 5.1
<#
.SYNOPSIS
    Despliega el ultimo ZIP de artifacts/ a Hostinger (edinson.proyectocolmena.com).
    Preserva api/contact.config.php en el servidor.
#>

$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'lib\DeployCommon.ps1')
Initialize-ConsoleEncoding
Initialize-DeployEnvironment
Ensure-PoshSSHModule

$config = Get-DeployConfig
$credential = New-DeployCredential -Config $config

function Get-LatestArtifactZip {
    if (-not (Test-Path -LiteralPath $ArtifactsDir)) {
        return $null
    }
    $zips = Get-ChildItem -LiteralPath $ArtifactsDir -Filter 'portfolio-edinson-*.zip' -File -ErrorAction SilentlyContinue
    if (-not $zips -or $zips.Count -eq 0) {
        return $null
    }
    return $zips | Sort-Object LastWriteTime | Select-Object -Last 1
}

function Send-RemoteZip {
    param($Config, $Credential, [string]$LocalZipPath)

    $remoteDeployPath  = Normalize-LinuxPath ([string]$Config.RemoteDeployPath)
    $remoteDestination = "$remoteDeployPath/"

    $session = New-DeploySshSession -Config $Config -Credential $Credential
    try {
        Invoke-RemoteCommand -Session $session -Command "mkdir -p '$remoteDeployPath'"
    } finally {
        Remove-SSHSession -SessionId $session.SessionId | Out-Null
    }

    $scpParams = @{
        ComputerName = [string]$Config.SshHost
        Port         = [int]$Config.SshPort
        Path         = $LocalZipPath
        Destination  = $remoteDestination
        AcceptKey    = $true
        Force        = $true
    }

    if ($Credential) {
        $scpParams.Credential = $Credential
    } else {
        $scpParams.KeyFile = [string]$Config.SshKeyPath
    }

    Set-SCPItem @scpParams | Out-Null
}

function Build-RemoteDeployScript {
    param(
        [string]$RemoteDeployPath,
        [string]$RemoteAppPath,
        [string]$DomainPath,
        [string]$ZipFileName,
        [string[]]$PreserveFiles
    )

    $remoteDeployPath = Normalize-LinuxPath $RemoteDeployPath
    $remoteAppPath    = Normalize-LinuxPath $RemoteAppPath
    $domainPath       = Normalize-LinuxPath $DomainPath
    $zipFileName      = $ZipFileName.Replace('\', '/')

    $preserveList = ($PreserveFiles | ForEach-Object { $_.Replace('\', '/').Trim('/') }) -join ' '

    $escapedDeploy = $remoteDeployPath.Replace("'", "'\\''")
    $escapedApp    = $remoteAppPath.Replace("'", "'\\''")
    $escapedDomain = $domainPath.Replace("'", "'\\''")
    $escapedZip    = $zipFileName.Replace("'", "'\\''")

    return @"
set -e
REMOTE_DEPLOY='$escapedDeploy'
REMOTE_APP='$escapedApp'
DOMAIN_DIR='$escapedDomain'
ZIP_NAME='$escapedZip'
PRESERVE='$preserveList'
TIMESTAMP=`$(date +%Y%m%d_%H%M%S)
EXTRACT_DIR="`${REMOTE_DEPLOY}/extract_`${TIMESTAMP}"
BACKUP_NAME="public_html_backup_`${TIMESTAMP}"
BACKUP_PATH="`${DOMAIN_DIR}/`${BACKUP_NAME}"
ZIP_PATH="`${REMOTE_DEPLOY}/`${ZIP_NAME}"
PRESERVE_DIR="`${REMOTE_DEPLOY}/preserve_`${TIMESTAMP}"

# Safety: never touch other products
case "`$REMOTE_APP" in
  *clicks.proyectocolmena.com*|*aprobar.proyectocolmena.com*)
    echo 'ERROR: RemoteAppPath apunta a otro producto'
    exit 1
    ;;
esac
case "`$REMOTE_APP" in
  *edinson.proyectocolmena.com*)
    ;;
  *)
    echo 'ERROR: RemoteAppPath no contiene edinson.proyectocolmena.com'
    exit 1
    ;;
esac

mkdir -p "`$REMOTE_DEPLOY"

if [ ! -f "`$ZIP_PATH" ]; then
  echo "ERROR: ZIP no encontrado: `$ZIP_PATH"
  exit 1
fi

if [ ! -d "`$REMOTE_APP" ]; then
  echo "ERROR: public_html no existe: `$REMOTE_APP"
  exit 1
fi

mkdir -p "`$EXTRACT_DIR"
unzip -q -o "`$ZIP_PATH" -d "`$EXTRACT_DIR"

if [ ! -f "`$EXTRACT_DIR/index.html" ]; then
  echo "ERROR: index.html no encontrado en el paquete"
  rm -rf "`$EXTRACT_DIR"
  exit 1
fi

# Preservar secretos/config de produccion
mkdir -p "`$PRESERVE_DIR"
for rel in `$PRESERVE; do
  if [ -f "`${REMOTE_APP}/`$rel" ]; then
    mkdir -p "`$PRESERVE_DIR/`$(dirname "`$rel")"
    cp -a "`${REMOTE_APP}/`$rel" "`$PRESERVE_DIR/`$rel"
    echo "PORTFOLIO_PRESERVED=`$rel"
  fi
done

# Backup codigo actual
cp -a "`$REMOTE_APP" "`$BACKUP_PATH"
echo "PORTFOLIO_BACKUP=`$BACKUP_NAME"

# Wipe solo public_html del portfolio
find "`$REMOTE_APP" -mindepth 1 -delete
cp -a "`$EXTRACT_DIR"/. "`$REMOTE_APP"/

# Restaurar preservados
for rel in `$PRESERVE; do
  if [ -f "`$PRESERVE_DIR/`$rel" ]; then
    mkdir -p "`${REMOTE_APP}/`$(dirname "`$rel")"
    cp -a "`$PRESERVE_DIR/`$rel" "`${REMOTE_APP}/`$rel"
    echo "PORTFOLIO_RESTORED=`$rel"
  fi
done

# Permisos basicos
find "`$REMOTE_APP" -type d -exec chmod 755 {} \;
find "`$REMOTE_APP" -type f -exec chmod 644 {} \;

rm -rf "`$EXTRACT_DIR"
rm -rf "`$PRESERVE_DIR"
rm -f "`$ZIP_PATH"

if [ ! -f "`$REMOTE_APP/index.html" ]; then
  echo "ERROR: index.html ausente tras el despliegue"
  exit 1
fi

# Conservar solo el backup mas reciente
cd "`$DOMAIN_DIR" || exit 1
ls -1dt public_html_backup_* 2>/dev/null | tail -n +2 | while IFS= read -r OLD_BACKUP; do
  if [ -n "`$OLD_BACKUP" ] && [ "`$OLD_BACKUP" != "`$BACKUP_NAME" ]; then
    rm -rf "`$OLD_BACKUP"
    echo "PORTFOLIO_BACKUP_REMOVED=`$OLD_BACKUP"
  fi
done

echo "PORTFOLIO_DEPLOY_STATUS=OK"
"@
}

$zip = Get-LatestArtifactZip
if (-not $zip) {
    throw 'No hay ZIP en Deploy/artifacts/. Ejecute primero Deploy\build_Production.ps1'
}

Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ' DEPLOY PRODUCCION — Portfolio Edinson' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan
Write-Host "Host      : $($config.SshHost):$($config.SshPort)"
Write-Host "Usuario   : $($config.SshUser)"
Write-Host "Remoto    : $($config.RemoteAppPath)"
Write-Host "ZIP       : $($zip.Name)"
Write-Host "SiteUrl   : $($config.SiteUrl)"
Write-Host ''
Write-Host 'Acciones:' -ForegroundColor Yellow
Write-Host '  1. Validar ruta (edinson.proyectocolmena.com, no Clicks/AProbar)'
Write-Host '  2. Subir ZIP a RemoteDeployPath'
Write-Host '  3. Backup de public_html'
Write-Host '  4. Preservar api/contact.config.php si existe'
Write-Host '  5. Reemplazar contenido de public_html con dist/'
Write-Host '  6. Restaurar preservados + chmod 755/644'
Write-Host ''

# Pre-flight remote validation
Write-DeployStep 'Pre-flight: confirmar carpeta remota'
$session = New-DeploySshSession -Config $config -Credential $credential
try {
    $preScript = @"
set -e
APP='$($config.RemoteAppPath)'
DOMAIN='$($config.DomainPath)'
[ -d "`$DOMAIN" ] || { echo 'NO_DOMAIN'; exit 1; }
[ -d "`$APP" ] || { echo 'NO_APP'; exit 1; }
case "`$APP" in *edinson.proyectocolmena.com*) echo 'PATH_OK';; *) echo 'PATH_BAD'; exit 1;; esac
ls -la "`$APP" | head -n 20
"@
    $pre = Invoke-RemoteBashScript -Session $session -Script $preScript
    Write-Host ($pre.Output -join "`n")
}
finally {
    Remove-SSHSession -SessionId $session.SessionId | Out-Null
}

Write-DeployStep "Subiendo $($zip.Name)"
Send-RemoteZip -Config $config -Credential $credential -LocalZipPath $zip.FullName
Write-DeployOk 'ZIP subido'

Write-DeployStep 'Extrayendo y reemplazando public_html en servidor'
$session = New-DeploySshSession -Config $config -Credential $credential
try {
    $script = Build-RemoteDeployScript `
        -RemoteDeployPath ([string]$config.RemoteDeployPath) `
        -RemoteAppPath ([string]$config.RemoteAppPath) `
        -DomainPath ([string]$config.DomainPath) `
        -ZipFileName $zip.Name `
        -PreserveFiles @($config.PreserveRemoteFiles)

    $result = Invoke-RemoteBashScript -Session $session -Script $script
    Write-Host ($result.Output -join "`n")

    $out = ($result.Output -join "`n")
    if ($out -notmatch 'PORTFOLIO_DEPLOY_STATUS=OK') {
        throw 'Deploy remoto no reporto OK'
    }
}
finally {
    Remove-SSHSession -SessionId $session.SessionId | Out-Null
}

Write-Host ''
Write-DeployOk 'DEPLOY COMPLETADO'
Write-Host "  URL: $($config.SiteUrl)"
Write-Host ''
