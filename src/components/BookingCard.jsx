
import React from "react";

export default function BookingCard({ booking, onCancel }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col md:flex-row justify-between items-center mb-4">
      <div className="flex-1">
       <img 
  src={booking.image} 
  alt={booking.carName} 
/>
        <h3 className="text-xl font-semibold">{booking.carName}</h3>
        <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
        <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
        <p>Provider: {booking.providerEmail}</p>
      </div>
      <button
        onClick={() => onCancel(booking._id)}
        className="mt-2 md:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Cancel Booking
      </button>
    </div>
  );
}
