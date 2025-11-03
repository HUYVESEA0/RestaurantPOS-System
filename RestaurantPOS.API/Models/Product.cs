using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class Product
    {
      public int Id { get; set; }

        [Required]
        [StringLength(100)]
    public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

     [Required]
        [Range(0, double.MaxValue)]
   public decimal Price { get; set; }

        public int CategoryId { get; set; }

 public Category? Category { get; set; }

   public string? ImageUrl { get; set; }

        public bool IsAvailable { get; set; } = true;

     public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

  public DateTime? UpdatedAt { get; set; }
    }
}
