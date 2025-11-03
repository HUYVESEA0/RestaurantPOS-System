using RestaurantPOS.API.Models;
using RestaurantPOS.API.Models.DTOs;

namespace RestaurantPOS.API.Services
{
    public interface IAuthService
    {
   Task<LoginResponse?> LoginAsync(LoginRequest request);
   Task<UserResponse?> RegisterAsync(RegisterRequest request);
        Task<UserResponse?> GetUserByIdAsync(int id);
      Task<IEnumerable<UserResponse>> GetAllUsersAsync();
     Task<bool> UpdateUserAsync(int id, User user);
        Task<bool> DeleteUserAsync(int id);
     Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
     Task<bool> ForgotPasswordAsync(string email);
     Task<bool> ResetPasswordAsync(string token, string newPassword);
        Task<bool> ValidateResetTokenAsync(string token);
    }
}
