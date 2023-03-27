import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import Message from "../Message/Message";
import ChatOnline from "../ChatOnline/ChatOnline";
import axios from "axios";
import { AuthUser } from "../../Context/AuthUser";
import { useRef } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../../api/user";
import Friends from "../Friends/Friends";
import Card from "../../SharedComponents/Card";
import { fetchChat } from "../../api/chat";

function Chat() {
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { userAuth } = useContext(AuthUser);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  // const [bool, setBool] = useState(false);
  // const [roomNumber, setRooomNumber] = useState();
  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));
  const navigate = useNavigate();

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    getFriends();
  }, []);

  const getFriends = () => {
    fetchUser(userId).then((user) => {
      //setting friends
      setFriends(user.following);
    });
  };

  const userId = userAuth._id;

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

  // useEffect(() => {
  //   const getConversations = async () => {
  //     try {
  //       const res = await axios.get("/conversation/getconversation/" + userId);
  //       setConversations(res.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   getConversations();
  // }, [userId]);

  const getConversation = (chattedUserId) => {
    setSelectedUser(chattedUserId);
    fetchChat(userAuth._id, chattedUserId).then((result) => {
      setCurrentChat(result);
    });
  };

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
    navigate("/room");
  };

  useEffect(() => {
    if (selectedUser) {
      fetchSelectedUserName();
    }
  }, [selectedUser]);

  const fetchSelectedUserName = () => {
    fetchUser(selectedUser).then((res) => {
      setSelectedUserName(res.username);
    });
  };

  return (
    <>
      <div className="h-[32rem] flex ">
        <div className="ChatBox">
          {selectedUser && (
            <nav className="w-full h-[100px] bg-blue-600 rounded-tr rounded-tl flex justify-between items-center">
              <div className="flex justify-center items-center">
                {" "}
                <i className="mdi mdi-arrow-left font-normal text-gray-300 ml-1" />{" "}
                <img
                  src="https://i.imgur.com/IAgGUYF.jpg"
                  className="rounded-full ml-1"
                  width={30}
                  height={30}
                />{" "}
                <span className="text-xl font-medium text-gray-300 ml-1">
                  {selectedUserName}
                </span>{" "}
              </div>
              <div className="flex items-center">
                {/* <AiFillVideoCamera color='white' onClick={() =>setVideoCall(true)} size={24} className='mr-5'/>  */}
              </div>
            </nav>
          )}
          <div className="ChatBoxWrapper">
            {!!currentChat && selectedUser && (
              <>
                <Card>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="ChatBoxTop">
                      {messages.map((m) => (
                        <div ref={scrollRef} key={m._id}>
                          <Message message={m} own={m.sender === userId} />
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
                      {newMessage.trim().length > 0 && (
                        <button
                          className="ChatSubmitButton"
                          onClick={handleSubmit}
                        >
                          Send
                        </button>
                      )}
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
                    </div>
                  </div>
                </Card>
              </>
            )}

            {!currentChat && !selectedUser && (
              <>
                <span className="noConversationText">open a conversation</span>
              </>
            )}
          </div>
        </div>

        <div className="ChatOnlineWrapper">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentUserId={userId}
            setCurrentChat={setCurrentChat}
          />
        </div>
        <div className="ChatMenu">
          <Card>
            <input placeholder="Search for friends" className="chatMenuInput" />

            {friends.map((friend) => (
              <div key={friend} onClick={() => getConversation(friend)}>
                <Friends friend={friend} />
              </div>
            ))}

            {/* {conversations.map((c,index) => (
              <div  key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUserId={userId}
                />
              </div>
            ))} */}
          </Card>
        </div>
      </div>
    </>
  );
}

export default Chat;
