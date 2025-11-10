@echo off
REM Setup and Run Restaurant POS System
REM Batch Script

echo =====================================
echo Restaurant POS System - Setup Script
echo =====================================
echo.

REM Check .NET SDK
echo Checking .NET SDK...
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] .NET SDK not found. Please install .NET 8.0 SDK
    pause
    exit /b 1
)
for /f "delims=" %%i in ('dotnet --version') do set DOTNET_VERSION=%%i
echo [OK] .NET SDK found: %DOTNET_VERSION%

REM Check Node.js
echo Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [X] Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)
for /f "delims=" %%i in ('node --version') do set NODE_VERSION=%%i
echo [OK] Node.js found: %NODE_VERSION%

echo.
echo =====================================
echo Step 1: Install EF Core Tools
echo =====================================
echo Checking if EF Core tools are installed...
dotnet tool install --global dotnet-ef >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] EF Core tools installed successfully
) else (
    echo [INFO] EF Core tools already installed or updating...
    dotnet tool update --global dotnet-ef
)

echo.
echo =====================================
echo Step 2: Restore Backend Packages
echo =====================================
dotnet restore RestaurantPOS.sln

echo.
echo =====================================
echo Step 3: Setup Database
echo =====================================

REM Check if migrations exist
if exist "RestaurantPOS.API\Migrations" (
    echo Migrations folder found. Updating database...
    dotnet ef database update --project RestaurantPOS.API
) else (
    echo Creating initial migration...
    dotnet ef migrations add InitialCreate --project RestaurantPOS.API
    echo Updating database...
    dotnet ef database update --project RestaurantPOS.API
)

echo.
echo =====================================
echo Step 4: Install Frontend Dependencies
echo =====================================
cd restaurant-pos-client
echo Installing with legacy peer deps to resolve TypeScript conflict...
call npm install --legacy-peer-deps
cd ..

echo.
echo =====================================
echo Setup Complete!
echo =====================================
echo.
echo To run the application:
echo 1. Start Backend API:
echo    dotnet run --project RestaurantPOS.API
echo.
echo 2. Start Frontend (in new terminal):
echo    cd restaurant-pos-client
echo    npm start
echo.
echo Or use the run scripts:
echo    run-backend.bat
echo    run-frontend.bat
echo    run-all.bat
echo.
pause
