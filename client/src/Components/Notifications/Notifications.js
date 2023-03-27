import { useContext } from "react";
import Layout from "../../SharedComponents/Layout";
import { socketNotification } from "../../Context/NotificationContext";
import { useLocation } from "react-router-dom";
import Card from "../../SharedComponents/Card";

const SingleNotification = ({ senderId, type }) => {
  let action;

  if (type === 1) {
    action = "liked";
  } else if (type === 2) {
    action = "commented";
  } else {
    action = "shared";
  }
  return (
    <Card>     
    <div className="notification">{`${senderId} ${action} your post.`}</div>
    </Card>       
  );
};

const Notifications=()=>{
    const location= useLocation();
    console.log(location,'location');
    const notifications=location.state;
    const {socket}=useContext(socketNotification)
    console.log(socket,'socket in notifications');
    console.log(notifications,'notifications in notifications');


    // const displayNotification = ({ senderId, type }) => {
    //     let action;
    
    //     if (type === 1) {
    //       action = "liked";
    //     } else if (type === 2) {
    //       action = "commented";
    //     } else {
    //       action = "shared";
    //     }
    //     return (
                    
    //       <span className="notification">{`${senderId} ${action} your post.`}</span>
                  
    //     );
    //   };

      const handleRead = () => {
        // setNotifications([]);
      };

    return (
                
          <Layout>
            
        {notifications?.map((n) =>(
          <SingleNotification key={n.senderId} senderId={n.senderId} type={n.type} />

        )
         )}
        
        </Layout>
    )
}
export default Notifications;

