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
  Task<bool> DeleteOrderAsync(int id);
    }
}
