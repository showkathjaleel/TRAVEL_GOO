import React from "react";
import Layout from "./Layout";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { validate } from "../Utils/helper";
import { validateDestination } from "../Utils/helper";
import { createTrip } from "../api/trip";
import { useSelector } from "react-redux";

function RegisterEvent() {
  const userId=useSelector(store=>store.user.userId)
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    departureDate: "",
    endingDate: "",
    tripName: "",
    tripDescription: "",
    tripSnippet: "",
    totalMembers: "",
  });
  const [eventDataError, setEventDataError] = useState({});
  const [isEventDataError, setIsEventDataError] = useState(false);
  const [link, setLink] = useState("");
  // const [destinationDetails, setDestinationDetails] = useState({
  //   images:[],
  //   locations:[],
  //   activities: [],
  // });
  const [inputCount, setInputCount] = useState(1);
  const [locations, setLocations] = useState([]);
  const [tripImages, setTripImages] = useState([]);
  const [activities, setActivities] = useState([]);
  const [nextValue, setNextValue] = useState(1);
  const [destError, setDestError] = useState({});
  const [isDestError, setIsDestError] = useState(false);

  const [cost, setCost] = useState({
    accomodationCost: 0,
    transportationCost: 0,
    otherCost: 0,
    totalCost: 0,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setEventData({
      ...eventData,
      [e.target.name]: value,
    });
  };

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

  const sendTripData = (e) => {
    e.preventDefault();
    createTrip(
      eventData,
      tripImages,
      locations,
      activities,
      cost,
      userId
    ).then((res) => {
      navigate("/upcoming-events");
    });
  };

  const firstNext = (e) => {
    e.preventDefault();
    setEventDataError(validate(eventData));
    setIsEventDataError(true);
  };

  useEffect(() => {
    if (Object.values(eventDataError).length === 0 && isEventDataError)
      setNextValue(2);
  }, [eventDataError, isEventDataError]);

  const secondNext = (e) => {
    e.preventDefault();
    setDestError(validateDestination(locations, activities, inputCount));
    setIsDestError(true);
  };

  useEffect(() => {
    if (Object.values(destError).length === 0 && isDestError) setNextValue(3);
  }, [destError, isDestError]);

  const disabled = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    let month = today.getMonth() + 1;
    dd = "" + today.getDate();
    mm = "" + month;

    yyyy = "" + today.getFullYear();
    if (dd.length < 2) {
      dd = 0 + dd;
    }

    if (mm.length < 2) {
      mm = 0 + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
  };

  //-----------------------------------------------------------------

  return (
    <div className="pt-5">
      <Layout>
        {nextValue === 1 && (
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <p className="block text-red-700 text-sm font-bold mb-2">
                {eventDataError?.departureDate}
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
                min={disabled()}
                id="departureDate"
                name="departureDate"
                value={eventData.departureDate}
                onChange={handleChange}
              />
              <p className="block text-red-700 text-sm font-bold mb-2">
                {eventDataError?.endingDate}
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
                min={disabled()}
                id="endingDate"
                name="endingDate"
                value={eventData.endingDate}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <p className="block text-red-700 text-sm font-bold mb-2">
                {eventDataError?.tripName}
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
              {eventDataError?.tripDescription}
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
              {eventDataError?.tripSnippet}
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Next
            </button>
          </form>
        )}

        {nextValue === 2 && (
          <>
            <form onSubmit={submitDestination}>
              {[...Array(inputCount)].map((_, index) => (
                <div className="flex flex-col items-center" key={index}>
                  <div>
                    <span className="w-64 h-64 rounded-full overflow-hidden mb-6">
                      <img
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
                         hidden
                        type="file"
                        name="images"
                        // value={destinationDetails.images}
                        multiple
                        onChange={(event) => {
                          const updatedImages = Array.from(event.target.files);
                          setTripImages((prev) => [...prev, ...updatedImages]);
                          //setFile(URL.createObjectURL(tripImages[index] || ""))
                        }}
                        //   onChange={(event) => {
                        //   const files = Array.from(event.target.files); // get the uploaded file(s)
                        //   const updatedImages = [...destinationDetails.images]; // create a copy of current images
                        //   files.forEach((file) => {
                        //     updatedImages.push(file); // add the uploaded file to the images array
                        //   });
                        //   setDestinationDetails({
                        //     ...destinationDetails,
                        //     images: updatedImages, // update the images state with the new file(s)
                        //   });
                        // }}

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
                    // onChange={(event) => {
                    //   const updatedLocations = [...destinationDetails.locations]; // create a copy of current images
                    //   updatedLocations[index] = event.target.value;
                    //   setDestinationDetails({
                    //     ...destinationDetails,
                    //     locations: updatedLocations, // update the images state with the new file(s)
                    //   });
                    // }}

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
                    // onChange={(event) => {
                    //   const updatedactivities= [...destinationDetails.activities]; // create a copy of current images
                    //   updatedactivities[index] = event.target.value;
                    //   setDestinationDetails({
                    //     ...destinationDetails,
                    //     activities: updatedactivities, // update the images state with the new file(s)
                    //   });
                    // }}

                  />
                  what do you do / visit in this place
                </div>
              ))}

              <p className="block text-red-700 text-sm font-bold mb-2">
                {" "}
                {destError?.activities}
              </p>

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
          </>
        )}

        {/* 0000000000000000000000000000000000000000000000000000000000000     */}

        {nextValue === 3 && (
          <>
            <form>
              <div className="flex flex-col items-center">
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
          </>
        )}
      </Layout>
    </div>
  );
}

export default RegisterEvent;
