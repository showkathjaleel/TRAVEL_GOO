
import {useContext, useState} from "react";
import Preloader from "./Preloader";
import { AuthUser } from "../Context/AuthUser";
import axios from "axios";

// import {uploadUserProfileImage} from "../helpers/user";

export default function Cover({url,editable,onChange}) {

  const [isUploading,setIsUploading] = useState(false);
  const {userAuth}=useContext(AuthUser)


  async function updateCover(ev) {
  
    const msg="coverPicture";
    const file = ev.target.files?.[0];
    const formdata = new FormData();
    formdata.append("image", file)
    formdata.append("userId", userAuth._id)
    formdata.append("data",msg)
    if (file) {
      setIsUploading(true);    
      try {
        const res = await axios.put('api/updateUser/' + userAuth._id,
          formdata, { headers: { 'Content-Type': 'multipart/form-data' } })
          setIsUploading(false);
          if(onChange)onChange();
      }catch(err){
        console.log(err);
      }
   
    }
  }
  return (
    <div className="h-36 overflow-hidden flex justify-center items-center relative">
      <div>
        <img src={url} alt=""/>
      </div>
      {isUploading && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center z-10">
          <div className="inline-block mx-auto">
            <Preloader />
          </div>
        </div>
      )}
      {editable && (
        <div className="absolute right-0 bottom-0 m-2">
          <label className="flex items-center gap-1 bg-white py-1 px-2 rounded-md shadow-md shadow-black cursor-pointer">
            <input type="file" onChange={updateCover} className="hidden" />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
            Change cover image
          </label>
        </div>
      )}
    </div>
  );
}