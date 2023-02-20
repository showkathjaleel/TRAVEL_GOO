import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  console.log("this is protttttttttttttttttttttttttttected Route");
  const [cookies] = useCookies([]);

  // return userAuth.accessToken ? <Navigate to="/" />   :  <Outlet /> ;

  return cookies.jwt ? <Navigate to="/" /> : <Outlet />;
};
export default ProtectedRoute;
