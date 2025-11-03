# Authentication Guide - Restaurant POS System

## 📋 Tổng quan

Hệ thống sử dụng JWT (JSON Web Token) để xác thực người dùng. Backend ASP.NET Core cung cấp API authentication, Frontend React quản lý token và routing.

## 🔐 Backend Authentication

### 1. User Model

```csharp
public class User
{
    public int Id { get; set; }
    public string Username { get; set; }
 public string Email { get; set; }
    public string PasswordHash { get; set; }  // BCrypt hashed
    public string FullName { get; set; }
    public string? PhoneNumber { get; set; }
    public string Role { get; set; }  // Admin, Manager, Staff
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
}
```

### 2. JWT Configuration (appsettings.json)

```json
{
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyForJWTAuthentication12345678",
    "Issuer": "RestaurantPOS.API",
    "Audience": "RestaurantPOS.Client",
    "ExpiryInHours": 24
  }
}
```

**⚠️ Lưu ý**: Trong production, sử dụng environment variables hoặc Azure Key Vault để lưu SecretKey.

### 3. Authentication Endpoints

#### POST /api/Auth/Login
Đăng nhập và nhận JWT token.

**Request:**
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```

**Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "email": "admin@restaurantpos.com",
  "fullName": "Administrator",
  "role": "Admin",
  "expiresAt": "2025-01-26T10:30:00Z"
}
```

**Response (Error - 401):**
```json
{
  "message": "Tên đăng nhập hoặc mật khẩu không đúng"
}
```

#### POST /api/Auth/Register
Đăng ký tài khoản mới.

**Request:**
```json
{
  "username": "staff01",
  "email": "staff01@restaurant.com",
  "password": "Staff@123",
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0987654321",
  "role": "Staff"
}
```

**Response (Success - 200):**
```json
{
  "id": 2,
  "username": "staff01",
  "email": "staff01@restaurant.com",
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0987654321",
  "role": "Staff",
  "isActive": true,
  "createdAt": "2025-01-25T10:30:00Z"
}
```

### 4. Protected Endpoints

Tất cả endpoints yêu cầu Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5. Role-based Authorization

```csharp
// Chỉ Admin mới truy cập được
[Authorize(Roles = "Admin")]
public async Task<ActionResult> GetAllUsers()
{
    // ...
}

// Tất cả user đã đăng nhập đều truy cập được
[Authorize]
public async Task<ActionResult> GetProfile()
{
    // ...
}
```

## 🎨 Frontend Authentication

### 1. AuthContext

Context quản lý state authentication toàn cục:

```typescript
interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (data: RegisterRequest) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}
```

### 2. Login Flow

```
1. User nhập username và password
2. Call API /api/Auth/Login
3. Nhận token và user info
4. Lưu vào localStorage:
   - localStorage.setItem('token', token)
   - localStorage.setItem('user', JSON.stringify(userInfo))
5. Redirect đến Dashboard
```

### 3. Token Management

**Axios Interceptor** tự động thêm token vào mọi request:

```typescript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
  config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Handle 401 Unauthorized:**

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
  // Clear localStorage và redirect về login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### 4. Protected Routes

```typescript
<Route 
  path="/products" 
  element={
    <PrivateRoute>
      <ProductList />
    </PrivateRoute>
  } 
/>
```

PrivateRoute kiểm tra authentication trước khi render component:

```typescript
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return <Loading />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return children;
};
```

## 👥 User Roles

### Admin
- **Quyền hạn**: Toàn quyền
- **Có thể**:
  - Quản lý tất cả users
  - Xem, tạo, sửa, xóa tất cả dữ liệu
  - Thay đổi cấu hình hệ thống

### Manager  
- **Quyền hạn**: Quản lý nhà hàng
- **Có thể**:
  - Xem reports
  - Quản lý products, orders, tables
  - Không quản lý users

### Staff
- **Quyền hạn**: Nhân viên phục vụ
- **Có thể**:
  - Tạo orders
  - Cập nhật order status
  - Quản lý tables
  - Xem products

## 🔒 Security Best Practices

### 1. Password Requirements
- Tối thiểu 6 ký tự
- Khuyến nghị: Chứa chữ hoa, chữ thường, số và ký tự đặc biệt

### 2. JWT Token
- Expiry time: 24 giờ (có thể cấu hình)
- Lưu trong localStorage (development)
- **Production**: Cân nhắc sử dụng httpOnly cookies

### 3. HTTPS
- Luôn sử dụng HTTPS trong production
- Không gửi token qua HTTP

### 4. Password Hashing
- Sử dụng BCrypt với salt rounds = 10
- Không bao giờ lưu plaintext password

## 🧪 Testing Authentication

### 1. Test Login với Swagger

1. Mở https://localhost:7000/swagger
2. Expand `/api/Auth/Login`
3. Click "Try it out"
4. Nhập:
```json
{
  "username": "admin",
  "password": "Admin@123"
}
```
5. Execute và copy token

### 2. Test Protected Endpoints

1. Click "Authorize" button ở đầu Swagger UI
2. Nhập: `Bearer {your_token}`
3. Bây giờ có thể gọi các protected endpoints

### 3. Test Frontend

1. Mở http://localhost:3000/login
2. Đăng nhập với admin/Admin@123
3. Kiểm tra token trong DevTools > Application > Local Storage

## 📝 Common Issues

### 1. Token Expired
**Triệu chứng**: 401 Unauthorized sau 24 giờ

**Giải pháp**: 
- User cần đăng nhập lại
- Hoặc implement refresh token

### 2. CORS Error
**Triệu chứng**: Không gọi được API từ localhost:3000

**Giải pháp**: Kiểm tra CORS trong Program.cs
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
      .AllowAnyMethod()
     .AllowAnyHeader();
  });
});
```

### 3. Password không match
**Triệu chứng**: Login failed dù password đúng

**Kiểm tra**:
- Đảm bảo BCrypt.Net-Next package đã được cài
- Verify password hash trong database

## 🔄 Password Change Flow

```typescript
// Frontend
const changePassword = async (oldPassword, newPassword) => {
  await authService.changePassword(oldPassword, newPassword);
};

// Backend sẽ:
// 1. Verify oldPassword với BCrypt
// 2. Hash newPassword
// 3. Update database
```

## 🎯 Next Steps

- [ ] Implement Refresh Token
- [ ] Add Two-Factor Authentication (2FA)
- [ ] Password reset via email
- [ ] Account lockout after failed attempts
- [ ] Audit logging cho security events

## 📚 References

- [JWT.io](https://jwt.io/) - JWT Debugger
- [BCrypt](https://github.com/BcryptNet/bcrypt.net) - Password Hashing
- [ASP.NET Core Security](https://docs.microsoft.com/en-us/aspnet/core/security/)
