import React,{useRef,useEffect,useContext, useState} from "react";
import { useParams } from "react-router-dom";
// import { io } from "socket.io-client";
import io from "socket.io-client"
import { AuthUser } from "../../Context/AuthUser";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Peer from "simple-peer"; //it takes all of web RTC information for user and turns it into easy to use Id we pass btw diff places and use with pure library to actually connect with other peers on network
import './Room.css'

const socket = io.connect('http://localhost:8900')
function Room(){
//   const { roomId } = useParams();
  const [me,setMe]=useState("")
  const [receivingCall,setReceivingCall]=useState(false)
  const [caller,setCaller]=useState("")
  const [callerSignal,setCallerSignal]=useState()
  const [callAccepted, setCallAccepted]=useState(false)
  const [idToCall, setIdToCall]=useState("")
  const [callEnded, setCallEnded]=useState(false);
  const [name,setName]=useState("")
  const [stream,setStream]=useState()


    //render our own vido to screen
    const myVideo=useRef(null)
    //    //we dont want to hear our own audio.
       myVideo.muted=true;
    const userVideo=useRef()
    const connectionRef=useRef()
    
useEffect(()=>{
    //connecting our video and audio and send it to other useers
    const getUserMedia = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({video: true,audio:true});
          setStream(stream)
          console.log(stream,'stream');
          myVideo.current.srcObject = stream;
        } catch (err) {
          console.log(err);
        }
      };
      getUserMedia();

//    navigator.mediaDevices.getUserMedia({
//     video:true,
//     audio:true
//    }).then((stream)=>{
//     console.log(stream , "STREAM  in useEffect");
//     setStream(stream)   
//      myVideo.current.srcObject=stream;
//    })

  
   if (socket && typeof socket.on === 'function') {
   //take event from server
    socket.on("me", (id) => {
      console.log(id , "id in callUser in useEffect");
      setMe(id)
    })
  } else {
    console.error("socket is not defined or does not have a method named 'on'")
  }
//    socket.on("me",(id)=>{
//     console.log(id , "id in callUser in useEffect");
//     setMe(id)
//    })

   socket.on("callUser",(data)=>{
    console.log(data , "data in me in useEffect");
    setReceivingCall(true);
    setCaller(data.from)
    setName(data.name)
    setCallerSignal(data.signal)
   })

},[])

const callUser=(id)=>{
    console.log(id ,'id in calluser');
    const peer = new Peer(
        {
            initiator:true,
            trickle:false,
            stream:stream
        }
      );

      peer.on("signal",data=>{
        //send event to server
        socket.emit("callUser",{
            userToCall:id,
            signalData:data,
            from:me,
            name:name
        })
      })

      peer.on("stream",(stream)=>{
        userVideo.current.srcObject=stream;
      })
       //take event from server
      socket.on("callAccepted",(signal)=>{
        setCallAccepted(true)
        peer.signal(signal)
      })
 
      connectionRef.current=peer;

}

const answerCall=()=>{
    setCallAccepted(true)
    const peer=new Peer({
        initiator:false,
        trickle:false,
        stream:stream
    })
    
    peer.on("signal",(data)=>{
        console.log(data ,"data in signal in answerCall");
        //send event to server
        socket.emit("answerCall",{signal:data,to:caller})
    })

    peer.on("stream",(stream)=>{
        userVideo.current.srcObject=stream;
      })

      peer.signal(callerSignal)
        connectionRef.current=peer;
      
      
}

const leaveCall=()=>{
   setCallEnded(true); 
   connectionRef.current.destroy()   
}


  return (
    <>
			<h1 style={{ textAlign: "center", color: '#fff' }}>Zoomish</h1>
		<div className="container">
			<div className="video-container">
				<div className="video">
					{stream &&  <video 
                    // playsInline muted 
                    ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} />:
					null}
				</div>
			</div>
			<div className="myId">
              
				<input type="text"
					id="filled-basic"
					label="Name"
					variant="filled"
					value={name}
					onChange={(e) => setName(e.target.value)}
					style={{ marginBottom: "20px" }}
				/>
				<CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
					<button className="bg-blue-600" 
                    // startIcon={<AssignmentIcon 
                    // fontSize="large" />}
                     >
						Copy ID
					</button>
				</CopyToClipboard>

				<input type="text"
					id="filled-basic"
					label="ID to call"
					variant="filled"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<div className="call-button">
					{callAccepted && !callEnded ? (
						<button className="bg-red-500" onClick={leaveCall}>
							End Call
						</button>
					) : (
						<button className="bg-blue-700"  aria-label="call" onClick={() => callUser(idToCall)}>
                            {/* phoneIcon */}
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
</svg>

						</button>
					)}
					{idToCall}
				</div>
			</div>
			<div>
				{receivingCall && !callAccepted ? (
						<div className="caller">
						<h1 >{name} is calling...</h1>
						<button className="bg-blue-700" onClick={answerCall}>
							Answer
						</button>
					</div>
				) : null}
			</div>
		</div>
		</>
  );
  }


export default Room;
