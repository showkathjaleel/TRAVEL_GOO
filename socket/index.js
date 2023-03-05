

const io = require('socket.io')(8900,{
    cors:{
        origin:"http://localhost:3000",
    },
});

let users=[];

const addUser=(userId,socketId)=>{
    !users.some((user)=>user.userId===userId) &&
    users.push({userId,socketId})
}



const getUser=(userId)=>{
    return users.find(user=>user.userId==userId)   //users is the array of users who are in online
}
io.on('connection',(socket) => { 
    console.log("a user is connected");

    //take useId and socketId from user
    socket.on("addUser",(userId)=>{
        console.log(userId,'userid from socket.io');
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })

 //send and get message
 socket.on("sendMessage",({senderId,recieverId,text})=>{

    const user=getUser(recieverId) //this is reciever id. and we pass it into users array. users array contain userId and socket id of every online user.Then it find the socket id of that user 
    console.log(user,'user in socket');
    io.to(user?.socketId).emit("getMessage",{
        senderId,
        text,
    })
})


socket.on('disconnect', () => {
    const index = users.indexOf(socket.id);
    users.splice(index, 1);
    io.emit("getUsers",users)
  });



     //for video call

     socket.emit("me",socket.id)

    //take event from client
     socket.on('callUser',(data)=>{
        console.log(data , 'data');
        //to send one client
        io.to(data.userToCall).emit("callUser",{signal:data.signalData ,from:data.from ,name:data.name})
            
        // //when anything happens in the room we will send it to this socket
        // socket.join(roomId)
        // //send a message to the room that we are currently in and send message to everyone in room but dont send it back to me
        // socket.to(roomId).broadcast.emit('user-connected', userId)   
    })
    
    socket.on("disc",()=>{
        socket.broadcast.emit("callEnded")
    })
    //take event from client
    socket.on("answerCall",(data)=>{
        //to send to one client
        io.to(data.to).emit("callAccepted"),data.signal
    })
    
    
 });


