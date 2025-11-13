
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarCard from "../../components/CarCard";
import Spinner from "../../components/Spinner";
import api from "../../api/api";
import { CheckCircle, Clock, DollarSign, Headphones, Star, Search } from "lucide-react";

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const features = [
    { icon: <CheckCircle className="w-10 h-10 text-blue-500 mb-3" />, title: "Easy Booking", desc: "Book your car in just a few clicks without any hassle." },
    { icon: <DollarSign className="w-10 h-10 text-green-500 mb-3" />, title: "Affordable Rates", desc: "We provide competitive pricing for all car types." },
    { icon: <Clock className="w-10 h-10 text-orange-500 mb-3" />, title: "Trusted Providers", desc: "All our cars are listed by verified providers." },
    { icon: <Headphones className="w-10 h-10 text-purple-500 mb-3" />, title: "24/7 Support", desc: "We are available to help you at any time of the day." },
  ];

  const testimonials = [
    { name: "John Doe", quote: "Amazing service, very easy to book cars!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Jane Smith", quote: "Affordable and reliable. Highly recommend!", img: "https://randomuser.me/api/portraits/women/45.jpg" },
    { name: "Michael Johnson", quote: "Best car rental experience I've ever had.", img: "https://randomuser.me/api/portraits/men/56.jpg" },
    { name: "Emily Davis", quote: "Customer support was super friendly and helpful!", img: "https://randomuser.me/api/portraits/women/22.jpg" },
  ];

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/cars");
        setFeaturedCars(res.data.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filteredCars = featuredCars.filter((car) =>
    (car.carName || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;

  return (
    <div className="space-y-16">

      {/* Hero Slider */}
      <div className="relative mt-6 rounded-2xl overflow-hidden shadow-2xl max-w-7xl mx-auto">
        <Carousel showThumbs={false} autoPlay infiniteLoop interval={3000} showStatus={false} swipeable emulateTouch>
          {[
            "https://i.ibb.co/DDwhg2LZ/hon.webp",
            "https://i.ibb.co/BHvYFy3s/toyota-rva4.jpg",
            "https://i.ibb.co/HfjxcGCB/Tesla-Model.jpg",
            "https://i.ibb.co/8gQDBX8x/audi.jpg",
            "https://i.ibb.co/Pv1ZmxcG/con.webp",
          ].map((src, index) => (
            <div key={index} className="relative">
              <img src={src} alt={`Slide ${index + 1}`} className="h-[500px] w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <motion.div className="text-center text-white text-4xl font-bold drop-shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Typewriter
                    words={["Welcome to RentWheels", "Book Cars Easily", "Drive Your Dream Car"]}
                    loop={0}
                    cursor
                    cursorStyle="_"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={1000}
                  />
                </motion.div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Search Bar */}
      <section className="flex justify-center px-4 my-6">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            placeholder="Search cars by name..."
            className="w-full p-4 pl-12 pr-14 rounded-full border border-gray-300 shadow-lg bg-white/80 backdrop-blur-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" />
        </div>
      </section>

      {/* Featured Cars */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Featured Cars</h2>
        {filteredCars.length === 0 ? (
          <p className="text-center text-gray-500 italic">No cars found with that name.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car) => (
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
      </section>

      {/* Why Rent With Us */}
      <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Why Rent With Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.07 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  {item.icon}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Cars Slider */}
      <section className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Top Rated Cars</h2>
        <Carousel showThumbs={false} infiniteLoop autoPlay interval={2500} showStatus={false} centerMode centerSlidePercentage={33.33} swipeable>
          {featuredCars.map((car) => (
            <div key={car._id} className="px-3">
              <CarCard
                car={{
                  name: car.carName,
                  image: car.imageUrl,
                  ...car,
                }}
              />
            </div>
          ))}
        </Carousel>
      </section>
    </div>
  );
}
