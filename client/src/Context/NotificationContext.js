import {createContext ,useState} from 'react'

export const socketNotification=createContext({})

export default function NotificationProvider({children}){
    const [socket,setSocket]=useState(null)

    return (
        <socketNotification.Provider value={{socket , setSocket}}>
        {children}
        </socketNotification.Provider>
    )
}


