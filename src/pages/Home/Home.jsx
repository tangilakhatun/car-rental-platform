import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarCard from "../../components/CarCard";
import Spinner from "../../components/Spinner";
import api from "../../api/api";


export default function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/cars");  
         console.log("API response:", res.data);
        setFeaturedCars(res.data.slice(0, 6)); // newest 6 cars
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  if (loading) return <Spinner></Spinner> ;

  return (
    <div className="space-y-10">
      {/* Hero Banner / Slider */}
     
<div className="relative max-w-11/12 mx-auto mt-6 rounded-2xl overflow-hidden shadow-lg">
  <Carousel
    showThumbs={false}
    autoPlay
    infiniteLoop
    interval={3000}
    showStatus={false}
    swipeable
    emulateTouch
  >
    {[
      "https://i.ibb.co.com/DDwhg2LZ/hon.webp",
      "https://i.ibb.co.com/BHvYFy3s/toyota-rva4.jpg",
      "https://i.ibb.co.com/HfjxcGCB/Tesla-Model.jpg",
      "https://i.ibb.co.com/8gQDBX8x/audi.jpg" ,
      "https://i.ibb.co.com/Pv1ZmxcG/con.webp",
    ].map((src, index) => (
      <div key={index} className="relative">
        <img
          src={src}
          alt={`Slide ${index + 1}`}
          className="h-[500px] w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/30">
           <motion.div
        className="text-center mt-8 text-3xl font-bold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span>
          <Typewriter
            words={["Welcome to RentWheels", "Book Cars Easily", "Drive Your Dream Car"]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </span>
      </motion.div>
        </div>
      </div>
    ))}
  </Carousel>
</div>

     
     
      {/* Featured Cars */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">Featured Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      {/* Why Rent With Us */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Why Rent With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold mb-2">Easy Booking</h3>
              <p>Book your car in just a few clicks without any hassle.</p>
            </motion.div>
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold mb-2">Affordable Rates</h3>
              <p>We provide competitive pricing for all car types.</p>
            </motion.div>
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold mb-2">Trusted Providers</h3>
              <p>All our cars are listed by verified providers.</p>
            </motion.div>
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p>We are available to help you at any time of the day.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Extra Sections */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-6">Top Rated Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top rated cars could be same as featured for now */}
          {featuredCars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      </section>

      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Customer Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <p>"Amazing service, very easy to book cars!"</p>
              <p className="mt-2 font-semibold">- John Doe</p>
            </motion.div>
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <p>"Affordable and reliable. Highly recommend!"</p>
              <p className="mt-2 font-semibold">- Jane Smith</p>
            </motion.div>
            <motion.div className="p-6 bg-white rounded shadow" whileHover={{ scale: 1.05 }}>
              <p>"Best car rental experience I've ever had."</p>
              <p className="mt-2 font-semibold">- Mike Johnson</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
