
import React, { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CarCard from "../../components/CarCard";
import Spinner from "../../components/Spinner";
import api from "../../api/api";
import { CheckCircle, Clock, DollarSign, Headphones, Star, Search, Car } from "lucide-react";
import { Mail, Info, UserCheck, Globe } from "lucide-react";

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

  const categories = [
    { title: "Sedan", icon: <UserCheck className="w-10 h-10 text-blue-500 mb-3" /> },
    { title: "SUV", icon: <Globe className="w-10 h-10 text-green-500 mb-3" /> },
    { title: "Luxury", icon: <Info className="w-10 h-10 text-purple-500 mb-3" /> },
    { title: "Electric", icon: <Mail className="w-10 h-10 text-orange-500 mb-3" /> },
  ];

  const blogPosts = [
  {
    title: "Top 5 Road Trips This Summer",
    link: "#",
    img: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "How to Choose the Perfect Car",
    link: "#",
    img: "https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    title: "Travel Safety Tips During Rental",
    link: "#",
    img: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];


  const faq = [
    { q: "How do I book a car?", a: "Select your car, choose dates, and click 'Book Now'." },
    { q: "Can I cancel my booking?", a: "Yes, cancellations are allowed up to 24 hours before pickup." },
    { q: "Are all cars insured?", a: "Yes, all listed cars are insured for peace of mind." },
  ];
const [slidePercent, setSlidePercent] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlidePercent(100); 
      } else if (width >= 640 && width < 1024) {
        setSlidePercent(50); 
      } else {
        setSlidePercent(25); 
      }
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await api.get("/cars");
        setFeaturedCars(res.data.slice(0, 8));
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
          className="relative bg-gradient-to-br from-white to-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05, y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <div className="flex justify-center">
            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-orange-600 shadow-md -mt-12 mb-4 transition-transform duration-500 hover:scale-110"
            />
          </div>
          <p className="text-gray-800 italic mb-4 mt-2 text-lg md:text-xl leading-relaxed relative before:content-['“'] before:text-4xl before:text-orange-500 before:absolute before:-left-2 before:-top-2 after:content-['”'] after:text-4xl after:text-orange-500 after:absolute after:-right-2 after:-bottom-2">
            {t.quote}
          </p>
          <p className="font-semibold text-gray-800">{t.name}</p>
          <div className="flex justify-center mt-3 space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < t.rating ? "fill-yellow-400" : "fill-gray-300"}`}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Top Rated Cars Slider */}
    <section className="container mx-auto px-6 py-10">
  <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Top Rated Cars</h2>
  <Carousel
    showThumbs={false}
    infiniteLoop
    autoPlay
    interval={2500}
    showStatus={false}
    centerMode
    centerSlidePercentage={slidePercent} // ✅ responsive
    swipeable
  >
    {featuredCars.map((car) => (
      <div key={car._id} className="px-2 sm:px-3 md:px-4">
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

<section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            Car Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div key={i} className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.07 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}>
                <div className="flex flex-col items-center">
                  {cat.icon}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{cat.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* How It Works Section */}
<section className="py-16 bg-gray-50">
  <div className="container mx-auto px-6 text-center">
    <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      How It Works
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {[
        { icon: <Search className="w-10 h-10 text-blue-500 mb-3" />, title: "Browse Cars", desc: "Find the perfect car from our wide selection." },
        { icon: <CheckCircle className="w-10 h-10 text-green-500 mb-3" />, title: "Book Online", desc: "Reserve your car instantly in a few clicks." },
        { icon: <Car className="w-10 h-10 text-orange-500 mb-3" />, title: "Pick & Drive", desc: "Pick up your car and enjoy the ride." },
        { icon: <DollarSign className="w-10 h-10 text-purple-500 mb-3" />, title: "Return Safely", desc: "Return the car hassle-free at your convenience." },
      ].map((item, index) => (
        <motion.div key={index} className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.07 }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}>
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

      

      {/* Blog / Tips */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            Latest Travel Tips
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((b, i) => (
              <motion.a key={i} href={b.link} className="block bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
                whileHover={{ scale: 1.05 }}>
                <img src={b.img} alt={b.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{b.title}</h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
{/* Newsletter / CTA */}
<section className="py-16 bg-gray-50 text-gray-800">
  <div className="container mx-auto px-6 text-center">
    <motion.h2
      className="text-3xl md:text-4xl font-bold mb-4"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      Stay Updated!
    </motion.h2>
    <p className="mb-8 text-lg md:text-xl text-gray-700">
      Subscribe to our newsletter for the latest car rental offers and tips.
    </p>
    <form className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
      <input
        type="email"
        placeholder="Enter your email"
        className="p-4 rounded-full text-gray-800 w-full md:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm transition-all"
      />
      <button
        type="submit"
        className="px-6 py-4 bg-orange-500 rounded-full font-semibold hover:bg-orange-600 shadow transition-all"
      >
        Subscribe
      </button>
    </form>
    <p className="mt-4 text-sm text-gray-600">
      We respect your privacy. Unsubscribe at any time.
    </p>
  </div>
</section>


      {/* FAQ / Help */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}>
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6 text-left">
            {faq.map((f, i) => (
              <motion.div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
                whileHover={{ scale: 1.02 }}>
                <h3 className="font-semibold text-gray-800 mb-2">{f.q}</h3>
                <p className="text-gray-600">{f.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
