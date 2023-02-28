

import axios from "axios";
// import { useState } from "react";
// const useRazorpay = (order) => {
//   console.log(order,'order11111111');
//   const [paymentError, setPaymentError] = useState(null);

export const initPayment = async (order) => {
    console.log(order,'order2222222');
    const RAZORPAY_KEY_ID = "rzp_test_NBKIQegHCsjMos";

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      order_id: order.id,
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      handler: async (response) => {

        alert('response il keriiiiiiiii')
        let res={};
        try {
          const paymentId = response.razorpay_payment_id;
          const signature = response.razorpay_signature;
          const orderId=response.razorpay_order_id;

          const verifyPaymentResponse = await axios.post("/payment/verify", {
            paymentId,
            signature,
            orderId,
          });

          if (verifyPaymentResponse.data.signatureIsValid) {

            // Payment successful, perform necessary actions
            // res.paymentStatus=true;
            // res.error='';
            return "payment-success";
          } else {

            // Payment signature invalid
           // setPaymentError("Payment signature invalid");
           return "payment-failed";
          }
        } catch (error) {
          //setPaymentError("Error verifying payment");
        }
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

//   return { initPayment, paymentError };
// };
// export default useRazorpay;

// ------------------------------------------------------------------//


// import axios from "axios";

// const useRazor=()=>{

//     const initPayment = (data) => {
//         const RAZORPAY_KEY_ID = "rzp_test_NBKIQegHCsjMos";
//         alert("keri");
//         alert(data);
//         console.log(data, "111data in initpayment");
//         var options = {
//           key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
//           amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//           currency: "INR",
//           name: "Acme Corp",
//           description: "Test Transaction",
//           image: "https://example.com/your_logo",
//           order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//           handler: async (response) => {
//             alert("keri2");
//             alert(response);
//             console.log(response, "222 response from handler in initpayment");
//             try {
//               const res = await axios.post("/payment/verifypayment", {
//                 response,
//               });
//               console.log(res, "pppppppppppppp");
//               if (res.data.signatureIsValid) {
//                 axios
//                   .put("/trip/enrollToTrip/" + tourdetails._id, {
//                     userId: userAuth._id,
//                   })
//                   .then((response) => {
//                     fetchTrip();
//                   })
//                   .catch((err) => {});
//               }
//             } catch (err) {
//               console.log(err);
//             }
//           },
    
//           prefill: {
//             name: "Gaurav Kumar",
//             email: "gaurav.kumar@example.com",
//             contact: "9999999999",
//           },
//           notes: {
//             address: "Razorpay Corporate Office",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };
//         var rzp1 = new window.Razorpay(options);
//         rzp1.open();
//         rzp1.on("payment.failed", function (response) {});
//         document.getElementById("rzp-button1").onclick = function (e) {
//           rzp1.open();
//           e.preventDefault();
//         };
//       };

// }

//  export default useRazor;