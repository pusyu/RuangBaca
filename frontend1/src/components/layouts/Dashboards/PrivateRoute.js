import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3200/api/admin/session", { withCredentials: true });
        
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          navigate("/login"); // Redirect to login if not logged in
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login if session check fails
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (isLoggedIn === null) {
    return null; // Jangan tampilkan apapun jika status login masih dalam proses pengecekan
  }

  return isLoggedIn ? children : null; // Jika logged in, tampilkan children (halaman dashboard), jika tidak redirect ke login
};

export default PrivateRoute;
