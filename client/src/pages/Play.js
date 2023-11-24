import React, { useState,useEffect } from 'react'
import '../Styles/Play.css';
import LeaderBoard from '../Components/LeaderBoard';
import WhiteBoard from '../Components/WhiteBoard';
import Chat from '../Components/Chat';
import Lobby from './Lobby';
import {socket} from "../App"
import Time from '../Components/Time';

  const Play = () => {
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const [username,setusername] = useState("")
  const [email, setEmail] = useState("")
  const [id,setid] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [roomNo, setRoomNo] = useState(0);
  const [score, setScore] = useState(null)
  // useEffect(() => {
    // console.log(socket.id) 
    // if(socket.id !== undefined && username !== ""){
    //   // setid(socket.id);
    //   const data = {id:id, username:username, email:email};
    //   socket.emit("join", data);
    // }
    
  // });
  
  useEffect(() => {
    if (loginData){
      setusername(loginData.username);
      setEmail(loginData.email);
    } 
    socket.on("roomNo",(data)=>{
      setRoomNo(data)
    })
  });


  return (
    <>
        <div className="wrapper">
          <div className="header">
             
          </div>

      <article  className="main">
         <WhiteBoard username={username} id={id} email = {email}/>
      </article>

      <aside className="aside aside1">
         <LeaderBoard username={username} id={id} email = {email}/>
      </aside>
      <aside className="aside aside2">
         <Chat username={username} id={id} email = {email}/>
      </aside>

     

         <footer className="footer">
             
        </footer>
     </div>
    </>
  )
}

export default Play;