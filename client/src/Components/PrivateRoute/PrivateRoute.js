import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const PrivateRoute = () => {
  const [cookies] = useCookies();
  return cookies?.jwt ? <Outlet /> : <Navigate to="/newlogin" />;
};


export default PrivateRoute;