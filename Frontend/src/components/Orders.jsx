import React, { useState } from 'react';
import OrderBox from './OrderBox';
import "../styles/Orders.css"
import axios from 'axios';
export default function Orders() {
    const [orders, setOrders] = useState([]);

    axios.post("http://localhost:4000/api/orders/getUserOrders", { userID: sessionStorage.getItem("userID") })
        .then(response => {
            setOrders(response.data)
        }
        )

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Order Date</th>
                        <th>Arrival Time</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="no-orders">No orders available</td>
                        </tr>
                    ) : (
                        orders.map((order) => (
                            <OrderBox key={order._id} item={order} />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
