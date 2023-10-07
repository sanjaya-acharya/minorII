// OrderSummary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/OrderSummary.css';

const OrderSummary = ({ cartItems, userID, onUpdateCartItems }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [expectedTime, setExpectedTime] = useState('');

    useEffect(() => {
        const newTotalAmount = cartItems.reduce(
            (acc, item) => acc + (item.isChecked ? item.price * item.quantity : 0),
            0
        );
        setTotalAmount(newTotalAmount);
    }, [cartItems]);

    const handleExpectedTimeChange = (event) => {
        setExpectedTime(event.target.value);
    };

    const handleCheckout = async () => {
        const requestBody = { userID, cartItems, totalAmount, expectedTime };

        try {
            await axios.post('http://localhost:4000/api/orders/makeOrder', requestBody);
            onUpdateCartItems([]);
        } catch (error) {
            console.error('Error making order:', error);
        }
    };

    console.log(totalAmount)
    return (
        <div className="order-summary-container">
            <div>Total Amount: Rs. {totalAmount}</div>
            <div>Arrival time in shop</div>
            <input
                type="datetime-local"
                value={expectedTime}
                onChange={handleExpectedTimeChange}
            />
            <button onClick={handleCheckout}>Checkout</button>
        </div>
    );
};

export default OrderSummary;
