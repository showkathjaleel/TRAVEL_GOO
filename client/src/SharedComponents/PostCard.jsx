import React, { useContext, useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { AuthUser } from "../Context/AuthUser";
import TimeAgo from "react-timeago";
import { postComment } from "../api/post";
import { likeHandler } from "../api/post";
import { postDelete } from "../api/post";
import { savePost } from "../api/post";
import { fetchUser, followUser } from "../api/user";
import { fetchComments } from "../api/post";


function PostCard({ post }) {

  const { userAuth } = useContext(AuthUser);
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isSaved, setIsSaved] = useState(false);
  //const [isDeleted, setIsDeleted] = useState(false);
   // if(post.likes?.includes(userAuth._id)){
  //   setIsLiked(true)
  // }

 
  useEffect(() => {
    getUser();
  }, []);

  const getUser=()=>{
    fetchUser(post.userId).then((result)=>{
      setUser(result)
    })
  }


  useEffect(() => {
    setIsLiked(post.likes.includes(userAuth._id));
  }, [userAuth._id, post.likes]);


  useEffect(() => {
    getComments()
  }, []);
  
  const getComments=()=>{
    fetchComments(post._id).then((result)=>{
      setComments(result)
    })
  }

  const handleLike=()=>{
    likeHandler(post._id,userAuth._id).then((result)=>{
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    })
  }

 
  const  handleCommentSubmit= (e)=>{
    e.preventDefault();
    postComment( user._id, post._id,commentText).then((result)=>{
      setComments([...comments, result]);
      setCommentText("");    
    })
  }

 const postDeleteHandler=()=>{
  postDelete(post._id, post.userId).then((response)=>{
    console.log(response);
  })
 }
     

  const savePostHandler=()=>{
    savePost(post._id,userAuth._id).then((response)=>{
      setIsSaved(true);
      setIsOpen(false)
    })
  }

  const followHandler=async()=>{
   await followUser(post.userId,userAuth._id)
   getUser()
  }

  return (
    <Card>
      <div className="flex gap-3">
        <div>
          <Link to="/profile">
            <span className="cursor-pointer">
              <Avatar url={user?.ProfilePicture || "images/images.jpeg"} />
            </span>
          </Link>
        </div>

        <div className=" grow ">
          <p>
            {/* <Link href={'/profile/'+authorProfile.id}>
              <span className="mr-1 font-semibold cursor-pointer hover:underline">
                {authorProfile.name}
              </span>
            </Link> */}
            <Link to={`/profile?userId=${user?._id}`}>
              <span className="mr-1 font-semibold cursor-pointer hover:underline">
                {user?.username}
              </span>
            </Link>
            shared a post
          </p>
          <p className="text-gray-500 text-sm">
            <TimeAgo date={new Date(post.createdAt).getTime()} />
          </p>
        </div>

        <div className="relative flex">
{post.userId === userAuth._id ? (
         <p></p>
      ) : (
        <button
        onClick={followHandler}
        className="cursor-pointer inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent hover:text-blue-500 hover:bg-white mt-4 lg:mt-0 ml-3"
      >
        {user?.followers?.includes(userAuth._id) ? "following" : "follow"}
      </button>
      )}        
          <button className="text-gray-400" onClick={toggleDropdown}>
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
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            more
          </button>

          <div className="relative">
            {isOpen && (
              <div className="absolute -right-6 bg-white shadow-md shadow-gray-300 p-3 rounded-sm border border-gray-100 w-52">
                <button onClick={savePostHandler} className="w-full -my-2">
                  <span className="flex -mx-4 hover:shadow-md gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white px-4 rounded-md transition-all hover:scale-110 shadow-gray-300">
                    {isSaved && (
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
                          d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                        />
                      </svg>
                    )}
                    {!isSaved && (
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
                          d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                        />
                      </svg>
                    )}
                    {isSaved ? "Remove from saved" : "Save post"}
                  </span>
                </button>
              
                <span
                  className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
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
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                    />
                  </svg>
                  Turn notifications
                </span>

                <span
                  className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Hide post
                </span>

                <button
                  onClick={postDeleteHandler}
                  className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md"
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
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  Delete
                </button>

                <span
                  className="flex gap-3 py-2 my-2 hover:bg-socialBlue hover:text-white -mx-4 px-4 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300"
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
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                  Report
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div >
        <p className="my-2 text-sm">{post.desc}</p>

        <div className="rounded-md overflow-hidden">
          {/* <Link to={`/profile?userId=${user._id}`}> */}
          <img 
            // src="https://cdn.pixabay.com/photo/2018/02/02/13/37/nature-3125452_960_720.jpg" alt="" />
            src={
              post.img
                ? post.img
                : "https://cdn.pixabay.com/photo/2018/02/02/13/37/nature-3125452_960_720.jpg"
            }
            alt=""
          />
          {/* </Link> */}
        </div>
      </div>

      <div className="mt-5 flex gap-8">
        <button className="flex gap-2 items-center" onClick={handleLike}>
          {like ? (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#ff0000"
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#000000"
                d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
              />
            </svg>
          )}
          {like}
        </button>

        <button className="flex gap-2 items-center">
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
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
          12
        </button>

        <button className="flex gap-2 items-center">
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
              d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
          </svg>
          4
        </button>
      </div>

      <div className="flex mt-4 gap-3">
        <div>
          <Avatar />
        </div>

        <div className="border grow rounded-full relative inline-flex">
        {/* <form onSubmit={postComment}>  */}
        <form onSubmit={handleCommentSubmit}>
            <input
              value={commentText}
              onChange={(ev) => setCommentText(ev.target.value)}
              className="block w-full p-3 px-4 overflow-hidden h-12 rounded-full"
              placeholder="Leave a comment"
            />
            <button type="submit">
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
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </form>

          <button className="absolute top-3 right-3 text-gray-400">
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="comments">
        {comments?.map((comment) => {
          return (
            <div className="comment" key={comment._id}>
              <p>{comment.text}</p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default PostCard;
