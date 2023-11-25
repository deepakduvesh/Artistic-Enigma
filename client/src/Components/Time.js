import React, { useEffect, useState } from 'react'
import { socket } from '../App';

export default function Time({id}) {
    const [seconds,setSeconds] = useState(0)
              useEffect(()=>{
                const interval = setInterval(() => {
                    setSeconds((prev)=>prev+1)
                },1000);
        socket.on("endTurn",(data)=>{
            clearInterval(interval);
            setSeconds(0)
        })
    },[])
  return (
    <div className='timer' >
      <button>{`time ${seconds}`}</button>
    </div>
  )
}
