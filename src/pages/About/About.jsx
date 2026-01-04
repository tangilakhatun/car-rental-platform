import React from "react";
import { motion } from "framer-motion";
import { UserCheck, Globe, Star, Heart } from "lucide-react";

const teamMembers = [
  {
    name: "Tanvir Ahmed",
    role: "Founder & CEO",
    img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Sadia Khatun",
    role: "Operations Manager",
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Rafiq Hossain",
    role: "Lead Developer",
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    name: "Nadia Akter",
    role: "Customer Support",
    img: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
];

export default function About() {
  return (
    <div className="space-y-32">

      {/* Hero Section */}
      <section className="relative py-32 text-center rounded-2xl mx-4 md:mx-6 shadow-inner overflow-hidden">
        <img
          src="https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Cars Background"
          className="absolute inset-0 w-full h-full object-cover opacity-10 rounded-2xl"
        />

        <motion.h1
          className="relative text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About RentWheels
        </motion.h1>
        <motion.p
          className="relative max-w-3xl mx-auto text-lg md:text-xl text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Connecting you with your dream car has never been easier. RentWheels provides safe, fast, and affordable car rentals across cities.
        </motion.p>
      </section>

      {/* Mission / Vision Section */}
      <section className="container mx-auto px-4 md:px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Mission & Vision
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Mission</h3>
            <p className="text-gray-600">
              To provide easy, reliable, and affordable car rentals while delivering excellent customer service at every step.
            </p>
          </motion.div>
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Our Vision</h3>
            <p className="text-gray-600">
              To become the most trusted car rental platform, connecting users with quality vehicles easily across cities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Meet Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 flex flex-col items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200 shadow-md"
                />
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats / Highlights Section */}
      <section className="py-16 ">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <UserCheck className="w-10 h-10 text-blue-400 mb-3" />
              <span className="text-3xl font-bold">120+</span>
              <span className="text-gray-500">Cars Available</span>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Star className="w-10 h-10 text-yellow-400 mb-3" />
              <span className="text-3xl font-bold">500+</span>
              <span className="text-gray-500">Bookings Completed</span>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-10 h-10 text-pink-400 mb-3" />
              <span className="text-3xl font-bold">300+</span>
              <span className="text-gray-500">Happy Users</span>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="w-10 h-10 text-green-400 mb-3" />
              <span className="text-3xl font-bold">20+</span>
              <span className="text-gray-500">Cities Covered</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-50 py-20 text-center rounded-2xl mx-4 md:mx-6 shadow-inner">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ready to Rent Your Dream Car?
        </motion.h2>
        <motion.p
          className="mb-6 text-gray-700 text-lg md:text-xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Join RentWheels today and explore our wide range of cars!
        </motion.p>
        <button className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 shadow-lg transition-all">
          Get Started
        </button>
      </section>

    </div>
  );
}
