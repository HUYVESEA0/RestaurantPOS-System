using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RestaurantPOS.API.Models
{
    public class Category
    {
    public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        [StringLength(200)]
        public string? Description { get; set; }

        [JsonIgnore] // Prevent circular reference
        public ICollection<Product>? Products { get; set; }
    }
}
