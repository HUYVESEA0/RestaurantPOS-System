using Microsoft.EntityFrameworkCore;
using RestaurantPOS.API.Data;
using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;

        public ProductService(ApplicationDbContext context)
        {
       _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            return await _context.Products
      .Include(p => p.Category)
        .ToListAsync();
     }

        public async Task<Product?> GetProductByIdAsync(int id)
      {
       return await _context.Products
         .Include(p => p.Category)
     .FirstOrDefaultAsync(p => p.Id == id);
     }

        public async Task<IEnumerable<Product>> GetProductsByCategoryAsync(int categoryId)
        {
        return await _context.Products
    .Include(p => p.Category)
    .Where(p => p.CategoryId == categoryId)
     .ToListAsync();
      }

    public async Task<Product> CreateProductAsync(Product product)
     {
         product.CreatedAt = DateTime.UtcNow;
_context.Products.Add(product);
        await _context.SaveChangesAsync();
 return product;
        }

        public async Task<Product?> UpdateProductAsync(int id, Product product)
        {
   var existingProduct = await _context.Products.FindAsync(id);
       if (existingProduct == null)
      return null;

  existingProduct.Name = product.Name;
            existingProduct.Description = product.Description;
          existingProduct.Price = product.Price;
            existingProduct.CategoryId = product.CategoryId;
   existingProduct.ImageUrl = product.ImageUrl;
     existingProduct.IsAvailable = product.IsAvailable;
     existingProduct.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return existingProduct;
 }

        public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
         if (product == null)
        return false;

  _context.Products.Remove(product);
     await _context.SaveChangesAsync();
            return true;
        }
  }
}
