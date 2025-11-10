@echo off
REM Run Frontend React App

echo =====================================
echo Starting Restaurant POS Client...
echo =====================================
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo =====================================
echo.

cd restaurant-pos-client
call npm run dev
