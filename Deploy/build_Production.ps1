#Requires -Version 5.1
<#
.SYNOPSIS
    Build productivo Astro → ZIP listo para Hostinger (solo contenido de dist/).
#>

$ErrorActionPreference = 'Stop'

. (Join-Path $PSScriptRoot 'lib\DeployCommon.ps1')
Initialize-ConsoleEncoding
Initialize-DeployEnvironment

Write-Host ''
Write-Host '========================================' -ForegroundColor Cyan
Write-Host ' BUILD PRODUCCION — Portfolio Edinson' -ForegroundColor Cyan
Write-Host '========================================' -ForegroundColor Cyan

Push-Location $ProjectRoot
try {
    # Ensure production URL for SEO
    $envFile = Join-Path $ProjectRoot '.env'
    if (-not (Test-Path -LiteralPath $envFile)) {
        Write-DeployWarn '.env no existe; se usara PUBLIC_SITE_URL del entorno o fallara build:prod'
    }

    Write-DeployStep 'npm run build:prod'
    npm run build:prod
    if ($LASTEXITCODE -ne 0) {
        throw "build:prod fallo con codigo $LASTEXITCODE"
    }

    if (-not (Test-Path -LiteralPath (Join-Path $DistDir 'index.html'))) {
        throw 'dist/index.html no generado'
    }

    Write-DeployStep 'Preparando staging (solo archivos de dist/)'
    if (Test-Path -LiteralPath $StagingDir) {
        Remove-Item -LiteralPath $StagingDir -Recurse -Force
    }
    Ensure-Directory $StagingDir
    Copy-Item -Path (Join-Path $DistDir '*') -Destination $StagingDir -Recurse -Force

    # Never ship local secrets if somehow present
    $forbiddenLocal = @(
        (Join-Path $StagingDir 'api\contact.config.php'),
        (Join-Path $StagingDir '.env'),
        (Join-Path $StagingDir '.git')
    )
    foreach ($f in $forbiddenLocal) {
        if (Test-Path -LiteralPath $f) {
            Remove-Item -LiteralPath $f -Force -Recurse -ErrorAction SilentlyContinue
            Write-DeployWarn "Excluido del paquete: $f"
        }
    }

    $stamp = Get-Date -Format 'yyyyMMdd_HHmmss'
    $zipName = "portfolio-edinson-$stamp.zip"
    $zipPath = Join-Path $ArtifactsDir $zipName

    if (Test-Path -LiteralPath $zipPath) {
        Remove-Item -LiteralPath $zipPath -Force
    }

    Write-DeployStep "Creando ZIP: $zipName"
    # Compress-Archive embeds Windows backslashes; Hostinger unzip rejects them.
    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    if (Test-Path -LiteralPath $zipPath) {
        Remove-Item -LiteralPath $zipPath -Force
    }
    $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        $stagingFull = (Resolve-Path -LiteralPath $StagingDir).Path
        Get-ChildItem -LiteralPath $StagingDir -Recurse -File | ForEach-Object {
            $full = $_.FullName
            $relative = $full.Substring($stagingFull.Length).TrimStart('\', '/').Replace('\', '/')
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile(
                $zip,
                $full,
                $relative,
                [System.IO.Compression.CompressionLevel]::Optimal
            ) | Out-Null
        }
    } finally {
        $zip.Dispose()
    }

    $fileCount = (Get-ChildItem -LiteralPath $StagingDir -Recurse -File).Count
    $zipSize = (Get-Item -LiteralPath $zipPath).Length

    Write-Host ''
    Write-DeployOk 'Build listo'
    Write-Host "  ZIP        : $zipPath"
    Write-Host "  Archivos   : $fileCount"
    Write-Host "  Tamano     : $([math]::Round($zipSize/1KB, 1)) KB"
    Write-Host ''
    Write-Host 'Incluye (desde dist/):' -ForegroundColor Gray
    Write-Host '  HTML, /_astro/*, api/contact.php, api/contact.config.example.php,'
    Write-Host '  .htaccess, robots.txt, sitemap, cv/, images/, scripts/'
    Write-Host ''
    Write-Host 'Excluido del despliegue:' -ForegroundColor Gray
    Write-Host '  .git, node_modules, src/, docs/, tests/, Deploy/deploy.config.ps1,'
    Write-Host '  .env, contact.config.php (se preserva en servidor si ya existe)'
    Write-Host ''
}
finally {
    Pop-Location
}

if ($args -contains '-Deploy') {
    Write-DeployStep 'Ejecutando deploy_Production.ps1'
    & (Join-Path $DeployRoot 'deploy_Production.ps1')
}
