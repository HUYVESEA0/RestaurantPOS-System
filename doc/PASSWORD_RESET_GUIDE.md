# Password Reset via Email - Implementation Guide

## 🎉 Tổng kết

Đã hoàn thành việc thêm tính năng **Password Reset via Email** vào hệ thống Restaurant POS!

## 📦 Files đã tạo/cập nhật

### Backend (10 files)

#### New Files
1. `RestaurantPOS.API/Models/PasswordResetToken.cs` - Model lưu reset tokens
2. `RestaurantPOS.API/Services/IEmailService.cs` - Email service interface
3. `RestaurantPOS.API/Services/EmailService.cs` - Email service implementation

#### Updated Files
4. `RestaurantPOS.API/Models/DTOs/AuthDTOs.cs` - Added ForgotPassword & ResetPassword DTOs
5. `RestaurantPOS.API/Data/ApplicationDbContext.cs` - Added PasswordResetTokens DbSet
6. `RestaurantPOS.API/Services/IAuthService.cs` - Added password reset methods
7. `RestaurantPOS.API/Services/AuthService.cs` - Implemented password reset logic
8. `RestaurantPOS.API/Controllers/AuthController.cs` - Added password reset endpoints
9. `RestaurantPOS.API/appsettings.json` - Added EmailSettings & AppSettings
10. `RestaurantPOS.API/Program.cs` - Registered EmailService

### Frontend (6 files)

#### New Files
11. `restaurant-pos-client/src/components/Auth/ForgotPassword.tsx` - Forgot password page
12. `restaurant-pos-client/src/components/Auth/ForgotPassword.css` - Styles
13. `restaurant-pos-client/src/components/Auth/ResetPassword.tsx` - Reset password page
14. `restaurant-pos-client/src/components/Auth/ResetPassword.css` - Styles

#### Updated Files
15. `restaurant-pos-client/src/services/authService.ts` - Added password reset API calls
16. `restaurant-pos-client/src/App.tsx` - Added new routes
17. `restaurant-pos-client/src/components/Auth/Login.tsx` - Added forgot password link
18. `restaurant-pos-client/src/components/Auth/Login.css` - Added link styles

## 🔑 Tính năng đã implement

### ✅ Backend
- [x] PasswordResetToken model với expiry time
- [x] Email service với SMTP support
- [x] Cryptographically secure token generation
- [x] ForgotPassword endpoint (public)
- [x] ResetPassword endpoint (public)
- [x] ValidateResetToken endpoint
- [x] Beautiful HTML email templates
- [x] Token expiry validation (1 hour)
- [x] One-time use tokens
- [x] Email confirmations

### ✅ Frontend
- [x] Forgot Password page với validation
- [x] Reset Password page với token validation
- [x] Success/Error states
- [x] Loading states
- [x] Beautiful UI với gradient backgrounds
- [x] Responsive design
- [x] Link integration trong Login page

## 📧 Email Configuration

### Gmail Setup (Recommended for Development)

1. **Enable 2-Factor Authentication** trong Gmail account
2. **Generate App Password**:
   - Go to https://myaccount.google.com/security
   - Select "2-Step Verification"
   - Scroll down to "App passwords"
   - Generate new app password
   - Copy the 16-character password

3. **Update appsettings.json**:

```json
{
  "EmailSettings": {
 "FromEmail": "your-email@gmail.com",
    "FromName": "Restaurant POS System",
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-email@gmail.com",
    "SmtpPassword": "your-16-char-app-password",
    "EnableSsl": "true"
  },
  "AppSettings": {
    "ClientUrl": "http://localhost:3000"
  }
}
```

### Other Email Providers

#### SendGrid
```json
{
  "EmailSettings": {
    "SmtpHost": "smtp.sendgrid.net",
    "SmtpPort": "587",
  "SmtpUser": "apikey",
    "SmtpPassword": "your-sendgrid-api-key"
  }
}
```

#### Mailgun
```json
{
  "EmailSettings": {
    "SmtpHost": "smtp.mailgun.org",
    "SmtpPort": "587",
    "SmtpUser": "postmaster@your-domain.mailgun.org",
    "SmtpPassword": "your-mailgun-password"
}
}
```

## 🔄 Password Reset Flow

### 1. User Requests Password Reset

```
User enters email → POST /api/Auth/ForgotPassword
  ↓
System checks if email exists
    ↓
Generate secure random token (32 bytes)
    ↓
Save token to database (expires in 1 hour)
    ↓
Send email with reset link
    ↓
Return success (always, for security)
```

### 2. User Clicks Reset Link

```
User clicks link in email
    ↓
Frontend: /reset-password?token=xxx
    ↓
Validate token: GET /api/Auth/ValidateResetToken/{token}
    ↓
If valid, show reset password form
    ↓
If invalid/expired, show error
```

### 3. User Resets Password

```
User enters new password → POST /api/Auth/ResetPassword
    ↓
Validate token (not used, not expired)
    ↓
Hash new password with BCrypt
    ↓
Update user password
    ↓
Mark token as used
    ↓
Send confirmation email
    ↓
Redirect to login
```

## 🗄️ Database Changes

### New Table: PasswordResetTokens

```sql
CREATE TABLE PasswordResetTokens (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT NOT NULL,
    Token NVARCHAR(MAX) NOT NULL,
    CreatedAt DATETIME2 NOT NULL,
    ExpiresAt DATETIME2 NOT NULL,
    IsUsed BIT NOT NULL DEFAULT 0,
    UsedAt DATETIME2 NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE INDEX IX_PasswordResetTokens_Token ON PasswordResetTokens(Token);
```

### Migration Commands

```bash
# Tạo migration
dotnet ef migrations add AddPasswordResetTokens --project RestaurantPOS.API

# Apply migration
dotnet ef database update --project RestaurantPOS.API
```

## 📊 API Endpoints

### POST /api/Auth/ForgotPassword
**Public endpoint**

Request:
```json
{
  "email": "user@example.com"
}
```

Response (Always 200):
```json
{
  "message": "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được link đặt lại mật khẩu."
}
```

### GET /api/Auth/ValidateResetToken/{token}
**Public endpoint**

Response (Success):
```json
{
  "message": "Token hợp lệ"
}
```

Response (Error - 400):
```json
{
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

### POST /api/Auth/ResetPassword
**Public endpoint**

Request:
```json
{
  "token": "abc123...",
  "newPassword": "NewPassword@123"
}
```

Response (Success):
```json
{
  "message": "Đặt lại mật khẩu thành công"
}
```

Response (Error - 400):
```json
{
  "message": "Token không hợp lệ hoặc đã hết hạn"
}
```

## 🎨 Frontend Routes

```
/forgot-password    - Request password reset
/reset-password     - Reset password with token
```

## 🔒 Security Features

✅ **Cryptographically secure tokens** - Using RandomNumberGenerator  
✅ **Token expiry** - 1 hour validity  
✅ **One-time use** - Tokens marked as used  
✅ **Email obfuscation** - Don't reveal if email exists  
✅ **HTTPS required** - For token transmission  
✅ **BCrypt hashing** - For new passwords  
✅ **Email confirmation** - After successful reset  

## 🧪 Testing

### 1. Test Email Sending (Development)

```csharp
// In EmailService, temporarily log emails instead of sending
_logger.LogInformation($"Would send email to {toEmail}: {subject}");
_logger.LogInformation($"Reset link: {resetLink}");
```

### 2. Test Reset Flow

1. Navigate to http://localhost:3000/forgot-password
2. Enter email: admin@restaurantpos.com
3. Check console logs for reset token
4. Navigate to: http://localhost:3000/reset-password?token={token}
5. Enter new password
6. Login with new password

### 3. Test Email with Real SMTP

1. Configure Gmail app password
2. Request password reset
3. Check inbox (and spam folder)
4. Click link in email
5. Complete reset

## 📝 Email Templates

### Password Reset Email
- Beautiful HTML template với gradient header
- Clear call-to-action button
- Security warnings
- Expiry information
- Fallback text link

### Password Changed Confirmation
- Simple notification
- Security alert if not initiated by user

### Welcome Email (Bonus)
- Sent after registration
- Login instructions

## ⚙️ Configuration

### appsettings.json

```json
{
  "EmailSettings": {
    "FromEmail": "noreply@restaurantpos.com",
    "FromName": "Restaurant POS System",
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": "587",
    "SmtpUser": "your-email@gmail.com",
    "SmtpPassword": "your-app-password",
    "EnableSsl": "true"
  },
  "AppSettings": {
    "ClientUrl": "http://localhost:3000"
  }
}
```

### Environment Variables (Production)

```bash
EmailSettings__SmtpPassword="your-password"
AppSettings__ClientUrl="https://your-domain.com"
```

## 🐛 Troubleshooting

### Email not sending

1. **Check SMTP credentials**
   - Verify email/password
   - Enable "Less secure app access" (Gmail legacy) or use App Password

2. **Check firewall**
   - Port 587 must be open
   - Try port 465 with SSL

3. **Check logs**
   ```bash
   # View application logs
   dotnet run --project RestaurantPOS.API
   ```

### Token validation fails

1. **Check token format**
   - URL-safe characters only
   - No special characters in URL

2. **Check expiry**
   - Tokens expire in 1 hour
   - Request new token if expired

3. **Check database**
   ```sql
   SELECT * FROM PasswordResetTokens 
   WHERE Token = 'your-token';
   ```

### Email in spam folder

1. **Add sender to contacts**
2. **Check SPF/DKIM records** (Production)
3. **Use reputable SMTP service** (SendGrid, Mailgun)

## 🚀 Production Deployment

### 1. Use Environment Variables

```bash
# Don't commit appsettings.json with real passwords
# Use environment variables or secrets management

export EmailSettings__SmtpPassword="real-password"
export EmailSettings__FromEmail="noreply@yourdomain.com"
export AppSettings__ClientUrl="https://yourdomain.com"
```

### 2. Use Professional Email Service

- SendGrid (99 emails/day free)
- Mailgun (5000 emails/month free)
- Amazon SES
- Azure Communication Services

### 3. Configure Domain Email

- Setup SPF records
- Setup DKIM signatures
- Setup DMARC policy
- Use your domain email (noreply@yourdomain.com)

### 4. Monitor Email Delivery

- Log all email attempts
- Track bounces and failures
- Alert on delivery failures

## 📈 Future Enhancements

- [ ] Email queue system (background jobs)
- [ ] Email templates in database
- [ ] Multi-language email templates
- [ ] Email analytics (open rates, click rates)
- [ ] Custom email designs
- [ ] Resend email option
- [ ] Rate limiting (prevent abuse)
- [ ] Account lockout after failed attempts

## 🎯 Summary

**Password Reset via Email** đã được implement đầy đủ với:
- ✅ 18 files created/updated
- ✅ Secure token generation
- ✅ Email service với SMTP
- ✅ Beautiful email templates
- ✅ Complete reset flow
- ✅ Frontend UI components
- ✅ Security best practices

**Ready for testing!** 🚀
