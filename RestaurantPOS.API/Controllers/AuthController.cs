using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RestaurantPOS.API.Models;
using RestaurantPOS.API.Models.DTOs;
using RestaurantPOS.API.Services;

namespace RestaurantPOS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
   private readonly IAuthService _authService;

public AuthController(IAuthService authService)
        {
    _authService = authService;
  }

        // POST: api/Auth/Login
  [HttpPost("Login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest request)
   {
       var response = await _authService.LoginAsync(request);

  if (response == null)
   {
     return Unauthorized(new { message = "Tên đăng nhập hoặc mật khẩu không đúng" });
}

    return Ok(response);
        }

 // POST: api/Auth/Register
        [HttpPost("Register")]
        public async Task<ActionResult<UserResponse>> Register([FromBody] RegisterRequest request)
 {
            var response = await _authService.RegisterAsync(request);

    if (response == null)
          {
  return BadRequest(new { message = "Tên đăng nhập hoặc email đã tồn tại" });
  }

   return Ok(response);
        }

 // GET: api/Auth/Users
      [HttpGet("Users")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<UserResponse>>> GetAllUsers()
        {
       var users = await _authService.GetAllUsersAsync();
     return Ok(users);
   }

        // GET: api/Auth/Users/5
        [HttpGet("Users/{id}")]
  [Authorize]
      public async Task<ActionResult<UserResponse>> GetUser(int id)
        {
   var user = await _authService.GetUserByIdAsync(id);
  if (user == null)
 {
       return NotFound();
    }

   return Ok(user);
 }

   // PUT: api/Auth/Users/5
        [HttpPut("Users/{id}")]
        [Authorize(Roles = "Admin")]
     public async Task<IActionResult> UpdateUser(int id, User user)
        {
     var result = await _authService.UpdateUserAsync(id, user);
     if (!result)
   {
       return NotFound();
      }

   return NoContent();
        }

        // DELETE: api/Auth/Users/5
      [HttpDelete("Users/{id}")]
 [Authorize(Roles = "Admin")]
   public async Task<IActionResult> DeleteUser(int id)
    {
  var result = await _authService.DeleteUserAsync(id);
   if (!result)
        {
     return NotFound();
        }

 return NoContent();
        }

        // POST: api/Auth/ChangePassword
 [HttpPost("ChangePassword")]
 [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
   var userId = int.Parse(User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ?? "0");
var result = await _authService.ChangePasswordAsync(userId, request.OldPassword, request.NewPassword);

  if (!result)
    {
        return BadRequest(new { message = "Mật khẩu cũ không đúng" });
   }

   return Ok(new { message = "Đổi mật khẩu thành công" });
  }

        // POST: api/Auth/ForgotPassword
   [HttpPost("ForgotPassword")]
  public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
   var result = await _authService.ForgotPasswordAsync(request.Email);
   
   // Always return success for security (don't reveal if email exists)
     return Ok(new { message = "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được link đặt lại mật khẩu." });
      }

   // POST: api/Auth/ResetPassword
 [HttpPost("ResetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
 {
    var result = await _authService.ResetPasswordAsync(request.Token, request.NewPassword);

       if (!result)
   {
     return BadRequest(new { message = "Token không hợp lệ hoặc đã hết hạn" });
   }

    return Ok(new { message = "Đặt lại mật khẩu thành công" });
 }

 // GET: api/Auth/ValidateResetToken/{token}
        [HttpGet("ValidateResetToken/{token}")]
      public async Task<IActionResult> ValidateResetToken(string token)
   {
   var isValid = await _authService.ValidateResetTokenAsync(token);
      
    if (!isValid)
{
    return BadRequest(new { message = "Token không hợp lệ hoặc đã hết hạn" });
    }

  return Ok(new { message = "Token hợp lệ" });
        }
  }

    public class ChangePasswordRequest
    {
   public string OldPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
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
}
