import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ChatOnline.css";

function ChatOnline({ onlineUsers, currentUserId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/api/friends/" + currentUserId);
      setFriends(res.data);
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(
      friends?.friendList?.filter((f) => onlineUsers.includes(f._id))
    );
  }, [friends, onlineUsers]);

  //i bring the users from friendlist . So the next thing i want to do is that we have to check wheather this users are in online or not

  return (
    <div className="chatOnline">
      {onlineFriends?.map((o) => (
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={o?.profilePicture ? o.profilePicture : "images/images.jpeg"}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}

export default ChatOnline;
