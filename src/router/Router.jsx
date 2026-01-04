
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashbardLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import BrowseCars from "../pages/browsecar/BrowseCars";
import About from "../pages/About/About";
import Service from "../pages/Service/Service";
import Blog from "../pages/Blog/Blog";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";
import CarDetails from "../pages/CarDetails/CarDetails";

import AddCar from "../pages/AddCard/AddCard";
import MyListings from "../pages/MyListings/MyListings";
import UpdateCar from "../pages/MyListings/Update";
import MyBookings from "../pages/MyBookings/MyBookings";
import Profile from "../pages/dashboard/shared/Profile";
import UserDashboardHome from "../pages/dashboard/user/UserDashboardHome";
import AdminDashboardHome from "../pages/dashboard/admin/AdminDashboardHome";

import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/browse-cars", element: <BrowseCars /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Service /> },
      { path: "/blog", element: <Blog /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },

      
      { path: "/car/:id", element: <CarDetails /> },
    ],
  },

  {
    path: "/dashboard/admin",
    element: (
      <PrivateRoute>
        <RoleRoute role="admin">
          <DashboardLayout />
        </RoleRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <AdminDashboardHome /> },
      { path: "add-car", element: <AddCar /> },
      { path: "my-listings", element: <MyListings /> },
      { path: "update/:id", element: <UpdateCar /> },
      { path: "profile", element: <Profile /> },
    ],
  },

  
  {
    path: "/dashboard/user",
    element: (
      <PrivateRoute>
        <RoleRoute role="user">
          <DashboardLayout />
        </RoleRoute>
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <UserDashboardHome /> },
      { path: "my-bookings", element: <MyBookings /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default router;
