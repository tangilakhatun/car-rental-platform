
import React, { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import api from "../../api/api";
import Spinner from "../../components/Spinner";
import CarCard from "../../components/CarCard";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";

export default function MyListings() {
  const { user } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchMyCars = async () => {
    try {
      const res = await api.get("/cars");
      if (user?.email) {
        const myCars = res.data.filter((car) => car.ownerEmail === user.email);
        setCars(myCars);
      } else setCars([]);
    } catch (err) {
      console.error(err);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: err.response?.data?.message || err.message || "Failed to fetch cars",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "You must be logged in to see your listings",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      setLoading(false);
      return;
    }
    fetchMyCars();
  }, [user]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete this car?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await api.delete(`/cars/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCars((prev) => prev.filter((car) => car._id !== id));
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Car deleted successfully",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          });
        } catch (err) {
          Swal.fire({
            toast: true,
            position: "top-end",
            icon: "error",
            title: err.response?.data?.message || err.message || "Server error",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Listings</h2>
      {cars.length === 0 ? (
        <p>No cars listed yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car._id} className="relative">
              <CarCard car={{ name: car.carName, image: car.imageUrl, ...car }} />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/update/${car._id}`)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(car._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
