import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OrderBox({ item }) {
    const navigate = useNavigate();

    const handleViewOrder = () => {
        navigate(`/orderDescription/${item._id}`);
    };

    return (
        <tr>
            <td>{item._id}</td>
            <td>{item.orderDate}</td>
            <td>{item.expectedTime}</td>
            <td>{item.totalAmount}</td>
            <td>{item.status}</td>
            <td>
                <button onClick={handleViewOrder}>View Order</button>
            </td>
        </tr>
    );
};
