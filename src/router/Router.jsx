import { BrowserRouter, createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import AddCard from "../pages/AddCard/AddCard";
import MyListings from "../pages/MyListings/MyListings";
import MyBookings from "../pages/MyBookings/MyBookings";
import CarDetails from "../pages/CarDetails/CarDetails";
import Login from "../pages/Auth/Login";
import Signup from "../pages/Auth/Signup";



const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/",
         element: <Home /> },

      { path: "/add-car",
         element: <AddCard /> },
      { path: "/my-listings", 
        element: <MyListings /> },
      { path: "/my-bookings",
         element: <MyBookings /> },
      { path: "/car/:id",
         element: <CarDetails /> },
      { path: "/login", 
        element: <Login /> },
      { path: "/signup",
         element: <Signup /> },
    ],
  },
]);

export default router;
