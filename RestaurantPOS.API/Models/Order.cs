using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class Order
    {
   public int Id { get; set; }

        public int? TableId { get; set; }

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

        public ICollection<OrderItem>? OrderItems { get; set; }
    }
}
