import React from "react";
import Stories from "react-insta-stories";
import { format } from "timeago.js";

function Story({ story, idx }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { firstname, lastname, profilePictureUrl } = story?.user[0];
  if (story) {
    const Heading = {
      heading: firstname + " " + lastname,

      profileImage: profilePictureUrl ? profilePictureUrl : "images/images.jpeg",
    };
    for (const storyObj of story.stories) {
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

  return (
    <>
      <div key={idx} className="story" onClick={handleOpen}>
        <img
          src={profilePictureUrl ? profilePictureUrl : DefaultProfile}
          alt=""
        />
      </div>
      <Modal
        className="w-[auto]"
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style, width: "auto", padding: "0", borderRadius: ".5rem" }}
        >
          <Stories
            stories={story?.stories && story.stories}
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
        </Box>
      </Modal>
    </>
  );
}

export default Story;

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