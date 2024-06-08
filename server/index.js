import  express  from "express";
import http from "http"
import cors from "cors"
import { Server } from "socket.io";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import authRoute from "./Routes/AuthRoute.js"
import { getRandomValues } from "crypto";
import UserRoom from "./Models/UserRoom.js";
import RoomModel from "./Models/RoomModel.js";
import { create } from "domain";

const app = express();
config({
  path:"./data/config.env"
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
authRoute.use(cors())
app.use(authRoute)
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static( './uploads'));
app.get("/",(req,res)=>{
  res.json("working")
})

export const server = http.createServer(app)             
const io = new Server(server,{   
  cors:{
      origin:"http://localhost:3000",
      methods:["GET","POST"],
  }
}) 

const limit = 10;

const mp = new Map()
const score = new Map()
const roomMap = {}
const players = {}
let publicRoom = null;
const playersEmail = []
const arr = new Array()
const words = [['chair','fall','cat'],['traffic','light','flashlight'],['ghost','hen','iceland'],['kid','lamp','mount'],['nose','owl','potato'],['queen','russia','south']]
const k = 3 
let tempscore = 0;

const privateRotateTurn = (room) =>{
  const roomState = roomMap[room];
  let roomSize = roomMap[room].players.length;
  let currTurn = roomMap[room].currentTurn;
  if (currTurn === -1) {
    currTurn = 0;
  } else {
    currTurn = (currTurn + 1) % roomSize;
  }
  console.log("room suze: ",roomSize , "curr turn : ",currTurn, "players : " ,roomMap[room].players);
  let currPlayer = roomMap[room].players[currTurn];

  let time;
  
  if(currTurn===0){
    roomMap[room].round = roomMap[room].round+1;
  }
 
  roomMap[room].currPlayer = currPlayer.email;
  roomMap[room].currentTurn = currTurn;
  if(roomMap[room].round===1 && currTurn===0){
    time = 100;
  }
  else{
    time = 1000*20;
  }
  

  if(roomMap[room].round === 3){
    io.to(room).emit("exit",roomMap[room].players)
    delete roomMap[room];
    publicRoom=null;
    return;
  }
  console.log("currturn", currTurn, "round ", roomMap[room].round, " time ", time);
  const randomIndex = Math.floor(Math.random() * words.length);

  
  const data = {
    currPlayer:currPlayer.email,
    words:words[randomIndex],
    roomNo:room,
    roomSize:roomSize,
    username:currPlayer.username, 
    round:roomMap[room].round,
 
  }

  let currPlayerScore = currPlayer.score
  currPlayerScore = currPlayerScore + parseInt(roomMap[room].tempscore/(roomSize-1));
  roomMap[room].players[currTurn].score = currPlayerScore
  io.to(room).emit("turn", data);
  io.to(room).emit("playerScore", roomMap[room].players);
  roomMap[room].tempscore = 0;
    setTimeout(() => { 
      io.to(room).emit("endTurn", currPlayer.email);
      roomMap[room].privateRotateTurn();
    }, time);
}

  io.on("connection",(socket)=>{
  console.log(`user connected : ${socket.id}`)
   
  socket.on("joinRoom", (data)=>{
    const roomNo = data.roomNo;
    const email = data.email
    const username = data.username
    const type = data.type;
    if(roomNo === 0 || (type === "public") && (publicRoom===null)){
      
      let room = Math.floor(Math.random() * 1000) + 1;
      if(type === "public"){
        publicRoom = room;
      }
      socket.join(room)
      roomMap[room] = {
        roomNo:room,
        players:[
          {
            email:email,
            score:0,
            username:username,
          }
        ],
        roomSize:data.roomSize,
        currentTurn:-1,
        round:0,
        tempscore:0,
        currPlayer:null,
      } 
      roomMap[room].privateRotateTurn = () => privateRotateTurn(room);
      const value = {
        roomNo: room,
        roomSize: data.roomSize 
      } 
      io.to(room).emit("roomNo",value);
    }

    else{ 
      if(type==="public" && publicRoom){
        socket.join(publicRoom); 
        if(roomMap[publicRoom].players.findIndex(item=>item.email===email)===-1){
          roomMap[publicRoom].players.push({email:email,score:0,username:username});
        }
        if(roomMap[publicRoom].players.length===2){
          roomMap[publicRoom].privateRotateTurn(); 
        }
        io.to(publicRoom).emit("playerScore",roomMap[publicRoom].players)
      }
      else{
      let roomSize = roomMap[roomNo].players.length;
      socket.join(roomNo);
      if(roomSize < roomMap[roomNo].roomSize && roomMap[roomNo].players.findIndex(item => item.email === email)===-1){
        players[data.email] = {
          roomNo:roomNo,
          score:1,
          roomSize:roomMap[roomNo].roomSize,
          username:data.username
        }
        roomMap[roomNo].players.push({email:email,score:0,username:username});
        console.log(roomMap)
        const value = {
          roomNo: roomNo,
          roomSize: roomMap[roomNo].roomSize, 
        }
        io.to(roomNo).emit("roomNo",value);
      }
      playersEmail.push(data.email)
      }
      
    }
     
  })

  socket.on("playersNo", (data)=>{
    io.to(data).emit("roomPlayers",roomMap[data].players)
    if(roomMap[data].players.length === roomMap[data].roomSize){
      io.to(data).emit("canStart",true);

      setTimeout(()=>{
        io.to(data).emit("playerScore",roomMap[data].players)
      
      },1*1000)
        roomMap[data].privateRotateTurn();
 
      
      
    }
  })
    socket.on("send_msg",(data)=>{
      socket.to(data.roomNo).emit("receive_msg",data);
    })
    socket.on('undoRedo',(data)=>{
      io.to(data.roomNo).emit('performUndoRedo',data);
    })

    socket.on("sendstart",(data)=>{
        console.log("start")
        socket.broadcast.emit("receivestart",data)
    })

    socket.on("guessed",(data)=>{
      const roomNo = data.roomNo
      if(roomNo!==undefined && roomNo!==0){
        const email = data.email
      const index = roomMap[roomNo].players.findIndex(item => item.email === email)
      let sc = roomMap[roomNo].players[index].score
      let time = 100-data.time;
      roomMap[roomNo].players[index].score = sc+time;
      roomMap[roomNo].tempscore = roomMap[roomNo].tempscore + time;
      }
    })
    
    socket.on("choosedWord",(data)=>{
      io.to(data.roomNo).emit("choosenWord",data);
    }) 
    socket.on("senddraw",(data)=>{
        io.to(data.roomNo).emit("receivedraw",data)
    })
    socket.on("disconnect",()=>{
        console.log(`disconnected ${socket.id}`)
    })                                                                                                              
})       