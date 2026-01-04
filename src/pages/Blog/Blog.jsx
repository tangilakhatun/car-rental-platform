import React from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    title: "Top 5 Road Trips This Summer",
    description: "Discover the most exciting road trips you can take this summer with your family or friends.",
    img: "https://images.pexels.com/photos/356830/pexels-photo-356830.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "How to Choose the Perfect Car",
    description: "Learn the key factors to consider before renting a car for your next trip or daily use.",
    img: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Travel Safety Tips During Rental",
    description: "Ensure a safe journey with these practical travel and car rental safety tips.",
    img: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
  {
    title: "Best Budget Cars for Families",
    description: "Explore the top budget-friendly cars that are perfect for family trips.",
    img: "https://images.pexels.com/photos/7669211/pexels-photo-7669211.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "#"
  },
];

export default function Blog() {
  return (
    <div className="space-y-24 px-4 md:px-6 py-16 ">

      {/* Hero Section */}
      <section className="text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Our Blog
        </motion.h1>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-lg md:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Stay updated with the latest tips, road trips, and car rental guides. Explore our curated articles for travelers and car enthusiasts.
        </motion.p>
      </section>

      {/* Blog Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
              <p className="text-gray-600 flex-grow">{post.description}</p>
              <a
                href={post.link}
                className="mt-4 inline-block text-orange-500 font-semibold hover:underline"
              >
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Call to Action */}
      <section className="text-center py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Want to Stay Updated?
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Subscribe to our newsletter and never miss the latest articles and travel tips!
        </motion.p>
        <form className="flex flex-col  md:flex-row justify-center gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-4 rounded-full w-full md:w-2/3 border-black text-gray-800"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-all"
          >
            Subscribe
          </button>
        </form>
      </section>

    </div>
  );
}
