import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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

    /*------handle form login------*/
    const [formData, setFormData] = useState({ email: '', password: '', role: '' });
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.get('http://localhost:3000/users', { params: { email: formData.email.toLowerCase() } });
            const userData = response.data[0];
            console.log(response.data[0]);

            if (userData && userData.password.toLowerCase() === formData.password.toLowerCase()) {
                const { role } = userData;

                if (role === 'admin') {
                    navigate('/admin');
                } else {
                    if (role === 'teacher') {
                        navigate('/homeTecher');
                        toast.success('Login successful');
                    } else {
                        navigate('/homeStudent');
                        toast.success('Login successful');
                    }
                }
            } else {
                toast.error('Invalid email or password');
            }
        } catch (error) {
            console.error(error);
            toast.error('Login failed. Please try again.');
        }
    };

   const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
        setFormData({ ...formData, [name]: value.toLowerCase() });
    } else {
        setFormData({ ...formData, [name]: value });
    }
    };


    return (
        <div className="container-login">
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
                        <input type="checkbox" id="Remember-me" name="Remember-me" defaultChecked />
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
