
// import React, { useContext } from 'react'
// import axios from 'axios';
// import { AuthUser } from '../../Context/AuthUser';
// import jwt_decode from 'jwt-decode';

// export const Axios=() =>{
//  const {userAuth,setUserAuth}= useContext(AuthUser)
//   const refreshToken = async () => {
//     try {
//       const res = await axios.post("/refresh", { token: userAuth.refreshToken });
//       setUserAuth({
//         ...userAuth,
//         accessToken: res.data.accessToken,
//         refreshToken: res.data.refreshToken,
//       });
//       return res.data;
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
//   const axiosJWT = axios.create()
  
//   axiosJWT.interceptors.request.use(
//     async (config) => {
//       let currentDate = new Date();
//       const decodedToken = jwt_decode(userAuth.accessToken);
//       if (decodedToken.exp * 1000 < currentDate.getTime()) {
//         const data = await refreshToken();
//         config.headers["authorization"] = "Bearer " + data.accessToken;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   return axiosJWT;
// }

// import React, { useContext } from 'react'
// import { AuthUser } from '../../Context/AuthUser';
// function TokenFetch() {
//    const {userAuth}=useContext(AuthUser)
//    return userAuth?.accessToken

// }

// export default TokenFetch
  