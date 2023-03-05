// import {
//     autocompleteClasses,
//     Box,
//     Button,
//     Container,
//     Modal,
//   } from "@mui/material";
  import React, { useContext, useRef } from "react";
  import { useEffect } from "react";
  import Story from "../Story/Story";
//   import { getUserData } from "../../api/getUserData";
//   import { ContextUser } from "../../store/MainContext";
import { AuthUser } from "../../Context/AuthUser";
  import { useState } from "react";
//   import AddCircleIcon from "@mui/icons-material/AddCircle";
//   import { getStories } from "../../api/getStories";
  import { format } from "timeago.js";
  import Stories from "react-insta-stories";
//   import { addStory } from "../../api/addStory";
//   import ClearIcon from "@mui/icons-material/Clear";
  import Swal from "sweetalert2";
  import { useSnackbar } from "notistack";
import { fetchUser } from "../../api/user";
  
  function StoryView({ storyAdd, setStoryAdd }) {
    const { enqueueSnackbar } = useSnackbar();
    const { userAuth } = useContext(AuthUser);
    const [stories, setStories] = React.useState(null);
    const [currentUserStory, setCurrentUserStory] = useState(null);
    const [userData, setUserData] = useState(null);
    const [story, setStory] = useState(null);
    const [storyFile, setStoryFile] = useState(null);
  
    const storyRef = useRef();
  
    useEffect(() => {
     fetchUser(userAuth._id).then(( userData ) => {
        setUserData(userData && userData);
      });
    }, []);
  
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    useEffect(() => {
      handleClose();
      getStories().then(({ stories }) => {
        setStories(
          stories && stories.filter((story) => story.userId !== currentUser._id)
        );
        setCurrentUserStory(
          stories && stories.filter((story) => story.userId === currentUser._id)
        );
        console.log(stories);
      });
    }, [storyAdd]);
  
    if (currentUserStory && currentUserStory[0]?.user) {
      const { firstname, lastname, profilePictureUrl } =
        currentUserStory[0]?.user[0];
      const Heading = {
        heading: firstname + " " + lastname,
  
        profileImage: profilePictureUrl ? profilePictureUrl : DefaultProfile,
      };
      for (const storyObj of currentUserStory[0].stories) {
        storyObj.header = Heading;
        storyObj.header.subheading = format(storyObj.createdAt);
      }
    }
    const onAllStoriesEndHandler = () => {
      console.log("stories ended");
    };
  
    const storyContent = {
      width: "auto",
      maxWidth: "100%",
      maxHeight: "100%",
      margin: "auto",
    };
  
    const onStoryChange = (event) => {
      if (event.target.files && event.target.files[0]) {
        let story = event.target.files[0];
        if (story.type.includes("image") || story.type.includes("video")) {
          setStory({
            story: URL.createObjectURL(story),
          });
        } else {
          handleClickVariant("The choosen file type support!", "error");
        }
  
        setStoryFile(event.target.files[0]);
      }
    };
  
    const handleShareStory = () => {
      if (storyFile) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setStory(null);
        Swal.fire({
          title: "Uploading...",
          html: "It will take a few seconds!",
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        let formData = new FormData();
  
        formData.append("userId", currentUser._id);
        formData.append("story", storyFile);
  
        addStory(formData).then((response) => {
          console.log(response);
          const { status, storyAdded } = response;
          if (status === "ok" && storyAdded) {
            setStory(null);
            Swal.close();
            setStoryAdd(true);
            handleClickVariant("Story addedd succesfully!", "success");
          } else {
            Swal.close();
            handleClickVariant("Something went wrong!", "error");
          }
        });
      }
    };
    const handleClickVariant = (message, variant) => {
      enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    };
    console.log(stories);
    return (
        <div className="story-view">
        <div component="main" maxWidth="xs" className="story-share">
          <div className="ps-box">
            <div className="story-share-body">
              <div
                className={currentUserStory && currentUserStory[0]?.stories?.length > 0 ? "story" : "story !border-solid !border-[3px] !border-[#fff]"}
                onClick={
                  currentUserStory && currentUserStory[0]?.stories?.length > 0
                    ? handleOpen
                    : () => storyRef.current.click()
                }
              >
                <img
                  src={
                    userData?.profilePictureUrl
                      ? userData.profilePictureUrl
                      : ""
                  }
                  alt=""
                />
                {currentUserStory &&
                  !currentUserStory[0]?.stories?.length > 0 && (
                    <div className="absolute ml-[34px] mt-[1.98rem]">
                      <div className="bg-white rounded-full !fill-[#005bd1]" />
                    </div>
                  )}
              </div>
              {stories &&
                stories?.map(
                  (story, idx) =>
                    story.stories.length > 0 && <Story story={story} idx={idx} />
                )}
            </div>
          </div>
        </div>
          {currentUserStory && currentUserStory[0]?.stories && (
            <div
              className="w-[auto]"
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <div
                sx={{
                  ...style,
                  width: "auto",
                  padding: "0",
                  borderRadius: ".5rem",
                }}
              >
                <Stories
                  stories={currentUserStory && currentUserStory[0].stories}
                  defaultInterval={1500}
                  // width={'100%'}
                  // height={'100vh'}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    background: "red",
                    cursor: "pointer",
                  }}
                  storyStyles={storyContent}
                  loop={false}
                  keyboardNavigation={true}
                  isPaused={() => {}}
                  currentIndex={() => {}}
                  onStoryStart={() => {}}
                  onStoryEnd={() => {}}
                  onAllStoriesEnd={onAllStoriesEndHandler}
                />
              </div>
            </div>
          )}
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="story"
            ref={storyRef}
            onChange={onStoryChange}
          />
        </div>
        {story && (
          <div
            className="w-[auto]"
            open={true}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <div
              sx={{
                ...style,
                width: "300px",
                padding: "0",
                borderRadius: ".5rem",
              }}
            >
              <div className="p-[1rem]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-[8px]">
                    <img
                      className="w-[3rem] h-[3rem] rounded-full"
                      src={
                        userData?.profilePictureUrl
                          ? userData.profilePictureUrl
                          : DefaultProfile
                      }
                      alt=""
                    />
                    <span>
                      {userData?.firstname} {userData?.lastname}
                    </span>
                  </div>
                  <div class="mr-[5px] hover:bg-[#1976d221] rounded-lg cursor-pointer">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        setStory(null);
                        setStoryFile(null);
                      }}
                    />
                  </div>
                </div>
                <div className="preview-img">
                  {storyFile?.type.includes("image") ? (
                    <img src={story.story} alt="" className="!max-h-[30rem]" />
                  ) : storyFile?.type.includes("video") ? (
                    <video
                      autoPlay
                      src={story.story}
                      controls
                      width="100%"
                      className="!max-h-[30rem] rounded-[.5rem]"
                    ></video>
                  ) : (
                    handleClickVariant("The choosen file type support!", "error")
                  )}
                </div>
                <div className="flex items-center justify-end mt-2">
                  <button
                    onClick={handleShareStory}
                    class="custom-button ps-btn w-[6rem] h-[2.2rem]"
                  >
                    Add Story
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default StoryView;
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  