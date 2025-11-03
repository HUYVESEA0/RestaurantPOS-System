import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import './ResetPassword.css';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validating, setValidating] = useState(true);
  const [tokenValid, setTokenValid] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    validateToken();
  }, [token]);

  const validateToken = async () => {
    if (!token) {
      setError('Token không hợp lệ');
      setValidating(false);
      return;
    }

    try {
    await authService.validateResetToken(token);
      setTokenValid(true);
    } catch (err) {
      setError('Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn');
      setTokenValid(false);
    } finally {
      setValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
  return;
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(token!, password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  if (validating) {
    return (
      <div className="reset-password-container">
 <div className="reset-password-card">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Đang xác thực...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tokenValid && !validating) {
  return (
 <div className="reset-password-container">
        <div className="reset-password-card">
          <div className="error-state">
            <div className="error-icon">✗</div>
            <h2>Link không hợp lệ</h2>
            <p>{error || 'Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.'}</p>
 <Link to="/forgot-password" className="btn-try-again">
      Yêu cầu link mới
            </Link>
            <Link to="/login" className="btn-back-link">
← Quay lại đăng nhập
  </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h1>🍽️ Restaurant POS</h1>
     <h2>Đặt lại mật khẩu</h2>
          <p>Nhập mật khẩu mới cho tài khoản của bạn</p>
        </div>

      {success ? (
          <div className="success-message">
   <div className="success-icon">✓</div>
      <h3>Đặt lại mật khẩu thành công!</h3>
            <p>Mật khẩu của bạn đã được cập nhật.</p>
       <p>Đang chuyển hướng đến trang đăng nhập...</p>
       </div>
      ) : (
        <>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="reset-password-form">
        <div className="form-group">
                <label htmlFor="password">Mật khẩu mới *</label>
        <input
         type="password"
       id="password"
  value={password}
      onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
      required
            autoFocus
         />
       </div>

              <div className="form-group">
 <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
       <input
       type="password"
        id="confirmPassword"
        value={confirmPassword}
         onChange={(e) => setConfirmPassword(e.target.value)}
       placeholder="Nhập lại mật khẩu mới"
required
       />
         </div>

       <button type="submit" className="btn-submit" disabled={loading}>
    {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
              </button>
         </form>

            <div className="reset-password-footer">
       <p>
        <Link to="/login">← Quay lại đăng nhập</Link>
           </p>
</div>
        </>
 )}
      </div>
    </div>
  );
};

export default ResetPassword;
