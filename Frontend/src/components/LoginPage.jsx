// Import the necessary dependencies

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ navbarState, setNavbarState }) => {
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

      setResponse(res.data);

      if (res.data.loginStatus) {
        // Set session storage for authentication
        sessionStorage.setItem("userID", "650ea44d5cc1a9050f51fe66");
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("token", res.data.accessToken);

        // Log the access token to the console
        alert(`Access Token: ${res.data.accessToken}`);

        // Check if setNavbarState is a function before calling it
        if (typeof setNavbarState === 'function') {
          // Update navbar state
          setNavbarState(true);
        }

        setTimeout(() => {
          setResponse("");
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  useEffect(() => {
    // Check if user is already logged in using sessionStorage
    if (!!sessionStorage.getItem("userID") && !!sessionStorage.getItem("loggedIn")) {
      navigate('/');
    }
  }, [navigate]);

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

export default LoginPage;
