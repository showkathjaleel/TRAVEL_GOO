import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import Avatar from "./Avatar";
import { useContext } from "react";
import Layout from "./Layout";
import { AuthUser } from "../Context/AuthUser";
// import TripMembers from "./TripMembers";
import moment from "moment";
import useFetchUser from "../Utils/useFetchUser";
//import { initPayment } from "../Utils/useRazorpay";

function TripDetails() {
  const search = useLocation().search;
  const tripId = new URLSearchParams(search).get("tripId");
  const [tourdetails, setTourDetails] = useState();
  const { userAuth } = useContext(AuthUser);
  const [members, setMembers] = useState();
  const [noOfMembers, setNoOfMembers] = useState();

  useEffect(() => {
    fetchTrip();
  }, [tripId]);

  const fetchTrip = async () => {
    const res = await axios.get("/trip/getTrip/" + tripId);
    setTourDetails(res.data.trip);
    setMembers(res.data.trip.JoinedMembers);
    setNoOfMembers(res.data.trip.JoinedMembers.length)
  };

  //  const fetchNoOfMembers=()=>{
  //     setNoOfMembers(members.length)
  //   }

  const host=useFetchUser(tourdetails?.hostId)

  // const settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   className: "slider-images",
  // };

  const departureDate = tourdetails?.tripData?.departureDate;
  const formattedDepartureDate = moment(departureDate).format("YYYY-MM-DD");
  const endingDate = tourdetails?.tripData?.endingDate;
  const formattedEndingDate = moment(endingDate).format("YYYY-MM-DD");

  const handleClick = () => {
    const amount = tourdetails.costData.accomodationCost;
    axios
      .post(
        `/payment/guideregister`,
        { amount },
        {
          withCredentials: true,
        }
      )
      .then(({ data }) => {
       initPayment(data.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };



  // --------------------------------------------------------------------------
  //payment
  const initPayment = (data) => {
    alert('ithinakath keri')
    const RAZORPAY_KEY_ID = "rzp_test_NBKIQegHCsjMos";
    var options = {
      key: RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async (response) => {
        try {
          const res = await axios.post("/payment/verifypayment", {
            response,
          });
          if (res.data.signatureIsValid) {
            axios
              .put("/trip/enrollToTrip/" + tourdetails._id, {
                userId: userAuth._id,
              })
              .then((response) => {
                fetchTrip();
              })
              .catch((err) => {});
          }
        } catch (err) {
          console.log(err);
        }
      },

      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", function (response) {});
    document.getElementById("rzp-button1").onclick = function (e) {
      rzp1.open();
      e.preventDefault();
    };
  };


  //---------------------------------------------------------------------------
  //  const [currentIndex, setCurrentIndex] = useState(0);
  // const membersToShow = tourdetails.members.slice(currentIndex, currentIndex + 4);

  // const handlePrevClick = () => {
  //   setCurrentIndex(currentIndex - 4);
  // };

  // const handleNextClick = () => {
  //   setCurrentIndex(currentIndex + 4);
  // };

  return (
    <Layout>
      <div className="flex">
        <div className="lg:col-8">
          <Card>
            <div className="flex gap-3">
              {tourdetails && <h2> {tourdetails.tripData.tripName} </h2>}
            </div>

            <div className="flex">
              <div className="relative rounded-lg overflow-hidden">
                <div className="bg-white p-6">
                  <span className="cursor-pointer">
                    <Avatar
                      url={host?.ProfilePicture || "images/images.jpeg"}
                    />
                    hosted by {host?.username}
                  </span>
                </div>
              </div>
            </div>
            <Card>
              <div className="flex gap-5 items-center mt-2">
                <div>
                  <button className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                    {noOfMembers}
                  </button>
                </div>

                <div>
                  {" "}
                  <button className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                    India{" "}
                  </button>
                </div>
                <div>
                  <button className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    3 days
                  </button>
                </div>
                <div>
                  <button className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                      />
                    </svg>
                    4 stops
                  </button>
                </div>
              </div>
            </Card>

            <div>
              <Card>
                <p className="my-2 text-sm">
                  {tourdetails?.tripData.tripDescription}
                </p>
              </Card>
            </div>

            {/* // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&  */}

            {/* <div className="bg-gray-200 p-6">
      <h3 className="text-lg font-medium">   
        9 Members</h3>
      <div className="flex overflow-x-auto">
        <button 
          className="bg-blue-500 text-white rounded-lg p-2"
          onClick={handlePrevClick} 
          disabled={currentIndex === 0}>
            Prev
        </button>
        <div className="flex">
          {membersToShow.map((member, index) => (
            <Member key={index} member={member} />
          ))}
        </div>
        <button 
          className="bg-blue-500 text-white rounded-lg p-2"
          onClick={handleNextClick} 
          disabled={currentIndex + 4 >= trip.members.length}>
            Next
        </button>
      </div>
    </div>  */}

            {/* // &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& */}
            {/* =================================================================        */}
            <Card>
              <h2>Tour Members</h2>

              <div className="flex">
                {members &&
                  members.map((member, index) => (
                    <TripMembers key={index} members={member} />
                  ))}
              </div>
            </Card>
            {/* =================================================================        */}

            {/* <Slider {...settings}>
        {members?.map((image, index) => (
          <Avatar key={index} src={image} alt={`Tour ${index + 1}`} />
        ))}
      </Slider> */}
            <h2>Tour Details</h2>
            <div className="flex">
              {tourdetails?.destinationData.locations.map((location, index) => (
                <TripDetailCard key={index} locations={location} />
              ))}
            </div>
          </Card>
        </div>

        <div
          className="px-4 py-2 flex justify-between md:block shadow-md shadow-gray-500 md:shadow-none bg-white"

          // "bg-white p-6 rounded-lg shadow-md "
          // "fixed md:static w-full bottom-0 md:w-3/12 -mb-5 gap-6"
        >
          <Card>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              {formattedDepartureDate}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              {formattedEndingDate}
            </div>

            <div className="flex">
              <div>
                <h3 className="text-lg font-medium"> PRICE : </h3>
              </div>
              <span className="text-xl font-medium">
                {tourdetails?.costData.accomodationCost}
              </span>
            </div>
            <button
              onClick={handleClick}
              className="bg-green-500 text-white py-2 px-4 rounded w-full "
            >
              Reserve
            </button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default TripDetails;

//-------------------------------------------------------------------------------

function TripMembers({ members }) {
  const [memberDetails, SetMemberDetails] = useState();

  useEffect(() => {
    const fetchMemberDetails = async () => {
      const res = await axios.get("/api/getUser/" + members);
      console.log(res.data, "SetMemberDetails");
      SetMemberDetails(res.data);
    };
    fetchMemberDetails();
  }, [members]);

  return (
    // <Card>
    <div className="member-list">
      <span>
        <Avatar
          url={
            memberDetails?.ProfilePicture
              ? "images/images.jpeg"
              : //  memberDetails.ProfilePicture
                "images/images.jpeg"
          }
        />
        <p>{memberDetails?.username}</p>
      </span>
    </div>
  );
}

function TripDetailCard({ locations }) {
  console.log(locations, "lllllllllllllll");

  return (
    <Card>
      <div>
        <p className="my-2 text-sm">{locations}</p>

        <div className="rounded-md overflow-hidden">
          <img
            src="https://cdn.pixabay.com/photo/2018/02/02/13/37/nature-3125452_960_720.jpg"
            alt=""
          />
        </div>
      </div>
    </Card>
  );
}
