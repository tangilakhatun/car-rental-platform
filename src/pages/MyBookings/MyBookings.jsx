import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../api/api";
import Spinner from "../../components/Spinner";
import BookingCard from "../../components/BookingCard";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", err.response?.data?.message || err.message || "Server error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        const token = localStorage.getItem("token");
        await api.delete(`/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBookings((prev) => prev.filter((b) => b._id !== id));

        Swal.fire("Cancelled!", "Booking has been cancelled.", "success");
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.message || err.message || "Server error",
          "error"
        );
      }
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500 italic">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <BookingCard key={b._id} booking={b} onCancel={handleCancel} />
          ))}
        </div>
      )}
    </div>
  );
}
