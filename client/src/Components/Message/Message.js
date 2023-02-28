import React from "react";
import "./Message.css";
import TimeAgo from "react-timeago";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {/* <img className="messageImg" src="" alt="" /> */}
        <p className="messageText">{message.text}</p>
      </div>

      <div className="messageBottom">
        {/* {format(message.createdAt)} */}
        {/* {message.createdAt} */}
        <TimeAgo date={new Date(message.createdAt).getTime()} />
      </div>
    </div>
  );
}

export default Message;
