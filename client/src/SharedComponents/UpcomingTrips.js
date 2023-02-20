import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import { Link } from "react-router-dom";

function Trip({ imageUrl, trips }) {
  const [host, setHost] = useState();
  console.log(trips, "trips");
  useEffect(() => {
    if (trips) {
      fetchHost();
    }
  }, []);

  const fetchHost = async () => {
    const res = await axios.get("/api/getUser/" + trips.hostId);
    setHost(res.data);
  };
  return (
    <>
      <Link to={`/trip-details?tripId=${trips._id}`}>
        <div className="max-w-sm w-full lg:max-w-full lg:flex">
          <div
            className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage:
                'url("https://media.istockphoto.com/id/1343811713/photo/tea-fields-in-kerala-india.jpg?b=1&s=170667a&w=0&k=20&c=InM1ODFV99yEQ0Ia1KWOOCkF6BboA93gC8GHdux4jHQ=")',
            }}
            title="Woman holding a mug"
          ></div>

          <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <p className="text-sm text-gray-600 flex items-center">
                <svg
                  className="fill-current text-gray-500 w-3 h-3 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                </svg>
                Members only
              </p>
              <div className="text-gray-900 font-bold text-xl mb-2">
                {trips.tripData.tripName}
              </div>
              <p className="text-gray-700 text-base">
                {trips.tripData.tripDescription}
              </p>
            </div>
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src="https://media.istockphoto.com/id/839815136/photo/tea-plantation-in-munnar-kerala.webp?s=612x612&w=is&k=20&c=XVQt3owqAzh1LseqHDoLHNABk-HvS8bRLJBCQmEQuT4="
                alt="Avatar of Jonathan Reinink"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">{host?.username}</p>
                <p className="text-gray-600">{trips.tripData.departureDate}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

function UpcomingEvents() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("/trip/getAlltrips")
      .then((res) => {
        console.log(res.data.trips, ";;;;;;;;;;;;;;;;;;;;;;;;;;;");
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
            //   imageUrl={trip.imageUrl}
            trips={trip}
          />
        ))}
      </div>
    </Layout>
  );
}

export default UpcomingEvents;
