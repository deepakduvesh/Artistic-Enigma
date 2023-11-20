import React, { useState,useEffect } from 'react'
import '../Styles/Play.css';
import LeaderBoard from '../Components/LeaderBoard';
import WhiteBoard from '../Components/WhiteBoard';
import Chat from '../Components/Chat';
import Lobby from '../Components/Lobby';
import {socket} from "../App"
import Time from '../Components/Time';

  const Play = () => {
  const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
  const [username,setusername] = useState("")
  const [email, setEmail] = useState("")
  const [id,setid] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [room, setRoom] = useState(null);
  const [score, setScore] = useState(null)
  // useEffect(() => {
    console.log(socket.id) 
    if(socket.id !== undefined && username !== ""){
      // setid(socket.id);
      const data = {id:id, username:username, email:email};
      socket.emit("join", data);
    }
    
  // });
  
  useEffect(() => {
    if (loginData){
      setusername(loginData.username);
      setEmail(loginData.email);
    } 
  }, []);

  // const [count, setcount] = useState(0);
  // useEffect(() => {
  //   socket.emit("count",email)
  //   socket.on("playercount", (data) => {
  //     setcount(data);
  //   });
  // });

  return (
    <>
    {/* { */}
      {/* // startGame?( */}
       
      {/* // ):"" */}
      {/* count>=2? */}
      {/* ( */}
        <div className="wrapper">
          <div className="header">
             <h1>Header</h1>
          </div>

      <article className="main">
         <WhiteBoard username={username} id={id} email = {email}/>
      </article>

      <aside className="aside aside1">
         <LeaderBoard username={username} id={id} email = {email}/>
      </aside>
      <aside className="aside aside2">
         <Chat username={username} id={id} email = {email}/>
      </aside>

         <footer className="footer">
             <h1>footer</h1>
        </footer>
     </div>
      ):
      (
        <Lobby count={count}/>
      )
    } */}
    </>
  )
}

export default Play;