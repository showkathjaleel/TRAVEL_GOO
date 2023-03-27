import React, { useRef, useState ,useEffect} from 'react'
import AgoraRTC from  "agora-rtc-sdk-ng"
import Video from './Video'



export default function Agora() {

    const options={
        appId:'6079a2fd86dc4bbcb1b13a3aab1f78d0',
       token:'007eJxTYOjv7V96xqjSOVJd2uPvei/mxTvfFfPvnOZ/4aKXbGyDS4gCg5mBuWWiUVqKhVlKsklSUnKSYZKhcaJxYmKSYZq5RYrB3TviKQ2BjAwTNZazMjJAIIjPxRAS5Bjm6hPv7u/PwAAA9psg2Q==',
      //  677c94770ad0419eb6c052778b00b6c2
        channel:'TRAVEL_GOO'
    }

    const [users, setUsers] = useState([])
    const [start, setStart] = useState(false)
    const rtc = useRef({
        // For the local client.
        client: null,
        // For the local audio and video tracks.
        localAudioTrack: null,
        localVideoTrack: null,
    });

    useEffect(()=>{
        init();
    },[])

//initialize your connection to Agora, connect to your microphone and camera, and publish your stream to a channel:
    let init = async () => {
        rtc.current.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
        initClientEvents()
        const uid = await rtc.current.client.join(options.appId, options.channel, options.token, null);
        // Create an audio track from the audio sampled by a microphone.
        rtc.current.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        // Create a video track from the video captured by a camera.
        rtc.current.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
        //Adding a User to the Users State
        setUsers((prevUsers) => {
          return [...prevUsers, { uid: uid, audio: true, video: true, client: true, videoTrack: rtc.current.localVideoTrack }]
        })
        //Publishing your Streams
        await rtc.current.client.publish([rtc.current.localAudioTrack, rtc.current.localVideoTrack]);
        setStart(true)
      }

      //event listeners that fire when new users join or leave the channel.
      const initClientEvents = () => {
        rtc.current.client.on("user-published", async (user, mediaType) => {
          // New User Enters
          await rtc.current.client.subscribe(user, mediaType);
          if (mediaType === "video") {
            const remoteVideoTrack = user.videoTrack;
            setUsers((prevUsers) => {
              return [...prevUsers, { uid: user.uid, audio: user.hasAudio, video: user.hasVideo, client: false, videoTrack: remoteVideoTrack }]
            })
          }
    
          if (mediaType === "audio") {
            const remoteAudioTrack = user.audioTrack;
            remoteAudioTrack.play();
            setUsers((prevUsers) => {
              return (prevUsers.map((User) => {
                if (User.uid === user.uid) {
                  return { ...User, audio: user.hasAudio }
                }
                return User
              }))
            })
          }
        });
    
        rtc.current.client.on("user-unpublished", (user, type) => {
          //User Leaves
          if (type === 'audio') {
            setUsers(prevUsers => {
              return (prevUsers.map((User) => {
                if (User.uid === user.uid) {
                  return { ...User, audio: !User.audio }
                }
                return User
              }))
            })
          }
          if (type === 'video') {
            setUsers((prevUsers) => {
              return prevUsers.filter(User => User.uid !== user.uid)
            })
          }
        });
      }





      const leaveChannel = async () => {
        // Destroy the local audio and video tracks.
        await rtc.current.localAudioTrack.close();
        await rtc.current.localVideoTrack.close();
        await rtc.current.client.leave();
        setUsers([])
        setStart(false)
      }
      
      const mute = (type, id) => {
        if (type === 'audio') {
          setUsers(prevUsers => {
            return (prevUsers.map((user) => {
              if (user.uid === id) {
                user.client && rtc.current.localAudioTrack.setEnabled(!user.audio)
                return { ...user, audio: !user.audio }
              }
              return user
            }))
          })
        }
        else if (type === 'video') {
          setUsers(prevUsers => {
            return prevUsers.map((user) => {
              if (user.uid === id) {
                user.client && rtc.current.localVideoTrack.setEnabled(!user.video)
                return { ...user, video: !user.video }
              }
              return user
            })
          })
        }
      }



  return (
    <div id='videos'>
    {users.length && users.map((user) => <Video key={user.uid} user={user} />)}
  </div>
  )
}
