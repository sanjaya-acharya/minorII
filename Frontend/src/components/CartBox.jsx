// CartBox.js
import React, { useState } from 'react';
import '../styles/CartBox.css';

const CartBox = ({ item, onRemove, onCheckboxChange, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(1);
    const [isBoxChecked, setIsChecked] = useState(false);

    const handleQuantityChange = (change) => {
        const newQuantity = Math.min(20, Math.max(1, quantity + change));
        setQuantity(newQuantity);
        onQuantityChange(item.itemID, newQuantity);
    };

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        setIsChecked(isChecked);
        onCheckboxChange(item.itemID, isChecked);
    };

    return (
        <div className="cart-box-container">
            <input value={isBoxChecked} type="checkbox" onChange={handleCheckboxChange} />
            <img src={`http://localhost:4000/uploads/${item.itemImage}`} alt={item.name} />
            <div>{item.name}</div>
            <div>Rs. {item.price}</div>
            <div>
                <button className="left-50" onClick={() => handleQuantityChange(-1)}>
                    -
                </button>
                <span className="quantity-box">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
            </div>
            <button className="remove-button" onClick={() => onRemove(item.itemID)}>
                Remove
            </button>
        </div>
    );
};

export default CartBox;