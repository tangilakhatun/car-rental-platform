import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { MdAddIcCall, MdOutlineEmail } from 'react-icons/md';

const Footer = () => {
    return (
         <footer className="bg-gray-900 text-gray-200 mt-10">
  <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    
    <div>
      <h2 className="text-2xl font-bold mb-4">RentWheels</h2>
      <p className="text-gray-400 mb-4">
        Car rental platform where users find reliable cars and providers connect with customers.
      </p>

     
      <div className="flex">
        <input 
          type="text" 
          placeholder="Search cars..." 
          className="w-full px-3 py-2 rounded-l-md bg-gray-800 text-gray-200 placeholder-gray-400 focus:outline-none"
        />
        <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700">Search</button>
      </div>
    </div>

   
    <div>
      <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-white">Home</a></li>
        <li><a href="/browse-cars" className="hover:text-white">Browse Cars</a></li>
        <li><a href="/about" className="hover:text-white">About</a></li>
        <li><a href="/serviec" className="hover:text-white">Service</a></li>
        <li><a href="/blog" className="hover:text-white">Blog</a></li>
      </ul>
    </div>

    
    <div>
      <h3 className="text-xl font-semibold mb-4">Services</h3>
      <ul className="space-y-2 text-gray-400">
        <li>Reliable Rides</li>
        <li>Express Shuttle</li>
        <li>Travel in Style</li>
        <li>Car Rentals</li>
        <li>24/7 Support</li>
      </ul>
    </div>

    
    <div>
      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <p className="text-gray-400">4140 Parker Rd, Allentown, NM 31134</p>
      <p className="text-white  mt-2 flex gap-2 items-center"> <span><MdAddIcCall /></span>(219) 555-0114</p>
      <p className="text-white  flex gap-2 items-center "> <span><MdOutlineEmail /></span>gorent@gmail.com</p>

     
      <div className="flex space-x-4 mt-4">
        <FaFacebook />
        <FaYoutube />
        <FaSquareXTwitter />
        <FaInstagram />
      </div>
    </div>
  </div>

  <div className="border-t border-gray-700 mt-8">
    <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-gray-400">
      <p>© 2026 RentWheels. All Rights Reserved.</p>
      <div className="flex space-x-4 mt-2 md:mt-0">
        <a href="#" className="hover:text-white">Terms of Service</a>
        <a href="#" className="hover:text-white">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>

    );
};

export default Footer;