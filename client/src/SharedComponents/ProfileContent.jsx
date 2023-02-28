/* eslint-disable react/prop-types */

import PostCard from "./PostCard";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileContent({ activeTab, userId }) {
  const [posts, setPosts] = useState([]);
  // const {userAuth}=useContext(AuthUser)
  // const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function loadPosts() {
      const res = await axios.get("/posts/profile/" + userId);
      // const profile = await userProfile(userId);
      setPosts(res.data);
      // setProfile(userAuth);
    }
    loadPosts();
  }, [userId]);

  console.log(posts, "posts in profileContent");

  return (
    <div>
      {activeTab === "/profile" && (
        <div>
          {posts?.length > 0 &&
            posts.map((post) => (
              <PostCard
                key={post.createdAt}
                post={post}
                //  profiles={profile}
              />
            ))}
        </div>
      )}
      {activeTab === "/profile/about" && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">About me</h2>
            <p className="mb-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              doloremque harum maxime mollitia perferendis praesentium quaerat.
              Adipisci, delectus eum fugiat incidunt iusto molestiae nesciunt
              odio porro quae quaerat, reprehenderit, sed.
            </p>
            <p className="mb-2 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
              assumenda error necessitatibus nesciunt quas quidem quisquam
              reiciendis, similique. Amet consequuntur facilis iste iure minima
              nisi non praesentium ratione voluptas voluptatem?
            </p>
          </Card>
        </div>
      )}
      {activeTab === "/profile/friends" && (
        <div>
          <Card>
            <h2 className="text-3xl mb-2">Friends</h2>
            <div className="">
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
              <div className="border-b border-b-gray-100 p-4 -mx-4">
                <FriendInfo />
              </div>
            </div>
          </Card>
        </div>
      )}
      {activeTab === "/profile/photos" && (
        <div>
          <Card>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                />
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1563789031959-4c02bcb41319?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                />
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1560703650-ef3e0f254ae0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
              </div>
              <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1601581874834-3b6065645e07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
                  alt=""
                />
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
