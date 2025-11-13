
import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router";

import { Menu, X } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navLinkClasses = ({ isActive }) =>
    `relative block py-2 font-semibold text-lg transition-colors duration-300 ${
      isActive
        ? "text-orange-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-orange-600 after:transition-all after:duration-300"
        : "text-gray-800 hover:text-orange-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:bg-orange-600 after:transition-all after:duration-300 hover:after:w-full"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
       
        <Link to="/" className="text-3xl font-bold text-black">
          Rent<span className="text-orange-600">Wheels</span>
        </Link>

       
        <ul className="hidden md:flex items-center space-x-8">
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
          {user && (
            <>
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
            </>
          )}
        </ul>

       
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            <>
              <NavLink
                to="/login"
                className="bg-orange-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-orange-500 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="border-2 border-orange-600 text-orange-600 font-bold px-5 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/2Fx7r2J/avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-500 hover:scale-105 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50"
                  >
                    <div className="p-3 border-b">
                      <p className="font-semibold text-gray-800">{user.displayName}</p>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                    <button
                      onClick={logoutUser}
                      className="block w-full text-left px-4 py-2 font-medium text-red-600 hover:bg-red-50 transition"
                    >
                      Log Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-md w-full"
          >
            <ul className="flex flex-col space-y-3 p-4">
              <li>
                <NavLink
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClasses}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/browse-cars"
                  onClick={() => setMenuOpen(false)}
                  className={navLinkClasses}
                >
                  Browse Cars
                </NavLink>
              </li>
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/add-car"
                      onClick={() => setMenuOpen(false)}
                      className={navLinkClasses}
                    >
                      Add Car
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-listings"
                      onClick={() => setMenuOpen(false)}
                      className={navLinkClasses}
                    >
                      My Listings
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/my-bookings"
                      onClick={() => setMenuOpen(false)}
                      className={navLinkClasses}
                    >
                      My Bookings
                    </NavLink>
                  </li>
                </>
              )}
            </ul>

            <div className="p-4 flex flex-col space-y-3">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full bg-orange-600  hover:bg-orange-500 text-white font-semibold text-center py-2 rounded-lg"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full border-2 border-orange-600  hover:bg-orange-500 text-orange-600 font-semibold text-center py-2 rounded-lg"
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <button
                  onClick={() => {
                    logoutUser();
                    setMenuOpen(false);
                  }}
                  className="block w-full bg-red-500 text-white font-semibold text-center py-2 rounded-lg"
                >
                  Log Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
