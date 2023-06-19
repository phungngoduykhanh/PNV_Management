import classNames from 'classnames/bind';
import styles from './Register.module.scss.css';
const cx = classNames.bind(styles);
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock,faEnvelope,faLockOpen, faTimesCircle,faCheckToSlot} from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [exists, setExists] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword : '', 
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Kiểm tra mật khẩu có ít nhất 6 ký tự
    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    // Kiểm tra định dạng email có đuôi @gmail.com
    const emailRegex = /^[A-Z0-9._%+-]+@gmail\.com$/i;
    if (!emailRegex.test(formData.email)) {
      toast.error('Định dạng email không hợp lệ. Email phải có đuôi @gmail.com');
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/check-user', {
        params: {
          username: formData.username,
          email: formData.email,
        },
      });
      const existsData = response.data.exists;
      setExists(existsData);
      if (existsData.username || existsData.email) {
        toast.error('Username hoặc email đã tồn tại');
      } else {
        console.log('Tiếp tục xử lý đăng ký');
        const response = await axios.post('http://127.0.0.1:8000/api/register', {
          username: formData.username,
          email: formData.email,
          password:formData.password
        });
        if (response.data.code === 201) {
          toast.success('Đăng ký thành công!');
        } else {
          toast.error('Đăng ký thất bại. Vui lòng thử lại.');
        }
      }
    } catch (error) {
      console.error(error);
      console.log('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="text-center">Registration</h1>
      <div className='aTimesCircle'>
        <FontAwesomeIcon
          icon={faTimesCircle}
          style={{ color: '#ffffff' }}
        />
      </div>
      <div className="row my-4 h-100">
        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="form my-3">
              <input
                type="text"
                className="form-control"
                id="Name"
                name="username"
                placeholder="User Name" 
                value={formData.username}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faUser } style={{ color: '#ffffff'  }} className="custom-icon" />
            </div>
            <div className="form my-3">
              <input
                type="email"
                className="form-control"
                id="Email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faEnvelope } style={{ color: '#ffffff' }} className="custom-icon" />
            </div>
            <div className="form my-3">
              <input
                type="password"
                className="form-control"
                id="Password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faLock} style={{ color: '#ffffff' }} className="custom-icon" />
            </div>
            <div className="form my-3">
              <input
                type="password"
                className="form-control"
                id="ConfirmPassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faLockOpen}style={{ color: '#ffffff' }} className="custom-icon"  />
            </div>
            <div className="">
              <p>
                <FontAwesomeIcon icon={faCheckToSlot} style={{ color: '#35A6F2 ' }}  className="aCheckToSlot" />
                <div>I agree to the terms & conditions</div>
              </p>
             
            </div>

            <div className="">
              <button className="my-2 mx-auto btn btn-dark" type="submit" >
                Register
              </button>
            </div>
            <div className="my-3">
              <p>
                Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );   
}

export default Register;
