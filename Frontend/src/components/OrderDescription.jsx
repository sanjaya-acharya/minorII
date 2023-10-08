import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/OrderDescription.css";
import { useParams } from 'react-router-dom';

export default function OrderDescription() {
    const { orderID } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.post('http://localhost:4000/api/orders/getOrder', { orderID });
                setOrderDetails(response.data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderID]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="order-desc-container">
            <h2>Order Details</h2>
            <div>
                <strong>Order ID:</strong> {orderDetails._id}
            </div>
            <div>
                <strong>Order Date:</strong> {orderDetails.orderDate}
            </div>
            <div>
                <strong>Arrival Time:</strong> {orderDetails.expectedTime}
            </div>
            <div>
                <strong>Amount:</strong> {orderDetails.totalAmount}
            </div>
            <div>
                <strong>Status:</strong> {orderDetails.status}
            </div>
        </div>
    );
}
