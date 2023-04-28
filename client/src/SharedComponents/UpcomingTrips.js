import React, { useState, useEffect } from "react";
import Axios from "../Utils/Axios";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import useFetchUser from "../Utils/useFetchUser";
import moment from "moment";
import Card from "./Card";

function Trip({ trips }) {
  const host = useFetchUser(trips?.hostId);
  const departureDate = trips?.tripData?.departureDate;
  const formattedDepartureDate = moment(departureDate).format("YYYY-MM-DD");

  return (
    <>
     <Card>
      <Link to={`/trip-details?tripId=${trips._id}`}>      
        <div className="max-w-sm w-full lg:max-w-full lg:flex pt-4">
        <img
                src={trips.destinationData.tripImages[0]}
                className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                alt=""
              />     
          <div 
          style={{minWidth:'78%'}} 
          className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">

            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                9 Members only
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {trips?.tripData?.tripName}
              </div>
              <p className="text-gray-700 text-base" 
              style={{wordWrap: 'break-word'}}>
                {trips?.tripData?.tripDescription}
              </p>
            </div>
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={
                  host?.ProfilePicture
                    ? host?.ProfilePicture
                    : "images/images.jpeg"
                }
                alt="Avatar of Jonathan Reinink"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{host?.username}</p>
                <p className="text-gray-600">{formattedDepartureDate}</p>
              </div>
            </div>
          </div>
        
        </div>      
      </Link>
      </Card>
    </>
  );
}

function UpcomingEvents() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    Axios
      .get("/trip/getAlltrips")
      .then((res) => {
        setTrips(res.data.trips);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Layout>
      <div>
        {trips.map((trip) => (
          <Trip
            key={trip._id}
            trips={trip}
          />
        ))}
      </div>
    </Layout>
  );
}

export default UpcomingEvents;
