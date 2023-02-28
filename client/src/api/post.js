import axios from "axios";



export const postComment=async(senderId,postId,text) =>{
    try {
        console.log(senderId,'senderId',postId,'postId',text,'text');
      const {data} = await axios.post("comment/createcomment", {
        senderId: senderId,
        postId: postId,
        text: text,

            // headers: {
            //   "x-accesss-token": token,
            // },
      });
      console.log(data,'data');
       return data;
    } catch (err) {
      console.log(err);
    }
  }