import React from "react";

export default function BookingCard({ booking, onCancel }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col justify-between transition-transform hover:scale-105 duration-300">
      {/* Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={booking.imageUrl}
          alt={booking.carName}
          className="w-full h-full object-cover rounded-t-2xl"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-gray-800">{booking.carName}</h3>
        <p className="text-gray-600">Category: {booking.category || "Unknown"}</p>
        <p className="text-gray-600">Price: ${booking.rentPricePerDay || "N/A"}/day</p>
        <p className="text-gray-600">Status: <span className="font-semibold text-orange-600">{booking.status || "Unknown"}</span></p>
        <p className="text-gray-600">From: {new Date(booking.startDate).toLocaleDateString()}</p>
        <p className="text-gray-600">To: {new Date(booking.endDate).toLocaleDateString()}</p>
        <p className="text-gray-600">Provider: {booking.providerEmail || "Unknown"}</p>

        {/* Cancel Button */}
        {onCancel && (
          <button
            onClick={() => onCancel(booking._id)}
            className="mt-4 w-full py-2 rounded-xl bg-orange-600 text-white font-semibold hover:bg-ornage-500 transition"
          >
            Cancel Booking
          </button>
        )}
      </div>
    </div>
  );
}


