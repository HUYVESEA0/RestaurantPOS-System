@echo off
REM Run Backend API

echo =====================================
echo Starting Restaurant POS API...
echo =====================================
echo API will be available at: https://localhost:7000
echo Swagger UI at: https://localhost:7000/swagger
echo.
echo Press Ctrl+C to stop the server
echo =====================================
echo.

dotnet run --project RestaurantPOS.API
