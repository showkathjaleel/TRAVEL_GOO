

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
    console.log(senderId,'sender id');
    console.log(recieverId,'sender id');recieverId
    console.log(text,'sender id');
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

    
 });


