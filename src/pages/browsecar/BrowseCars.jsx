import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import CarCard from '../../components/CarCard';
import api from '../../api/api';
import { Search } from 'lucide-react';

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    try {
      const res = await api.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Filter cars based on multiple fields and case-insensitive
  const filteredCars = cars.filter((car) => {
    const query = search.toLowerCase();
    return (
      (car.carName || "").toLowerCase().includes(query) ||
      (car.category || "").toLowerCase().includes(query) ||
      (car.description || "").toLowerCase().includes(query) ||
      (car.location || "").toLowerCase().includes(query)
    );
  });

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Cars</h2>

      {/* Search Input */}
      <div className="relative w-full md:w-1/2 mb-4">
        <input
          type="text"
          placeholder="Search by name, category, location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full pr-10 focus:outline-none  transition"
        />
        <Search
          onClick={() => console.log("Search clicked!")}
          className="w-5 h-5 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-orange-500 transition-colors"
        />
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCars.length === 0 ? (
          <p>No cars found.</p>
        ) : (
          filteredCars.map((car) => (
            <CarCard
              key={car._id}
              car={{
                name: car.carName,
                image: car.imageUrl,
                ...car,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default BrowseCars;
