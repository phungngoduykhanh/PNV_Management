
import './Register.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock,faEnvelope,faLockOpen } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword : '', 
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: {
          email: formData.email,
        },
      });
      const userData = response.data[0];

      if (userData && userData.password === formData.password) {
        // Đăng ký thành công
        console.log('Đăng ký thành công');
      } else {
        // Sai email hoặc mật khẩu
        console.log('Email hoặc mật khẩu không hợp lệ');
      }
    } catch (error) {
      console.error(error);
      // Lỗi khi gửi yêu cầu đến API
      console.log('Đăng ký thất bại. Vui lòng thử lại.');
    }
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
                value={formData.name}
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
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
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
    
}

export default Register;

// import React, { useState } from 'react';
// import './Register.css';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser,faLock,faEnvelope,faLockOpen } from '@fortawesome/free-solid-svg-icons'

// function Register () {
//     const initFormValue = {
//         userName: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//       };

//   const [formValue, setFormValue] = useState(initFormValue);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormValue({
//       ...formValue,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log("a",formValue);
//   };

  // return (
  //   <div className="container my-3 py-3">
  //     <h1 className="text-center">Registration</h1>
  //     <div className="row my-4 h-100">
  //       <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
  //         <form onSubmit={handleSubmit}>
  //           <div className="form my-3">
  //             <input
  //               type="text"
  //               className="form-control"
  //               id="Name"
  //               name="userName"
  //               placeholder="User Name" 
  //               value={formValue.name}
  //               onChange={handleChange}
  //             />
  //             <FontAwesomeIcon icon={faUser } style={{ color: '#ffffff'  }} className="custom-icon" />
  //           </div>
  //           <div className="form my-3">
  //             <span className="input-icon">
  //               <i className="fas fa-envelope"></i>
  //             </span>
  //             <input
  //               type="email"
  //               className="form-control"
  //               id="Email"
  //               name="email"
  //               placeholder="Email"
  //               value={formValue.email}
  //               onChange={handleChange}
  //             />
  //             <FontAwesomeIcon icon={faEnvelope } style={{ color: '#ffffff' }} className="custom-icon" />
  //           </div>
  //           <div className="form my-3">
  //             <input
  //               type="password"
  //               className="form-control"
  //               id="Password"
  //               name="password"
  //               placeholder="Password"
  //               value={formValue.password}
  //               onChange={handleChange}
  //             />
  //             <FontAwesomeIcon icon={faLock} style={{ color: '#ffffff' }} className="custom-icon" />
  //           </div>
  //           <div className="form my-3">
  //             <input
  //               type="password"
  //               className="form-control"
  //               id="ConfirmPassword"
  //               name="confirmPassword"
  //               placeholder="Confirm Password"
  //               value={formValue.confirmPassword}
  //               onChange={handleChange}
  //             />
        
  //             <FontAwesomeIcon icon={faLockOpen}style={{ color: '#ffffff' }} className="custom-icon"  />
  //           </div>
  //           <div className="">
  //             <p>
  //               <i className="far fa-check-square ml-2"></i> I agree to the terms & conditions
  //             </p>
  //           </div>
  //           <div className="text-center">
  //             <button className="my-2 mx-auto btn btn-dark" type="submit" >
  //               Register
  //             </button>
  //           </div>
  //           <div className="my-3">
  //             <p>
  //               Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link>
  //             </p>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
// };

// export default Register;
