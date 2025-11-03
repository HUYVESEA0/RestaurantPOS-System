namespace RestaurantPOS.API.Models.DTOs
{
    public class LoginRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
   public string Role { get; set; } = "Staff";
    }

    public class LoginResponse
 {
        public string Token { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime ExpiresAt { get; set; }
    }

    public class UserResponse
 {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
      public string Email { get; set; } = string.Empty;
      public string FullName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
public string Role { get; set; } = string.Empty;
        public bool IsActive { get; set; }
      public DateTime CreatedAt { get; set; }
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
      public string Token { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }

  public class ChangePasswordRequest
  {
   public string OldPassword { get; set; } = string.Empty;
   public string NewPassword { get; set; } = string.Empty;
}
}
