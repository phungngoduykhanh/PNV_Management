import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faL } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

    /*----- handle Show/hide password*/
    const [pwShown, setPwShown] = useState(false);

    const togglePasswordVisibility = () => {
        setPwShown(!pwShown);
    };

    /*------hadle form login------*/
    const [formData, setFormData] = useState({ email: '', password: ''});
    const navigate = useNavigate();
    
    console.log(formData);

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users', { params: { email: formData.email } });
            const userData = response.data[0];

            if (userData && userData.password === formData.password) {
                const { role } = userData;

                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/home');
                    toast.success('Login successful');
                }
            } else {
                toast.error('Invalid email or password');
            }
            if (rmbAccount) {
                localStorage.setItem('email', formData.email );
                localStorage.setItem('password',formData.password );
                localStorage.setItem('checked', rmbAccount);
            }else{
                localStorage.removeItem('email');
                localStorage.removeItem('password');
                localStorage.removeItem('checked');
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please try again.');
        }
    };



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // remember account
    const [rmbAccount, setRmbAccount] = useState(false);

    useEffect(() => {
        const storedEmail = localStorage.getItem('email');
        const storedPassword = localStorage.getItem('password');
        const storedChecked = localStorage.getItem('checked');

        if (storedEmail && storedPassword && storedChecked) {
            setFormData({
                email: storedEmail,
                password:storedPassword
            })
          setRmbAccount(storedChecked);
        }
      }, []);

    const handleRmbAccountChange=()=>{
        setRmbAccount(!rmbAccount);
    };

    return (
        <div className="container">
            <div className="login-form">
                <div className="login-icon">
                    <i className="fa-sharp fa-solid fa-xmark" />
                </div>
                <div className="login-title">Login</div>
                <div className="login-input-parts">
                    <div className="input-container">
                        <span> <i className="fas fa-envelope" /></span>
                        <input
                            className="login-input"
                            placeholder="Email"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-container">
                        <input
                            id="pwd"
                            type={pwShown ? 'text' : 'password'}
                            className="login-input"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        <span onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={pwShown ? faEye : faEyeSlash} id="eye" />
                        </span>
                    </div>

                    <input className="login-input button" type="button" defaultValue="Log In" onClick={handleLogin} />
                </div>
                <div className="login-bottom">
                    <div className="login-remember">
                        <input type="checkbox" id="Remember-me" name="Remember-me" checked={rmbAccount} onChange={handleRmbAccountChange}/>
                        Remember me
                    </div>
                    <div className="login-forgot">Forgot password?</div>
                </div>
                <div className="login-signup">
                    Don't have an account? <a href="#">Register</a>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;