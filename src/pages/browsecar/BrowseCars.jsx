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

  const filteredCars = cars.filter((car) =>
    (car.carName || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Cars</h2>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search cars..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <Search className="w-5 h-5 ml-2 mt-2" />
      </div>
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
