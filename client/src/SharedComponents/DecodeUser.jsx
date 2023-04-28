import React, { useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { AuthUser } from "../Context/AuthUser";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router-dom";

function DecodeUser() {
  const { userAuth, setUserAuth } = useContext(AuthUser);
  const [cookies] = useCookies([]);

  useEffect(() => {
    if (cookies?.jwt) {
      const token = cookies.jwt;
      // const decoded = jwt_decode(token);
      // console.log(decoded,'decoded from decodeuser')
      // const userId=decoded.id;
      // setUserAuth(userId);
      setUserAuth({accessToken:token})
    }
  }, [userAuth?.accessToken]);
  return userAuth?.accessToken? <Outlet /> : <Navigate to="/newlogin" />;
}

export default DecodeUser;
