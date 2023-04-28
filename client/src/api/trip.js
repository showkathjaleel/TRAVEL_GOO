import Axios from "../Utils/Axios";

export const createTrip = async (
  eventData,
  tripImages,
  locations,
  activities,
  cost,
  userId
) => {
  const formdata = new FormData();
  console.log(tripImages,'image in formdata');
  tripImages.forEach((image) => {
    formdata.append("images", image);
  });
  formdata.append("locations", locations);
  formdata.append("activities", activities);
  formdata.append("departureDate", eventData.departureDate);
  formdata.append("endingDate", eventData.endingDate);
  formdata.append("tripName", eventData.tripName);
  formdata.append("tripDescription", eventData.tripDescription);
  formdata.append("totalMembers", eventData.totalMembers);
  formdata.append("accomodationCost", cost.accomodationCost);
  formdata.append("transportationCost", cost.transportationCost);
  formdata.append("otherCost", cost.otherCost);
  formdata.append("totalCost", cost.totalCost);
  formdata.append("hostId", userId);

  await Axios.post(`/trip/addTrip`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return "success";
};

// export const enrollToTrip=async()=>{
//  const {data}=await axios.put("/trip/enrollToTrip/" + tourdetails._id, {
//     userId: userAuth._id,
//   })
// }
