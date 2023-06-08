const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.post('/api/forgotpassword', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Cấu hình transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  const verificationCode = generateVerificationCode();
  const mailOptions = {
    from: 'loanthi3703@gmail.com',
    to: email,
    subject: 'Reset Password',
    text: `Bạn đã yêu cầu khôi phục mật khẩu. Mã xác nhận của bạn là: ${verificationCode}`
  };

  // Gửi email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Failed to send reset password email' });
    }

    console.log('Reset password email sent: ' + info.response);
    res.status(200).json({ message: 'Reset password email has been sent' });
  });

  // Hàm tạo mã xác nhận ngẫu nhiên
  function generateVerificationCode() {
    const min = 1000;
    const max = 9999; 
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
});

// Khởi chạy server
const port = 3001; // Có thể thay đổi thành cổng bạn muốn sử dụng
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});