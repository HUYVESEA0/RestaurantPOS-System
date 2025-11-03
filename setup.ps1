# Setup and Run Restaurant POS System
# PowerShell Script

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Restaurant POS System - Setup Script" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check .NET SDK
Write-Host "Checking .NET SDK..." -ForegroundColor Yellow
try {
    $dotnetVersion = dotnet --version
    Write-Host "✓ .NET SDK found: $dotnetVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ .NET SDK not found. Please install .NET 8.0 SDK" -ForegroundColor Red
    exit 1
}

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Step 1: Restore Backend Packages" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
dotnet restore RestaurantPOS.sln

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Step 2: Setup Database" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# Check if migrations exist
$migrationsPath = "RestaurantPOS.API\Migrations"
if (Test-Path $migrationsPath) {
    Write-Host "Migrations folder found. Updating database..." -ForegroundColor Yellow
    dotnet ef database update --project RestaurantPOS.API
} else {
    Write-Host "Creating initial migration..." -ForegroundColor Yellow
    dotnet ef migrations add InitialCreate --project RestaurantPOS.API
    Write-Host "Updating database..." -ForegroundColor Yellow
    dotnet ef database update --project RestaurantPOS.API
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Step 3: Install Frontend Dependencies" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Set-Location restaurant-pos-client
npm install
Set-Location ..

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "To run the application:" -ForegroundColor Yellow
Write-Host "1. Start Backend API:" -ForegroundColor White
Write-Host "   dotnet run --project RestaurantPOS.API" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Start Frontend (in new terminal):" -ForegroundColor White
Write-Host "   cd restaurant-pos-client" -ForegroundColor Cyan
Write-Host "   npm start" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or use the run scripts:" -ForegroundColor Yellow
Write-Host "   .\run-backend.ps1" -ForegroundColor Cyan
Write-Host "   .\run-frontend.ps1" -ForegroundColor Cyan
Write-Host ""
