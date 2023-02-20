import React, { useContext, useEffect, useState } from "react";
import Layout from "../SharedComponents/Layout";
import PostFormCard from "../SharedComponents/PostFormCard";
import PostCard from "../SharedComponents/PostCard";
import Header from "../SharedComponents/Header";
import axios from "axios";
import { AuthUser } from "../Context/AuthUser";

function HomePage() {
  const { userAuth } = useContext(AuthUser);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      // const res=await axios.get('posts/timelinePost/'+userAuth._id)
      const res = await axios.get("posts/getallposts");

      setPosts(res.data.posts);

      //     setPosts(
      // res.data.sort((p1,p2)=>{
      //   return new Date (p2.createdAt)-new Date(p1.createdAt);

      // }))
    };
    fetchPosts();
  }, [userAuth._id]);

  return (
    <div>
      <Header />
      <Layout>
        <PostFormCard home={true} />
        {posts.map((post) => (
          <PostCard key={post._id} post={post} userId={userAuth._id} /> //if it is profile page there is only his posts there so we pass userid as params
        ))}
      </Layout>
    </div>
  );
}

export default HomePage;
