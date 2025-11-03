using System.Net;
using System.Net.Mail;

namespace RestaurantPOS.API.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
   private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
      _configuration = configuration;
      _logger = logger;
   }

 public async Task SendPasswordResetEmailAsync(string toEmail, string userName, string resetToken)
 {
var resetLink = $"{_configuration["AppSettings:ClientUrl"]}/reset-password?token={resetToken}";
    
   var subject = "Đặt lại mật khẩu - Restaurant POS";
   var body = $@"
                <html>
        <head>
    <style>
  body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                 .header {{ background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
         .content {{ background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }}
     .button {{ display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }}
        .footer {{ text-align: center; margin-top: 20px; font-size: 12px; color: #666; }}
     .warning {{ background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }}
              </style>
    </head>
       <body>
            <div class='container'>
           <div class='header'>
<h1>🍽️ Restaurant POS</h1>
       <h2>Đặt lại mật khẩu</h2>
     </div>
        <div class='content'>
          <p>Xin chào <strong>{userName}</strong>,</p>
        <p>Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
             <p>Nhấn vào nút bên dưới để đặt lại mật khẩu:</p>
     <p style='text-align: center;'>
  <a href='{resetLink}' class='button'>Đặt lại mật khẩu</a>
       </p>
   <div class='warning'>
       <strong>⚠️ Lưu ý:</strong>
         <ul>
       <li>Link này chỉ có hiệu lực trong <strong>1 giờ</strong></li>
  <li>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này</li>
           <li>Không chia sẻ link này với bất kỳ ai</li>
         </ul>
   </div>
         <p>Hoặc copy link sau vào trình duyệt:</p>
          <p style='word-break: break-all; background: #fff; padding: 10px; border: 1px solid #ddd;'>{resetLink}</p>
       </div>
                 <div class='footer'>
           <p>Email này được gửi tự động, vui lòng không trả lời.</p>
          <p>&copy; 2025 Restaurant POS System. All rights reserved.</p>
  </div>
          </div>
            </body>
    </html>";

        await SendEmailAsync(toEmail, subject, body);
  }

  public async Task SendWelcomeEmailAsync(string toEmail, string userName)
        {
       var subject = "Chào mừng đến với Restaurant POS";
       var body = $@"
          <html>
                <body style='font-family: Arial, sans-serif;'>
    <h2>Xin chào {userName}!</h2>
  <p>Chào mừng bạn đến với hệ thống Restaurant POS.</p>
              <p>Tài khoản của bạn đã được tạo thành công.</p>
                 <p>Bạn có thể đăng nhập tại: {_configuration["AppSettings:ClientUrl"]}/login</p>
       <br/>
   <p>Trân trọng,</p>
     <p>Restaurant POS Team</p>
              </body>
        </html>";

   await SendEmailAsync(toEmail, subject, body);
      }

        public async Task SendPasswordChangedEmailAsync(string toEmail, string userName)
  {
       var subject = "Mật khẩu đã được thay đổi - Restaurant POS";
      var body = $@"
       <html>
                <body style='font-family: Arial, sans-serif;'>
      <h2>Xin chào {userName}!</h2>
 <p>Mật khẩu của bạn đã được thay đổi thành công.</p>
   <p>Nếu bạn không thực hiện thay đổi này, vui lòng liên hệ với chúng tôi ngay lập tức.</p>
        <br/>
 <p>Trân trọng,</p>
       <p>Restaurant POS Team</p>
     </body>
 </html>";

  await SendEmailAsync(toEmail, subject, body);
        }

        private async Task SendEmailAsync(string toEmail, string subject, string body)
        {
   try
      {
   var smtpSettings = _configuration.GetSection("EmailSettings");
           var fromEmail = smtpSettings["FromEmail"];
    var fromName = smtpSettings["FromName"];
      var smtpHost = smtpSettings["SmtpHost"];
 var smtpPort = int.Parse(smtpSettings["SmtpPort"] ?? "587");
          var smtpUser = smtpSettings["SmtpUser"];
     var smtpPassword = smtpSettings["SmtpPassword"];
        var enableSsl = bool.Parse(smtpSettings["EnableSsl"] ?? "true");

             using var message = new MailMessage();
   message.From = new MailAddress(fromEmail!, fromName);
     message.To.Add(new MailAddress(toEmail));
    message.Subject = subject;
         message.Body = body;
    message.IsBodyHtml = true;

       using var smtpClient = new SmtpClient(smtpHost, smtpPort);
          smtpClient.EnableSsl = enableSsl;
   smtpClient.Credentials = new NetworkCredential(smtpUser, smtpPassword);

     await smtpClient.SendMailAsync(message);
     
       _logger.LogInformation($"Email sent successfully to {toEmail}");
            }
         catch (Exception ex)
    {
        _logger.LogError(ex, $"Error sending email to {toEmail}");
           throw;
            }
 }
    }
}
