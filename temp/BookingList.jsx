import React from 'react';
import BookingDetails from './BookingDetails';
import { useState, useEffect } from 'react';
import "./styles/BookingDetails.css";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [msg, setMsg] = useState("")

    const handleChildClick = (msg) => {
        setMsg(msg);

        setTimeout(() => {
            setMsg("");
        }, 2000);
    }

    useEffect(() => {
        setBookings([
            { _id: 1, name: "Workshop1", contact: 12345 },
            { _id: 2, name: "Workshop2", contact: 12345 },
            { _id: 3, name: "Workshop3", contact: 12345 },
            { _id: 4, name: "Workshop4", contact: 12345 },
        ]);
    }, []);

    return (
        <div className="bookings-container">
            <h2>Booking List</h2>
            {bookings.map((booking) => (
                <BookingDetails key={booking._id} booking={booking} handleChildClick={handleChildClick} />
            ))}
            <div className="msg">{msg}</div>
        </div>
    );
};

export default BookingList;
