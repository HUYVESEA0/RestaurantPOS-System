using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class Table
    {
        public int Id { get; set; }

      [Required]
        [StringLength(20)]
        public string TableNumber { get; set; } = string.Empty;

        [Range(1, 20)]
        public int Capacity { get; set; }

    public bool IsAvailable { get; set; } = true;

        public ICollection<Order>? Orders { get; set; }
    }
}
