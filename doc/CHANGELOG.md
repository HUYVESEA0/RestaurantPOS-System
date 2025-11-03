# Changelog

All notable changes to this project will be documented in this file.

## [1.2.0] - 2025-01-XX - Password Reset via Email

### Added - Password Reset Feature

#### Backend
- ✅ **PasswordResetToken Model**
  - Token with 1-hour expiry
  - One-time use tokens
- Cascade delete with users
- ✅ **Email Service**
  - SMTP email sending
  - Beautiful HTML email templates
  - Password reset email
  - Welcome email
  - Password changed confirmation email
- ✅ **Password Reset Endpoints**:
  - POST /api/Auth/ForgotPassword - Request password reset
  - POST /api/Auth/ResetPassword - Reset password with token
  - GET /api/Auth/ValidateResetToken/{token} - Validate reset token
- ✅ **AuthService enhancements**
  - ForgotPasswordAsync method
  - ResetPasswordAsync method
  - ValidateResetTokenAsync method
  - Cryptographically secure token generation
- ✅ **Email Configuration** in appsettings.json
  - SMTP settings (Gmail, SendGrid, Mailgun support)
  - Client URL configuration

#### Frontend
- ✅ **Forgot Password Page**
  - Email input with validation
  - Success/Error states
  - Beautiful gradient design
- ✅ **Reset Password Page**
  - Token validation
  - New password input with confirmation
  - Loading states
  - Success redirection
- ✅ **Updated Login Page**
  - "Forgot Password?" link
- ✅ **authService updates**
  - forgotPassword API call
  - resetPassword API call
  - validateResetToken API call
- ✅ **New Routes**
  - /forgot-password
  - /reset-password

#### Security
- ✅ Cryptographically secure random tokens (32 bytes)
- ✅ Token expiry validation (1 hour)
- ✅ One-time use tokens
- ✅ Email obfuscation (don't reveal if email exists)
- ✅ HTTPS recommended for token transmission
- ✅ Email confirmation after password change

#### Documentation
- ✅ **PASSWORD_RESET_GUIDE.md** - Complete implementation guide
- ✅ Email configuration instructions
- ✅ Gmail App Password setup
- ✅ Other SMTP providers configuration
- ✅ Troubleshooting guide

### Database Changes
- ✅ Added `PasswordResetTokens` table
  - Id, UserId, Token, CreatedAt, ExpiresAt, IsUsed, UsedAt
  - Index on Token for performance
  - Foreign key to Users with cascade delete

## [1.1.0] - 2025-01-XX - Authentication Update

### Added - Authentication & Authorization

#### Backend
- ✅ **JWT Authentication** với Bearer token
- ✅ **User Management System**
  - User model với Username, Email, Password (BCrypt hashed)
  - Role-based access control (Admin, Manager, Staff)
  - User CRUD operations
- ✅ **Auth Controller** với các endpoints:
- POST /api/Auth/Login - Đăng nhập
  - POST /api/Auth/Register - Đăng ký
  - GET /api/Auth/Users - Lấy danh sách users (Admin only)
  - PUT /api/Auth/Users/{id} - Cập nhật user (Admin only)
  - DELETE /api/Auth/Users/{id} - Xóa user (Admin only)
  - POST /api/Auth/ChangePassword - Đổi mật khẩu
- ✅ **AuthService** với business logic
  - JWT token generation
  - Password hashing/verification với BCrypt
  - User validation
- ✅ **Program.cs enhancements**
  - JWT Authentication middleware
  - Authorization policies
  - Swagger với JWT support
- ✅ **Seed Data**: Admin user tự động (username: admin, password: Admin@123)
- ✅ **Packages**:
  - BCrypt.Net-Next 4.0.3
  - Microsoft.AspNetCore.Authentication.JwtBearer 8.0.0
  - System.IdentityModel.Tokens.Jwt 7.0.3

#### Frontend
- ✅ **Authentication UI**
  - Login page với form validation
  - Register page với password confirmation
- Responsive design
- ✅ **AuthContext** với React Context API
  - Global authentication state
  - Login/Logout functions
  - User info management
- ✅ **PrivateRoute Component**
  - Protected routes
  - Role-based access control
  - Redirect to login nếu chưa authenticate
- ✅ **authService**
  - API calls cho login/register
  - Token management (localStorage)
  - getCurrentUser, logout functions
- ✅ **API Interceptors**
  - Tự động thêm JWT token vào headers
  - Handle 401 Unauthorized
- ✅ **Updated App.tsx**
  - Conditional rendering based on auth state
  - User info display trong navbar
  - Logout button

#### Documentation
- ✅ **AUTH_GUIDE.md** - Chi tiết về authentication system
- ✅ **Updated README.md** - Thêm authentication info
- ✅ **Updated .env.example** - JWT configuration

### Security
- ✅ Password hashing với BCrypt (salt rounds = 10)
- ✅ JWT token với expiry time (24 hours)
- ✅ Role-based authorization
- ✅ Unique constraints cho Username và Email
- ✅ HTTPS enforcement

### Database Changes
- ✅ Added `Users` table với:
  - Id (Primary Key)
  - Username (Unique, Required)
  - Email (Unique, Required)
  - PasswordHash (Required)
  - FullName (Required)
  - PhoneNumber (Optional)
  - Role (Required, Default: Staff)
  - IsActive (Boolean)
  - CreatedAt, LastLoginAt

## [1.0.0] - 2025-01-XX

### Added - Initial Release

#### Backend (ASP.NET Core Web API)
- ✅ RESTful API with ASP.NET Core 8.0
- ✅ Entity Framework Core with SQL Server
- ✅ Swagger/OpenAPI documentation
- ✅ CORS configuration for frontend integration
- ✅ Product management (CRUD operations)
- ✅ Category management (CRUD operations)
- ✅ Order management (CRUD operations)
- ✅ Table management (CRUD operations)
- ✅ Service layer with dependency injection
- ✅ Database seed data (Categories and Tables)
- ✅ Decimal precision configuration for prices

#### Frontend (React + TypeScript)
- ✅ React 18 with TypeScript setup
- ✅ React Router for navigation
- ✅ Axios for API communication
- ✅ Dashboard with statistics and overview
- ✅ Product List component with filtering
- ✅ Category List component
- ✅ Order List component with status management
- ✅ Table List component with availability toggle
- ✅ Responsive design with CSS
- ✅ Service layer for API calls
- ✅ TypeScript type definitions
- ✅ Error handling and loading states

#### Project Structure
- ✅ Solution file (.sln)
- ✅ Project file (.csproj)
- ✅ package.json for React app
- ✅ tsconfig.json for TypeScript
- ✅ .gitignore files
- ✅ README.md with documentation
- ✅ QUICKSTART.md for setup guide
- ✅ TECHNICAL.md for technical details
- ✅ PowerShell scripts for automation

#### Developer Tools
- ✅ `setup.ps1` - Automated setup script
- ✅ `run-backend.ps1` - Run API server
- ✅ `run-frontend.ps1` - Run React app
- ✅ `run-all.ps1` - Run both servers

### API Endpoints

#### Authentication (NEW in v1.1.0)
- `POST /api/Auth/Login` - User login
- `POST /api/Auth/Register` - User registration
- `GET /api/Auth/Users` - Get all users (Admin only)
- `GET /api/Auth/Users/{id}` - Get user by ID
- `PUT /api/Auth/Users/{id}` - Update user (Admin only)
- `DELETE /api/Auth/Users/{id}` - Delete user (Admin only)
- `POST /api/Auth/ChangePassword` - Change password

#### Password Reset (NEW in v1.2.0)
- `POST /api/Auth/ForgotPassword` - Request password reset
- `POST /api/Auth/ResetPassword` - Reset password with token
- `GET /api/Auth/ValidateResetToken/{token}` - Validate reset token

#### Products
- `GET /api/Products` - Get all products
- `GET /api/Products/{id}` - Get product by ID
- `GET /api/Products/Category/{categoryId}` - Get products by category
- `POST /api/Products` - Create new product
- `PUT /api/Products/{id}` - Update product
- `DELETE /api/Products/{id}` - Delete product

#### Orders
- `GET /api/Orders` - Get all orders
- `GET /api/Orders/{id}` - Get order by ID
- `GET /api/Orders/Table/{tableId}` - Get orders by table
- `POST /api/Orders` - Create new order
- `PATCH /api/Orders/{id}/Status` - Update order status
- `DELETE /api/Orders/{id}` - Delete order

#### Categories
- `GET /api/Categories` - Get all categories
- `GET /api/Categories/{id}` - Get category by ID
- `POST /api/Categories` - Create new category
- `PUT /api/Categories/{id}` - Update category
- `DELETE /api/Categories/{id}` - Delete category

#### Tables
- `GET /api/Tables` - Get all tables
- `GET /api/Tables/Available` - Get available tables
- `GET /api/Tables/{id}` - Get table by ID
- `POST /api/Tables` - Create new table
- `PUT /api/Tables/{id}` - Update table
- `PATCH /api/Tables/{id}/Availability` - Update table availability
- `DELETE /api/Tables/{id}` - Delete table

### Database Models
- **User** (NEW) - Id, Username, Email, PasswordHash, FullName, PhoneNumber, Role, IsActive, CreatedAt, LastLoginAt
- Product - Id, Name, Description, Price, CategoryId, ImageUrl, IsAvailable, CreatedAt, UpdatedAt
- Category - Id, Name, Description
- Order - Id, TableId, OrderDate, TotalAmount, Status, CustomerName, Notes
- OrderItem - Id, OrderId, ProductId, Quantity, UnitPrice, Notes
- Table - Id, TableNumber, Capacity, IsAvailable
- PasswordResetToken (NEW) - Id, UserId, Token, CreatedAt, ExpiresAt, IsUsed, UsedAt

### Known Issues
- 3 nullable reference type warnings in OrderService (non-breaking)
- JWT package has moderate security advisory (GHSA-59j7-ghrg-fj52) - upgrade planned

## [Upcoming] - Future Releases

### Planned Features
- [ ] Email queue system with background jobs
- [ ] Email templates in database
- [ ] Multi-language support
- [ ] Refresh token mechanism
- [ ] Two-Factor Authentication (2FA)
- [ ] Account lockout after failed login attempts
- [ ] Receipt generation and printing
- [ ] Payment processing integration
- [ ] Real-time order updates with SignalR
- [ ] Inventory management
- [ ] Sales reports and analytics
- [ ] Employee shift management
- [ ] Customer loyalty program

### Planned Improvements
- [ ] Upgrade JWT package to latest secure version
- [ ] Unit tests for backend
- [ ] Integration tests
- [ ] Frontend tests with Jest
- [ ] E2E tests with Cypress
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] Caching with Redis
- [ ] Error logging with Serilog
- [ ] API versioning
- [ ] Rate limiting
- [ ] Audit logging

---

## Version History

- **v1.2.0** - Password reset via email
- **v1.1.0** - Authentication & Authorization system
- **v1.0.0** - Initial release with core features
- **v0.1.0** - Project setup and structure

---

## Contributors

- HUYVIESEA - Initial work, authentication system, password reset, and project creation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
