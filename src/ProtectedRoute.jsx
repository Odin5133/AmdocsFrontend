import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const access = Cookies.get("access");
  const refresh = Cookies.get("refresh");

  useEffect(() => {
    const verifyAccessToken = async () => {
      if (!access || !refresh) {
        console.log("error: missing tokens");
        setIsAuthenticated(false);
        return;
      }

      try {
        // Verify the access token with the Djoser endpoint
        await axios.post(
          "https://amdocs-backend.onrender.com/auth/jwt/verify/",
          {
            token: access,
          }
        );
        setIsAuthenticated(true);
      } catch (error) {
        try {
          // If access token is invalid, attempt to refresh it
          const response = await axios.post(
            "https://amdocs-backend.onrender.com/auth/jwt/refresh/",
            { refresh }
          );
          const newAccessToken = response.data.access;

          if (newAccessToken) {
            Cookies.set("access", newAccessToken, {
              secure: true,
              sameSite: "Strict",
            });
            setIsAuthenticated(true);
          } else {
            console.log("error: refresh token did not return new access token");
            setIsAuthenticated(false);
          }
        } catch (refreshError) {
          console.log("error: refreshing access token failed");
          setIsAuthenticated(false);
        }
      }
    };

    verifyAccessToken();
  }, [access, refresh]);

  useEffect(() => {
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  if (isAuthenticated === null) return null;

  return !isAuthenticated && <Navigate to="/auth?mode=login" replace />;
};

export default ProtectedRoute;
