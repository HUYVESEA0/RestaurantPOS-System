# Quick Start Guide - Restaurant POS System

## 🚀 Cách nhanh nhất (Recommended)

### Sử dụng Batch Scripts

**Windows 10/11:**

1. **Mở Command Prompt hoặc Double-click file**
2. Chạy setup:
```batch
setup.bat
```

3. Sau khi setup xong, chạy ứng dụng:
```batch
run-all.bat
```

4. Để dừng servers:
```batch
stop-all.bat
```

## 📋 Hướng dẫn chi tiết

## Bước 1: Cài đặt Backend (API)

### Option 1: Sử dụng Script (Khuyến nghị)

Double-click `setup.bat` hoặc chạy trong Command Prompt:
```batch
setup.bat
```

Script sẽ tự động:
- ✅ Check .NET SDK và Node.js
- ✅ Restore packages
- ✅ Tạo database migrations
- ✅ Update database
- ✅ Install frontend dependencies

### Option 2: Manual Setup

1. Mở terminal tại thư mục gốc dự án
2. Chạy lần lượt các lệnh:

```bash
# Restore NuGet packages
dotnet restore RestaurantPOS.sln

# Tạo migration cho database
dotnet ef migrations add InitialCreate --project RestaurantPOS.API

# Tạo database và seed data
dotnet ef database update --project RestaurantPOS.API
```

## Bước 2: Chạy ứng dụng

### Option 1: Chạy cả Backend và Frontend (Khuyến nghị)

Double-click `run-all.bat` hoặc:
```batch
run-all.bat
```

Sẽ mở 2 cửa sổ:
- Backend API: https://localhost:7000
- Frontend: http://localhost:3000

### Option 2: Chạy riêng lẻ

**Backend:**
```batch
run-backend.bat
```

**Frontend (cửa sổ mới):**
```batch
run-frontend.bat
```

### Option 3: Manual Run

**Backend:**
```bash
dotnet run --project RestaurantPOS.API
```

✅ API sẽ chạy tại: `https://localhost:7000`
✅ Swagger UI: `https://localhost:7000/swagger`

**Frontend (terminal mới):**
```bash
cd restaurant-pos-client
npm install
npm start
```

✅ Frontend sẽ chạy tại: `http://localhost:3000`

## Bước 3: Kiểm tra kết nối

1. Mở trình duyệt tại `http://localhost:3000`
2. Đăng nhập với:
   - **Username**: `admin`
   - **Password**: `Admin@123`
3. Kiểm tra các chức năng:
   - Dashboard
   - Sản phẩm
   - Danh mục
   - Đơn hàng
   - Bàn

## 🛑 Dừng Servers

### Sử dụng Script
```batch
stop-all.bat
```

### Manual
- Nhấn `Ctrl+C` trong mỗi terminal/command prompt
- Hoặc đóng cửa sổ

## Troubleshooting

### Lỗi kết nối API

Nếu frontend không kết nối được API:

1. Kiểm tra file `.env` trong `restaurant-pos-client`:
```
REACT_APP_API_URL=https://localhost:7000/api
```

2. Đảm bảo API đang chạy
3. Kiểm tra CORS trong `Program.cs`

### Lỗi database

Nếu có lỗi database:

1. Kiểm tra connection string trong `appsettings.json`
2. Xóa migrations cũ (nếu có):
```bash
dotnet ef database drop --project RestaurantPOS.API
dotnet ef migrations remove --project RestaurantPOS.API
```

3. Tạo lại:
```bash
dotnet ef migrations add InitialCreate --project RestaurantPOS.API
dotnet ef database update --project RestaurantPOS.API
```

### Lỗi npm

Nếu có lỗi khi `npm install`:

1. Xóa `node_modules` và `package-lock.json`
2. Chạy lại:
```bash
npm cache clean --force
npm install
```

## Data mẫu

Hệ thống tự động tạo data mẫu:

**Admin User:**
- Username: `admin`
- Password: `Admin@123`
- Email: `admin@restaurantpos.com`

**Categories:**
- Đồ ăn
- Đồ uống
- Tráng miệng

**Tables:**
- B01, B02, B03, B04

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `setup.bat` | Setup dự án (restore packages, database, npm install) |
| `run-all.bat` | Chạy cả Backend và Frontend |
| `run-backend.bat` | Chỉ chạy Backend API |
| `run-frontend.bat` | Chỉ chạy Frontend |
| `stop-all.bat` | Dừng tất cả servers |
| `setup.ps1` | PowerShell version of setup |
| `run-all.ps1` | PowerShell version of run-all |

## Cổng mặc định

- Backend API: `https://localhost:7000`
- Frontend: `http://localhost:3000`
- Swagger UI: `https://localhost:7000/swagger`

## Tiếp theo

- Xem [AUTH_GUIDE.md](AUTH_GUIDE.md) để hiểu về authentication
- Xem [PASSWORD_RESET_GUIDE.md](PASSWORD_RESET_GUIDE.md) để setup email
- Xem [ENV_CONFIGURATION_GUIDE.md](ENV_CONFIGURATION_GUIDE.md) để config environment

## 🐛 Quick Fixes

### Script won't run
```batch
# Run as Administrator
Right-click → "Run as administrator"
```

### EF Core tools not found
```batch
# Install EF Core tools globally
dotnet tool install --global dotnet-ef

# Or update if already installed
dotnet tool update --global dotnet-ef

# Verify installation
dotnet ef --version
```

### TypeScript version conflict
```batch
# Use fix script
fix-setup.bat

# Or manually fix
cd restaurant-pos-client
rmdir /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps
```

### Port already in use
```batch
netstat -ano | findstr :7000
taskkill /PID <PID> /F
```

### Database error
```batch
dotnet ef database drop --project RestaurantPOS.API
setup.bat
```

### npm error
```batch
cd restaurant-pos-client
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
npm install --legacy-peer-deps
```

### Complete reset
```batch
# Use the troubleshooting script
fix-setup.bat

# Then run setup again
setup.bat
