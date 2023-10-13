import React from "react";
import axios from "axios";

const OrderSummary = ({ order, onCheckout }) => {
  const handleCheckout = () => {
    const selectedCartItems = order.cartItems.filter(cartItem => cartItem.isIncluded);

    if (selectedCartItems.length > 0) {
      const transformedOrder = {
        emailID: "nishantapaudel9@gmail.com",
        cartItems: selectedCartItems,
        totalAmount: order.totalAmount,
      };

      console.log(transformedOrder);
      axios.post("http://localhost:4000/api/orders/makeOrder", transformedOrder).then(()=>{console.log("order made")})


      // Assuming newCartItems is defined elsewhere in your component
      onCheckout(transformedOrder);
    }
  };

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <div>Total amount = Rs. {order.totalAmount}</div>
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
