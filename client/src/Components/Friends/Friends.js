import React, { useState, useEffect } from "react";
import { fetchUser } from "../../api/user";
import Avatar from "../../SharedComponents/Avatar";
import "./Friends.css";

export default function Friends({ friend }) {
  const [friendDet, setFriendDet] = useState([]);
  useEffect(() => {
    fetchFriendsDetails();
  }, []);

  const fetchFriendsDetails = () => {
    fetchUser(friend).then((result) => {
      setFriendDet(result);
    });
  };

  return (
    // <div className="conversation">
    <div class="bg-white  shadow-gray-300 rounded-md mb-2 p-3 cursor-pointer flex">
      {friendDet && (
        <Avatar url={friendDet.ProfilePicture || "images/images.jpeg"} />
      )}

      {friendDet && (
        <span className="conversationName p-2">{friendDet.username}</span>
      )}
    </div>
  );
}
