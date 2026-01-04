
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import api from "../../api/api";
import { AuthContext } from "../../provider/AuthProvider";

export default function UpdateCar() {
  const { id } = useParams();
  const { user, role } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    category: "Sedan",
    rentPricePerDay: "",
    location: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || role !== "admin") {
      Swal.fire("Unauthorized", "Only admin can update cars.", "error");
      navigate("/dashboard/user");
      return;
    }

    const fetchCar = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/cars/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const car = res.data;
        setFormData({
          carName: car.carName,
          description: car.description,
          category: car.category,
          rentPricePerDay: car.rentPricePerDay,
          location: car.location,
          imageUrl: car.imageUrl,
        });
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || err.message, "error");
        navigate("/dashboard/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate, role, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/cars/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Car updated successfully", "success");
      navigate("/dashboard/admin/my-listings");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Update Car 
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-2xl shadow-lg"
      >
        <input
          type="text"
          placeholder="Car Name"
          value={formData.carName}
          onChange={(e) =>
            setFormData({ ...formData, carName: e.target.value })
          }
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 transition"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 transition resize-none"
          rows={4}
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 transition bg-white"
        >
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Luxury</option>
          <option>Electric</option>
        </select>

        <input
          type="number"
          placeholder="Rent Price per Day"
          value={formData.rentPricePerDay}
          onChange={(e) =>
            setFormData({ ...formData, rentPricePerDay: e.target.value })
          }
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 transition"
        />

        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 transition"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 transition"
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-500 transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
}
