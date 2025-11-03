# RestaurantPOS-System

Hệ thống quản lý nhà hàng (Point of Sale) được xây dựng với **ASP.NET Core Web API** và **React TypeScript** có **Authentication & Authorization** và **Password Reset via Email**.

## 🚀 Tính năng

### Backend (ASP.NET Core Web API)
- ✅ RESTful API với Swagger documentation
- ✅ **JWT Authentication & Authorization**
- ✅ **Password Reset via Email** 🆕
- ✅ **Email Service với SMTP** 🆕
- ✅ **Quản lý người dùng với role-based access**
- ✅ Entity Framework Core với SQL Server
- ✅ CRUD operations cho Products, Categories, Orders, Tables
- ✅ Service & Repository pattern
- ✅ CORS enabled
- ✅ Seed data tự động (Admin user + Categories + Tables)
- ✅ Password hashing với BCrypt

### Frontend (React + TypeScript)
- ✅ React 18 với TypeScript
- ✅ **Authentication system (Login/Register)**
- ✅ **Forgot Password & Reset Password UI** 🆕
- ✅ **Protected routes với role-based access**
- ✅ **JWT token management**
- ✅ React Router cho navigation
- ✅ Axios cho API calls với interceptors
- ✅ Responsive design
- ✅ Dashboard với thống kê
- ✅ Quản lý sản phẩm, đơn hàng, danh mục, bàn

## 📁 Cấu trúc dự án

```
RestaurantPOS-System/
├── RestaurantPOS.API/        # ASP.NET Core Web API
│   ├── Controllers/          # API Controllers
│   │   ├── AuthController.cs     # Authentication endpoints
│   │   ├── ProductsController.cs
│   │ ├── OrdersController.cs
│   │   ├── CategoriesController.cs
│   │   └── TablesController.cs
│   ├── Models/    # Entity Models
│   │   ├── User.cs        # NEW: User model
│   │   └── DTOs/          # NEW: Data Transfer Objects
│   ├── Data/# DbContext & Migrations
│   ├── Services/   # Business Logic
│   │   ├── AuthService.cs    # NEW: Authentication logic
│   │   ├── ProductService.cs
│   │   └── OrderService.cs
│   └── Program.cs       # Entry point with JWT config
│
├── restaurant-pos-client/     # React Frontend
│   ├── public/   # Static files
│   ├── src/
│   │   ├── components/          # React Components
│   │   │   ├── Auth/           # NEW: Login & Register
│   │   │   ├── Dashboard/
│   │   │   ├── Products/
│   │   │   ├── Orders/
│   │   │   ├── Categories/
│   │   │   └── Tables/
│   │   ├── contexts/      # NEW: Auth Context
│   │   ├── services/      # API Services
│   │   │   ├── authService.ts  # NEW: Auth API calls
│   │   │   └── ...
│   │ ├── types/     # TypeScript Types
│   │   │   ├── auth.ts         # NEW: Auth types
│   │   │   └── index.ts
│   │   └── App.tsx   # Main App with auth routing
│   └── package.json
│
└── RestaurantPOS.sln   # Solution file
```

## 🛠️ Yêu cầu hệ thống

- .NET 8.0 SDK
- Node.js 18+ và npm
- SQL Server hoặc SQL Server LocalDB
- Visual Studio 2022 hoặc VS Code

## 📦 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/HUYVESEA0/RestaurantPOS-System.git
cd RestaurantPOS-System
```

### 2. Cài đặt Backend

```bash
# Restore packages
dotnet restore

# Tạo database migration
dotnet ef migrations add InitialCreate -p RestaurantPOS.API

# Cập nhật database (tự động tạo admin user)
dotnet ef database update -p RestaurantPOS.API

# Chạy API
dotnet run --project RestaurantPOS.API
```

API sẽ chạy tại: `https://localhost:7000`
Swagger UI: `https://localhost:7000/swagger`

**Admin account mặc định:**
- Username: `admin`
- Password: `Admin@123`

### 3. Cài đặt Frontend

```bash
cd restaurant-pos-client

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

Frontend sẽ chạy tại: `http://localhost:3000`

## 🔧 Cấu hình

### Backend - appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=RestaurantPOS;Trusted_Connection=true;MultipleActiveResultSets=true"
  },
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyForJWTAuthentication12345678",
    "Issuer": "RestaurantPOS.API",
    "Audience": "RestaurantPOS.Client",
    "ExpiryInHours": 24
  },
  "EmailSettings": {
    "FromEmail": "noreply@restaurantpos.com",
    "FromName": "Restaurant POS System",
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-email@gmail.com",
    "SmtpPassword": "your-gmail-app-password",
    "EnableSsl": "true"
  },
  "AppSettings": {
"ClientUrl": "http://localhost:3000"
  }
}
```

**📧 Email Setup**: Xem [PASSWORD_RESET_GUIDE.md](PASSWORD_RESET_GUIDE.md) để cấu hình Gmail App Password hoặc SMTP khác.

### Frontend - .env

```
REACT_APP_API_URL=https://localhost:7000/api
```

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Toàn quyền quản lý hệ thống
- **Manager**: Quản lý nhà hàng
- **Staff**: Nhân viên phục vụ

### Protected Endpoints (Require Authentication)
- All `/api/Products`, `/api/Orders`, `/api/Categories`, `/api/Tables` endpoints
- `/api/Auth/Users/*` - Only Admin can access
- `/api/Auth/ChangePassword` - Authenticated users

### Public Endpoints
- `POST /api/Auth/Login` - User login
- `POST /api/Auth/Register` - User registration
- `POST /api/Auth/ForgotPassword` - Yêu cầu reset password 🆕
- `POST /api/Auth/ResetPassword` - Reset password với token 🆕
- `GET /api/Auth/ValidateResetToken/{token}` - Validate reset token 🆕

## 📖 API Endpoints

### Authentication
- `POST /api/Auth/Login` - Đăng nhập
- `POST /api/Auth/Register` - Đăng ký
- `POST /api/Auth/ForgotPassword` - Yêu cầu reset password 🆕
- `POST /api/Auth/ResetPassword` - Reset password với token 🆕
- `GET /api/Auth/ValidateResetToken/{token}` - Validate reset token 🆕
- `GET /api/Auth/Users` - Lấy danh sách users (Admin only)
- `GET /api/Auth/Users/{id}` - Lấy user theo ID
- `PUT /api/Auth/Users/{id}` - Cập nhật user (Admin only)
- `DELETE /api/Auth/Users/{id}` - Xóa user (Admin only)
- `POST /api/Auth/ChangePassword` - Đổi mật khẩu

### Products
- `GET /api/Products` - Lấy tất cả sản phẩm
- `GET /api/Products/{id}` - Lấy sản phẩm theo ID
- `GET /api/Products/Category/{categoryId}` - Lấy sản phẩm theo danh mục
- `POST /api/Products` - Tạo sản phẩm mới
- `PUT /api/Products/{id}` - Cập nhật sản phẩm
- `DELETE /api/Products/{id}` - Xóa sản phẩm

### Orders
- `GET /api/Orders` - Lấy tất cả đơn hàng
- `GET /api/Orders/{id}` - Lấy đơn hàng theo ID
- `GET /api/Orders/Table/{tableId}` - Lấy đơn hàng theo bàn
- `POST /api/Orders` - Tạo đơn hàng mới
- `PATCH /api/Orders/{id}/Status` - Cập nhật trạng thái
- `DELETE /api/Orders/{id}` - Xóa đơn hàng

### Categories
- `GET /api/Categories` - Lấy tất cả danh mục
- `GET /api/Categories/{id}` - Lấy danh mục theo ID
- `POST /api/Categories` - Tạo danh mục mới
- `PUT /api/Categories/{id}` - Cập nhật danh mục
- `DELETE /api/Categories/{id}` - Xóa danh mục

### Tables
- `GET /api/Tables` - Lấy tất cả bàn
- `GET /api/Tables/Available` - Lấy bàn trống
- `GET /api/Tables/{id}` - Lấy bàn theo ID
- `POST /api/Tables` - Tạo bàn mới
- `PUT /api/Tables/{id}` - Cập nhật bàn
- `PATCH /api/Tables/{id}/Availability` - Cập nhật trạng thái bàn
- `DELETE /api/Tables/{id}` - Xóa bàn

## 🎨 Giao diện

- **Login/Register**: Đăng nhập và đăng ký tài khoản
- **Forgot Password**: Yêu cầu reset password qua email 🆕
- **Reset Password**: Đặt lại mật khẩu với token 🆕
- **Dashboard**: Tổng quan hệ thống với thống kê (Authenticated)
- **Sản phẩm**: Quản lý menu món ăn (Authenticated)
- **Danh mục**: Phân loại sản phẩm (Authenticated)
- **Đơn hàng**: Quản lý order (Authenticated)
- **Bàn**: Quản lý bàn ăn (Authenticated)

## 🧪 Testing

### Backend
```bash
dotnet test
```

### Frontend
```bash
cd restaurant-pos-client
npm test
```

## 🚀 Quick Start Scripts

### Windows PowerShell
```powershell
# Setup toàn bộ dự án
.\setup.ps1

# Chạy cả Backend và Frontend
.\run-all.ps1

# Hoặc chạy riêng lẻ
.\run-backend.ps1
.\run-frontend.ps1
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**HUYVIESEA**

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## ⭐ Show your support

Give a ⭐️ if this project helped you!

## 📚 Packages sử dụng

### Backend
- Microsoft.AspNetCore.Authentication.JwtBearer 8.0.0
- BCrypt.Net-Next 4.0.3
- System.IdentityModel.Tokens.Jwt 7.0.3
- Microsoft.EntityFrameworkCore 8.0.0
- Swashbuckle.AspNetCore 6.5.0

### Frontend  
- React 18.2.0
- TypeScript 5.3.3
- React Router 6.20.1
- Axios 1.6.2

## 📖 Documentation

- [README.md](README.md) - This file
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [ENV_CONFIGURATION_GUIDE.md](ENV_CONFIGURATION_GUIDE.md) - Environment variables setup 🆕
- [TECHNICAL.md](TECHNICAL.md) - Technical details
- [AUTH_GUIDE.md](AUTH_GUIDE.md) - Authentication documentation
- [PASSWORD_RESET_GUIDE.md](PASSWORD_RESET_GUIDE.md) - Password reset guide
- [MIGRATION_GUIDE.md](MIGRATION_GUIDE.md) - Database migrations
- [CHANGELOG.md](CHANGELOG.md) - Version history