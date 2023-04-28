import Axios from "../Utils/Axios";


export const fetchChat = async (senderuserId,recieverUserId) => {
        try {
          const {data} = await Axios.get("/conversation/getspecificconv/" + senderuserId +'/'+ recieverUserId 
          );
          console.log(data,'fetchchat')
          return data
        } catch (err) {
          console.log(err);
        }
      };