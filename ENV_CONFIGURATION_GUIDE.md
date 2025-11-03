# Environment Variables Configuration Guide

## 📋 Tổng quan

Hệ thống Restaurant POS sử dụng environment variables để quản lý cấu hình cho các môi trường khác nhau (Development, Staging, Production).

## 📁 File Structure

```
RestaurantPOS-System/
├── .env.example          # Template với tất cả variables (COMMIT)
├── .env     # Development config (DO NOT COMMIT)
├── RestaurantPOS.API/
│   ├── appsettings.json     # Base configuration
│   ├── appsettings.Development.json
│   └── appsettings.Production.json
└── restaurant-pos-client/
    └── .env  # React environment variables
```

## 🔧 Setup Development Environment

### 1. Copy template file

```bash
# Copy .env.example to .env
cp .env.example .env

# Copy frontend env
cp restaurant-pos-client/.env.example restaurant-pos-client/.env
```

### 2. Edit .env file

```bash
# Open in text editor
notepad .env

# Or use VS Code
code .env
```

### 3. Configure Database

**Option 1: SQL Server Express (Windows)**
```env
DATABASE_SERVER=HUYVIESEA\\SQLEXPRESS
DATABASE_NAME=RestaurantPOS
DATABASE_TRUSTED_CONNECTION=true
DATABASE_MULTIPLE_ACTIVE_RESULT_SETS=true
```

**Option 2: LocalDB**
```env
DATABASE_CONNECTION=Server=(localdb)\\mssqllocaldb;Database=RestaurantPOS;Trusted_Connection=true;MultipleActiveResultSets=true
```

**Option 3: SQL Server with Credentials**
```env
DATABASE_SERVER=localhost
DATABASE_NAME=RestaurantPOS
DATABASE_USERNAME=sa
DATABASE_PASSWORD=YourPassword123
DATABASE_TRUST_SERVER_CERTIFICATE=true
```

### 4. Configure Email (Gmail)

**Step 1**: Enable 2-Factor Authentication
- Go to https://myaccount.google.com/security
- Enable "2-Step Verification"

**Step 2**: Generate App Password
- Go to https://myaccount.google.com/apppasswords
- Select "Mail" and "Windows Computer"
- Click "Generate"
- Copy 16-character password

**Step 3**: Update .env
```env
EMAIL_SMTP_HOST=smtp.gmail.com
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USER=your.email@gmail.com
EMAIL_SMTP_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM_EMAIL=your.email@gmail.com
EMAIL_ENABLE_SSL=true
```

### 5. Configure Frontend

Edit `restaurant-pos-client/.env`:
```env
REACT_APP_API_URL=https://localhost:7000/api
```

## 📊 Environment Variables Reference

### Database Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `DATABASE_SERVER` | SQL Server instance | `localhost` | ✅ |
| `DATABASE_NAME` | Database name | `RestaurantPOS` | ✅ |
| `DATABASE_USERNAME` | SQL auth username | `sa` | ⚠️ If not using Windows Auth |
| `DATABASE_PASSWORD` | SQL auth password | `password` | ⚠️ If not using Windows Auth |
| `DATABASE_TRUSTED_CONNECTION` | Use Windows Auth | `true` | ⚠️ If using Windows Auth |
| `DATABASE_TRUST_SERVER_CERTIFICATE` | Trust SSL cert | `true` | ⚠️ For local dev |

### JWT Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET_KEY` | Secret for signing tokens | `64-char-hex` | ✅ |
| `JWT_ISSUER` | Token issuer | `RestaurantPOS.API` | ✅ |
| `JWT_AUDIENCE` | Token audience | `RestaurantPOS.Client` | ✅ |
| `JWT_EXPIRY_HOURS` | Token lifetime | `24` | ✅ |

### Email Configuration

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `EMAIL_FROM_EMAIL` | Sender email | `noreply@app.com` | ✅ |
| `EMAIL_FROM_NAME` | Sender name | `Restaurant POS` | ✅ |
| `EMAIL_SMTP_HOST` | SMTP server | `smtp.gmail.com` | ✅ |
| `EMAIL_SMTP_PORT` | SMTP port | `587` | ✅ |
| `EMAIL_SMTP_USER` | SMTP username | `user@gmail.com` | ✅ |
| `EMAIL_SMTP_PASSWORD` | SMTP password | `app-password` | ✅ |
| `EMAIL_ENABLE_SSL` | Enable SSL/TLS | `true` | ✅ |

### Application Settings

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `APP_CLIENT_URL` | Frontend URL | `http://localhost:3000` | ✅ |
| `APP_API_URL` | Backend URL | `https://localhost:7000` | ✅ |
| `APP_ENVIRONMENT` | Environment name | `Development` | ✅ |

### Security Settings

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `PASSWORD_RESET_TOKEN_EXPIRY_HOURS` | Reset token lifetime | `1` | ✅ |
| `ACCOUNT_LOCKOUT_ENABLED` | Enable lockout | `false` | ❌ |
| `ACCOUNT_LOCKOUT_MAX_FAILED_ATTEMPTS` | Max attempts | `5` | ❌ |
| `ACCOUNT_LOCKOUT_DURATION_MINUTES` | Lockout duration | `15` | ❌ |

## 🔒 Security Best Practices

### Development

✅ **DO:**
- Keep `.env` in `.gitignore`
- Use `.env.example` as template
- Document all variables
- Use weak passwords for local dev

❌ **DON'T:**
- Commit `.env` to Git
- Share `.env` files
- Use production secrets in dev
- Hardcode sensitive data

### Production

✅ **DO:**
- Use Azure Key Vault / AWS Secrets Manager
- Rotate secrets regularly
- Use strong, random passwords
- Enable HTTPS
- Use environment variables in hosting platform
- Monitor secret access

❌ **DON'T:**
- Use default passwords
- Share secrets via email/Slack
- Store secrets in code
- Use same secrets across environments

## 🌍 Environment-Specific Configuration

### Development (.env)
```env
APP_ENVIRONMENT=Development
DATABASE_SERVER=localhost
EMAIL_SMTP_HOST=smtp.gmail.com
LOG_LEVEL_DEFAULT=Debug
```

### Staging (.env)
```env
APP_ENVIRONMENT=Staging
DATABASE_SERVER=staging-db.example.com
EMAIL_SMTP_HOST=smtp.sendgrid.net
LOG_LEVEL_DEFAULT=Information
```

### Production (.env)
```env
APP_ENVIRONMENT=Production
DATABASE_SERVER=prod-db.example.com
EMAIL_SMTP_HOST=smtp.sendgrid.net
LOG_LEVEL_DEFAULT=Warning
```

## 📝 Using Environment Variables

### In ASP.NET Core (Program.cs)

```csharp
// Read from appsettings.json (which can use env vars)
var jwtSecretKey = builder.Configuration["JwtSettings:SecretKey"];

// Read directly from environment variables
var databaseServer = Environment.GetEnvironmentVariable("DATABASE_SERVER");

// Read with default value
var apiUrl = builder.Configuration.GetValue<string>("AppSettings:ClientUrl", "http://localhost:3000");
```

### In appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "${DATABASE_CONNECTION}"
  },
  "JwtSettings": {
    "SecretKey": "${JWT_SECRET_KEY}"
  }
}
```

**Note**: ASP.NET Core doesn't support `${VAR}` syntax by default. Use `IConfiguration` instead.

### In React (.env)

```env
# Must start with REACT_APP_
REACT_APP_API_URL=https://localhost:7000/api
REACT_APP_ENABLE_ANALYTICS=true
```

Usage in code:
```typescript
const apiUrl = process.env.REACT_APP_API_URL;
```

## 🚀 Deployment

### Azure App Service

```bash
# Set via Azure CLI
az webapp config appsettings set --name myapp --resource-group mygroup --settings JWT_SECRET_KEY="xxx"

# Or via Portal: Configuration > Application settings
```

### Docker

```dockerfile
# Dockerfile
ENV APP_ENVIRONMENT=Production

# docker-compose.yml
environment:
  - JWT_SECRET_KEY=${JWT_SECRET_KEY}
  - DATABASE_CONNECTION=${DATABASE_CONNECTION}
```

### AWS Elastic Beanstalk

```bash
# .ebextensions/environment.config
option_settings:
  - option_name: JWT_SECRET_KEY
    value: xxx
```

## 🧪 Testing Configuration

### Verify environment variables loaded

```bash
# Backend
dotnet run --project RestaurantPOS.API

# Check logs for configuration values (sanitized)
```

### Test email configuration

```bash
# In Swagger UI
POST /api/Auth/ForgotPassword
{
  "email": "test@example.com"
}

# Check email inbox
```

### Test database connection

```bash
# Run migrations
dotnet ef database update --project RestaurantPOS.API

# Check database exists
```

## 🔍 Troubleshooting

### Environment variables not loading

**Problem**: Variables in `.env` not being read

**Solution**:
- ASP.NET Core doesn't read `.env` files by default
- Use `appsettings.json` or environment variables
- Consider using `DotNetEnv` package:

```bash
dotnet add package DotNetEnv
```

```csharp
// Program.cs
DotNetEnv.Env.Load();
```

### Email not sending

**Problem**: SMTP authentication fails

**Solution**:
1. Verify Gmail App Password (not account password)
2. Check `EMAIL_ENABLE_SSL=true`
3. Verify port `587` not blocked by firewall

### Database connection fails

**Problem**: Cannot connect to SQL Server

**Solution**:
1. Verify SQL Server is running
2. Check connection string format
3. Test with SQL Server Management Studio
4. Verify firewall allows connection

## 📚 References

- [ASP.NET Core Configuration](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/configuration/)
- [Environment Variables in React](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/)
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [Docker Environment Variables](https://docs.docker.com/compose/environment-variables/)

## 📖 Examples

### Complete .env for Development

See `.env.example` in project root

### Complete .env for Production

```env
# Use Azure Key Vault references
JWT_SECRET_KEY=${AZURE_KEYVAULT_SECRET_JWT}
DATABASE_CONNECTION=${AZURE_SQL_CONNECTION_STRING}
EMAIL_SMTP_PASSWORD=${SENDGRID_API_KEY}
APP_CLIENT_URL=https://myapp.com
APP_ENVIRONMENT=Production
LOG_LEVEL_DEFAULT=Warning
```

---

**Last Updated**: 2025-01-XX  
**Version**: 1.2.0
