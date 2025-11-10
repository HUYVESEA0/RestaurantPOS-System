using Microsoft.EntityFrameworkCore;
using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options)
        {
      }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
   public DbSet<Table> Tables { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<PasswordResetToken> PasswordResetTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
  base.OnModelCreating(modelBuilder);

     // Configure decimal precision for prices
       modelBuilder.Entity<Product>()
            .Property(p => p.Price)
      .HasPrecision(18, 2);

            modelBuilder.Entity<OrderItem>()
          .Property(oi => oi.UnitPrice)
  .HasPrecision(18, 2);

         modelBuilder.Entity<Order>()
.Property(o => o.TotalAmount)
         .HasPrecision(18, 2);

      // Seed initial data
            modelBuilder.Entity<Category>().HasData(
        new Category { Id = 1, Name = "Đồ ăn", Description = "Các món ăn" },
 new Category { Id = 2, Name = "Đồ uống", Description = "Các loại đồ uống" },
         new Category { Id = 3, Name = "Tráng miệng", Description = "Các món tráng miệng" }
            );

        // Seed 50 tables across 2 floors (like KiotViet)
        var tables = new List<Table>();
        int tableId = 1;

        // Tầng 1: 30 bàn (B01-B30)
        for (int i = 1; i <= 30; i++)
    {
            tables.Add(new Table
            {
           Id = tableId++,
       TableNumber = $"B{i:D2}",
           Capacity = i <= 20 ? 4 : (i <= 25 ? 6 : 2), // Mix of capacities
       IsAvailable = true,
             Floor = "Tầng 1"
    });
        }

        // Tầng 2: 20 bàn (B31-B50)
        for (int i = 31; i <= 50; i++)
        {
            tables.Add(new Table
     {
         Id = tableId++,
    TableNumber = $"B{i:D2}",
     Capacity = i <= 45 ? 4 : 6,
 IsAvailable = true,
   Floor = "Tầng 2"
            });
      }

    modelBuilder.Entity<Table>().HasData(tables);

    // Configure User entity
          modelBuilder.Entity<User>()
    .HasIndex(u => u.Username)
       .IsUnique();

  modelBuilder.Entity<User>()
.HasIndex(u => u.Email)
           .IsUnique();

            // Configure PasswordResetToken entity
       modelBuilder.Entity<PasswordResetToken>()
  .HasOne(p => p.User)
   .WithMany()
  .HasForeignKey(p => p.UserId)
       .OnDelete(DeleteBehavior.Cascade);

       modelBuilder.Entity<PasswordResetToken>()
  .HasIndex(p => p.Token);

    // Seed admin user
   modelBuilder.Entity<User>().HasData(
         new User 
                { 
        Id = 1, 
    Username = "admin", 
   Email = "admin@restaurantpos.com",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123"),
  FullName = "Administrator",
        Role = "Admin",
          IsActive = true,
   CreatedAt = DateTime.UtcNow
       }
      );
     }
    }
}
