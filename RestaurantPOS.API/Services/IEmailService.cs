namespace RestaurantPOS.API.Services
{
  public interface IEmailService
    {
        Task SendPasswordResetEmailAsync(string toEmail, string userName, string resetToken);
  Task SendWelcomeEmailAsync(string toEmail, string userName);
   Task SendPasswordChangedEmailAsync(string toEmail, string userName);
    }
}
