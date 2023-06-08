import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css'; // Import file CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isCodeSent) {
        // Gửi yêu cầu cập nhật mật khẩu mới đến API
        const response = await axios.post('http://localhost:3001/api/resetpassword', { email, verificationCode, newPassword });
        console.log(response.data);
        alert(response.data.message);
      } else {
        // Gửi yêu cầu khôi phục mật khẩu đến API
        const response = await axios.post('http://localhost:3001/api/forgotpassword', { email });
        console.log(response.data);
        alert(response.data.message);
        setIsCodeSent(true);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to send reset password email');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="forgot-password-title">Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label className="forgot-password-label">
          Email:
          <input type="email" value={email} onChange={handleEmailChange} className="forgot-password-input" />
        </label>
        {isCodeSent ? (
          <>
            <label className="forgot-password-label">
              Verification Code:
              <input type="text" value={verificationCode} onChange={handleVerificationCodeChange} className="forgot-password-input" />
            </label>
            <label className="forgot-password-label">
              New Password:
              <input type="password" value={newPassword} onChange={handleNewPasswordChange} className="forgot-password-input" />
            </label>
          </>
        ) : null}
        <button type="submit" className="forgot-password-button">
          {isCodeSent ? 'Reset Password' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;