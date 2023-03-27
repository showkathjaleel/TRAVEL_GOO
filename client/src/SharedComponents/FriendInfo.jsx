
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import Card from "./Card";
import { fetchUser } from "../api/user";

export default function FriendInfo({friends}) {
  console.log(friends,'friends in friendinfo')
  const [friendDet,setFriendDet]=useState([])
useEffect(()=>{
   fetchFriendsDetails()
},[friends])

   const fetchFriendsDetails=()=>{
    fetchUser(friends).then((result)=>{
      console.log(result)
      setFriendDet(result)

    })
   }
  return (
    <Card>
    <div className="flex gap-2">
      <Avatar url={friendDet?.ProfilePicture || "images/images.jpeg"}  />
      <div>
        <h3 className="font-bold text-xl">{friendDet?.username}</h3>
        <div className="text-sm leading-3">{friendDet?.following?.length} mutual friends</div>
      </div>
    </div>
    </Card>
  );
}

