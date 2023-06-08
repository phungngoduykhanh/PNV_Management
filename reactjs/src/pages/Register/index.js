import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock,faEnvelope,faLockOpen } from '@fortawesome/free-solid-svg-icons'

function Register () {
  
    const initFormValue = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
      };

  const [formValue, setFormValue] = useState(initFormValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("a",formValue);
  };

  return (
    <div className="container my-3 py-3">
      <h1 className="text-center">Registration</h1>
      <div className="row my-4 h-100">
        <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="form my-3">
              <input
                type="text"
                className="form-control"
                id="Name"
                name="userName"
                placeholder="User Name" 
                value={formValue.name}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faUser } style={{ color: '#ffffff'  }} className="custom-icon" />
            </div>
            <div className="form my-3">
              <span className="input-icon">
                <i className="fas fa-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                id="Email"
                name="email"
                placeholder="Email"
                value={formValue.email}
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
                value={formValue.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon icon={faLock} style={{ color: '#ffffff' }} className="custom-icon" />
            </div>
            <div className="form my-3">
              <input
                type="password"
                className="form-control"
                id="ConfirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValue.confirmPassword}
                onChange={handleChange}
              />
        
              <FontAwesomeIcon icon={faLockOpen}style={{ color: '#ffffff' }} className="custom-icon"  />
            </div>
            <div className="">
              <p>
                <i className="far fa-check-square ml-2"></i> I agree to the terms & conditions
              </p>
            </div>
            <div className="text-center">
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
    </div>
  );
};

export default Register;
