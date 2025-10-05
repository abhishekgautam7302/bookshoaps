// PrivateRoute.jsx - IMPROVED VERSION
import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import toast from "react-hot-toast";

export default function PrivateRoute() {
  const [ok, setOk] = useState(null);
  const [auth, setAuth] = useAuth();
  const location = useLocation();

  useEffect(() => {
    const authCheck = async () => {
      try {
        // Get token from localStorage if not in context
        const localAuth = JSON.parse(localStorage.getItem("auth"));
        const token = auth?.token || localAuth?.token;

        if (!token) {
          setOk(false);
          return;
        }

        // Set authorization header
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Then try the actual auth check
        const res = await axios.get("/api/v1/auth/user-auth");
        
        if (res.data.ok) {
          setOk(true);
        } else {
          toast.error("User auth failed");
          setOk(false);
        }
      } catch (error) {
        toast.error("Authorization check failed:", error.response?.data || error);
        
        setOk(false);
      }
    };

    authCheck();
  }, [auth?.token]);

  if (ok === null) return <Spinner />;
  
  return ok ? <Outlet /> : <Navigate to="" state={{ from: location }} replace />;
}