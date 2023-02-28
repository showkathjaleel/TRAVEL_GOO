import React, { useContext, useEffect, useState } from "react";
import Layout from "../SharedComponents/Layout";
import PostFormCard from "../SharedComponents/PostFormCard";
import PostCard from "../SharedComponents/PostCard";
import Header from "../SharedComponents/Header";
import axios from "axios";
import { AuthUser } from "../Context/AuthUser";
import useOnline from "../Utils/useOnline";

function HomePage() {
  const { userAuth } = useContext(AuthUser);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // const res=await axios.get('posts/timelinePost/'+userAuth._id)
      const res = await axios.get("posts/getallposts");
      // setPosts(res.data.posts);
          setPosts(
      res.data.posts.sort((p1,p2)=>{
        return new Date (p2.createdAt)-new Date(p1.createdAt);

      }))
    };
    fetchPosts();
  }, [userAuth._id]);
  
//custom hook to check wheather user is turned on his internet
const isOnline=useOnline();
if(!isOnline){
  return <h1>Offline,please check your internet connection!!</h1>
}


  return (
    <div>
      <Header />
      <Layout>
        <PostFormCard home={true} 
       // onChange={fetchPosts}
        />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} userId={userAuth._id} /> //if it is profile page there is only his posts there so we pass userid as params
        ))}
      </Layout>
    </div>
  );
}

export default HomePage;
