import React, { useState } from "react";

function DestinationProvider({ bool }) {
  const [destinationDetails, setDestinationDetails] = useState({
    location: "",
    activities: "",
  });
  const [inputCount, setInputCount] = useState(1);

  const handleDestination = (e) => {
    const value = e.target.value;
    setDestinationDetails({
      ...destinationDetails,
      [e.target.name]: value,
    });
  };

  const AddDestination = () => {
    alert("AddDestination il keri");
    setInputCount((prevInputCount) => prevInputCount + 1);
  };

  const submitDestination = (e) => {
    e.preventDefault();
    setInputCount(1);
  };

  return (
    <div>
      {" "}
      <form
        onSubmit={submitDestination}
        style={{ display: bool ? "block" : "none" }}
      >
        {[...Array(inputCount)].map((_, index) => (
          <div className="flex flex-col items-center">
            <div className="w-64 h-64 rounded-full overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRyYXZlbHxlbnwwfHwwfHw%3D&w=1000&q=80"
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <input
              key={index}
              type="text"
              placeholder="Enter location"
              name="location"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
              value={destinationDetails.location}
              onChange={handleDestination}
              //   className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            />
            <textarea
              key={index}
              rows="4"
              cols="50"
              name="activities"
              className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mt-6"
              value={destinationDetails.activities}
              onChange={handleDestination}
            />
            what do you do / visit in this place
            <button
              onClick={AddDestination}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-6"
            >
              Add a Stop
            </button>
          </div>
        ))}
      </form>
    </div>
  );
}

export default DestinationProvider;
