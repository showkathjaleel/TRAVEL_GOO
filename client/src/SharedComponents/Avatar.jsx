import React from "react";
import { useState, useContext } from "react";
import Preloader from "./Preloader";
import axios from "axios";
import { AuthUser } from "../Context/AuthUser";
import Modal from "./Modal";
import Swal from "sweetalert";

function Avatar({ size, editable, url, onChange }) {
 
  const [showModal, setShowModal] = useState(false);
  const [files, setFiles] = useState();
  const { userAuth } = useContext(AuthUser);
  const [isUploading, setIsUploading] = useState(false);
  const [Isupdated, setIsUpdated] = useState(false);
  const [Isdeleted, setIsDeleted] = useState(false);

  let width = "w-12";
  if (size === "lg") {
    width = "w-24 md:w-36";
  }

  function handleClick() {
    setShowModal(true);
  }

  async function handleAvatarChange(ev) {
    const msg = "profilePicture";
    const file = ev.target.files?.[0];
    const formdata = new FormData();
    formdata.append("image", file);
    formdata.append("userId", userAuth._id);
    formdata.append("data", msg);

    if (file) {
      setIsUploading(true);
      try {
        await axios.put(
          "api/updateUser/" + userAuth._id,
          formdata,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        setFiles(files);
        setIsUploading(false);
        if (onChange) onChange();
        setIsUpdated(true); // to show the msg that uploaded successfully
      } catch (err) {}
    }
  }



  // function postDelete(){
  //   alert(post.userId)
  //   //if i want to make sure that the user is the owner of the id from from front end itself i can give currentuser._id
  //   axios.post('/posts/deletePost/'+post._id,{
  //    userId:post.userId
  //   }
  //   ).then((response)=>{
  //     console.log(response,'response from postdelete');
  //   }).catch((err)=>{
  //   })
  // }

  function deleteImage() {
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You want to Delete this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!'
    // })
    // .then((result) => {
    //   // if (result.value) {
    //   //   Swal.fire(
    //   //     'Deleted!',
    //   //     'Your file has been deleted.',
    //   //     'success'
    //   //   )
    //   // }
    // })

    axios
      .post("/api/deleteProfileImg", {
        userId: userAuth._id,
      })
      .then((response) => {
        setShowModal(false);
        // if (response.data) {
        //   Swal.fire(
        //     'Deleted!',
        //     'Your file has been deleted.',
        //     'success'
        //   )
        // }

        setIsDeleted(true);
        if (onChange) onChange();
      })
      .catch((err) => {});
  }

  return (
    <div className={`${width} relative`}>
      <div className="rounded-full overflow-hidden">
        <img src={url} alt="" className="w-full" onClick={handleClick} />
      </div>

      {showModal && (
        <Modal
          show={showModal}
          // url={url}
        >
          <button onClick={() => setShowModal(false)}>
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
          </button>

          <div className="p-1 rounded-lg shadow-lg bg-white">
            <div className="flex flex-col items-center p-4 space-y-2 bg-black rounded-lg">
              <img
                src={url}
                alt=""
                className="flex flex-col items-center p-4 space-y-2 bg-black rounded-lg w-64"
              />

              {Isupdated && (
                <h1 className="text-4xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  ProfilePicture Updated Successfully
                </h1>
              )}
              {Isdeleted && (
                <h1 className="text-4xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  ProfilePicture Deleted Successfully
                </h1>
              )}

              <div className="">
                <button
                  className="inline-flex items-center m-5 px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
                  onClick={deleteImage}
                >
                  <span className="text-sm font-medium">
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
                  </span>
                </button>

                <label className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
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
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                    name="image"
                  />
                </label>

                <span className="text-sm font-medium">
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
                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {isUploading && (
        <div className="absolute inset-0 flex items-center bg-white bg-opacity-50 rounded-full">
          <div className="inline-block mx-auto">
            <Preloader />
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
