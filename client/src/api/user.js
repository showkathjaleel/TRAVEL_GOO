import Axios from "../Utils/Axios";
import jwt_decode from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchUser = async (userId) => {
  try {
    const { data } = await Axios.get(`/api/getUser/${userId}`);
    return data;
  } catch (err) {
    console.log(err, "error in fetchUser");
  }
};

export const followUser = async (postUserId, currentUser) => {
  try {
    const { data } = await Axios.put("/api/followUser/" + postUserId, {
      currentuser: currentUser,
    });
    return data;
  } catch (err) {
    console.log(err, "error in followUser");
  }
};

export const updateUser = async (uId, name, place, userId) => {
  try {
    const { data } = await Axios.put("api/updateUser/" + uId, {
      username: name,
      city: place,
      userId,
    });
    return data;
  } catch (err) {
    console.log(err, "err in updateUser");
  }
};

export const registerUser=async(userData)=>{
  try{
    const {data}=await Axios.post(`auth/register`, userData, {
      withCredentials: true,
    })
    console.log(data,'oooooooooooooooooooooo')
    return data;
  }catch(err){
    console.log(err,'errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr')
    throw err;
    
  }
}
export const updateUserCoverImg=async(file,userId)=>{
  const formdata = new FormData();
  formdata.append("image",file)
  formdata.append("userId", userId) 
    try {
      const {data}= await Axios.put('api/updateCoverPicture/' + userId,
        formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
        return data;
    }catch(err){
      console.log(err);
    } 
}

export const updateProfileImg=async (file,userId)=>{
  const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("userId", userId);
      try {
       const {data}= await Axios.put("api/updateProfilePicture/" + userId, formdata, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(data,'dataa')
        return data;
      } catch (err) {
        console.log(err)
      } 
    
}

export const decodeUserId=async(token)=>{
  const decoded =await jwt_decode(token);
  console.log(decoded,'decoded')
  const userId=decoded.id
  console.log(userId,'decoded')
  return userId
}

