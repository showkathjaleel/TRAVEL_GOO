import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Conversation.css";

function Conversation({ conversation, currentUserId }) {
  console.log(currentUserId, "from conversation");
  const [user, setUser] = useState(null); //this user means the  one who communicated with user
  console.log(user, "sadik inte friends");
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUserId);
    const getUser = async () => {
      try {
        const res = await axios.get("/api/getUser/" + friendId);
        setUser(res.data); //This response.data contains the information of user who had conversation
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className="conversation">
      {user && (
        <img
          className="conversationImg"
          src={user.ProfilePicture ? user.ProfilePicture : "images/images.jpeg"}
        />
      )}

      {user && <span className="conversationName">{user.username}</span>}
    </div>
  );
}

export default Conversation;
