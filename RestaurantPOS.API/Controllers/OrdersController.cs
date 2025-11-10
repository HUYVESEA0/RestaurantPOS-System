using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantPOS.API.Models;
using RestaurantPOS.API.Services;

namespace RestaurantPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authentication
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
    _orderService = orderService;
     }

// GET: api/Orders
        [HttpGet]
 public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
    var orders = await _orderService.GetAllOrdersAsync();
     return Ok(orders);
}

   // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
  var order = await _orderService.GetOrderByIdAsync(id);

 if (order == null)
     {
    return NotFound();
            }

         return Ok(order);
    }

      // GET: api/Orders/Table/5
        [HttpGet("Table/{tableId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByTable(int tableId)
        {
            var orders = await _orderService.GetOrdersByTableAsync(tableId);
 return Ok(orders);
}

        // POST: api/Orders
  [HttpPost]
   public async Task<ActionResult<Order>> CreateOrder(Order order)
      {
     var createdOrder = await _orderService.CreateOrderAsync(order);
        return CreatedAtAction(nameof(GetOrder), new { id = createdOrder.Id }, createdOrder);
        }

    // PATCH: api/Orders/5/Status
    [HttpPatch("{id}/Status")]
   public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
        {
      var updatedOrder = await _orderService.UpdateOrderStatusAsync(id, status);

    if (updatedOrder == null)
   {
        return NotFound();
    }

       return NoContent();
        }

    // POST: api/Orders/5/Items - Add item to existing order
      [HttpPost("{id}/Items")]
      public async Task<ActionResult<Order>> AddItemToOrder(int id, [FromBody] OrderItem item)
        {
      var updatedOrder = await _orderService.AddItemToOrderAsync(id, item);

  if (updatedOrder == null)
      {
  return NotFound();
    }

  return Ok(updatedOrder);
        }

    // PATCH: api/Orders/5/Items/7 - Update item quantity
        [HttpPatch("{orderId}/Items/{itemId}")]
        public async Task<ActionResult<Order>> UpdateItemQuantity(int orderId, int itemId, [FromBody] int quantity)
        {
    var updatedOrder = await _orderService.UpdateItemQuantityAsync(orderId, itemId, quantity);

  if (updatedOrder == null)
     {
       return NotFound();
       }

   return Ok(updatedOrder);
        }

    // DELETE: api/Orders/5/Items/7 - Remove item from order
    [HttpDelete("{orderId}/Items/{itemId}")]
        public async Task<ActionResult<Order>> RemoveItemFromOrder(int orderId, int itemId)
   {
      var updatedOrder = await _orderService.RemoveItemFromOrderAsync(orderId, itemId);

   if (updatedOrder == null)
{
        return NotFound();
       }

   return Ok(updatedOrder);
        }

    // ✅ NEW: POST: api/Orders/5/Split - Split order into two orders
 [HttpPost("{id}/Split")]
 public async Task<ActionResult<SplitOrderResponse>> SplitOrder(int id, [FromBody] SplitOrderRequest request)
        {
       if (request.ItemIds == null || request.ItemIds.Count == 0)
    {
        return BadRequest("Vui lòng chọn ít nhất 1 món để tách");
     }

     var result = await _orderService.SplitOrderAsync(id, request.ItemIds);

 if (result == null)
      {
      return NotFound("Không tìm thấy đơn hàng");
}

      return Ok(result);
      }

        // DELETE: api/Orders/5
     [HttpDelete("{id}")]
 public async Task<IActionResult> DeleteOrder(int id)
 {
    var result = await _orderService.DeleteOrderAsync(id);

  if (!result)
{
    return NotFound();
  }

return NoContent();
    }
    }

// ✅ NEW: DTOs for split order
    public class SplitOrderRequest
    {
        public List<int> ItemIds { get; set; } = new();
    }

    public class SplitOrderResponse
    {
        public Order OriginalOrder { get; set; } = null!;
    public Order NewOrder { get; set; } = null!;
    }
}
