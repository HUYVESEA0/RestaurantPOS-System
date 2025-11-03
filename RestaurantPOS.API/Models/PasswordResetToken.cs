using System.ComponentModel.DataAnnotations;

namespace RestaurantPOS.API.Models
{
    public class PasswordResetToken
    {
        public int Id { get; set; }

     [Required]
        public int UserId { get; set; }

  public User? User { get; set; }

      [Required]
        public string Token { get; set; } = string.Empty;

    [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime ExpiresAt { get; set; }

        public bool IsUsed { get; set; } = false;

        public DateTime? UsedAt { get; set; }
    }
}
