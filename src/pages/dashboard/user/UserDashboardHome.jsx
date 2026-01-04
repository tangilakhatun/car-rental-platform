import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getAuth } from "firebase/auth";
import Spinner from "../../../components/Spinner"
const COLORS = ["#4ade80", "#f87171"]; // Available = green, Booked = red

export default function UserDashboardHome() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    myBookings: 0,
    totalCars: 0,
  });
  const [carAvailability, setCarAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firebase token fetch
  const fetchToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    const token = await user.getIdToken();
    return token;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await fetchToken();
        if (!token) return console.error("No Firebase token found");

        const statsRes = await api.get("/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const availRes = await api.get("/dashboard/car-availability", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myBookingsRes = await api.get("/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStats({
          totalBookings: statsRes.data.totalBookings,
          myBookings: myBookingsRes.data.length,
          totalCars: statsRes.data.totalCars,
        });

        setCarAvailability(availRes.data);

      } catch (err) {
        console.error("User Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center py-20 text-lg"><Spinner></Spinner></p>;

  return (
    <div className="p-6 space-y-12 bg-gray-50 min-h-screen">

      {/* Welcome Message */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Here’s a quick summary of your bookings and cars</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer text-center">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">My Bookings</h3>
          <p className="text-3xl font-bold text-red-500">{stats.myBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer text-center">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Total Booked Cars</h3>
          <p className="text-3xl font-bold text-green-500">{stats.totalBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition cursor-pointer text-center">
          <h3 className="text-lg font-semibold text-gray-500 mb-2">Total Cars</h3>
          <p className="text-3xl font-bold text-orange-600">{stats.totalCars}</p>
        </div>
      </div>

      {/* Car Availability Pie Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4 text-center">Car Availability</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={carAvailability.length ? carAvailability : [
                { name: "Available", value: 0 },
                { name: "Booked", value: 0 }
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {carAvailability.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} Cars`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
