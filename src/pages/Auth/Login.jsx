
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc";


const  Login = ()=> {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      Swal.fire("Success", "Logged in successfully", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      Swal.fire("Success", "Logged in with Google", "success");
      navigate("/");
    } catch (err) {
      Swal.fire("Error", err.message, "error"); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">Login to your account to continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg shadow hover:bg-orange-600 transition-colors"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

       
        <button
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 shadow hover:shadow-md transition-all bg-white"
        >
          <FcGoogle className="w-6 h-6" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-500">
          Don't have an account? <Link to="/signup" className="text-blue-500 font-medium hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;