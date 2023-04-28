import React, { useContext } from 'react'
import { AuthUser } from '../Context/AuthUser'
// export const TokenFetch=() =>{
//    const {userAuth}=useContext(AuthUser)
//    console.log(userAuth,'iiiiiiiiiiiiiiiiiii')
//    return userAuth?.accessToken

// }

const TokenFetch = () => {
    const { userAuth } = useContext(AuthUser)
    console.log(userAuth, 'iiiiiiiiiiiiiiiiiii')
    return userAuth?.accessToken
  }
  
  export default TokenFetch