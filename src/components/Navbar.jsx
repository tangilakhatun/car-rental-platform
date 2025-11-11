
import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Smooth underline + hover effect
  const navLinkClasses = ({ isActive }) =>
    `relative block px-3 py-2 border-b-2 transition-colors duration-300 ${
      isActive
        ? "text-orange-600 border-orange-600 font-semibold"
        : "text-black border-transparent font-bold hover:text-orange-500 hover:border-orange-400"
    }`;

  return (
    <nav className="bg-white shadow py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
       
        <h1 className="text-4xl font-bold text-black ">
          Rent<span className="text-2xl  text-orange-600 font-bold">Wheels</span>
        </h1>

      
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        
        <ul
          className={`md:flex md:items-center md:space-x-6 absolute md:static bg-white w-full md:w-auto left-0 top-full md:top-auto shadow md:shadow-none transition-all duration-300 ease-in-out ${
            menuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible md:visible md:opacity-100"
          }`}
        >
          <li>
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
          </li>

          <li>
            <NavLink to="/browse-cars" className={navLinkClasses}>
              Browse Cars
            </NavLink>
          </li>

          <li>
            <NavLink to="/add-car" className={navLinkClasses}>
              Add Car
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-listings" className={navLinkClasses}>
              My Listings
            </NavLink>
          </li>

          <li>
            <NavLink to="/my-bookings" className={navLinkClasses}>
              My Bookings
            </NavLink>
          </li>

           <div> <NavLink to="/login" className=' ml-4 md:ml-80 btn text-white font-bold bg-orange-600 px-9 py-3'>
              Login
            </NavLink></div>
        </ul>
       
      </div>
    </nav>
  );
};

export default Navbar;
