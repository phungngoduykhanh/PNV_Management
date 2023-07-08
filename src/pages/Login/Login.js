import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { NavLink } from 'react-router-dom';
const cx = classNames.bind(styles);

const Login = () => {
  const [pwShown, setPwShown] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [rmbAccount, setRmbAccount] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    const storedChecked = localStorage.getItem('checked');

    if (storedEmail && storedPassword && storedChecked) {
      setFormData({
        email: storedEmail,
        password: storedPassword,
      });
      setRmbAccount(storedChecked);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setPwShown(!pwShown);
  };


  const handleLogin = async (event) => {
    event.preventDefault();

    if (rmbAccount) {
      localStorage.setItem('email', formData.email);
      localStorage.setItem('password', formData.password);
      localStorage.setItem('checked', rmbAccount);
    } else {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('checked');
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: formData.email,
        password: formData.password,
      });
      const token = response.data.data.token;
      localStorage.setItem('token', token);

      // Check the user's role
      const roleResponse = await axios.get('http://127.0.0.1:8000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const role = roleResponse.data.role;

      console.log("role", role);

      toast.success('Login success');
      setTimeout(() => {
        if (role === 'admin') {
          window.location.href = 'http://localhost:3000/admin';
        } else {
          window.location.href = 'http://localhost:3000/';
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('Login failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRmbAccountChange = () => {
    setRmbAccount(!rmbAccount);
  };

  return (
    <>
      <div className={cx('container')}>
        <div className={cx('login-form')}>
          <div className={cx('login-icon')}>
            <i className={cx('fa-sharp fa-solid fa-xmark')} />
          </div>
          <div className={cx('login-title')}>Login</div>
          <div className={cx('login-input-parts')}>
            <div className={cx('input-container')}>
              <span> <i className={cx('fas fa-envelope')} /></span>
              <input
                className={cx('login-input')}
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={cx('input-container')}>
              <input
                id="pwd"
                type={pwShown ? 'text' : 'password'}
                className={cx('login-input')}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <span onClick={togglePasswordVisibility}>
                <FontAwesomeIcon icon={pwShown ? faEye : faEyeSlash} id="eye" />
              </span>
            </div>

            <input className={cx('login-input', 'button')} type="button" value="Log In" onClick={handleLogin} />
          </div>
          <div className={cx('login-bottom')}>
            <div className={cx('login-remember')}>
              <input type="checkbox" id="Remember-me" name="Remember-me" checked={rmbAccount} onChange={handleRmbAccountChange} />
              Remember me
            </div>
            <div className={cx('login-forgot')}>Forgot password?</div>
          </div>
          <div className={cx('login-signup')}>
            Don't have an account? <NavLink to="http://localhost:3000/register">Register</NavLink>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
