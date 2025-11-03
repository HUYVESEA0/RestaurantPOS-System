# Quick Start Guide - Restaurant POS System

## Bước 1: Cài đặt Backend (API)

1. Mở terminal tại thư mục gốc dự án
2. Chạy lần lượt các lệnh:

```bash
# Restore NuGet packages
dotnet restore RestaurantPOS.sln

# Tạo migration cho database
dotnet ef migrations add InitialCreate --project RestaurantPOS.API

# Tạo database và seed data
dotnet ef database update --project RestaurantPOS.API

# Chạy API server
dotnet run --project RestaurantPOS.API
```

✅ API sẽ chạy tại: `https://localhost:7000`
✅ Swagger UI: `https://localhost:7000/swagger`

## Bước 2: Cài đặt Frontend (React)

1. Mở terminal mới
2. Di chuyển vào thư mục React:

```bash
cd restaurant-pos-client
```

3. Cài đặt dependencies:

```bash
npm install
```

4. Chạy React app:

```bash
npm start
```

✅ Frontend sẽ chạy tại: `http://localhost:3000`

## Bước 3: Kiểm tra kết nối

1. Mở trình duyệt tại `http://localhost:3000`
2. Bạn sẽ thấy Dashboard với dữ liệu mẫu
3. Kiểm tra các chức năng:
   - Dashboard
   - Sản phẩm
   - Danh mục
   - Đơn hàng
   - Bàn

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

**Categories:**
- Đồ ăn
- Đồ uống
- Tráng miệng

**Tables:**
- B01, B02, B03, B04

Bạn có thể thêm Products và Orders từ giao diện web.

## Cổng mặc định

- Backend API: `https://localhost:7000`
- Frontend: `http://localhost:3000`
- Swagger UI: `https://localhost:7000/swagger`

## Tài khoản demo

Hiện tại chưa có authentication. Tất cả API đều public.

## Tiếp theo

- Thêm sản phẩm mới
- Tạo đơn hàng
- Quản lý bàn
- Xem thống kê dashboard
