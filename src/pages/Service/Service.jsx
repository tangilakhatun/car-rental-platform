import React from "react";
import { motion } from "framer-motion";
import { Car, Shield, Clock, ToolCase } from "lucide-react";

const services = [
  {
    title: "Wide Vehicle Selection",
    description: "Choose from a large variety of cars to suit your travel needs.",
    icon: <Car className="w-12 h-12 text-blue-500 mb-4" />
  },
  {
    title: "Maintenance & Safety",
    description: "All our cars are maintained regularly to ensure safety and comfort.",
    icon: <ToolCase className="w-12 h-12 text-green-500 mb-4" />
  },
  {
    title: "Trusted Providers",
    description: "We work only with verified providers to give you a worry-free rental experience.",
    icon: <Shield className="w-12 h-12 text-yellow-500 mb-4" />
  },
  {
    title: "24/7 Customer Support",
    description: "Our support team is available around the clock to help you with anything.",
    icon: <Clock className="w-12 h-12 text-purple-500 mb-4" />
  },
];

export default function Services() {
  return (
    <div className="space-y-32">

      {/* Hero Section */}
      <section className="relative bg-gray-100 py-32 text-center rounded-2xl mx-6">
        <motion.h1
          className="relative text-4xl md:text-5xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Services
        </motion.h1>
        <motion.p
          className="relative max-w-3xl mx-auto text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          RentWheels provides high-quality services to make your car rental experience simple, safe, and enjoyable.
        </motion.p>
      </section>

      {/* Services Cards */}
      <section className="container mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          What We Offer
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {service.icon}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.title}</h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-20 text-center rounded-2xl mx-6">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Ready to Experience Our Services?
        </motion.h2>
        <motion.p
          className="mb-6 text-gray-700"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Sign up now and enjoy seamless car rentals with RentWheels!
        </motion.p>
        <button className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-200 transition-all">
          Get Started
        </button>
      </section>
{/* Message Us Section */}
<section className="container mx-auto px-6">
  <motion.h2
    className="text-3xl md:text-4xl font-bold mb-6 text-center text-gray-800"
    initial={{ opacity: 0, y: -20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
  >
    Message Us
  </motion.h2>

  <motion.p
    className="text-center text-gray-600 mb-10 max-w-2xl mx-auto"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.7 }}
  >
    Have questions or need help? Send us a message and our team will get back to you shortly.
  </motion.p>

  <motion.div
    className="bg-white rounded-2xl shadow-md p-8 max-w-3xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
  >
    <form className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Your Name
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea
          rows="4"
          placeholder="Write your message..."
          className="w-full px-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-gray-300"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-all"
      >
        Send Message
      </button>
    </form>
  </motion.div>
</section>

    </div>
  );
}
