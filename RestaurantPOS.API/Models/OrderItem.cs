using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class OrderItem
    {
    public int Id { get; set; }

        public int OrderId { get; set; }

        public Order? Order { get; set; }

   public int ProductId { get; set; }

 public Product? Product { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
     public decimal UnitPrice { get; set; }

public string? Notes { get; set; }
    }
}
