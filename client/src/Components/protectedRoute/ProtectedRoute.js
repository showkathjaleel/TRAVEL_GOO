import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  
  const [cookies] = useCookies([]);

  return cookies.jwt ? <Navigate to="/" /> : <Outlet />;
};
export default ProtectedRoute;
