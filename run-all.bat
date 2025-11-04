@echo off
REM Run both Backend and Frontend

echo =====================================
echo Starting Restaurant POS System
echo =====================================
echo.

REM Start Backend in new window
echo Starting Backend API...
start "Restaurant POS API" cmd /k "run-backend.bat"

REM Wait a bit for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend in new window
echo Starting Frontend...
start "Restaurant POS Client" cmd /k "run-frontend.bat"

echo.
echo =====================================
echo Both servers are starting!
echo =====================================
echo.
echo Backend API: https://localhost:7000
echo Swagger UI: https://localhost:7000/swagger
echo Frontend: http://localhost:3000
echo.
echo Check the opened windows for server status
echo.
pause
