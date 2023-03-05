import React, { useCallback, useContext, useEffect, useState } from "react";
import "./Chat.css";
import Conversation from "../Conversation/Conversation";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import axios from "axios";
import { AuthUser } from "../../Context/AuthUser";
import { useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

function Chat() {
  console.log("chat");
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userAuth } = useContext(AuthUser);
  const [bool, setBool] = useState(false);
  const [roomNumber, setRooomNumber] = useState();
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));
  const navigate = useNavigate();

  const userId = userAuth._id;

  // console.log(userId);
  // console.log(conversations,'conversations with each friends');//it is printing the conversations which have members,its id,createdAt etc
  // console.log(arrivalMessage,'arrivalMessage in chat js'); // it is coming us null after a message is sent
  // console.log(currentChat,'currentChat,$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$conversations with each friends');
  // console.log(messages,'messages in chat js');  //it has sender id,message id and conversation id and text of all the messages sent to a specific user

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", userId);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
      console.log(users, "friends circle ilulla users"); // here the userid and socket id of logged in user is shown.But it should show another user also.
    });
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: userId,
      text: newMessage,
      ConversationId: currentChat._id,
    };

    const recieverId = currentChat.members.find((member) => member !== userId);

    socket.current.emit("sendMessage", {
      senderId: userId,
      recieverId: recieverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/message", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversation/getconversation/" + userId);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  console.log(conversations,'conversations in chat');

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/message/getmessage/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ bahaviour: "smooth" });
  }, [messages]);

  const handleVideoButton = () => {
    // setBool(true);
    navigate('/room');
  };

  const handleJoinRoom = useCallback(() => {
    // navigate(`/room/${roomNumber}`);
    navigate('/room');
  }, []);

  return (
    <>
      <div className="h-[32rem] flex ">
        <div className="ChatMenu">
          <div className="ChatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c,index) => (
              <div  key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  // key={c._id}
                  conversation={c}
                  currentUserId={userId}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="ChatBox">
          <div className="ChatBoxWrapper">
            {currentChat ? (
              <>
                <div className="ChatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message
                        key={m._id}
                        message={m}
                        own={m.sender === userId}
                      />
                    </div>
                  ))}
                </div>
                <div className="ChatBoxBottom">
                  <textarea
                    className="ChatMessageInput"
                    placeholder="write something..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  ></textarea>
                  <button className="ChatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                  <button onClick={handleVideoButton}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                  </button>

                  {bool && (
                    <>
                      <input
                        value={roomNumber}
                        onChange={(e) => setRooomNumber(e.target.value)}
                        type="text"
                        placeholder="Enter Room Code"
                      />
                      <button onClick={handleJoinRoom}>Join</button>
                    </>
                  )}
                </div>
              </>
            ) : (
              <span className="noConversationText">open a conversation</span>
            )}
          </div>
        </div>

        <div className="ChatOnline">
          <div className="ChatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={userId}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
