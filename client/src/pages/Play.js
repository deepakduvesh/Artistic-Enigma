import React, { useState } from 'react'
import '../Styles/Play.css';
import LeaderBoard from '../Components/LeaderBoard';
import WhiteBoard from '../Components/WhiteBoard';
import Chat from '../Components/Chat';

 const Play = () => {
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const [username,setusername] = useState("user")
  if(loginData) setusername(loginData.username)
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