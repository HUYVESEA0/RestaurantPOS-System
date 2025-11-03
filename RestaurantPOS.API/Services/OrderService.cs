using Microsoft.EntityFrameworkCore;
using RestaurantPOS.API.Data;
using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Services
{
    public class OrderService : IOrderService
    {
 private readonly ApplicationDbContext _context;

   public OrderService(ApplicationDbContext context)
        {
      _context = context;
   }

 public async Task<IEnumerable<Order>> GetAllOrdersAsync()
        {
            return await _context.Orders
   .Include(o => o.Table)
        .Include(o => o.OrderItems)
       .ThenInclude(oi => oi.Product)
      .OrderByDescending(o => o.OrderDate)
   .ToListAsync();
  }

public async Task<Order?> GetOrderByIdAsync(int id)
        {
            return await _context.Orders
             .Include(o => o.Table)
                .Include(o => o.OrderItems)
     .ThenInclude(oi => oi.Product)
          .FirstOrDefaultAsync(o => o.Id == id);
   }

        public async Task<IEnumerable<Order>> GetOrdersByTableAsync(int tableId)
        {
            return await _context.Orders
      .Include(o => o.Table)
    .Include(o => o.OrderItems)
      .ThenInclude(oi => oi.Product)
       .Where(o => o.TableId == tableId)
     .OrderByDescending(o => o.OrderDate)
    .ToListAsync();
        }

        public async Task<Order> CreateOrderAsync(Order order)
        {
            order.OrderDate = DateTime.UtcNow;
        
 // Calculate total amount
            decimal total = 0;
 if (order.OrderItems != null)
            {
    foreach (var item in order.OrderItems)
   {
   var product = await _context.Products.FindAsync(item.ProductId);
              if (product != null)
       {
      item.UnitPrice = product.Price;
      total += item.UnitPrice * item.Quantity;
      }
    }
  }
  order.TotalAmount = total;

     _context.Orders.Add(order);
            await _context.SaveChangesAsync();
  return order;
        }

        public async Task<Order?> UpdateOrderStatusAsync(int id, string status)
        {
            var order = await _context.Orders.FindAsync(id);
  if (order == null)
       return null;

    order.Status = status;
     await _context.SaveChangesAsync();
            return order;
 }

   public async Task<bool> DeleteOrderAsync(int id)
        {
            var order = await _context.Orders
     .Include(o => o.OrderItems)
             .FirstOrDefaultAsync(o => o.Id == id);
      
      if (order == null)
                return false;

            _context.Orders.Remove(order);
 await _context.SaveChangesAsync();
 return true;
}
    }
}
