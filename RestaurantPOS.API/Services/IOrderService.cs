using RestaurantPOS.API.Models;

namespace RestaurantPOS.API.Services
{
public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync();
        Task<Order?> GetOrderByIdAsync(int id);
        Task<IEnumerable<Order>> GetOrdersByTableAsync(int tableId);
     Task<Order> CreateOrderAsync(Order order);
        Task<Order?> UpdateOrderStatusAsync(int id, string status);
      Task<Order?> AddItemToOrderAsync(int orderId, OrderItem item); // ✅ NEW
     Task<Order?> UpdateItemQuantityAsync(int orderId, int itemId, int quantity); // ✅ NEW
        Task<Order?> RemoveItemFromOrderAsync(int orderId, int itemId); // ✅ NEW
      Task<SplitOrderResponse?> SplitOrderAsync(int orderId, List<int> itemIds); // ✅ NEW
  Task<bool> DeleteOrderAsync(int id);
    }

// ✅ NEW: Response for split operation
    public class SplitOrderResponse
    {
        public Order OriginalOrder { get; set; } = null!;
   public Order NewOrder { get; set; } = null!;
    }
}
