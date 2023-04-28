import Axios from "../Utils/Axios";
import TokenFetch from "./tokenFetch";

export const postComment = async (senderId, postId, text) => {
  try {
    const { data } = await Axios.post("comment/createcomment", {
      senderId: senderId,
      postId: postId,
      text: text,

    });
    console.log(data, "data");
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const likeHandler = async (postId, userId,token) => {
  try {
    const { data } = await Axios.put("posts/likePost/" + postId, {
      userId: userId,
    },
    {
      headers: { authorization: "Bearer " + token},
    }
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const postDelete = async (postId, postUserId) => {
  try {
    //if i want to make sure that the user is the owner of the id from from front end itself i can give currentuser._id
    const { data } = await Axios.post("/posts/deletePost/" + postId, {
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
    const { data } = await Axios.post("/posts/save/" + postId, {
      userId: userId,
    });
    console.log(data, "data in savepost");
    return data;
  } catch (err) {
    console.log(err, "err from postsave in postcard");
  }
};

export const fetchComments = async (postId,token) => {
  try {
    const { data } = await Axios.get(`comment/getcomments/${postId}`,{
      headers: { authorization: "Bearer " + token},
    })
  
    return data.comments;
  } catch (err) {
    console.log(err, "err in fetchComments");
  }
};

export const createPost = async (image, userId) => {
  const formdata = new FormData();
  formdata.append("image", image);
  formdata.append("userId", userId);
  try {
    await Axios.post("posts/createpost", formdata, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return "success";
  } catch (err) {
    console.log(err, "err in createPost");
  }
};


export const fetchPostsInProfile= async(userId,token)=>{
  try{
    const {data} = await Axios.get("/posts/profile/" + userId,
    {
      headers: { authorization: "Bearer " + token},
    }
    );
    const posts = data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
      return posts;
  }catch(err){
    console.log(err)
  }
 
}

export const fetchAllPosts = async (token) => {
  try{
     // const res=await axios.get('posts/timelinePost/'+userAuth._id)
    const {data} = await Axios.get("posts/getallposts",
    {
      headers: { authorization: "Bearer " + token },
    }
    );
 
    const Allposts= data.posts.sort((p1,p2)=>{
      return new Date (p2.createdAt)-new Date(p1.createdAt);
    })
    return Allposts;
  }
  catch(err){
      console.log(err)
  }
 
};

