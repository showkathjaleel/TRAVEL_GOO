import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { AuthContext } from '../../Context/AuthContext';
import { AuthUser } from "../../Context/AuthUser";
import { useCookies } from "react-cookie";

const PrivateRoute = () => {
  const [cookies] = useCookies();
  const { userAuth } = useContext(AuthUser);

  // return cookies.jwt? <Outlet />   :  <Navigate to="/newlogin" /> ;

  return cookies?.jwt ? <Outlet /> : <Navigate to="/newlogin" />;
};

export default PrivateRoute;
