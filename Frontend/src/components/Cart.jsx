// Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartBox from './CartBox';
import OrderSummary from './OrderSummary';
import '../styles/Cart.css';
import { Link } from 'react-router-dom';

const Cart = () => {
    const userID = sessionStorage.getItem('userID');
    const [cartItems, setCartItems] = useState([]);
    const [orderItems, setOrderItems] = useState([]);

    const onCheckboxChange = (itemID, isChecked) => {
        const updatedOrderItems = orderItems.map((orderItem) => {
            if (orderItem.userID === userID) {
                const updatedCartItems = orderItem.cartItems.map((cartItem) => {
                    if (cartItem.itemID === itemID && cartItem.isChecked) {
                        return {
                            ...cartItem,
                            isChecked,
                        };
                    }
                    return cartItem;
                });

                return {
                    ...orderItem,
                    cartItems: updatedCartItems,
                    totalAmount: updatedCartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    ),
                };
            }
            return orderItem;
        });

        setOrderItems(updatedOrderItems);
    };

    const onQuantityChange = (itemID, newQuantity) => {
        const updatedOrderItems = orderItems.map((orderItem) => {
            if (orderItem.userID === userID) {
                const updatedCartItems = orderItem.cartItems.map((cartItem) => {
                    if (cartItem.itemID === itemID) {
                        return {
                            ...cartItem,
                            quantity: newQuantity,
                        };
                    }
                    return cartItem;
                });

                return {
                    ...orderItem,
                    cartItems: updatedCartItems,
                    totalAmount: updatedCartItems.reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                    ),
                };
            }
            return orderItem;
        });

        setOrderItems(updatedOrderItems);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/cart/getCartItems', { userID });
                setCartItems(response.data);
                // Initialize orderItems with cartItems
                setOrderItems([
                    {
                        userID,
                        cartItems: response.data.map((item) => ({
                            itemID: item.itemID,
                            quantity: item.quantity || 1,
                            itemImage: item.itemImage,
                            price: item.price,
                            isChecked: true,
                        })),
                        totalAmount: 0,
                        expectedTime: '',
                    },
                ]);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userID]);

    const handleRemoveCartItem = async (itemID) => {
        try {
            await axios.post('http://localhost:4000/api/cart/removeFromCart', { userID, itemID });
            setCartItems(cartItems.filter((item) => item.itemID !== itemID));
            const updatedOrderItems = orderItems.map((orderItem) => {
                if (orderItem.userID === userID) {
                    return {
                        ...orderItem,
                        cartItems: orderItem.cartItems.filter((cartItem) => cartItem.itemID !== itemID),
                        totalAmount: orderItem.cartItems.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                        ),
                    };
                }
                return orderItem;
            });
            setOrderItems(updatedOrderItems);
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    return (
        <>

            <div className="cart-container">
                {cartItems.length > 0 ? (
                    <div className="cart-items-container">
                        {cartItems.map((item) => (
                            <CartBox
                                key={item.itemID}
                                item={item}
                                onRemove={handleRemoveCartItem}
                                onCheckboxChange={onCheckboxChange}
                                onQuantityChange={onQuantityChange}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-cart">Your cart is empty.</p>
                )}
                <div className="order-summary-container">
                    <OrderSummary
                        cartItems={orderItems.find((orderItem) => orderItem.userID === userID)?.cartItems || []}
                        userID={userID}
                        onUpdateCartItems={(updatedCartItems) => {
                            const updatedOrderItems = orderItems.map((orderItem) => {
                                if (orderItem.userID === userID) {
                                    return {
                                        ...orderItem,
                                        cartItems: updatedCartItems,
                                        totalAmount: updatedCartItems.reduce(
                                            (total, item) => total + item.price * item.quantity,
                                            0
                                        ),
                                    };
                                }
                                return orderItem;
                            });
                            setOrderItems(updatedOrderItems);
                        }}
                    />
                </div>
            </div>
            <Link to="/" className="continue-shopping-btn">
                Continue Shopping
            </Link>

        </>
    );
};

export default Cart;