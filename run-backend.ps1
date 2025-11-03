# Run Backend API
Write-Host "Starting Restaurant POS API..." -ForegroundColor Cyan
Write-Host "API will be available at: https://localhost:7000" -ForegroundColor Green
Write-Host "Swagger UI at: https://localhost:7000/swagger" -ForegroundColor Green
Write-Host ""

dotnet run --project RestaurantPOS.API
