import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Login({ onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSwitchToRegister = () => {
    navigate("/auth?mode=register", { replace: true });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const logind = (isGuest) => {
    const formData = new FormData();
    if (!isGuest) {
      formData.append("username", email);
      formData.append("password", password);
    } else {
      formData.append("username", import.meta.env.VITE_GUEST_USERNAME);
      formData.append("password", import.meta.env.VITE_GUEST_PASSWORD);
    }
    console.log(import.meta.env.GUEST_USERNAME, password);
    axios
      .post("https://amdocs-backend.onrender.com/auth/jwt/create", formData)
      .then((response) => {
        console.log(response);
        Cookies.set("access", response.data.access, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refresh", response.data.refresh, {
          secure: true,
          sameSite: "Strict",
        });
        toast.success("User Logged In Successfully");
        navigate("/dashboard/goals", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          toast.error(error.response.data.detail);
        } else {
          console.log(error);
          toast.error("User Login Failed");
        }
        setEmail("");
        setPassword("");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    logind();
  };

  const handleGuestLogin = () => {
    // Implement guest login logic here
    logind(1);
  };

  return (
    <div className="md:w-1/2 px-6 md:px-12">
      <h2 className="font-bold text-3xl text-gray-800">Login</h2>
      <p className="text-sm mt-4 text-gray-600">
        If you are already a member, easily log in below.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
        <input
          className="p-3 rounded-xl border border-gray-300"
          type="text"
          name="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className="relative">
          <input
            className="p-3 rounded-xl border border-gray-300 w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="gray"
            className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            viewBox="0 0 16 16"
            onClick={togglePasswordVisibility}
            role="button"
            tabIndex="0"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
            {showPassword && (
              <line
                x1="1"
                y1="15"
                x2="15"
                y2="1"
                stroke="currentColor"
                strokeWidth="2"
              />
            )}
          </svg>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-xl text-white py-3 duration-300 shadow-lg transform hover:scale-101  "
        >
          Login
        </button>
      </form>

      <div className="mt-5 text-xs border-b border-gray-300 py-4">
        <a href="#" className="text-gray-600">
          Forgot your password?
        </a>
      </div>
      <div className="mt-3 text-xs flex justify-center w-full items-center text-gray-600">
        <button
          className="py-3 px-5 w-full bg-gradient-to-r from-gray-400 to-gray-600 text-white border rounded-xl hover:from-gray-500 hover:to-gray-700 duration-300 shadow-lg transform hover:scale-101"
          onClick={handleGuestLogin}
        >
          Sign In as Guest
        </button>
      </div>
      <div className="mt-3 text-xs flex justify-between items-center text-gray-600">
        <p>Don't have an account?</p>
        <button
          className="py-2 px-5 bg-gray-100 border rounded-xl hover:bg-gray-500 hover:text-white duration-300"
          onClick={handleSwitchToRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
