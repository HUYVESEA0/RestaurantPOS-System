import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await authService.forgotPassword(email);
      setSuccess(true);
      setMessage('Nếu email tồn tại trong hệ thống, bạn sẽ nhận được link đặt lại mật khẩu trong vài phút.');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
  <div className="forgot-password-header">
          <h1>🍽️ Restaurant POS</h1>
          <h2>Quên mật khẩu</h2>
       <p>Nhập email để nhận link đặt lại mật khẩu</p>
        </div>

     {success ? (
          <div className="success-message">
      <div className="success-icon">✓</div>
   <h3>Email đã được gửi!</h3>
    <p>{message}</p>
       <p className="check-email">
    📧 Vui lòng kiểm tra hộp thư của bạn (và cả thư mục spam)
       </p>
 <Link to="/login" className="btn-back-to-login">
       ← Quay lại đăng nhập
   </Link>
          </div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}
 {message && <div className="info-message">{message}</div>}

       <form onSubmit={handleSubmit} className="forgot-password-form">
     <div className="form-group">
       <label htmlFor="email">Email</label>
     <input
             type="email"
       id="email"
                value={email}
    onChange={(e) => setEmail(e.target.value)}
      placeholder="Nhập email của bạn"
          required
     autoFocus
      />
       </div>

    <button type="submit" className="btn-submit" disabled={loading}>
 {loading ? 'Đang gửi...' : 'Gửi link đặt lại mật khẩu'}
     </button>
  </form>

       <div className="forgot-password-footer">
              <p>
       Nhớ mật khẩu? <Link to="/login">Đăng nhập</Link>
         </p>
  <p>
           Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
       </p>
   </div>
          </>
        )}
  </div>
    </div>
  );
};

export default ForgotPassword;
