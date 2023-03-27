import React, { useContext, useEffect, useState } from "react";
import Layout from "../SharedComponents/Layout";
import PostFormCard from "../SharedComponents/PostFormCard";
import PostCard from "../SharedComponents/PostCard";
import Header from "../SharedComponents/Header";
import axios from "axios";
import { AuthUser } from "../Context/AuthUser";
import useOnline from "../Utils/useOnline";
// import Stories from "react-insta-stories";
import { io } from "socket.io-client";
import { socketNotification } from "../Context/NotificationContext";
// import Story from "../Components/Story/Story"

function HomePage() {
  const { userAuth } = useContext(AuthUser);
  const {socket,setSocket}=useContext(socketNotification);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, [userAuth._id]);

  // ----------------------------socket for notification-----------
useEffect(() => {
  setSocket(io("http://localhost:8900"));
}, []);

useEffect(() => {
  socket?.emit("newUser", userAuth._id);
}, [socket]);
  //----------------------------------------------------------------//
  const fetchPosts = async () => {
    // const res=await axios.get('posts/timelinePost/'+userAuth._id)
    const res = await axios.get("posts/getallposts");
    // setPosts(res.data.posts);
        setPosts(
    res.data.posts.sort((p1,p2)=>{
      return new Date (p2.createdAt)-new Date(p1.createdAt);
    }))
  };

//custom hook to check wheather user is turned on his internet
const isOnline=useOnline();
if(!isOnline){
  return <h1>Offline,please check your internet connection!!</h1>
}


  // const story=["https://thumbs.dreamstime.com/b/time-to-travel-wooden-sign-beach-background-49509295.jpg","https://images.unsplash.com/photo-1532339142463-fd0a8979791a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dHJpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"]
   

  return (
    <div>
      <Header />
      <Layout>
        {/* <Stories stories={story} width={150} height={170} keyboardNavigation={true} />  */}
        <PostFormCard home={true} 
       onChange={fetchPosts}
        />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} userId={userAuth._id} 
          socket={socket} 
          /> //this user is for socket //if it is profile page there is only his posts there so we pass userid as params
        ))}
      </Layout>
    </div>
  );
}

export default HomePage;
