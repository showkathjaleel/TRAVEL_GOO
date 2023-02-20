import React, { useEffect } from "react";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import app from '../../Firebase/Firebase';
import { auth } from "../../Firebase/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { async } from '@firebase/util';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [bool, setBool] = useState(false);
  const [confirmOtp, setConfirmOtp] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({});
  const [isForgot, setIsForgot] = useState(false);
  const Navigate = useNavigate();

  const configureCaptcha = (phone) => {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, phone, recaptchaVerifier);
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();

    setFormError(valid(phone));

    setIsForgot(true);

    // setError("")
    // if (phoneNumber === "" || phoneNumber === undefined) return setError("Enter a valid Phone Number");
    // try {
    //   const response = await configureCaptcha(phone);
    //   console.log(response, 'response');
    //   setConfirmOtp(response)
    //   setBool(true)
    // } catch (err) {
    //   console.log(err);
    //   setError(err.message)
    // }
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isForgot) {
      axios.post("/auth/forgotpassword", { phone }).then(({ data }) => {
        if (data.userexist) {
          configureCaptcha(phone)
            .then((response) => {
              setConfirmOtp(response);
              setBool(true);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("user not exists");
          setError(data.message);
        }
      });
    }
  });

  function valid(phone) {
    // const phoneRegex = /^\+91\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    const phoneRegex = /^\+91\d{12}$/;
    const error = {};
    if (!phone === 0) {
      error.phone = "Phone Number is Required";
    } else if (phoneRegex.test(phone)) {
      error.phone = "Enter valid PhoneNumber";
    }
    return error;
  }

  const otpVerifier = async (e) => {
    e.preventDefault();
    console.log(otp);
    if (otp === null && otp === "") return;
    try {
      setError("");
      await confirmOtp.confirm(otp);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };

  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">
              Forgot Password
            </h2>

            {/* {err &&
                        <div  className="flex justify-between text-red-200 shadow-inner rounded p-3 bg-red-600" >
                        <p className="self-center">{err}</p>
                        <strong className="text-xl align-center cursor-pointer alert-del"
                        onClick={()=>setErr("")}></strong
                        >
                      </div>} */}

            {error && (
              <p className="flex justify-between text-red-200 shadow-inner rounded p-3 bg-red-600">
                {error}
              </p>
            )}

            <form
              className="flex flex-col gap-4"
              onSubmit={onSignInSubmit}
              style={{ display: !bool ? "block" : "none" }}
            >
              <label htmlFor="">Phone Number</label>
              <PhoneInput
                defaultCountry="IN"
                placeholder="Enter phone number"
                value={phone}
                onChange={setPhone}
              />

              <div id="recaptcha-container"></div>

              {/* <p className="block text-red-700 text-sm font-bold mb-2">{formError.email}</p> */}

              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                Send OTP
              </button>
            </form>

            <form
              className="flex flex-col gap-4"
              onSubmit={otpVerifier}
              style={{ display: bool ? "block" : "none" }}
            >
              <input
                className="p-2 mt-8 rounded-xl border"
                type="number"
                name="otp"
                value={otp}
                placeholder="Enter Otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              />

              {/* <p className="block text-red-700 text-sm font-bold mb-2">{formError.email}</p> */}

              <button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
                type="submit"
              >
                Verify OTP
              </button>
            </form>
          </div>

          <div className="md:block hidden w-1/2">
            <img
              className="rounded-2xl"
              src="/images/loginpageimage.avif"
              alt="loginImage"
            />
          </div>
        </div>
      </section>
    </>

    // <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
    //   <div className='hidden sm:block'>
    //     <img className='w-full h-full object-cover ' src="" alt="" />
    //   </div>

    //   <div className='bg-gray-800 flex flex-col justify-center'>
    //     <form action="" className="max-w-[400px] w-full mx-auto bg-gray-900  p-8 px-8 rounded-lg" onSubmit={onSignInSubmit} style={{ display: !bool ? "block" : "none" }} >
    //       <h2 className="text-4xl text-white font-bold text-center">Forgot Password</h2>

    //       <div className='flex flex-col text-gray-400 py-2'>
    //         <label htmlFor="">Phone Number</label>
    //         <PhoneInput defaultCountry='IN'
    //           placeholder="Enter phone number"
    //           value={phone}
    //           onChange={setPhone} />
    //         <div id='recaptcha-container'></div>
    //       </div>

    //       <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white' type='submit'
    //       >Send OTP</button>
    //     </form>

    //     <form action="" className="max-w-[400px] w-full mx-auto bg-gray-900  p-8 px-8 rounded-lg" onSubmit={otpVerifier} style={{ display: bool ? "block" : "none" }} >
    //       <h2 className="text-4xl text-white font-bold text-center">OTP PAGE</h2>
    //       <div className='flex flex-col text-gray-400 py-2'>
    //         <label htmlFor="">Phone Number</label>
    //         <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline:none'
    //           type="number" name="otp" value={otp} placeholder="Enter Otp" onChange={(e) => {
    //             setOtp(e.target.value)
    //           }} />
    //         <div id='recaptcha-container'></div>
    //       </div>
    //       <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white' type='submit'
    //       >Verify OTP</button>
    //     </form>

    //   </div>

    // </div>
  );
}

export default ForgotPassword;
