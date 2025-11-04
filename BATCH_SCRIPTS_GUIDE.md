# Batch Scripts Documentation

## 📋 Tổng quan

Restaurant POS System cung cấp các Batch scripts (`.bat`) để dễ dàng setup và chạy ứng dụng trên Windows.

## 📁 Available Scripts

### 1. setup.bat

**Mục đích**: Setup toàn bộ dự án lần đầu

**Chức năng**:
- ✅ Kiểm tra .NET SDK
- ✅ Kiểm tra Node.js
- ✅ Restore NuGet packages
- ✅ Tạo database migrations
- ✅ Update database
- ✅ Install npm dependencies

**Cách sử dụng**:
```batch
setup.bat
```

hoặc double-click file `setup.bat`

**Output**:
```
=====================================
Restaurant POS System - Setup Script
=====================================

[OK] .NET SDK found: 8.0.x
[OK] Node.js found: v18.x.x

Step 1: Restore Backend Packages
...

Step 2: Setup Database
...

Step 3: Install Frontend Dependencies
...

Setup Complete!
```

---

### 2. run-all.bat

**Mục đích**: Chạy cả Backend API và Frontend cùng lúc

**Chức năng**:
- 🚀 Mở Backend API trong cửa sổ mới
- 🚀 Mở Frontend trong cửa sổ mới
- ⏱️ Tự động delay 3 giây giữa 2 servers

**Cách sử dụng**:
```batch
run-all.bat
```

**Output**: Mở 2 cửa sổ Command Prompt:
1. **"Restaurant POS API"** - Backend server
2. **"Restaurant POS Client"** - Frontend server

**URLs**:
- Backend: https://localhost:7000
- Swagger: https://localhost:7000/swagger
- Frontend: http://localhost:3000

---

### 3. run-backend.bat

**Mục đích**: Chạy chỉ Backend API

**Chức năng**:
- 🔧 Start ASP.NET Core Web API
- 📖 Hiển thị Swagger UI URL

**Cách sử dụng**:
```batch
run-backend.bat
```

**Output**:
```
=====================================
Starting Restaurant POS API...
=====================================
API will be available at: https://localhost:7000
Swagger UI at: https://localhost:7000/swagger

Press Ctrl+C to stop the server
=====================================

Building...
...
Now listening on: https://localhost:7000
```

**Dừng server**: Nhấn `Ctrl+C`

---

### 4. run-frontend.bat

**Mục đích**: Chạy chỉ Frontend React app

**Chức năng**:
- ⚛️ Start React development server
- 🌐 Tự động mở browser

**Cách sử dụng**:
```batch
run-frontend.bat
```

**Output**:
```
=====================================
Starting Restaurant POS Client...
=====================================
Frontend will be available at: http://localhost:3000

Press Ctrl+C to stop the server
=====================================

Compiled successfully!
...
webpack compiled successfully
```

**Dừng server**: Nhấn `Ctrl+C`

---

### 5. stop-all.bat

**Mục đích**: Dừng tất cả servers đang chạy

**Chức năng**:
- 🛑 Kill Backend API process
- 🛑 Kill Frontend process
- 🧹 Cleanup resources

**Cách sử dụng**:
```batch
stop-all.bat
```

**Output**:
```
=====================================
Stopping Restaurant POS System
=====================================

[OK] Backend API stopped
[OK] Frontend stopped

All servers stopped!
```

---

## 🔄 Workflow thông thường

### Lần đầu setup:
```batch
1. setup.bat          # Setup dự án
2. run-all.bat# Chạy ứng dụng
```

### Các lần sau:
```batch
run-all.bat        # Chạy ứng dụng
```

### Khi xong việc:
```batch
stop-all.bat    # hoặc Ctrl+C trong mỗi cửa sổ
```

---

## 🆚 So sánh Batch vs PowerShell

| Feature | Batch (.bat) | PowerShell (.ps1) |
|---------|--------------|-------------------|
| **Compatibility** | Tất cả Windows | Windows 7+ |
| **Execution** | Double-click hoặc cmd | Cần enable execution policy |
| **Syntax** | Đơn giản | Phức tạp hơn |
| **Color Output** | Limited | Full color support |
| **Recommended** | ✅ Yes | Alternative |

### Tại sao dùng Batch?

✅ **Dễ sử dụng**: Double-click là chạy  
✅ **Không cần config**: Không cần enable execution policy  
✅ **Tương thích**: Chạy trên mọi Windows  
✅ **Đơn giản**: Cú pháp dễ hiểu  

---

## 🔧 Customization

### Thay đổi ports

Edit `run-backend.bat` hoặc `launchSettings.json`:
```json
"applicationUrl": "https://localhost:YOUR_PORT"
```

Edit `run-frontend.bat` hoặc `.env`:
```env
PORT=YOUR_PORT
```

### Thêm environment variables

Thêm vào đầu script:
```batch
@echo off
set DATABASE_SERVER=your-server
set JWT_SECRET_KEY=your-key
```

### Tắt auto-open browser

Edit `run-frontend.bat`, thêm:
```batch
set BROWSER=none
```

---

## 🐛 Troubleshooting

### Script không chạy

**Problem**: Double-click không làm gì

**Solution**:
1. Right-click → "Run as Administrator"
2. Hoặc mở Command Prompt:
   ```batch
   cd C:\path\to\project
 setup.bat
   ```

### "dotnet is not recognized"

**Problem**: .NET SDK không được cài hoặc không trong PATH

**Solution**:
1. Tải .NET 8.0 SDK: https://dotnet.microsoft.com/download
2. Install và restart terminal
3. Verify: `dotnet --version`

### "node is not recognized"

**Problem**: Node.js không được cài hoặc không trong PATH

**Solution**:
1. Tải Node.js 18+: https://nodejs.org/
2. Install và restart terminal
3. Verify: `node --version`

### Port already in use

**Problem**: `Error: listen EADDRINUSE :::7000`

**Solution**:
```batch
# Tìm process đang dùng port
netstat -ano | findstr :7000

# Kill process
taskkill /PID <PID> /F
```

### Database connection error

**Problem**: Cannot connect to database

**Solution**:
1. Check SQL Server đang chạy
2. Verify connection string trong `appsettings.json`
3. Run setup lại:
   ```batch
   dotnet ef database drop --project RestaurantPOS.API
   setup.bat
   ```

---

## 📚 Advanced Usage

### Chạy với custom config

```batch
@echo off
set ASPNETCORE_ENVIRONMENT=Production
set ConnectionStrings__DefaultConnection=your-connection
run-backend.bat
```

### Build for production

Tạo `build.bat`:
```batch
@echo off
echo Building for production...

REM Backend
dotnet publish RestaurantPOS.API -c Release -o ./publish/api

REM Frontend
cd restaurant-pos-client
call npm run build
cd ..

echo Build complete! Output in ./publish/
pause
```

### Deploy to IIS

Tạo `deploy-iis.bat`:
```batch
@echo off
echo Deploying to IIS...

REM Build
call build.bat

REM Stop IIS site
%windir%\system32\inetsrv\appcmd stop site "RestaurantPOS"

REM Copy files
xcopy /E /Y .\publish\api C:\inetpub\RestaurantPOS\

REM Start IIS site
%windir%\system32\inetsrv\appcmd start site "RestaurantPOS"

echo Deployment complete!
pause
```

---

## 🎯 Best Practices

1. **Always run `setup.bat` first** khi clone project mới
2. **Use `run-all.bat`** cho development thông thường
3. **Use `stop-all.bat`** để cleanup khi xong
4. **Check output** trong console nếu có lỗi
5. **Keep scripts updated** khi thay đổi config

---

## 📖 References

- [Windows Batch Scripting](https://ss64.com/nt/)
- [ASP.NET Core CLI](https://learn.microsoft.com/en-us/dotnet/core/tools/)
- [npm CLI](https://docs.npmjs.com/cli/)

---

**Last Updated**: 2025-01-XX  
**Version**: 1.2.0
