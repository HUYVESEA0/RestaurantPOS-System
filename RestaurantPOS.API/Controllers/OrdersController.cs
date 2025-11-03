using Microsoft.AspNetCore.Mvc;
using RestaurantPOS.API.Models;
using RestaurantPOS.API.Services;

namespace RestaurantPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
}
