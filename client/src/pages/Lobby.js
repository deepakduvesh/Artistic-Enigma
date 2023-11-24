import React, { useEffect,useState } from 'react'
import rocket from '../Assets/rocket.png';
import '../Styles/Lobby.css';
import { socket } from '../App';
import { useNavigate } from 'react-router-dom';
 const Lobby = ( {count} ) => {
    const navigate = useNavigate();
    const [roomNo, setRoomNo] = useState(null);
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("")
    const [totalPlayers, setTotalPlayers] = useState(0);
    const [canStart,setCanStart] = useState(false);
    // useEffect(()=>{
        
    // },[])
    const ldata = sessionStorage.getItem("loginData")
  const loginData = JSON.parse(ldata)
    useEffect(()=>{
        if(loginData){
            setEmail(loginData.email);
            setUsername(loginData.username)
          }
        socket.on("roomNo",(data)=>{
            setRoomNo(data)
        })
       
        socket.on("canStart",(data)=>{
            console.log("yes start")
            setCanStart(data);
        })
        
        if(canStart){ 
            navigate("/Play")
        }
        if(roomNo && username && email){
            const joinData = {
                email: email,
                username: username,
                roomNo: roomNo,
              }
            socket.emit("joinRoom",joinData)
            socket.emit("playersNo",roomNo)
            socket.on("roomPlayers",(data)=>{
                console.log(data)
                setTotalPlayers(data.length);
            })
        }
    
    })
    
   
    useEffect(()=>{
        function stars(){
            let count = 50;
            let scene = document.querySelector('.scene');
            let i = 0;
            while (i < count){
                let star = document.createElement('i');
                let x = Math.floor(Math.random() * window.innerWidth);

                let duration = Math.random() * 1;
                let h = Math.random() * 100;

                star.style.left = x + 'px';
                star.style.width = 1 + 'px';
                star.style.height = 50 + h + 'px';
                star.style.animationDuration = duration + 's';

                scene.appendChild(star);
                i++;
            }
       }
       stars();
       
    })
       
  return (
    <>
       <div className="scene">
        <div className="rocket">
            <img src={rocket} alt="rocket"/>
        </div>
       </div>

       <div className="Lobby-container">
        <div className="Lobby-box">
            <div className="welcome">
           <center> <h1>Welcome to the Game Lobby</h1> </center>
            </div>
            

            <div className="Lobby-middle">
                <div className="player-container">players</div>
                <div className="rules-container">rules</div>
            </div>

            <div className="count">
                {/* <p><strong>Tottal number of player joined are: </strong></p> */}
                <span> <strong> total player in lobby { totalPlayers } out of 3 {roomNo}</strong> </span>
            </div>

            {/* <div className="enter-game">
                <button>Join</button>
            </div> */}
        </div>
    </div>
    </>
  )
}

export default Lobby;