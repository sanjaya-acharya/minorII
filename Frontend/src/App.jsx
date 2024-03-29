import "./App.css";

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './components/Homepage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Favorites from './components/Favorites';
import ProductDescription from './components/ProductDescription';
import Orders from './components/Orders';
import OrderDescription from './components/OrderDescription';

function App() {
    const [navbarState, setNavbarState] = useState(false);

    const isLoggedIn = (
        !!sessionStorage.getItem('userID') &&
        sessionStorage.getItem('loggedIn') == 'true'
    );

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
                                <Link to="/favorites">My Favorites</Link>
                                <Link to="/profile" onClick={() => setNavbarState(false)}>
                                    Logout
                                </Link>
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
                    <Route path="/login" element={<LoginPage setNavbarState={setNavbarState} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />
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
