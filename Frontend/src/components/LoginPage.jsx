import "../styles/LoginPage.css";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [response, setResponse] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setResponse({ message: 'Fill all fields' });
            setTimeout(() => setResponse(""), 2000);
            return;
        }

        try {
            const res = await axios.post('http://localhost:4000/api/accounts/login', formData);

            sessionStorage.setItem("loggedIn", `${res.data.loginStatus}`);
            sessionStorage.setItem("userID", res.data.userID);

            setResponse(res.data);
            setTimeout(() => setResponse(""), 2000);

            if (res.data.loginStatus) {
                navigate('./');
                window.location.reload();
            }

            setFormData({
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    useEffect(() => {
        if (!!sessionStorage.getItem("loggedIn")) {
            navigate('./');
        }
    }, [])

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>LogIn</h1>
            <div className="fields-wrapper">
                <div className="form-field">
                    <div className="input-label">Email</div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field">
                    <div className="input-label">Password</div>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <input className="login-btn" name="login" type="submit" value="LogIn" />
                <div className="response">
                    <span style={{ backgroundColor: response?.message ? 'red' : 'transparent' }}>
                        {response?.message}
                    </span>
                </div>

                <p className="form-footer">
                    Don't have an Account? <Link className="next-link" to="/register">SignUp</Link> here.
                </p>
            </div>
        </form>
    );
}
