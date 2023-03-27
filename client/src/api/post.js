import axios from "axios";
import { getToken } from "./tokenfetch";

export const postComment = async (senderId, postId, text) => {
  try {
    const { data } = await axios.post("comment/createcomment", {
      senderId: senderId,
      postId: postId,
      text: text,

      // headers: {
      //   "x-accesss-token": token,
      // },
    });
    console.log(data, "data");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const likeHandler = async (postId, userId) => {
  try {
    const { data } = await axios.put("posts/likePost/" + postId, {
      userId: userId,
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const postDelete = async (postId, postUserId) => {
  try {
    //if i want to make sure that the user is the owner of the id from from front end itself i can give currentuser._id
    const { data } = await axios.post("/posts/deletePost/" + postId, {
      userId: postUserId,
    });
    return data;
  } catch (err) {
    console.log(err, "err from postdelete in postcard");
  }
};

export const savePost = async (postId, userId) => {
  //function to save the post
  try {
    const { data } = await axios.post("/posts/save/" + postId, {
      userId: userId,
    });
    console.log(data, "data in savepost");
    return data;
  } catch (err) {
    console.log(err, "err from postsave in postcard");
  }
};

export const fetchComments = async (postId) => {
  try {
    const token = getToken("token");
    const { data } = await axios.get(`comment/getcomments/${postId}`,
    {
          headers: {
        "x-accesss-token": token,
          }
    })
    return data.comments;
  } catch (err) {
    console.log(err, "err in fetchComments");
  }
};

export const createPost = async (image, userId) => {
  console.log(image, "image", userId, "userId");
  const formdata = new FormData();
  formdata.append("image", image);
  formdata.append("userId", userId);
  try {
    await axios.post("posts/createpost", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("data in createpost");
    return "success";
  } catch (err) {
    console.log(err, "err in createPost");
  }
};
