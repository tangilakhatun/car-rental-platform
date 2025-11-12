import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import CarCard from '../../components/CarCard';
import api from '../../api/api';

const BrowseCars = () => {

    const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCars = async () => {
    try {
      const res = await api.get(`/cars?q=${search}`);
      setCars(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [search]);

  if (loading) return <Spinner />;

    return (
         <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Browse Cars</h2>
      <input
        type="text"
        placeholder="Search cars..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full md:w-1/2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length === 0 ? <p>No cars found.</p> :
          cars.map(car => <CarCard key={car._id} car={car} />)
        }
      </div>
    </div>
    );
};

export default BrowseCars;