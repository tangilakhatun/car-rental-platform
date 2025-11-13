import React from "react";

export default function BookingCard({ booking, onCancel }) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white flex flex-col justify-between">
      <img
        src={booking.imageUrl}
        alt={booking.carName}
        className="w-full h-48 object-cover rounded-lg mb-3"
      />
      <h3 className="text-xl font-semibold">{booking.carName}</h3>
      <p>Category: {booking.category || "Unknown"}</p>
      <p>Price: ${booking.rentPricePerDay || "N/A"}/day</p>
      <p>Status: {booking.status || "Unknown"}</p>
      <p>From: {new Date(booking.startDate).toLocaleDateString()}</p>
      <p>To: {new Date(booking.endDate).toLocaleDateString()}</p>
      <p>Provider: {booking.providerEmail || "Unknown"}</p>

      {onCancel && (
        <button
          onClick={() => onCancel(booking._id)}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel Booking
        </button>
      )}
    </div>
  );
}

