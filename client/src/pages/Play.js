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
  const [username,setusername] = useState("")
  const [id,setid] = useState("");
  
  useEffect(() => {
    console.log(socket.id)
    if(socket.id !== undefined && username !== ""){
      setid(socket.id);
      const data = {id:id, username:username};
      socket.emit("join", data);
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
        <div className="wrapper">
          <div className="header">
             <h1>Header</h1>
          </div>

        <article className="main">
           <WhiteBoard username={username} id={id}/>
        </article>

        <aside className="aside aside1">
           <LeaderBoard username={username} id={id} />
        </aside>
        <aside className="aside aside2">
           <Chat username={username} id={id} />
        </aside>

         <footer className="footer">
             <h1>footer</h1>
        </footer>
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