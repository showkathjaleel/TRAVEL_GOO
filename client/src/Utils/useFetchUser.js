import axios from "axios";
import { useState,useEffect } from "react";

const useFetchUser=(userId)=>{
     const [user,setUser]=useState(null);
 
    //Get data from API
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`api/getUser/${userId}`);
        setUser(res.data);    
      };
        fetchUser();
      }, [userId]);

      //return user Data
     return  user?user : null;  
      
}

export default useFetchUser;