import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarCard from "../../components/CarCard";
import Spinner from "../../components/Spinner";
import api from "../../api/api";
import { CheckCircle, Clock, DollarSign, Headphones, Star } from "lucide-react";


export default function Home() {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);

   const features = [
    {
      icon: <CheckCircle className="w-10 h-10 text-blue-500 mb-3" />,
      title: "Easy Booking",
      desc: "Book your car in just a few clicks without any hassle.",
    },
    {
      icon: <DollarSign className="w-10 h-10 text-green-500 mb-3" />,
      title: "Affordable Rates",
      desc: "We provide competitive pricing for all car types.",
    },
    {
      icon: <Clock className="w-10 h-10 text-orange-500 mb-3" />,
      title: "Trusted Providers",
      desc: "All our cars are listed by verified providers.",
    },
    {
      icon: <Headphones className="w-10 h-10 text-purple-500 mb-3" />,
      title: "24/7 Support",
      desc: "We are available to help you at any time of the day.",
    },
  ];

   const testimonials = [
    {
      name: "John Doe",
      quote: "Amazing service, very easy to book cars!",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Jane Smith",
      quote: "Affordable and reliable. Highly recommend!",
      img: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Michael Johnson",
      quote: "Best car rental experience I've ever had.",
      img: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
      name: "Emily Davis",
      quote: "Customer support was super friendly and helpful!",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Robert Wilson",
      quote: "Smooth booking process and great cars!",
      img: "https://randomuser.me/api/portraits/men/74.jpg",
    },
    {
      name: "Sophia Brown",
      quote: "Loved the clean and well-maintained vehicles!",
      img: "https://randomuser.me/api/portraits/women/64.jpg",
    },
  ];

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
      <section className="bg-gradient-to-b from-gray-100 to-gray-200 py-16">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
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

       <section className="bg-gradient-to-b from-gray-50 to-gray-200 py-16">
      <div className="container mx-auto px-6 text-center">
      
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What Our Customers Say
        </motion.h2>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
             
              <div className="flex justify-center">
                <img
                  src={t.img}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-500 shadow-md -mt-12 mb-4"
                />
              </div>

            
              <p className="text-gray-700 italic mb-4 mt-2">“{t.quote}”</p>
              <p className="font-semibold text-gray-800">{t.name}</p>

              <div className="flex justify-center mt-3 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
