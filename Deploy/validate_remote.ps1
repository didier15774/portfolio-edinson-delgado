#Requires -Version 5.1
<#
.SYNOPSIS
    Valida por SSH la ruta remota de edinson.proyectocolmena.com ANTES de desplegar.
    No sube ni borra archivos.
#>

$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'lib\DeployCommon.ps1')
Initialize-ConsoleEncoding
Initialize-DeployEnvironment
Ensure-PoshSSHModule

$config = Get-DeployConfig
$credential = New-DeployCredential -Config $config

Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ' VALIDACION REMOTA - Portfolio Edinson' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan
Write-Host "Host     : $($config.SshHost):$($config.SshPort)"
Write-Host "Usuario  : $($config.SshUser)"
Write-Host "SiteUrl  : $($config.SiteUrl)"
Write-Host "App path : $($config.RemoteAppPath)"
Write-Host "Domain   : $($config.DomainPath)"
Write-Host ''

$session = New-DeploySshSession -Config $config -Credential $credential
try {
    Write-DeployStep 'Listando dominios en /home/.../domains'
    $domains = Invoke-RemoteCommand -Session $session -Command 'ls -la /home/u506984013/domains'
    Write-Host ($domains.Output -join "`n")

    Write-DeployStep 'Comprobando directorio del dominio y public_html'
    $script = @'
set -e
DOMAIN='/home/u506984013/domains/edinson.proyectocolmena.com'
APP='/home/u506984013/domains/edinson.proyectocolmena.com/public_html'
if [ -d "$DOMAIN" ]; then echo "DOMAIN_EXISTS=1"; else echo "DOMAIN_EXISTS=0"; fi
if [ -d "$APP" ]; then echo "APP_EXISTS=1"; else echo "APP_EXISTS=0"; fi
echo '---DOMAIN---'
ls -la "$DOMAIN"
echo '---APP---'
ls -la "$APP" || true
if [ -L "$APP" ]; then echo "APP_IS_SYMLINK=1"; readlink -f "$APP"; else echo "APP_IS_SYMLINK=0"; fi
case "$APP" in
  *clicks.proyectocolmena.com*) echo "ABORT_OTHER_PRODUCT=clicks";;
  *aprobar.proyectocolmena.com*) echo "ABORT_OTHER_PRODUCT=aprobar";;
  *edinson.proyectocolmena.com*) echo "PATH_PRODUCT=edinson";;
  *) echo "ABORT_OTHER_PRODUCT=unknown";;
esac
if command -v curl >/dev/null 2>&1; then
  echo 'HTTP_PROBE_BEGIN'
  curl -sI --max-time 15 https://edinson.proyectocolmena.com/ 2>/dev/null | head -n 20 || true
  echo 'HTTP_PROBE_END'
fi
whoami
'@

    $checkDomain = Invoke-RemoteBashScript -Session $session -Script $script
    Write-Host ($checkDomain.Output -join "`n")

    $outputText = ($checkDomain.Output -join "`n")
    if ($outputText -match 'ABORT_OTHER_PRODUCT=') {
        throw 'La ruta remota apunta a otro producto. Abortando.'
    }
    if ($outputText -notmatch 'DOMAIN_EXISTS=1') {
        throw "No existe el directorio de dominio: $($config.DomainPath)"
    }
    if ($outputText -notmatch 'APP_EXISTS=1') {
        throw "No existe public_html: $($config.RemoteAppPath). Creelo en Hostinger antes de desplegar."
    }
    if ($outputText -notmatch 'PATH_PRODUCT=edinson') {
        throw 'La ruta no se identifico como edinson.proyectocolmena.com'
    }

    Write-DeployOk 'Ruta remota encontrada y aislada de Clicks/AProbar'
}
finally {
    if ($session) {
        Remove-SSHSession -SessionId $session.SessionId | Out-Null
    }
}

Write-Host ''
Write-Host 'Validacion completa. Si la ruta es correcta, ejecute:' -ForegroundColor Green
Write-Host '  Deploy\build_Production.bat'
Write-Host '  Deploy\deploy_Production.bat'
Write-Host ''
