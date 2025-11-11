import React from "react";

import { Link } from "react-router";

const CarCard = ({ car }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group">
      
    
      <span
        className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full shadow-sm select-none pointer-events-none ${
          car.status === "available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {car.status === "available" ? "Available" : "Booked"}
      </span>

     
      <div className="overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-52 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-5 space-y-2 text-gray-700">
        <h3 className="text-2xl font-bold text-gray-800 truncate">{car.name}</h3>
        <p className="text-sm">
          <span className="font-semibold">Type:</span> {car.category}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Rent Price:</span> ${car.rentPrice}/day
        </p>
        <p className="text-sm">
          <span className="font-semibold">Provider:</span> {car.providerEmail}
        </p>
        <p className="text-sm">
          <span className="font-semibold">Location:</span> {car.location || "N/A"}
        </p>

       
        <Link
          to={`/cars/${car._id}`}
          className="block text-center bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-500 transition mt-3"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
