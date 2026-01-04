
import React, { useContext, useState, useEffect } from "react";
import { NavLink, Link } from "react-router";
import { Menu, X, Sun, Moon } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logoutUser, role } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Browse Cars", path: "/browse-cars" },
  ];

  const navLinkClasses = ({ isActive }) =>
    `relative block py-2 font-semibold text-lg transition-colors duration-300
    ${
      isActive
        ? "text-orange-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-orange-600"
        : ""
    }
    ${darkMode ? "text-white hover:text-orange-400" : "text-gray-800 hover:text-orange-600"}`;

  return (
    <nav
      className={`${
        darkMode ? "bg-gray-900" : "bg-white"
      } sticky top-0 z-50 shadow-md transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className={`text-3xl font-bold ${darkMode ? "text-white" : "text-black"}`}
        >
          Rent<span className="text-orange-600">Wheels</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink to={link.path} className={navLinkClasses}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Dark / Light Toggle */}
          <button
            onClick={toggleDarkMode}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`p-2 rounded-full transition ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}`}
          >
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>

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
                className={`border-2 border-orange-600 font-bold px-5 py-2 rounded-lg transition ${
                  darkMode ? "text-white hover:bg-gray-800" : "text-orange-600 hover:bg-orange-50"
                }`}
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

              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-50 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  <div className="p-3 border-b">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm">{user.email}</p>
                  </div>

                  <NavLink
                    to={role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    className="block px-4 py-2 hover:bg-orange-600"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                    className="block px-4 py-2 hover:bg-orange-600"
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={() => {
                      logoutUser();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:text-white text-orange-600 hover:bg-red-50 dark:hover:bg-orange-600"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode}>
            {darkMode ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          {/* Mobile Profile or Menu */}
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/2Fx7r2J/avatar.png"}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-500 hover:scale-105 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg z-50 ${
                    darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                  }`}
                >
                  <div className="p-3 border-b">
                    <p className="font-semibold">{user.displayName}</p>
                    <p className="text-sm">{user.email}</p>
                  </div>

                  <NavLink
                    to={role === "admin" ? "/dashboard/admin" : "/dashboard/user"}
                    className="block px-4 py-2 hover:bg-orange-600"
                  >
                    Dashboard
                  </NavLink>

                  <NavLink
                    to={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                    className="block px-4 py-2 hover:bg-orange-600"
                  >
                    Profile
                  </NavLink>

                  <button
                    onClick={() => {
                      logoutUser();
                      setDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:text-white text-orange-600 hover:bg-red-50 dark:hover:bg-orange-600"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu Links */}
      {menuOpen && !user && (
        <div
          className={`md:hidden px-4 py-3 space-y-3 ${
            darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
          }`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 font-semibold"
            >
              {link.name}
            </NavLink>
          ))}

          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Login
          </NavLink>

          <NavLink
            to="/signup"
            onClick={() => setMenuOpen(false)}
            className="block border-2 border-orange-600 text-orange-600 px-4 py-2 rounded-lg"
          >
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
