# Database Migration Guide

## Tạo Migration mới cho Authentication

### 1. Tạo Migration

```bash
dotnet ef migrations add AddAuthenticationTables --project RestaurantPOS.API
```

Lệnh này sẽ tạo:
- `Migrations/{timestamp}_AddAuthenticationTables.cs`
- `Migrations/{timestamp}_AddAuthenticationTables.Designer.cs`
- Update `ApplicationDbContextModelSnapshot.cs`

### 2. Xem SQL Script (Optional)

Để xem SQL sẽ được execute:

```bash
dotnet ef migrations script --project RestaurantPOS.API
```

### 3. Apply Migration

```bash
dotnet ef database update --project RestaurantPOS.API
```

Lệnh này sẽ:
- Tạo table `Users`
- Thêm constraints (Unique cho Username và Email)
- Seed admin user với password đã hash

### 4. Verify Migration

Kết nối SQL Server và kiểm tra:

```sql
-- Xem structure table Users
SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'Users';

-- Xem admin user
SELECT * FROM Users WHERE Username = 'admin';

-- Xem tất cả migrations đã apply
SELECT * FROM __EFMigrationsHistory;
```

## Rollback Migration (Nếu cần)

### Remove Last Migration (Chưa apply)

```bash
dotnet ef migrations remove --project RestaurantPOS.API
```

### Rollback Database (Đã apply)

```bash
# Rollback về migration trước đó
dotnet ef database update {PreviousMigrationName} --project RestaurantPOS.API

# Example:
dotnet ef database update InitialCreate --project RestaurantPOS.API

# Sau đó remove migration
dotnet ef migrations remove --project RestaurantPOS.API
```

## Migration cho Production

### 1. Generate SQL Script

```bash
dotnet ef migrations script --project RestaurantPOS.API --output migration.sql
```

### 2. Review SQL

Kiểm tra file `migration.sql` trước khi chạy trên production database.

### 3. Apply on Production

```bash
# Option 1: Execute SQL file
sqlcmd -S your_server -d your_database -i migration.sql

# Option 2: Apply migration directly (không khuyến nghị cho production)
dotnet ef database update --project RestaurantPOS.API --connection "YourProductionConnectionString"
```

## Seed Data

Migration tự động seed:

### Admin User
- **Username**: admin
- **Password**: Admin@123 (đã hash bằng BCrypt)
- **Email**: admin@restaurantpos.com
- **Role**: Admin

### Categories (From InitialCreate migration)
- Đồ ăn
- Đồ uống
- Tráng miệng

### Tables (From InitialCreate migration)
- B01, B02, B03, B04

## Troubleshooting

### Error: "Database already exists"

```bash
# Drop database và recreate
dotnet ef database drop --project RestaurantPOS.API --force
dotnet ef database update --project RestaurantPOS.API
```

### Error: "Migrations assembly not found"

Đảm bảo bạn đang ở thư mục gốc (có file .sln) khi chạy lệnh.

### Error: "Cannot insert duplicate key"

Nếu seed data conflict:

```sql
-- Delete existing data
DELETE FROM Users WHERE Username = 'admin';
DELETE FROM Categories;
DELETE FROM Tables;

-- Rerun migration
dotnet ef database update --project RestaurantPOS.API
```

## Best Practices

1. **Luôn backup database** trước khi apply migration
2. **Test migration** trên development/staging trước
3. **Use SQL script** cho production deployment
4. **Version control** tất cả migration files
5. **Never modify** migration files sau khi đã apply
6. **Document** mọi database changes trong CHANGELOG

## Migration Commands Reference

```bash
# List all migrations
dotnet ef migrations list --project RestaurantPOS.API

# View pending migrations
dotnet ef migrations has-pending-model-changes --project RestaurantPOS.API

# Get database info
dotnet ef dbcontext info --project RestaurantPOS.API

# Scaffold DbContext from existing database (reverse engineer)
dotnet ef dbcontext scaffold "ConnectionString" Microsoft.EntityFrameworkCore.SqlServer
```
