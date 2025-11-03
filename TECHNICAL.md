# Restaurant POS System - Technical Documentation

## 🏗️ Kiến trúc hệ thống

### Frontend (React + TypeScript)
```
restaurant-pos-client/
├── src/
│   ├── components/
│   │   ├── Dashboard/        # Trang tổng quan
│   │   ├── Products/         # Quản lý sản phẩm
│   │   ├── Categories/       # Quản lý danh mục
│   │   ├── Orders/           # Quản lý đơn hàng
│   │   └── Tables/   # Quản lý bàn
│   ├── services/
│   │   ├── api.ts           # Axios client
│   │   ├── productService.ts
│   │   ├── orderService.ts
│   │   ├── categoryService.ts
│   │   └── tableService.ts
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx      # Main component với routing
│   └── index.tsx  # Entry point
```

### Backend (ASP.NET Core Web API)
```
RestaurantPOS.API/
├── Controllers/
│   ├── ProductsController.cs    # CRUD cho Products
│   ├── OrdersController.cs      # CRUD cho Orders
│   ├── CategoriesController.cs  # CRUD cho Categories
│   └── TablesController.cs      # CRUD cho Tables
├── Models/
│   ├── Product.cs           # Entity model
│   ├── Order.cs
│   ├── OrderItem.cs
│   ├── Category.cs
│   └── Table.cs
├── Services/
│   ├── IProductService.cs      # Interface
│   ├── ProductService.cs       # Business logic
│   ├── IOrderService.cs
│   └── OrderService.cs
├── Data/
│   └── ApplicationDbContext.cs # EF Core DbContext
└── Program.cs     # Configuration & DI
```

## 📚 Công nghệ sử dụng

### Backend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| .NET | 8.0 | Framework |
| ASP.NET Core | 8.0 | Web API |
| Entity Framework Core | 8.0 | ORM |
| SQL Server | 2019+ | Database |
| Swashbuckle | 6.5.0 | API Documentation |

### Frontend Stack
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.3.3 | Type Safety |
| React Router | 6.20.1 | Navigation |
| Axios | 1.6.2 | HTTP Client |
| React Scripts | 5.0.1 | Build Tools |

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE Products (
    Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Price DECIMAL(18,2) NOT NULL,
    CategoryId INT NOT NULL,
  ImageUrl NVARCHAR(MAX),
    IsAvailable BIT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 NOT NULL,
    UpdatedAt DATETIME2,
    FOREIGN KEY (CategoryId) REFERENCES Categories(Id)
);
```

### Categories Table
```sql
CREATE TABLE Categories (
  Id INT PRIMARY KEY IDENTITY,
    Name NVARCHAR(50) NOT NULL,
    Description NVARCHAR(200)
);
```

### Orders Table
```sql
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY,
    TableId INT,
    OrderDate DATETIME2 NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    Status NVARCHAR(20) NOT NULL,
 CustomerName NVARCHAR(MAX),
    Notes NVARCHAR(MAX),
    FOREIGN KEY (TableId) REFERENCES Tables(Id)
);
```

### OrderItems Table
```sql
CREATE TABLE OrderItems (
    Id INT PRIMARY KEY IDENTITY,
    OrderId INT NOT NULL,
    ProductId INT NOT NULL,
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(18,2) NOT NULL,
    Notes NVARCHAR(MAX),
    FOREIGN KEY (OrderId) REFERENCES Orders(Id) ON DELETE CASCADE,
  FOREIGN KEY (ProductId) REFERENCES Products(Id)
);
```

### Tables Table
```sql
CREATE TABLE Tables (
    Id INT PRIMARY KEY IDENTITY,
    TableNumber NVARCHAR(20) NOT NULL,
    Capacity INT NOT NULL,
    IsAvailable BIT NOT NULL DEFAULT 1
);
```

## 🔐 Security & Best Practices

### Backend
- ✅ **Model Validation**: Data Annotations
- ✅ **Error Handling**: Try-catch blocks
- ✅ **CORS**: Configured for development
- ✅ **Dependency Injection**: Service registration
- ✅ **Repository Pattern**: Service layer separation
- ⏳ **Authentication**: To be implemented (JWT)
- ⏳ **Authorization**: To be implemented (Role-based)

### Frontend
- ✅ **Type Safety**: TypeScript strict mode
- ✅ **Error Handling**: Try-catch in API calls
- ✅ **Loading States**: User feedback
- ✅ **Responsive Design**: Mobile-friendly
- ⏳ **State Management**: To be implemented (Redux/Context)
- ⏳ **Form Validation**: To be implemented

## 🔄 API Flow

### Product Management Flow
```
User Action → React Component → Service Layer → Axios → API Controller → 
Service → Repository → Database → Response → State Update → UI Render
```

### Order Creation Flow
```
1. User selects products
2. React calculates total
3. POST /api/Orders with OrderItems[]
4. API validates & calculates server-side
5. Saves to database (Order + OrderItems)
6. Returns created order
7. Frontend updates UI
```

## 📊 State Management

### Current Approach (useState)
- Local component state
- useEffect for data fetching
- Props drilling for shared state

### Recommended Upgrade
- Context API for global state
- React Query for server state
- Redux Toolkit for complex state

## 🎨 UI/UX Design Patterns

### Color Scheme
```css
Primary: #3498db (Blue)
Success: #27ae60 (Green)
Warning: #f39c12 (Orange)
Danger: #e74c3c (Red)
Dark: #2c3e50
Light: #ecf0f1
```

### Component Structure
- **Container Components**: Logic & data fetching
- **Presentational Components**: UI rendering
- **Service Layer**: API communication
- **Type Definitions**: Shared interfaces

## 🧪 Testing Strategy (To Implement)

### Backend
```bash
# Unit Tests
dotnet test RestaurantPOS.Tests

# Integration Tests
dotnet test RestaurantPOS.IntegrationTests
```

### Frontend
```bash
# Unit Tests (Jest)
npm test

# E2E Tests (Cypress)
npm run cypress
```

## 🚀 Deployment

### Backend Options
- Azure App Service
- Docker Container
- IIS Server
- Linux + Nginx

### Frontend Options
- Netlify
- Vercel
- Azure Static Web Apps
- S3 + CloudFront

### Database Options
- Azure SQL Database
- SQL Server on VM
- AWS RDS

## 📈 Future Enhancements

### Phase 1 (Security)
- [ ] JWT Authentication
- [ ] Role-based Authorization
- [ ] User Management
- [ ] API Rate Limiting

### Phase 2 (Features)
- [ ] Real-time notifications (SignalR)
- [ ] Payment integration
- [ ] Receipt printing
- [ ] Inventory management
- [ ] Employee management

### Phase 3 (Optimization)
- [ ] Redis caching
- [ ] CDN for static assets
- [ ] Database indexing
- [ ] Performance monitoring
- [ ] Error logging (Serilog)

### Phase 4 (Analytics)
- [ ] Sales reports
- [ ] Customer analytics
- [ ] Product performance
- [ ] Revenue tracking

## 🔍 Code Quality

### Backend Standards
- Follow Microsoft C# Coding Conventions
- Use async/await for I/O operations
- Implement proper exception handling
- Write XML documentation comments

### Frontend Standards
- Follow Airbnb React Style Guide
- Use functional components with hooks
- Implement proper TypeScript types
- Write JSDoc comments

## 📞 Support & Contact

For issues and questions:
- GitHub Issues: [Create Issue](https://github.com/HUYVESEA0/RestaurantPOS-System/issues)
- Email: support@restaurantpos.com

## 📄 License

MIT License - see LICENSE file for details
