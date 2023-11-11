import React, { useState,useEffect } from 'react'
import '../Styles/Play.css';
import LeaderBoard from '../Components/LeaderBoard';
import WhiteBoard from '../Components/WhiteBoard';
import Chat from '../Components/Chat';
import Lobby from '../Components/Lobby';
import {socket} from "../App"

 const Play = () => {
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const [username,setusername] = useState("user")
  const [id,setid] = useState("");
  
  useEffect(() => {
    console.log(socket.id)
    if(socket.id!==undefined){
      setid(socket.id);
      socket.emit("join", id);
    }
    
  });

  useEffect(() => {
    if (loginData) setusername(loginData.username);
  }, []);

  const [count, setcount] = useState(0);
  useEffect(() => {
    socket.emit("count",id)
    socket.on("playercount", (data) => {
      setcount(data);
    });
  });

  return (
    <>
    {
      count===3?
      (
        <div className="main-game">
          <LeaderBoard username={username}/>
          <WhiteBoard id = {id}/>
          <Chat username={username} id = {id} />
        </div>
      ):
      (
        <Lobby count={count}/>
        
      )
    }
    
    </>
  )
}

export default Play;