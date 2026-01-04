

// import React, { useContext, useState } from "react";
// import { NavLink, Outlet, Link } from "react-router";
// import { AuthContext } from "../provider/AuthProvider";
// import { Home, User, Truck, List } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const DashboardLayout = () => {
//   const { user, role, logoutUser } = useContext(AuthContext);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const sidebarLinks =
//     role === "admin"
//       ? [
//           { name: "Home", path: "/dashboard/admin", icon: <Home size={18} /> },
//           { name: "Add Car", path: "/dashboard/admin/add-car", icon: <Truck size={18} /> },
//           { name: "My Listings", path: "/dashboard/admin/my-listings", icon: <List size={18} /> },
//           { name: "Profile", path: "/dashboard/admin/profile", icon: <User size={18} /> },
//         ]
//       : [
//           { name: "Home", path: "/dashboard/user", icon: <Home size={18} /> },
//           { name: "My Bookings", path: "/dashboard/user/my-bookings", icon: <List size={18} /> },
//           { name: "Profile", path: "/dashboard/user/profile", icon: <User size={18} /> },
//         ];

//   const navLinkClasses = ({ isActive }) =>
//     `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition
//      ${isActive ? "bg-orange-100 text-orange-600" : "text-base-content hover:bg-orange-50"}`;

//   return (
//     <div className="flex h-screen bg-base-100">
//       {/* Sidebar */}
//       <AnimatePresence>
//         {sidebarOpen && (
//           <motion.aside
//             initial={{ x: -260 }}
//             animate={{ x: 0 }}
//             exit={{ x: -260 }}
//             transition={{ duration: 0.25 }}
//             className="w-64 bg-base-100 border-r border-base-300"
//           >
//             <div className="p-6 text-2xl font-bold text-orange-600">
//               Rent<span className="text-base-content">Wheels</span>
//             </div>

//             <nav className="px-4 space-y-1">
//               {sidebarLinks.map((link) => (
//                 <NavLink key={link.name} to={link.path} className={navLinkClasses}>
//                   {link.icon}
//                   <span>{link.name}</span>
//                 </NavLink>
//               ))}
//             </nav>
//           </motion.aside>
//         )}
//       </AnimatePresence>

//       {/* Main */}
//       <div className="flex-1 flex flex-col bg-base-100">
//         {/* Top bar */}
//         <div className="flex items-center px-6 py-3 border-b border-base-300 bg-base-100 sticky top-0 z-30">
//           <button
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             className="md:hidden text-base-content"
//           >
//             ☰
//           </button>

//           {/* Right profile */}
//           <div className="ml-auto relative">
//             <img
//               src={user?.photoURL || "https://i.ibb.co/2Fx7r2J/avatar.png"}
//               alt="profile"
//               className="w-10 h-10 rounded-full border-2 border-orange-500 cursor-pointer"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             />

//             {dropdownOpen && (
//               <div className="absolute right-0 top-12 w-52 bg-base-100 border border-base-300 rounded-xl shadow-lg">
//                 <div className="p-3 border-b border-base-300">
//                   <p className="font-semibold text-base-content">
//                     {user?.displayName}
//                   </p>
//                   <p className="text-sm text-base-content/70">
//                     {user?.email}
//                   </p>
//                 </div>

//                 <Link
//                   to={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
//                   className="block px-4 py-2 hover:bg-orange-50"
//                 >
//                   Profile
//                 </Link>

//                 <button
//                   onClick={logoutUser}
//                   className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Page content */}
//         <main className="flex-1 p-6 overflow-auto bg-base-100">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React, { useContext, useState } from "react";
import { NavLink, Outlet, Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import { Home, User, Truck, List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
  const { user, role, logoutUser } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile toggle
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const sidebarLinks =
    role === "admin"
      ? [
          { name: "Home", path: "/dashboard/admin", icon: <Home size={18} /> },
          { name: "Add Car", path: "/dashboard/admin/add-car", icon: <Truck size={18} /> },
          { name: "My Listings", path: "/dashboard/admin/my-listings", icon: <List size={18} /> },
          { name: "Profile", path: "/dashboard/admin/profile", icon: <User size={18} /> },
        ]
      : [
          { name: "Home", path: "/dashboard/user", icon: <Home size={18} /> },
          { name: "My Bookings", path: "/dashboard/user/my-bookings", icon: <List size={18} /> },
          { name: "Profile", path: "/dashboard/user/profile", icon: <User size={18} /> },
        ];

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition
     ${isActive ? "bg-orange-100 text-orange-600" : "text-base-content hover:bg-orange-50"}`;

  return (
    <div className="flex h-screen bg-base-100 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 bg-base-100 border-r border-base-300 flex flex-col">
          <Link to="/" className="block p-6 text-2xl font-bold text-orange-600">
            Rent<span className="text-base-content">Wheels</span>
          </Link>
          <nav className="flex-1 px-4 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.name === "Home"}
                className={navLinkClasses}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Sidebar for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-20"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-y-0 left-0 w-64 bg-base-100 z-30 border-r border-base-300 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-base-300">
                <Link to="/" className="text-2xl font-bold text-orange-600">
                  Rent<span className="text-base-content">Wheels</span>
                </Link>
                <button onClick={() => setSidebarOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 px-4 space-y-1">
                {sidebarLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    end={link.name === "Home"}
                    className={navLinkClasses}
                    onClick={() => setSidebarOpen(false)} // auto close
                  >
                    {link.icon}
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-base-300 bg-base-100 sticky top-0 z-10">
          <button
            className="md:hidden text-base-content"
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>

          {/* Right profile */}
          <div className="ml-auto relative">
            <img
              src={user?.photoURL || "https://i.ibb.co/2Fx7r2J/avatar.png"}
              alt="profile"
              className="w-10 h-10 rounded-full border-2 border-orange-500 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />

            {dropdownOpen && (
              <div className="absolute right-0 top-12 w-52 bg-base-100 border border-base-300 rounded-xl shadow-lg">
                <div className="p-3 border-b border-base-300">
                  <p className="font-semibold text-base-content">{user?.displayName}</p>
                  <p className="text-sm text-base-content/70">{user?.email}</p>
                </div>
                <Link
                  to={role === "admin" ? "/dashboard/admin/profile" : "/dashboard/user/profile"}
                  className="block px-4 py-2 hover:bg-orange-50"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={logoutUser}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto bg-base-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
