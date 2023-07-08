import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope, faLockOpen, faTimesCircle, faCheckToSlot } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
  const [exists, setExists] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
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
    // Kiểm tra xác nhận mật khẩu
    if (formData.password !== formData.confirmpassword) {
      toast.error('Xác nhận mật khẩu không đúng. Vui lòng nhập lại.');
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
          password: formData.password,
        });
        if (response.data.code === 201) {
          toast.success('Đăng ký thành công!');
          setTimeout(() => {
            window.location.href = 'http://localhost:3000/login';
          }, 1000);
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
    <div className={cx('container', 'my-3', 'py-3')}>
      <h1 className={cx('text-center')}>Registration</h1>
      <div className={cx('aTimesCircle')}>
        <FontAwesomeIcon icon={faTimesCircle} style={{ color: '#ffffff' }} />
      </div>
      <div className={cx('row', 'my-4', 'h-100')}>
        <div className={cx('col-md-4', 'col-lg-4', 'col-sm-8', 'mx-auto')}>
          <form onSubmit={handleSubmit}>
            <div className={cx('form', 'my-3')}>
              <input
                type="text"
                className={cx('form-control')}
                id="Name"
                name="username"
                placeholder="User Name"
                value={formData.username}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff' }} className={cx('custom-icon')} />
            </div>
            <div className={cx('form', 'my-3')}>
              <input
                type="email"
                className={cx('form-control')}
                id="Email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faEnvelope} style={{ color: '#ffffff' }} className={cx('custom-icon')} />
            </div>
            <div className={cx('form', 'my-3')}>
              <input
                type="password"
                className={cx('form-control')}
                id="Password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faLock} style={{ color: '#ffffff' }} className={cx('custom-icon')} />
            </div>
            <div className={cx('form', 'my-3')}>
              <input
                type="password"
                className={cx('form-control')}
                id="ConfirmPassword"
                name="confirmpassword"
                placeholder="Confirm Password"
                value={formData.confirmpassword}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faLockOpen} style={{ color: '#ffffff' }} className={cx('custom-icon')} />
            </div>
            <div className={cx('')}>
              <p>
                <FontAwesomeIcon icon={faCheckToSlot} style={{ color: '#35A6F2' }} className={cx('aCheckToSlot')} />
                <div className={cx("term")}>I agree to the terms & conditions</div>
              </p>
            </div>

            <div className={cx('')}>
              <button className={cx('my-2', 'mx-auto', 'btn', 'btn-dark', 'button')} type="submit">
                Register
              </button>
            </div>
            <div className={cx('my-3')}>
              <p>
                Already have an account? <Link to="/login" className={cx('text-decoration-underline', 'text-info')}>Login</Link>
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