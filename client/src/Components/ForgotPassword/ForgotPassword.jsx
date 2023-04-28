import React, { useEffect } from "react";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import app from '../../Firebase/Firebase';
import { auth } from "../../Firebase/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { async } from '@firebase/util';
import { useNavigate } from "react-router-dom";
import Axios from "../../Utils/Axios";
import { validateForgotPassword } from "../../Utils/helper";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [bool, setBool] = useState(false);
  const [confirmOtp, setConfirmOtp] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState({});
  const [isForgot, setIsForgot] = useState(false);
  const navigate = useNavigate();

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
    setFormError(validateForgotPassword(phone));
    setIsForgot(true);
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isForgot) {
      Axios.post("auth/forgotpassword", { phone }).then(({ data }) => {
        // if (data.userexist) {
          configureCaptcha(phone)
            .then((response) => {
              setConfirmOtp(response);
              setBool(true);
            })
            .catch((err) => {

          ((error) => {
        toast.error(error.response.data.msg, {
            position: "top-center",
        });
    })(err);
            });
        // } else {
        // toast.error('User Not Found')
        // }
      });
    }
  });

  const otpVerifier = async (e) => {
    e.preventDefault();
    if (otp === null && otp === "") return;
    try {
      setError("");
      await confirmOtp.confirm(otp);
      const {data}=await Axios.post('auth/otplogin',{
        phone
      })
      console.log(data,'data in forgotpassword')
      document.cookie = `jwt=${data}`;
      navigate("/");
      toast.success('Login successful!');
  
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
  );
}

export default ForgotPassword;
