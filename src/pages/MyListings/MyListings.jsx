
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
              {/* Overlay Update/Delete Buttons */}
              <div className="absolute top-2 left-2 flex flex-col gap-2 bg-white/80 backdrop-blur-sm p-1 rounded shadow-md">
                <button
                  type="button"
                  onClick={() => navigate(`/dashboard/admin/update/${car._id}`)}
                  className="flex items-center gap-1 text-orange-600 font-semibold px-2 py-1 rounded hover:bg-orange-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z"
                    />
                  </svg>
                  Update
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(car._id)}
                  className="flex items-center gap-1 text-orange-600 font-semibold px-2 py-1 rounded  transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
