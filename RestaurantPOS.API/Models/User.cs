using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class User
    {
      public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Username { get; set; } = string.Empty;

        [Required]
    [EmailAddress]
        [StringLength(200)]
        public string Email { get; set; } = string.Empty;

    [Required]
        public string PasswordHash { get; set; } = string.Empty;

      [Required]
      [StringLength(100)]
        public string FullName { get; set; } = string.Empty;

        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [Required]
        [StringLength(20)]
  public string Role { get; set; } = "Staff"; // Admin, Manager, Staff

      public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? LastLoginAt { get; set; }
    }
}
