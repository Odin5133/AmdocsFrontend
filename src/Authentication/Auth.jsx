import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const [imgIndex, setImgIndex] = useState(Math.floor(Math.random() * 4));
  const location = useLocation();
  const navigate = useNavigate();

  const handleAuthSwitch = (type) => {
    navigate(`/auth?mode=${type}`, { replace: true });
  };

  const getAuthMode = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("mode") || "login";
  };

  const images = [
    "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENvdXJzZXN8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%] animate-gradient-slow opacity-70"></div>
      <div className="relative z-10 bg-white rounded-2xl shadow-xl max-w-3xl w-full p-10 md:flex  md:m-0 m-2">
        {/* <Login />bg-gradient-to-br from-[#0e162f] to-[#1a1f3d] */}
        {/* <Register /> */}
        <Routes>
          <Route
            path="/"
            element={
              getAuthMode() === "login" ? (
                <Login onSwitch={() => handleAuthSwitch("register")} />
              ) : (
                <Register onSwitch={() => handleAuthSwitch("login")} />
              )
            }
          />
        </Routes>

        <div className="hidden md:block w-1/2">
          <img
            className="rounded-2xl"
            src={images[imgIndex]}
            alt="Login visual"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
