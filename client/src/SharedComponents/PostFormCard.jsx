import React, { useContext, useState } from "react";
import Card from "./Card";
import Avatar from "./Avatar";
import Dropzone from "react-dropzone";
import { useEffect } from "react";
import { AuthUser } from "../Context/AuthUser";
import Preloader from "./Preloader";
import { fetchUser } from "../api/user";
import { createPost } from "../api/post";


function PostFormCard({home}) {
  const { userAuth } = useContext(AuthUser);
  const [isUploading, setIsUploading] = useState();
  const [currentuser, setcurrentUser] = useState();

  useEffect(() => {
    getUser();
  }, [userAuth._id]); 

const getUser=()=>{
  fetchUser(userAuth._id).then((result)=>{
    setcurrentUser(result)
  })
}

  const postUpload=async(image)=>{
    setIsUploading(true);
    await createPost(image[0],userAuth._id)
    setIsUploading(false);
    }



  return (
    <Card>
      {home && (
          <Dropzone onDrop={(acceptedFiles) => postUpload(acceptedFiles)}> 
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />

                <div className="drop-zone p-6 border-2 border-dashed border-gray-400 text-gray-700 rounded-lg">
                  <div className="flex items-center justify-center h-12 w-12 mx-auto mt-6">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905v.714L7.832 5.651A4 4 0 004 9v5m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                      ></path>
                    </svg>
                  </div>
                  <p className="text-center mt-6">
                    Drag and drop files here or{" "}
                    <span className="underline font-semibold text-blue-500 cursor-pointer">
                      browse your computer
                    </span>
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      )}

      {/* --------------------------------------------------------------------  */}

      <div className="flex gap-1">
       
        <div>
          <Avatar url={currentuser?.ProfilePicture || "images/images.jpeg"} />
        </div>

        <textarea
          className="grow p-3 h-14"
          placeholder={`Whats on your mind,${currentuser?.username}?`}
        />
      </div>

      {isUploading && (
        <div>
          <Preloader />
        </div>
      )}

      <div className="flex gap-5 items-center mt-2">
        <div>
          <button className="flex gap-1">
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
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
            People
          </button>
        </div>

        <div>
          {" "}
          <button className="flex gap-1">
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
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            Check in
          </button>
        </div>
        <div>
          <button className="flex gap-1">
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
                d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
              />
            </svg>
            Mood
          </button>
        </div>

        <div className="grow text-right">
          <button className="bg-socialBlue text-white px-6 py-1 rounded-md">
            Share
          </button>
        </div>
      </div>
    </Card>
  );
}

export default PostFormCard;
