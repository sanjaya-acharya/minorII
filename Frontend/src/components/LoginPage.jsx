// import "../styles/LoginPage.css";
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// export default function LoginPage() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         email: '',
//         password: ''
//     });

//     const [response, setResponse] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

        // if(!!sessionStorage.getItem("userID") && !!sessionStorage.getItem("loggedIn")) {
        //     navigate('/')
        // }

//         if (!formData.email || !formData.password) {
//             setResponse({ message: 'Fill all fields' });
//             setTimeout(() => setResponse(""), 2000);
//             return;
//         }

//         try {
//             const res = await axios.post('http://localhost:4000/api/accounts/login', formData);

            
//             setResponse(res.data);
            
//             if (res.data.loginStatus) {
//                 sessionStorage.setItem('userID', '650ea44d5cc1a9050f51fe66');
//                 sessionStorage.setItem('loggedIn', true);
//                 setTimeout(() => setResponse(""), 2000);
//                 navigate('./');
//                 window.location.reload();
//             }

//             setFormData({
//                 email: '',
//                 password: ''
//             });
//         } catch (error) {
//             console.error('Error logging in:', error);
//         }
//     };

//     useEffect(() => {
//         if (!!sessionStorage.getItem("loggedIn")) {
//             navigate('./');
//         }
//     }, [])

//     return (
//         <form onSubmit={handleSubmit} className="form-container">
//             <h1>LogIn</h1>
//             <div className="fields-wrapper">
//                 <div className="form-field">
//                     <div className="input-label">Email</div>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-field">
//                     <div className="input-label">Password</div>
//                     <input
//                         type="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <input className="login-btn" name="login" type="submit" value="LogIn" />
//                 <div className="response">
//                     <span style={{ backgroundColor: response?.message ? 'red' : 'transparent' }}>
//                         {response?.message}
//                     </span>
//                 </div>

//                 <p className="form-footer">
//                     Don't have an Account? <Link className="next-link" to="/register">SignUp</Link> here.
//                 </p>
//             </div>
//         </form>
//     );
// }
// LoginPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
    if(!!sessionStorage.getItem("userID") && !!sessionStorage.getItem("loggedIn")) {
        navigate('/')
    }

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

    if (!!document.cookie.includes('loggedIn=true')) {
      navigate('/');
    }

    if (!formData.email || !formData.password) {
      setResponse({ message: 'Fill all fields' });
      setTimeout(() => setResponse(""), 2000);
      return;
    }

    try {
      const res = await axios.post('http://localhost:4000/api/accounts/login', formData);

      setResponse(res.data);

      if (res.data.loginStatus) {
        document.cookie = `userID=650ea44d5cc1a9050f51fe66; max-age=1200; path=/`; // expires in 20 minutes
        document.cookie = `loggedIn=true; max-age=1200; path=/`; // expires in 20 minutes
        document.cookie = `token=${res.data.accessToken}; max-age=1200; path=/`; // expires in 20 minutes

        sessionStorage.setItem("userID", "650ea44d5cc1a9050f51fe66")
        sessionStorage.setItem("loggedIn", true)

        setTimeout(() => setResponse(""), 2000);
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
    if (!!document.cookie.includes('loggedIn=true')) {
      navigate('./');
    }
  }, []);

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
