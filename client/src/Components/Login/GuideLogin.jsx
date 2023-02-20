import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'
import axios from 'axios'


function GuideLogin() {
    const [bool,setBool]=useState(false)
    const [err,setErr]=useState()
    const [formError,setFormError]= useState({})
    const[islogin,setIslogin]=useState(false)

  //  const handleClick=()=>{
  //  axios
  //  }

   const passwordView=()=>{
     bool? setBool(false):setBool(true)
 
   }
     
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
       alert(data)
       setFormError(validate(data));
         setIslogin(true)
  
 }
 
 

 useEffect(()=>{
   console.log(formError);
   if(Object.keys(formError).length === 0 && islogin){
  
 
   const userData = {
         username:data.username,
         email: data.email,
         password: data.password,
         confirmpassword:data.confirmpassword,
         phone:data.phone,
         isGuide:true,
         amount:500
       };
        
       
     const initPayment=(data)=>{
    const RAZORPAY_KEY_ID= 'rzp_test_NBKIQegHCsjMos'
       alert('keri')
console.log(data,'111data in initpayment');
      var options = {
        "key": RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler":async(response)=>{
          alert(response);
          console.log(response,'222 response from handler in initpayment');
           try{
          const res=await axios.post("/payment/verifypayment",{
            response
          })
          console.log(res,'pppppppppppppp');
          if(res.data.signatureIsValid){
            // axios.post('/auth/register',userData)
            
            axios.post(`/auth/register`,userData
            ).then((response) => {  
             console.log(response.status);
             console.log(response.data.token);
           navigate('/newlogin')
          }).catch((err)=>{
            
          })

            
           navigate('/newlogin')

          }

           }catch(err)
           {
            console.log(err);
           }
        },
        //  function (response){
        //     alert(response.razorpay_payment_id);
        //     alert(response.razorpay_order_id);
        //     alert(response.razorpay_signature)
        // },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    // rzp1.on('payment.failed', function (response){
    //         alert(response.error.code);
    //         alert(response.error.description);
    //         alert(response.error.source);
    //         alert(response.error.step);
    //         alert(response.error.reason);
    //         alert(response.error.metadata.order_id);
    //         alert(response.error.metadata.payment_id);
    // });
    // document.getElementById('rzp-button1').onclick = function(e){
    //     rzp1.open();
    //     e.preventDefault();
    // }

  }  



       axios.post(`/payment/guideregister`,userData,
       {
         withCredentials:true
       })
      .then(({data}) => { 
        console.log(data,'llllllllllllll'); 
        initPayment(data.data)
//----------------------------------------------------------------------------------   
          
     
     }).catch((err)=>{
       console.log(err);
       alert(err)
     })   
   } 
 },[formError])
 
 
 
 
 
 
 
 
 function validate(data){
   console.log('log in validate of signup');
   console.log(data);
   console.log('log in validate of signup');
   const error = {};
   const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   // const usernameRegex = /^[a-zA-Z0-9]$/;
   const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
 
   if(!data.username){
     error.username="Username is Required";
   }
   // else if(!usernameRegex.test(data.username)){
   //   error.username=" Username can contain only alphanumeric characters"
   // }
 
 if(!data.email){
   error.email = "Email Required!"
 }else if(!regex.test(data.email)){
     error.email = "Enter a Valid Email"
 } 
 
 if(!data.password){
   error.password = "Password is Required!"
 }else if (data.password.length < 4){
   error.password = "Password must be more than 4 characters";
 }
 else if (data.password.length >  12){
   error.password = "Password cannot exceed more than 12 characters";
 }
 
 if(!data.confirmpassword){
   error.confirmpassword = "ConfirmPassword is Required!"
 }else if (data.password !== data.confirmpassword) {
   error.confirmpassword='Passwords do not match';
 }
 if(!data.phone){
   error.phone = "Phone Number is Required!"
 }else if(!phoneRegex.test(data.phone)){
     error.phone = "Enter a Valid Phone Number"
 } 
 
 return error
 }
  return (
    <div>


<section className="bg-gray-50 min-h-screen flex items-center justify-center">
   
   <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
   
     <div className="md:w-1/2 px-8 md:px-16">
       <h2 className="font-bold text-2xl text-[#002D74]"> Sign up to be a travel guide </h2>

       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
         <input
           className="p-2 mt-8 rounded-xl border"
         type="text" 
         name='username' 
         value={data.username}
         onChange={handleChange}            
           placeholder="Username"
           autoComplete='off'
         />
          <p className="block text-red-700 text-sm font-bold mb-2">{formError.username}</p>
          <input
           className="p-2  rounded-xl border"
           type="text"
           name='email'
           value={data.email}
          onChange={handleChange}        
           placeholder="Email"
           autoComplete='off'
         />

       <p className="block text-red-700 text-sm font-bold mb-2">{formError.email}</p>
         <div className="relative">
           
           <input
             className="p-2 rounded-xl border w-full"
             type={bool?"text":"password"}
               name='password'
                value={data.password}
                onChange={handleChange}
              placeholder="Password"
              autoComplete='off'
           />
            {  !bool && 
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
}


         {bool && 
         <svg onClick={passwordView}
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
           <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
           <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
           <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
           </svg>
           }



         </div>

         <p className="block text-red-700 text-sm font-bold mb-2">{formError.password}</p>
         <div className="relative">
           <input
             className="p-2 rounded-xl border w-full"
             type="password"
         name='confirmpassword'
          value={data.confirmpassword}
         onChange={handleChange}
             placeholder="ConfirmPassword"
             autoComplete='off'
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
         <p className="block text-red-700 text-sm font-bold mb-2">{formError.confirmpassword}</p>

         <input
           className="p-2 rounded-xl border"
           type="number" 
            name='phone'
             value={data.phone}
            onChange={handleChange}           
           placeholder="Phone Number"
           autoComplete='off'
         />
          <p className="block text-red-700 text-sm font-bold mb-2">{formError.phone}</p>

          {/* <label htmlFor="bio">Short bio:</label> */}
      <textarea id="bio" name="bio"  placeholder='Short bio:'/>
      {/* <br /> */}

      <label htmlFor="picture">Profile picture:</label>
      <input type="file" id="picture" name="picture" />
      <br />

      <input type="checkbox" id="terms" name="terms" />
      <label htmlFor="terms">I accept the terms and conditions and privacy policy</label>
      <br />

         <button 
         className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
         Pay 500 and  Signup
         </button>
       </form>
       
       
       <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
         <hr className="border-gray-400" />
         <p className="text-center text-sm">OR</p>
         <hr className="border-gray-400" />
       </div>

       <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
         <p>Already have an account?</p>
         <Link to='/login'>
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
     alt="signupImage"/>
     </div>
   </div>
 </section>
























        {/* <form>
      <h1>Sign up to be a travel guide</h1>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" />
      <br />
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" />
      <br />
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" name="password" />
      <br />
      <label htmlFor="phone">Phone number:</label>
      <input type="tel" id="phone" name="phone" />
      <br />
      <label htmlFor="bio">Short bio:</label>
      <textarea id="bio" name="bio" />
      <br />
      <label htmlFor="picture">Profile picture:</label>
      <input type="file" id="picture" name="picture" />
      <br />
      <input type="checkbox" id="terms" name="terms" />
      <label htmlFor="terms">I accept the terms and conditions and privacy policy</label>
      <br />
      <button type="submit">Sign up</button>
    </form> */}

    </div>
  )
}

export default GuideLogin