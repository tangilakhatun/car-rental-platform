
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { getAuth } from "firebase/auth";
import api from "../../../api/api"; 
import Spinner from "../../../components/Spinner";

const COLORS = ["#4ade80", "#f87171"]; 
export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalBookings: 0,
    totalUsers: 0,
  });
  const [carAvailability, setCarAvailability] = useState([]);
  const [bookingsOverTime, setBookingsOverTime] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
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
        if (!token) {
          console.error("No Firebase token found");
          setLoading(false);
          return;
        }

        // Stats
        const statsRes = await api.get("/dashboard/stats", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

        // Car Availability
        const availRes = await api.get("/dashboard/car-availability", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCarAvailability(availRes.data);

        // Bookings Over Time
        const bookingsRes = await api.get("/dashboard/bookings-over-time", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookingsOverTime(bookingsRes.data);

        // Recent Bookings
        const recentRes = await api.get("/dashboard/recent-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRecentBookings(recentRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="text-center py-20 text-lg"><Spinner></Spinner></p>;

  return (
    <div className="space-y-12 p-6">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold mb-2">Total Cars</h3>
          <p className="text-3xl font-bold">{stats.totalCars}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold mb-2">Available Cars</h3>
          <p className="text-3xl font-bold">{stats.availableCars}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
          <p className="text-3xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Car Availability Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
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

        {/* Bookings Over Time Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-xl font-semibold mb-4 text-center">Bookings Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={bookingsOverTime.length ? bookingsOverTime : []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#4ade80" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Recent Bookings</h3>
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4">Car Name</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Start Date</th>
              <th className="py-3 px-4">End Date</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {recentBookings.length ? recentBookings.map((booking) => (
              <tr key={booking._id} className="border-b hover:bg-gray-50 transition-all">
                <td className="py-3 px-4">{booking.carName}</td>
                <td className="py-3 px-4">{booking.userName}</td>
                <td className="py-3 px-4">{new Date(booking.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{new Date(booking.endDate).toLocaleDateString()}</td>
                <td className="py-3 px-4">{booking.status || "Booked"}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
