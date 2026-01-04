
import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import api from "../../api/api";

const AddCar = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    carName: "",
    description: "",
    category: "Sedan",
    rentPricePerDay: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.carName || !formData.description || !formData.rentPricePerDay) {
      Swal.fire("Error", "Please fill all required fields", "error");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = {
        carName: formData.carName,
        description: formData.description,
        category: formData.category,
        rentPricePerDay: formData.rentPricePerDay,
        location: formData.location,
        imageUrl: formData.imageUrl,
      };

      const res = await api.post("/cars", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire("Success", res.data.message, "success");

   
      setFormData({
        carName: "",
        description: "",
        category: "Sedan",
        rentPricePerDay: "",
        location: "",
        imageUrl: "",
      });
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Server error", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Car
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="carName"
            placeholder="Car Name"
            value={formData.carName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
            rows={3}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
            <option>Electric</option>
          </select>

          <input
            type="number"
            name="rentPricePerDay"
            placeholder="Rent Price per Day"
            value={formData.rentPricePerDay}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
          />

          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2"
          />

         
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-700"
          />
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-gray-700"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg shadow hover:bg-orange-500 transition-colors"
          >
            Add Car
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCar;
