import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";

const ProtectedRoute = () => {
  
  const [cookies] = useCookies([]);
  console.log("this is protttttttttttttttttttttttttttected Route:",cookies.jwt);

  // return userAuth.accessToken ? <Navigate to="/" />   :  <Outlet /> ;

  return cookies.jwt ? <Navigate to="/" /> : <Outlet />;
};
export default ProtectedRoute;
