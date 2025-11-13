import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import api from "../../api/api";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

export default function UpdateCar() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
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
    const fetchCar = async () => {
      try {
        const res = await api.get(`/cars/${id}`);
        const car = res.data;

        if (car.ownerEmail !== user.email) {
          Swal.fire({ icon: "error", title: "Unauthorized", text: "You cannot update this car." });
          navigate("/my-listings");
          return;
        }

        setFormData({
          carName: car.carName,
          description: car.description,
          category: car.category,
          rentPricePerDay: car.rentPricePerDay,
          location: car.location,
          imageUrl: car.imageUrl,
        });
      } catch (err) {
        Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || err.message });
        navigate("/my-listings");
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id, user.email, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.put(`/cars/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } });
      Swal.fire({ icon: "success", title: "Updated", text: "Car updated successfully" });
      navigate("/my-listings"); 
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || err.message });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Car Name" value={formData.carName} onChange={(e) => setFormData({ ...formData, carName: e.target.value })} required className="w-full border p-2 rounded" />
        <textarea placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="w-full border p-2 rounded" />
        <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border p-2 rounded">
          <option>Sedan</option>
          <option>SUV</option>
          <option>Hatchback</option>
          <option>Luxury</option>
          <option>Electric</option>
        </select>
        <input type="number" placeholder="Rent Price per Day" value={formData.rentPricePerDay} onChange={(e) => setFormData({ ...formData, rentPricePerDay: e.target.value })} required className="w-full border p-2 rounded" />
        <input type="text" placeholder="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required className="w-full border p-2 rounded" />
        <input type="text" placeholder="Image URL" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} className="w-full border p-2 rounded" />

        <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
}
