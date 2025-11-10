using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

   [StringLength(50)]
        public string Floor { get; set; } = "Tầng 1"; // ✅ NEW: Floor/Area

        // ✅ NEW: Table merging/splitting support
        public bool IsMerged { get; set; } = false;
        public int? MergedGroupId { get; set; } // ID nhóm bàn ghép
        public string? MergedTableNumbers { get; set; } // "B01,B02,B03"

        [JsonIgnore] // Prevent circular reference
   public ICollection<Order>? Orders { get; set; }
    }
}
