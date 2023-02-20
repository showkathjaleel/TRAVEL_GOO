import axios from "axios"





import React, { useContext } from 'react'
import { AuthUser } from "./Context/AuthUser"
import { useCookies } from "react-cookie"

async function NewToken() {
   
  
        const {userAuth,setuserAuth}=useContext(AuthUser)
     
       const refresh=await axios.post('/api/refresh',{
        userId:userAuth._id
       })

       setuserAuth()


  }


export default NewToken






export const loginCall=async (userCredential,dispatch)=>{
    
//    console.log(userCredential,'userCredential in apiCall'); //it prints the email and password that is entered in login
    dispatch({type:"LOGIN_START"})
    try{
          const res=await axios.post(`auth/login`,userCredential)  
          console.log(res.data,'res.data in apiCall');    
          dispatch({type:"LOGIN_SUCCESS",payload:res.data})
                  
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload:err})
    }
}