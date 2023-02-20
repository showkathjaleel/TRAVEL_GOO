import React from "react";
import Layout from "./Layout";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import DestinationProvider from "./DestinationProvider";
import Card from "./Card";
import { AuthUser } from "../Context/AuthUser";
import { Link, useNavigate } from "react-router-dom";

function RegisterEvent() {
  const { userAuth } = useContext(AuthUser);
  const [eventData, setEventData] = useState({
    departureDate: null,
    tripName: "",
    tripDescription: "",
    tripSnippet: "",
    totalMembers: "",
  });

  const [link, setLink] = useState("");
  const navigate = useNavigate();
  // const categories = ['Food', 'Wellness', 'Beach', 'Culture', 'Party', 'Sport', 'Nature', 'City', 'Backpacking'];
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const [formError, setFormError] = useState({});
  const [isEvent, setIsEvent] = useState(false);

  // const [destinationDetails, setDestinationDetails] = useState({
  //   location: "",
  //   activities: "",
  // });

  const [inputCount, setInputCount] = useState(1);
  console.log(inputCount, "inputCount from Add destination from RegisterEvent");
  const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [nextValue, setNextValue] = useState(1);
  const [destError, setDestError] = useState({});
  console.log(destError, "destError in registerEvent");
  const [cost, setCost] = useState({
    accomodationCost: 0,
    transportationCost: 0,
    otherCost: 0,
    totalCost: 0,
  });
  const [tripImages, setTripImages] = useState([]);
  console.log(tripImages, "tripImagesssssssss");

  useEffect(() => {
    if (Object.keys(formError).length === 0 && isEvent) {
      const tripData = {
        departureDate: eventData.departureDate,
        endingDate: eventData.endingDate,
        tripName: eventData.tripName,
        tripDescription: eventData.tripDescription,
        totalMembers: eventData.totalMembers,
      };

      //   const formdata = new FormData();
      //   tripImages.forEach(image => {
      //     formdata.append('images', image);
      // });
      //   formdata.append("locations", locations)
      //   formdata.append("activities", activities)

      const destinationData = {
        tripImages: tripImages,
        locations: locations,
        activities: activities,
      };

      const costData = {
        accomodationCost: cost.accomodationCost,
        transportationCost: cost.transportationCost,
        otherCost: cost.otherCost,
        totalCost: cost.totalCost,
      };

      console.log("_____________________________");
      console.log(tripData);
      console.log("_____________________________");
      axios
        .post(`/trip/addTrip`, {
          tripData,
          costData,
          destinationData,
          hostId: userAuth._id,
        })
        // axios.post('/trip/addTrip',
        // formdata,{ headers: { 'Content-Type': 'multipart/form-data' } })
        .then((response) => {
          console.log(response, "responseeeeeee");
          navigate("/upcoming-events");

          //---------------------------------------------------------------------------------------

          //  <div role="alert" className="rounded-xl border border-gray-100 p-4 shadow-xl">
          //            <div className="flex items-start gap-4">
          //                <span className="text-green-600">
          //                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          //                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          //                    </svg>
          //               </span>
          //                <div className="flex-1">
          //                   <strong className="block font-medium text-gray-900"> Changes saved </strong>
          //                    <p className="mt-1 text-sm text-gray-700">
          //                        A trip is added Successfully
          //                    </p>
          //                </div>
          //                <button className="text-gray-500 transition hover:text-gray-600">
          //                    <span className="sr-only">Dismiss popup</span>
          //                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
          //                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          //                    </svg>
          //                </button>
          //            </div>
          //          </div>

          //-----------------------------------------------------------------------------------------
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }, [formError, isEvent]);

  const handleChange = (e) => {
    const value = e.target.value;
    setEventData({
      ...eventData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(validate(eventData));
    // setIsEvent(true);
  };

  function validate(eventData) {
    const error = {};

    if (!eventData.departureDate) {
      error.departureDate = "departureDate is Required";
    }

    if (!eventData.endingDate) {
      error.endingDate = "endingDate is Required";
    }

    if (!eventData.tripName) {
      error.tripName = "tripName Required!";
    } else if (eventData.tripName.length < 15) {
      error.tripName = "tripName must be more than 15 characters";
    }

    if (!eventData.tripDescription) {
      error.tripDescription = "tripDescription is Required!";
    } else if (eventData.tripDescription.length < 300) {
      error.tripDescription =
        "tripDescription must be more than 300 characters";
    }
    if (!eventData.tripSnippet) {
      error.tripSnippet = "tripSnippet is Required!";
    } else if (eventData.tripSnippet.length < 300) {
      error.tripSnippet = "tripSnippet must be more than 300 characters";
    }
    return error;
  }
  //------------------------------------------------------

  // const handleDestination = (e) => {
  //   const value = e.target.value;
  //   setDestinationDetails({
  //     ...destinationDetails,
  //     [e.target.name]: value,
  //   });
  // };

  const costChange = (e) => {
    const value = e.target.value;
    setCost({
      ...cost,
      [e.target.name]: value,
    });
  };
  const AddDestination = () => {
    setInputCount((prevInputCount) => prevInputCount + 1);
  };

  const submitDestination = (e) => {
    e.preventDefault();
    setInputCount(1);
  };

  const sendTripData = () => {
    setIsEvent(true);
  };

  //   const handleTripImage=(e)=>{
  //  e.preventDefault();
  //  alert('handleTripImageChange il keri')
  //  const file = e.target.files?.[0];
  //  console.log(file,'file in handleTripImageChange');

  //   }
  //----------------------------------------------------------
  const firstNext = () => {
    setNextValue(2);
  };
  const secondNext = (e) => {
    e.preventDefault();
    alert("secondNext il keri");
    setDestError(validateDestination(locations, activities, inputCount));
    setNextValue(3);
  };

  function validateDestination(locations, activities, inputCount) {
    const error = {};

    if (!locations.length === inputCount) {
      error.locations = "locations is Required";
    }

    if (!activities.length === inputCount) {
      error.activities = "activities is Required!";
    }

    return error;
  }
  //----------------------------------------------------------
  const CategoryCard = ({ category, isSelected, onClick }) => (
    <div
      className={`bg-gray-200 rounded-md p-2 cursor-pointer hover:bg-gray-300 ${
        isSelected ? "bg-blue-500 text-white" : ""
      }`}
      onClick={onClick}
    >
      {category}
    </div>
  );
  //-----------------------------------------------------------------
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const TripForm = () => (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <p className="block text-red-700 text-sm font-bold mb-2">
          {formError?.departureDate}
        </p>
        <label
          className="block text-gray-700 font-medium mb-2"
          htmlFor="departure-date"
        >
          Departure Date:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          id="departureDate"
          name="departureDate"
          value={eventData.departureDate}
          onChange={handleChange}
        />
        <p className="block text-red-700 text-sm font-bold mb-2">
          {formError?.endingDate}
        </p>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="ending-date"
        >
          Ending Date:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          id="endingDate"
          name="endingDate"
          value={eventData.endingDate}
          onChange={handleChange}
        />
      </div>

      {/* <div className="flex flex-wrap -mx-2">
{categories.map(category => (
<div className="mx-2 my-2" key={category}>
  <CategoryCard
    category={category}
    isSelected={selectedCategory === category}
    onClick={() => setSelectedCategory(category)}
  />
</div>
))}
</div> */}

      <div className="mb-4">
        <p className="block text-red-700 text-sm font-bold mb-2">
          {formError?.tripName}
        </p>

        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="trip-name"
        >
          Trip Name:
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="tripName"
          name="tripName"
          value={eventData.tripName}
          onChange={handleChange}
        />
      </div>

      <p className="block text-red-700 text-sm font-bold mb-2">
        {formError?.tripDescription}
      </p>

      <label htmlFor="trip-description">Trip Description:</label>
      <textarea
        id="tripDescription"
        name="tripDescription"
        rows="10"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Detailed Description of the Trip"
        value={eventData.tripDescription}
        onChange={handleChange}
      ></textarea>
      <div>what experiances and places make your trip?</div>
      <br />

      <p className="block text-red-700 text-sm font-bold mb-2">
        {formError?.tripSnippet}
      </p>

      <label htmlFor="trip-snippet">Short Description:</label>
      <textarea
        id="tripSnippet"
        name="tripSnippet"
        rows="10"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Write a snippet of the Trip"
        value={eventData.tripSnippet}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="trip-snippet">Total Number of People :</label>
      <input
        type="text"
        name="totalMembers"
        value={eventData.totalMembers}
        onChange={handleChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label htmlFor="linkInput">Trip Highlights Video:</label>
      <br />
      <input
        type="text"
        id="linkInput"
        value={link}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => setLink(e.target.value)}
      />
      <br />
      <button className="bg-purple-200 px-4 py-2 font-bold rounded-full ">
        Back
      </button>

      <button
        onClick={firstNext}
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Next
      </button>
    </form>
  );

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //#############################################################
  const destinationForm = () => (
    <div>
      <form onSubmit={submitDestination}>
        {[...Array(inputCount)].map((_, index) => (
          <div className="flex flex-col items-center" key={index}>
            <div>
              <span className="w-64 h-64 rounded-full overflow-hidden mb-6">
                <img
                  src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHw%3D&w=1000&q=80"
                  className="w-full h-full object-cover"
                  alt="tripImage"
                />
              </span>
              <label className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
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
                    d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  name="images"
                  enctype="multipart/form-data"
                  value={tripImages[index] || ""}
                  onChange={(event) => {
                    const updatedImages = [...tripImages];
                    updatedImages[index] = event.target.value;
                    setTripImages(updatedImages);
                  }}
                />
              </label>
            </div>
            <input
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              placeholder="Enter location"
              value={locations[index] || ""}
              onChange={(event) => {
                const updatedLocations = [...locations];
                updatedLocations[index] = event.target.value;
                setLocations(updatedLocations);
              }}
            />
            <p className="block text-red-700 text-sm font-bold mb-2">
              {" "}
              {destError?.locations}
            </p>
            <textarea
              rows="4"
              cols="50"
              name="activities"
              placeholder="tell us more"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-6"
              value={activities[index] || ""}
              onChange={(event) => {
                const updatedActivities = [...activities];
                updatedActivities[index] = event.target.value;
                setActivities(updatedActivities);
              }}
            />
            what do you do / visit in this place
          </div>
        ))}

        <button className="bg-purple-200 px-4 py-2 font-bold rounded-full ">
          Back
        </button>
        <button
          onClick={secondNext}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Next
        </button>
      </form>
      <button
        onClick={AddDestination}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6"
      >
        Add a Stop
      </button>
    </div>
  );
  //#############################################################
  //**************************************************** */
  const costForm = () => (
    <div>
      <form>
        <div className="flex flex-col items-center">
          {/* <div className="w-64 h-64 rounded-full overflow-hidden mb-6">
        <img
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHw%3D&w=1000&q=80"
          className="w-full h-full object-cover"
          alt="tripImage"
        />
      </div> */}
          <h3>Cost calculator</h3>
          <div>Accomodation (per TripMate)</div>
          <input
            name="accomodationCost"
            value={cost.accomodationCost}
            type="number"
            className="border border-gray-400 p-2 rounded-md w-full"
            //  "bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            onChange={costChange}
          />
          <div>Transportation(per TripMate)</div>
          <input
            name="transportationCost"
            type="number"
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={cost.transportationCost}
            onChange={costChange}
          />

          <div>Other Activities (per TripmMate)</div>
          <input
            type="number"
            name="otherCost"
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={cost.otherCost}
            onChange={costChange}
          />

          <div>Total Cost (per TripmMate)</div>
          <input
            type="number"
            name="totalCost"
            className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            value={cost.totalCost}
            onChange={costChange}
          />
        </div>
      </form>
      <button className="bg-purple-200 px-4 py-2 font-bold rounded-full ">
        Back
      </button>

      <button
        type="submit"
        onClick={sendTripData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Next
      </button>
    </div>
  );
  //**************************************************** */
  return (
    <div>
      <Layout>
        {nextValue === 1 && <TripForm />}

        {nextValue === 2 && <destinationForm />}

        {/* 0000000000000000000000000000000000000000000000000000000000000     */}

        {nextValue === 3 && <costForm />}
      </Layout>
    </div>
  );
}

export default RegisterEvent;
