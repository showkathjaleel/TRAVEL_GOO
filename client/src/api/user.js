import axios from "axios";



 export const fetchUser = async (userId) => {
    try{
        const {data} = await axios.get(`api/getUser/${userId}`);
        return data;
      
    }catch(err){
       console.log(err,"error in fetchUser");
    }
  };

export const followUser = async (postUserId,currentUser) => {
    try{
      const {data}=await axios.put("/api/followUser/" + postUserId, {
            currentuser: currentUser, 
          });
          return data;
    }
    catch(err){
        console.log(err,"error in followUser");
    }  
  };


  export const updateUser = async (uId,name,place,userId) => {
    try {
      const {data} = await axios.put("api/updateUser/" + uId, {
        username: name,
        city: place,
        userId,
      });
      return data;
    } catch (err) {
      console.log(err,'err in updateUser');
    }
  };