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

            modelBuilder.Entity<Table>().HasData(
 new Table { Id = 1, TableNumber = "B01", Capacity = 4, IsAvailable = true },
              new Table { Id = 2, TableNumber = "B02", Capacity = 4, IsAvailable = true },
       new Table { Id = 3, TableNumber = "B03", Capacity = 6, IsAvailable = true },
   new Table { Id = 4, TableNumber = "B04", Capacity = 2, IsAvailable = true }
            );

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
