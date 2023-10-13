import React, { useState } from "react";

const CartBox = ({ cartItem, onToggle, onUpdateQuantity, onDelete }) => {
  const { cartID, isIncluded, itemImage, itemName, price } = cartItem;
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (newQuantity) => {
    newQuantity = newQuantity === "" ? 1 : parseInt(newQuantity, 10);

    if (isNaN(newQuantity) || newQuantity < 1) {
      newQuantity = 1;
    } else if (newQuantity > 20) {
      newQuantity = 20;
    }

    setQuantity(newQuantity);
    onUpdateQuantity(cartID, newQuantity);
  };
  return (
    <div className="cart-box">
      <input
        type="checkbox"
        name="isincluded"
        checked={isIncluded}
        onChange={() => onToggle(cartID)}
      />
      <img src={`http://localhost:4000/uploads/${itemImage}`} alt={itemName} width="80" height="80" />
      <p>{itemName}</p>
      <p>Rs. {price}</p>
      <div className="quantity-wrapper">
        <button onClick={() => handleQuantityChange(quantity - 1)}>-</button>
        <input
          type="number"
          name="quantity"
          value={quantity}
          min="1"
          max="20"
          onChange={(e) => handleQuantityChange(e.target.value)}
        />
        <button onClick={() => handleQuantityChange(quantity + 1)}>+</button>
      </div>
      <button className="delete-btn" onClick={() => onDelete(cartID)}>
        Delete
      </button>
    </div>
  );
};

export default CartBox;
