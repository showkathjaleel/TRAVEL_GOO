import axios from "axios";

export const fetchChat = async (senderuserId,recieverUserId) => {
        try {
          const {data} = await axios.get("/conversation/getspecificconv/" + senderuserId +'/'+ recieverUserId 
          );
          console.log(data,'fetchchat')
          return data
        } catch (err) {
          console.log(err);
        }
      };