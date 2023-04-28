import React, { useContext, useEffect, useState } from "react";
import Layout from "../SharedComponents/Layout";
import PostFormCard from "../SharedComponents/PostFormCard";
import PostCard from "../SharedComponents/PostCard";
import Header from "../SharedComponents/Header";
import useOnline from "../Utils/useOnline";

// import { io } from "socket.io-client";
// import { socketNotification } from "../Context/NotificationContext";
import { fetchAllPosts } from "../api/post";
import TokenFetch from "../api/tokenFetch";
import { useSelector } from "react-redux";


function HomePage() {
  const token=TokenFetch()
 // const {socket,setSocket}=useContext(socketNotification);
  const [posts, setPosts] = useState([]);
  const userId=useSelector(store=>store.user.userId)


  useEffect(() => {
    getAllPosts();
  }, []);

  // ----------------------------socket for notification-----------
// useEffect(() => {
//   setSocket(io("http://localhost:5000"));
// }, []);

// useEffect(() => {
//   if(userId){
//   socket?.emit("newUser", userId);
//   }
// }, [socket]);
  //----------------------------------------------------------------//

  const getAllPosts=()=>{
    fetchAllPosts(token).then((result)=>{
      setPosts(result)
    })
  }

//custom hook to check wheather user is turned on his internet
const isOnline=useOnline();
if(!isOnline){
  return <h1>Offline,please check your internet connection!!</h1>
}

  return (
    <div>
      <Header />
      <Layout>
        {  userId &&  
        <PostFormCard home={true} userId={userId}
       onChange={getAllPosts}
        />
}
        {  userId && posts.map((post) => (
          <PostCard key={post._id} post={post} userId={userId} 
          // socket={socket} 
          /> 
        ))}
      </Layout>
    </div>
  );
}

export default HomePage;
