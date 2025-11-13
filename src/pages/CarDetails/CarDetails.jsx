
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import api from "../../api/api";
import Spinner from "../../components/Spinner";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const fetchCar = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get(`/cars/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const c = res.data;

      
      const safeCar = {
        ...c,
        carName: c.carName || c.name || "No Name",
        imageUrl: c.imageUrl || c.image || "https://via.placeholder.com/600x400?text=No+Image",
        rentPricePerDay: c.rentPricePerDay || c.rentPrice || "N/A",
        ownerEmail: c.ownerEmail || c.providerEmail || "Unknown",
      };

      setCar(safeCar);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!dates.startDate || !dates.endDate) {
      Swal.fire("Error", "Please select start and end date", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/bookings",
        { carId: car._id, ...dates },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire("Success", res.data.message, "success");
      fetchCar();
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || err.message || "Server error",
        "error"
      );
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  if (loading) return <Spinner />;
  if (!car) return <p className="text-center mt-4">Car not found</p>;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="relative w-full h-64 md:h-96">
          <img
            src={car.imageUrl}
            alt={car.carName}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
            {car.status}
          </span>
        </div>

        <div className="p-6 space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">{car.carName}</h2>
          <p className="text-gray-600">{car.description}</p>

          <div className="flex flex-wrap gap-4 mt-3">
            <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
              <strong>Category:</strong> {car.category}
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
              <strong>Price:</strong> ${car.rentPricePerDay}/day
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
              <strong>Location:</strong> {car.location}
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
              <strong>Provider:</strong> {car.ownerEmail}
            </div>
          </div>

          {car.status.toLowerCase() === "available" ? (
            <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
              <input
                type="date"
                value={dates.startDate}
                onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-blue-300"
              />
              <input
                type="date"
                value={dates.endDate}
                onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                className="border rounded-lg px-4 py-2 w-full md:w-1/2 focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleBooking}
                className="bg-orange-600  hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow  transition-colors"
              >
                Book Now
              </button>
            </div>
          ) : (
            <p className="text-red-500 mt-4 font-semibold text-lg">Already Booked</p>
          )}
        </div>
      </div>
    </div>
  );
}
