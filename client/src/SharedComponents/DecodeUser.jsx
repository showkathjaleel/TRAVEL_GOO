import React, { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthUser } from "../Context/AuthUser";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function DecodeUser() {
  const { userAuth, setUserAuth } = useContext(AuthUser);

  //  -----------------------------------------------------------------------------
  const [cookies] = useCookies([]);

  useEffect(() => {
    if (cookies?.jwt) {
      const token = cookies.jwt;
      const decoded = jwt_decode(token);
      setUserAuth(decoded._doc);
    }
  }, [cookies?.jwt]);

  //  -----------------------------------------------------------------------------

  return userAuth?.username ? <Outlet /> : <Navigate to="/newlogin" />;
}

export default DecodeUser;
