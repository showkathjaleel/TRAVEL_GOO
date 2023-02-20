import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup() {

    
    const [data, setData] = useState({
        username:"",
        email: "",
        password: "",
        confirmpassword:"",
        phone:""

      });
         
      const handleChange = (e) => {
        const value = e.target.value;
        setData({
          ...data,
          [e.target.name]: value
        });
      };
   
     const navigate=useNavigate()
        
     const handleSubmit=(e)=>{
      e.preventDefault();
     
      const userData = {
        username:data.username,
        email: data.email,
        password: data.password,
        confirmpassword:data.confirmpassword,
        phone:data.phone,
      };
        
      axios.post(`/auth/register`,userData
     ).then((response) => {  
      console.log(response.status);
      console.log(response.data.token);
       navigate('/login')

    }).catch((err)=>{
      console.log(err);
      alert(err)
    })
}



  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    <div className='hidden sm:block'>
    <img className='w-full h-full object-cover' src="/images/signuppageimage.avif" alt="" />
    </div>

    <div className='bg-gray-800 flex flex-col justify-center'>
      <form  className="max-w-[400px] w-full mx-auto bg-gray-900  p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
        <h2 className="text-4xl text-white font-bold text-center">Sign Up</h2>

        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor="">Username</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="text" 
          name='username' value={data.username}
           onChange={handleChange}/>
        </div>


        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor="">Email</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="text" 
          name='email' value={data.email}
           onChange={handleChange}/>
        </div>

        <div className='flex flex-col text-gray-400 py-2'>
        <label htmlFor="">Password</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="password"
           name='password' value={data.password}
           onChange={handleChange}/>
        </div>


        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor="">Confirm Password</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="password" 
          name='confirmpassword' value={data.confirmpassword}
           onChange={handleChange}/>
        </div>

        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor="">Phone Number</label>
          <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="number" 
          name='phone' value={data.phone}
           onChange={handleChange}/>
        </div>

        <div className='flex justify-between text-gray-400 py-2'>
        <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember Me</p>
        <p
         onClick={()=>{
        navigate('/forgotpassword')
        }}
        >forgot password</p>
        </div>

        <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white' type='submit' >
Sign Up</button>
      </form>
    </div>
  
  </div>
    
  )
}



export default Signup









  

  
