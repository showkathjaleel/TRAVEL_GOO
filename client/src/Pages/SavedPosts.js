import React, { useContext, useEffect, useState } from "react";
import Layout from "../SharedComponents/Layout";
import PostCard from "../SharedComponents/PostCard";
import { AuthUser } from "../Context/AuthUser";

import axios from "axios";
function SavedPosts() {
  const [saved, setSaved] = useState([]);
  const { userAuth } = useContext(AuthUser);

  useEffect(() => {
    const getSavedPosts = async () => {
      const res = await axios.get("/posts/savedposts/" + userAuth._id);
      console.log(res, "response from savedPosts");
      setSaved(res.data.savedPosts);
    };
    getSavedPosts();
  }, [userAuth._id]);
  return (
    <div>
      <Layout>
        {saved &&
          saved.map((savedpost) => (
            <PostCard key={savedpost._id} post={savedpost} />
          ))}

        {saved.length === 0 && <h1>No saved Posts yet</h1>}
      </Layout>
    </div>
  );
}

export default SavedPosts;
