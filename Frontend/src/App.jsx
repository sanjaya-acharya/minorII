import "./App.css";

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Profile from './components/Profile';
import Cart from './components/Cart';
import ProductDescription from './components/ProductDescription';
import Orders from './components/Orders';
import OrderDescription from './components/OrderDescription';

function App() {
    // sessionStorage.setItem('userID', '650ea44d5cc1a9050f51fe66');
    const isLoggedIn = !!sessionStorage.getItem('userID');

    return (
        <Router>
            <div>
                <nav>
                    <Link to="/">
                        <img src="http://localhost:4000/uploads/logo.png" alt="Logo" />
                    </Link>
                    <div className="right">
                        {isLoggedIn ? (
                            <>
                                <Link to="/cart">Cart</Link>
                                <Link to="/orders">Orders</Link>
                                <Link to="/profile">Profile</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                        )}
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cart" element={<Cart />} />
                    {isLoggedIn && <Route path="/profile" element={<Profile />} />}
                    <Route path="/productDescription/:itemID" element={<ProductDescription />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/orderDescription/:orderID" element={<OrderDescription />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
