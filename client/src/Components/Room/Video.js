import React,{useEffect, useRef} from 'react'

export default function Video({user}) {
    const vidDiv = useRef();
    const playVideo = () => {
        user.videoTrack.play(vidDiv.current)
      }
      const stopVideo = () => {
        user.videoTrack.stop()
      }
      useEffect(() => {
        playVideo()
        return () => {
          stopVideo()
        }
      }, [])
  return (
    <div>
      Uid: {user.uid}
      <div
        ref={vidDiv}
        style={{ width: '200px', height: '200px' }}
      ></div>
    </div>
  )
}
