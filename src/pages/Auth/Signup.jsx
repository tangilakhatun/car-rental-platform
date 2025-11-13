import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import { FcGoogle } from "react-icons/fc"; // Google icon

const  Register =() =>{
  const { registerUser, googleLogin } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", photoURL: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || form.password.length < 6) {
      Swal.fire("Error", "Password must have uppercase, lowercase and at least 6 characters", "error");
      return;
    }
    try {
      await registerUser(form.email, form.password, form.name, form.photoURL);
      Swal.fire("Success", "Registered successfully", "success");
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
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Join us today and start exploring</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            value={form.photoURL}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold px-4 py-3 rounded-lg shadow "
          >
            Register
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
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Register;