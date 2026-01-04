
import React, { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import CarCard from "../../components/CarCard";
import api from "../../api/api";

const BrowseCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [sortBy, setSortBy] = useState(""); // price or rating

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;

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

  // Filter + Search + Sort
  const filteredCars = cars
    .filter((car) => {
      const query = search.toLowerCase();
      return (
        (car.carName || "").toLowerCase().includes(query) &&
        (categoryFilter ? car.category === categoryFilter : true) &&
        (locationFilter ? car.location === locationFilter : true)
      );
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.rentPricePerDay - b.rentPricePerDay;
      if (sortBy === "price-high") return b.rentPricePerDay - a.rentPricePerDay;
      if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  // Pagination calculation
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  if (loading) return <Spinner />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Browse Cars</h2>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6 space-y-2 md:space-y-0">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-orange-400 transition"
        />

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-orange-400 transition"
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Hatchback">Hatchback</option>
          <option value="Luxury">Luxury</option>
        </select>

        {/* Location Filter */}
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-orange-400 transition"
        >
          <option value="">All Locations</option>
          <option value="Dhaka">Dhaka</option>
          <option value="Chittagong">Chittagong</option>
          <option value="Sylhet">Sylhet</option>
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-orange-400 transition"
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      {/* Cars Grid */}
      {currentCars.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentCars.map((car) => (
            <CarCard
              key={car._id}
              car={{
                name: car.carName,
                image: car.imageUrl,
                ...car,
              }}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-3 mt-6">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-lg border transition ${
                currentPage === i + 1
                  ? "bg-orange-500 text-white border-orange-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-orange-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseCars;
