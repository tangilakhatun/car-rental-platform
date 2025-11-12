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
      setCar(res.data);
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
    <div className="container mx-auto p-4 max-w-xl">
      <img
        src={car.image}
        alt={car.name}
        className="w-full rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{car.carName}</h2>
      <p>{car.description}</p>
      <p>Type: {car.category}</p>
      <p>Price: ${car.rentPricePerDay}/day</p>
      <p>Status: {car.status}</p>
      <p>Location: {car.location}</p>
      <p>Provider: {car.ownerEmail}</p>

      {car.status.toLowerCase() === "available" ? (
        <div className="mt-4 space-y-2">
          <input
            type="date"
            value={dates.startDate}
            onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          />
          <input
            type="date"
            value={dates.endDate}
            onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
            className="border rounded px-3 py-2 w-full"
          />
          <button
            onClick={handleBooking}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Book Now
          </button>
        </div>
      ) : (
        <p className="text-red-500 mt-2 font-semibold">Already Booked</p>
      )}
    </div>
  );
}
