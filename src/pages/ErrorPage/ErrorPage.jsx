import React from "react";
import { Link } from "react-router";

const NotFound =()=> {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Page Not Found</p>
      <Link to="/" className="bg-orange-600  hover:bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">Back to Home</Link>
    </div>
  );
}

export default NotFound;