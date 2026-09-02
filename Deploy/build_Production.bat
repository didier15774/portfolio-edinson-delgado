@echo off
setlocal
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build_Production.ps1" %*
if errorlevel 1 exit /b 1
choice /C SN /M "Desea ejecutar el deploy ahora"
if errorlevel 2 exit /b 0
call "%~dp0deploy_Production.bat"
exit /b %ERRORLEVEL%
