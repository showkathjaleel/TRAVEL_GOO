import axios from "axios";
import { useState,useEffect } from "react";

const useFetchUser=(userId)=>{
     const [user,setUser]=useState(null);

    //Get data from API
    useEffect(() => {
        fetchUser();
      }, []);

    const fetchUser = async () => {
        const res = await axios.get(`api/getUser/${userId}`);
        setUser(res.data);
      };

      //return user Data
      return user;
}

export default useFetchUser;