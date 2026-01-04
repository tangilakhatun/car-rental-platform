
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../api/api";
import Spinner from "../../components/Spinner";
import { AuthContext } from "../../provider/AuthProvider";

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  const fetchCar = async () => {
    try {
      const res = await api.get(`/cars/${id}`);
      setCar(res.data);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!user) {
      Swal.fire("Error", "Please login first", "warning");
      navigate("/login");
      return;
    }

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
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
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
            src={car.imageUrl || car.image}
            alt={car.carName || car.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full shadow-lg">
            {car.status}
          </span>
        </div>

        <div className="p-6 space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">{car.carName || car.name}</h2>
          <p className="text-gray-600">{car.description}</p>

          {/* Booking Section */}
          {car.status.toLowerCase() === "available" && (
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
                className="bg-orange-600 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors"
              >
                Book Now
              </button>
            </div>
          )}

          {car.status.toLowerCase() !== "available" && (
            <p className="text-red-500 mt-4 font-semibold text-lg">Already Booked</p>
          )}
        </div>
      </div>
    </div>
  );
}
