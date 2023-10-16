import React, { useState } from "react";
import CartBox from "./CartBox";
import OrderSummary from "./OrderSummary";
import "../styles/Cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
	if (!sessionStorage.getItem("userID")) {
		return <div className="not-authorised">You are not authorised. <br/>
		Click here to <Link to="/login">Login</Link>
		</div>
	}

	const [cartItems, setCartItems] = useState([
		{ cartID: "65122ac6f99a0f5f425c47e1", isIncluded: false, itemImage: "IMG-1.jpg", itemName: "Coffee1", price: 120, quantity: 1 },
		{ cartID: "65122b230655fca8f4852110", isIncluded: false, itemImage: "IMG-2.jpg", itemName: "Coffee2", price: 120, quantity: 1 },
		{ cartID: "6522981c8294ac72386e07b7", isIncluded: false, itemImage: "IMG-3.jpg", itemName: "Coffee3", price: 120, quantity: 1 },
		{ cartID: "652386bbf1c0c2f53bbb7fa6", isIncluded: false, itemImage: "IMG-4.jpg", itemName: "Coffee4", price: 120, quantity: 1 },
	]);

	const [order, setOrder] = useState({
		userID: sessionStorage.getItem("userID"),
		cartItems: [],
		totalAmount: 0,
	});

	const updateOrder = (updatedCartItems) => {
		const includedItems = updatedCartItems.filter((item) => item.isIncluded);
		const totalAmount = includedItems.reduce((total, item) => total + item.price * item.quantity, 0);

		setOrder({
			...order,
			cartItems: includedItems,
			totalAmount,
		});
	};

	const handleToggle = (cartID) => {
		const updatedCartItems = cartItems.map((item) =>
			item.cartID === cartID ? { ...item, isIncluded: !item.isIncluded } : item
		);

		setCartItems(updatedCartItems);
		updateOrder(updatedCartItems);
	};

	const handleUpdateQuantity = (cartID, newQuantity) => {
		const updatedCartItems = cartItems.map((item) =>
			item.cartID === cartID ? { ...item, quantity: newQuantity } : item
		);

		setCartItems(updatedCartItems);
		updateOrder(updatedCartItems);
	};

	const handleDelete = (cartID) => {
		const updatedCartItems = cartItems.filter((item) => item.cartID !== cartID);

		setCartItems(updatedCartItems);
		updateOrder(updatedCartItems);
	};

	const handleCheckout = () => {
		if (order.cartItems.length !== 0) {
			// Remove only the items with isIncluded equal to true from the cart
			const newCartItems = cartItems.filter((item) => !item.isIncluded);

			setCartItems(newCartItems);

			// Reset order to empty
			setOrder({
				userID: 'user619',
				cartItems: [],
				totalAmount: 0,
			});
		}
	};

return (
  <div className="cart-container">
    <div className="cart-boxes-container">
      {cartItems && cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartBox
            key={item.cartID}
            cartItem={item}
            onToggle={handleToggle}
            onUpdateQuantity={handleUpdateQuantity}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <p className="empty-cart">Your cart is empty.</p>
      )}
    </div>

    <div className="order-summary-container">
      <OrderSummary order={order} onCheckout={handleCheckout} />
    </div>
  </div>
);

};

export default Cart;
