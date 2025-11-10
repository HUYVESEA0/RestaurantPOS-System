using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class Order
    {
   public int Id { get; set; }

        public int? TableId { get; set; } // ✅ Nullable for takeaway orders

        public Table? Table { get; set; }

        [Required]
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;

      [Required]
     public decimal TotalAmount { get; set; }

     [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // Pending, Completed, Cancelled

   public string? CustomerName { get; set; }

  public string? Notes { get; set; }

        // ✅ NEW: Order type and grouping
     [StringLength(20)]
        public string OrderType { get; set; } = "DineIn"; // DineIn, Takeaway, Delivery
        
        public int? ParentOrderId { get; set; } // For split orders
     public int? OrderGroupId { get; set; } // For merged table orders

        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
