import Layout from "../SharedComponents/Layout";
import Card from "../SharedComponents/Card";
import Avatar from "../SharedComponents/Avatar";
import { useContext, useEffect, useState } from "react";
import ProfileTabs from "../SharedComponents/ProfileTabs";
import Cover from "../SharedComponents/Cover";
import { AuthUser } from "../Context/AuthUser";
import ProfileContent from "../SharedComponents/ProfileContent";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { fetchUser } from "../api/user";
import { updateUser } from "../api/user";

export default function ProfilePage() {
  console.log("profilepage");

  //  -----------------------------------------------------------------------------
  // const [cookies,setCookies] = useCookies([]);

  const location = useLocation();
  const { userAuth } = useContext(AuthUser);
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [boolean, setBoolean] = useState(false);

  const [following, setFollowing] = useState(false);
  // const followClasses = following ? 'bg-white text-black' : 'bg-blue-500 text-white';

  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("userId");
  const isMyUser = userId === userAuth?._id; // ACTUAL ONE
  console.log(profile?.ProfilePicture,'profilePicture');

  //  -----------------------------------------------------------------------------

  // const [currentuser,setcurrentUser] = useState('');
  // useEffect(()=>{
  //   if(userAuth){
  //     setcurrentUser(userAuth);
  //   }
  // },[currentuser._id])

  //ith uncomment cheythal post kanam
  //  -----------------------------------------------------------------------------

  //  const userId=currentuser._id;
  useEffect(() => {
    setBoolean(false);
    if (!userId) {
      return;
    }

    getUser();
  }, [boolean]);

  const getUser = async () => {
    fetchUser(userId).then((result)=>{
       setProfile(result)
    })
  };

  const saveProfile =  () => {
    updateUser(profile._id,name,place,userId).then((result)=>{
        setBoolean(true);
        setEditMode(false);

    })
    // try {
    //   const res = await axios.put("api/updateUser/" + profile._id, {
    //     username: name,
    //     city: place,
    //     userId,
    //   });
    //   setBoolean(true);
    //   setEditMode(false);
    //   //  setcurrentUser(prev => ({...prev,name,place}))
    // } catch (err) {}
  };

  //  const followHandler=async( )=>{
  //   const res=axios.put('/api/followUser/'+ userId,{
  //    currentuser:userAuth._id                          //ith thalkkalam comment cheythekkan.After review you have to uncomment this
  //   })
  //   console.log(res,'response from followHandler');
  //   setFollowing(true)
  //  }

  return (
    <Layout>
      {/* <UserContextProvider> */}
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <Cover
            // url="https://images.unsplash.com/photo-1545322780-5d71e8bb3847?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
            editable={isMyUser}
            url={profile?.CoverPicture}
            onChange={fetchUser}
          />
          <div className="absolute top-24 left-4 z-20">
            {profile && (
              <Avatar
                url={
                  profile.ProfilePicture
                    ? profile.ProfilePicture
                    : "images/images.jpeg"
                }
                size={"lg"}
                editable={isMyUser}
                onChange={fetchUser}
              />
            )}
          </div>
          <div className="p-4 pt-0 md:pt-4 pb-0">
            <div className="ml-24 md:ml-40 flex justify-between">
              <div>
                {editMode && (
                  <div>
                    <input
                      type="text"
                      className="border py-2 px-3 rounded-md"
                      placeholder={"Your name"}
                      onChange={(ev) => setName(ev.target.value)}
                      value={name}
                    />
                  </div>
                )}
                {!editMode && (
                  <h1 className="text-3xl font-bold">{profile?.username}</h1>
                )}
                {!editMode && (
                  <div className="text-gray-500 leading-4">{profile?.city}</div>
                )}

                {editMode && (
                  <div>
                    <input
                      type="text"
                      className="border py-2 px-3 rounded-md mt-1"
                      placeholder={"Your location"}
                      onChange={(ev) => setPlace(ev.target.value)}
                      value={place}
                    />
                  </div>
                )}
              </div>
              <div className="grow">
                <div className="text-right">
                  {isMyUser && !editMode && (
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setName(profile.username);
                        setPlace(profile.city);
                      }}
                      className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2"
                    >
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
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                      Edit profile
                    </button>
                  )}
                  {isMyUser && editMode && (
                    <button
                      onClick={saveProfile}
                      className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2"
                    >
                      Save profile
                    </button>
                  )}
                  {isMyUser && editMode && (
                    <button
                      onClick={() => setEditMode(false)}
                      className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                {/* <button
      className='text-blue-500 bg-white border-blue-500 rounded-sm w-20 h-8 absolute'
      onClick={followHandler}>
      Follow     
    </button>
     
     {following &&  <button
      className='text-blue-500 bg-white border-blue-500 rounded-sm w-20 h-8 absolute'
      onClick={followHandler}>
      Following     
    </button> } */}
              </div>
            </div>
            <ProfileTabs active={location.pathname} userId={profile?._id} />
          </div>
        </div>
      </Card>
      <ProfileContent activeTab={location.pathname} userId={profile?._id} />
      {/* </UserContextProvider> */}
    </Layout>
  );
}

// import React from 'react'
// import Profile from '../Components/UserProfile/UserProfile'
// import Navbar from '../Components/Header/Header'
// function UserProfilePage() {
//   return (
//     <div>

//         <Navbar/>
//         <Profile/>
//     </div>
//   )
// }

// export default UserProfilePage
