import React from 'react';

const BookingDetails = ({ booking, handleChildClick }) => {
  return (
    <div className="booking-box">
      <div>{booking.name}</div>
      <div>{booking.contact}</div>
      <div className="right">
        <button className="primary" onClick={() => handleChildClick("Workshop staffs have been notified")}>
          Notify Workshop
        </button>
        <button className="danger" onClick={() => handleChildClick("Marked as service received")}>
          Service Received
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
