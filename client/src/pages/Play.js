import React, { useState } from 'react'
import './Play.css';
import LeaderBoard from './LeaderBoard';
import WhiteBoard from './WhiteBoard';
import Chat from './Chat';

 const Play = () => {
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const username = loginData.username
  // const [username,setUsername] = useState("")
  // if(ldata){
  //   setUsername(username)
  // }
  return (
    <div className="main-game">
        <LeaderBoard/>
        <WhiteBoard/>
        <Chat username={username} />
    </div>
  )
}

export default Play;