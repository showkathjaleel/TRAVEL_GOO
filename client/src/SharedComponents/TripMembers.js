// import React, { useEffect,useState } from 'react'
// import axios from 'axios';
// import Avatar from './Avatar';
// function TripMembers({members}) {

//     console.log(members,'memberrrrrrrrrrrrrrr');
//      const [memberDetails,SetMemberDetails]=useState()
//      console.log(memberDetails,'memberDetails');
//     useEffect(()=>{
//         const fetchMemberDetails = async () => {
//             const res = await axios.get("/api/getUser/" + members);
//             console.log(res.data, "SetMemberDetails");
//             SetMemberDetails(res.data);
//         }
//         fetchMemberDetails();

//     },[members])

//   return (
//         <div className="member-list">

//         <ul>
//             <Avatar url={memberDetails?.ProfilePicture?memberDetails.ProfilePicture:"images/images.jpeg"} />
//             <li>{memberDetails?.username}</li>
//         </ul>
//       </div>

//   )
// }

// export default TripMembers
