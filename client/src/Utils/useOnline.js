import { useEffect, useState } from "react";

const useOnline=()=>{
    const [Isonline,setIsOnline]=useState(true)
     
    useEffect(()=>{
        const handleOnline=()=>{ setIsOnline(true) }
        const handleOffline=()=>{ setIsOnline(false)}

        window.addEventListener('online',  handleOnline );
        
        window.addEventListener('offline', handleOffline );

        return ()=>{
            window.removeEventListener('online',handleOnline)
            window.removeEventListener('offline',handleOffline)
        }
    },[])
   
   return Isonline //return true or false
}
export default useOnline;