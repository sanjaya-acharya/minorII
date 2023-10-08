import "../styles/RegisterPage.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullname: '',
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

        if (!formData.fullname || !formData.email || !formData.password) {
            setResponse({ message: 'Fill all fields' });
            setTimeout(() => setResponse(""), 2000);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/accounts/register', formData);
            setResponse(response.data);
            setTimeout(() => setResponse(""), 2000);

            setFormData({
                fullname: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Error registering account:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="form-container">
                <h1>SignUp</h1>
                <div className="fields-wrapper">
                    <div className="form-field">
                        <div className="input-label">Full Name</div>
                        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <div className="input-label">Email</div>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                        <div className="input-label">Password</div>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                    </div>
                    <input className="signup-btn" type="submit" name="register" value="SignUp" />
                    <div className="response">
                        <span style={{ backgroundColor: response?.message ? 'red' : 'transparent' }}>
                            {response?.message}
                        </span>
                    </div>

                    <p className="form-footer">
                        Already have an Account? <Link className="next-link" to="/login">LogIn</Link> here.
                    </p>
                </div>
            </form>
        </div>
    );
}
