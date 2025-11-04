@echo off
REM Stop all Restaurant POS servers

echo =====================================
echo Stopping Restaurant POS System
echo =====================================
echo.

REM Stop .NET processes (API)
echo Stopping Backend API...
taskkill /FI "WINDOWTITLE eq Restaurant POS API*" /T /F >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend API stopped
) else (
    echo [!] No Backend API process found
)

REM Stop Node processes (Frontend)
echo Stopping Frontend...
taskkill /FI "WINDOWTITLE eq Restaurant POS Client*" /T /F >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend stopped
) else (
    echo [!] No Frontend process found
)

echo.
echo =====================================
echo All servers stopped!
echo =====================================
echo.
pause
