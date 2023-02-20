import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Signupp() {
  const [bool, setBool] = useState(false);
  const [err, setErr] = useState();
  const [formError, setFormError] = useState({});
  const [islogin, setIslogin] = useState(false);
  const passwordView = () => {
    bool ? setBool(false) : setBool(true);
  };

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(data);
    setFormError(validate(data));
    setIslogin(true);

    //   const userData = {
    //     username:data.username,
    //     email: data.email,
    //     password: data.password,
    //     confirmpassword:data.confirmpassword,
    //     phone:data.phone,
    //   };

    //   axios.post(`/auth/register`,userData
    //  ).then((response) => {
    //   console.log(response.status);
    //   console.log(response.data.token);
    //    navigate('/login')

    // }).catch((err)=>{
    //   console.log(err);
    //   alert(err)
    // })
  };

  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0 && islogin) {
      console.log(formError);

      const userData = {
        username: data.username,
        email: data.email,
        password: data.password,
        confirmpassword: data.confirmpassword,
        phone: data.phone,
      };

      axios
        .post(`/auth/register`, userData, {
          withCredentials: true,
        })
        .then(({ data }) => {
          if (data.bool) {
            setErr(data.message);
          } else {
            navigate("/newlogin");
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }, [formError]);

  function validate(data) {
    console.log("log in validate of signup");
    console.log(data);
    console.log("log in validate of signup");
    const error = {};
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const usernameRegex = /^[a-zA-Z0-9]$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    if (!data.username) {
      error.username = "Username is Required";
    }
    // else if(!usernameRegex.test(data.username)){
    //   error.username=" Username can contain only alphanumeric characters"
    // }

    if (!data.email) {
      error.email = "Email Required!";
    } else if (!regex.test(data.email)) {
      error.email = "Enter a Valid Email";
    }

    if (!data.password) {
      error.password = "Password is Required!";
    } else if (data.password.length < 4) {
      error.password = "Password must be more than 4 characters";
    } else if (data.password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters";
    }

    if (!data.confirmpassword) {
      error.confirmpassword = "ConfirmPassword is Required!";
    } else if (data.password !== data.confirmpassword) {
      error.confirmpassword = "Passwords do not match";
    }
    if (!data.phone) {
      error.phone = "Phone Number is Required!";
    } else if (!phoneRegex.test(data.phone)) {
      error.phone = "Enter a Valid Phone Number";
    }

    return error;
  }

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="username"
                value={data.username}
                onChange={handleChange}
                placeholder="Username"
                autoComplete="off"
              />
              <p className="block text-red-700 text-sm font-bold mb-2">
                {formError.username}
              </p>
              <input
                className="p-2  rounded-xl border"
                type="text"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="off"
              />

              <p className="block text-red-700 text-sm font-bold mb-2">
                {formError.email}
              </p>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={bool ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="off"
                />
                {!bool && (
                  <svg
                    onClick={passwordView}
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="gray"
                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                )}

                {bool && (
                  <svg
                    onClick={passwordView}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="gray"
                    className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                )}
              </div>

              <p className="block text-red-700 text-sm font-bold mb-2">
                {formError.password}
              </p>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="password"
                  name="confirmpassword"
                  value={data.confirmpassword}
                  onChange={handleChange}
                  placeholder="ConfirmPassword"
                  autoComplete="off"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
              </div>
              <p className="block text-red-700 text-sm font-bold mb-2">
                {formError.confirmpassword}
              </p>

              <input
                className="p-2 rounded-xl border"
                type="number"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                autoComplete="off"
              />
              <p className="block text-red-700 text-sm font-bold mb-2">
                {formError.phone}
              </p>

              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Signup
              </button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <Link to="/login">
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="/images/signuppageimage.avif"
              alt="signupImage"
            />
          </div>
        </div>
      </section>
    </>

    //     <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    //     <div className='hidden sm:block'>
    //     <img className='w-full h-full object-cover' src="/images/signuppageimage.avif" alt="" />
    //     </div>

    //     <div className='bg-gray-800 flex flex-col justify-center'>
    //       <form  className="max-w-[400px] w-full mx-auto bg-gray-900  p-8 px-8 rounded-lg" onSubmit={handleSubmit}>
    //         <h2 className="text-4xl text-white font-bold text-center">Sign Up</h2>

    //         <div className='flex flex-col text-gray-400 py-2'>
    //           <label htmlFor="">Username</label>
    //           <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="text"
    //           name='username' value={data.username}
    //            onChange={handleChange}/>
    //         </div>

    //         <div className='flex flex-col text-gray-400 py-2'>
    //           <label htmlFor="">Email</label>
    //           <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="text"
    //           name='email' value={data.email}
    //            onChange={handleChange}/>
    //         </div>

    //         <div className='flex flex-col text-gray-400 py-2'>
    //         <label htmlFor="">Password</label>
    //           <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="password"
    //            name='password' value={data.password}
    //            onChange={handleChange}/>
    //         </div>

    //         <div className='flex flex-col text-gray-400 py-2'>
    //           <label htmlFor="">Confirm Password</label>
    //           <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="password"
    //           name='confirmpassword' value={data.confirmpassword}
    //            onChange={handleChange}/>
    //         </div>

    //         <div className='flex flex-col text-gray-400 py-2'>
    //           <label htmlFor="">Phone Number</label>
    //           <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none' type="number"
    //           name='phone' value={data.phone}
    //            onChange={handleChange}/>
    //         </div>

    //         <div className='flex justify-between text-gray-400 py-2'>
    //         <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember Me</p>
    //         <p
    //          onClick={()=>{
    //         navigate('/forgotpassword')
    //         }}
    //         >forgot password</p>
    //         </div>

    //         <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white' type='submit' >
    // Sign Up</button>
    //       </form>
    //     </div>

    //   </div>
  );
}

export default Signupp;
