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

let round = 0;
const limit = 10;


// const saveUserRoom = (email,room) =>{
//   const userRoom  = new UserRoom({
//     email:email,
//     room:room,
//   })

//   userRoom.save()
//           .then(savedUser => {
//             console.log("user saved in room:", savedUser);
//           })
//           .catch(error => {
//             console.error("Error saving room:", error);
//           });
// }

// const createRoom = (email,room) =>{
//   const newRoom = new RoomModel({
//     room:room,
//     email:[email],
//   })
//   newRoom.save()
//   .then(savedRoom => {
//     console.log("Room saved:", savedRoom);
//   })
//   .catch(error => {
//     console.error("Error saving room:", error);
//   });

// }

// const insertInRoom = (email,room) =>{
//   RoomModel.findOneAndUpdate(
//     { room: room },
//     { $push: { email: email } },
//     { new: true }
//   )
//     .then(updatedRoom => {
//       if (updatedRoom) {
//         console.log("Room updated:", updatedRoom);
//       } else {
//         console.log("Room not found");
//       }
//     })
//     .catch(error => {
//       console.error("Error updating room:", error);
//     });
// }

const mp = new Map()
const score = new Map()
const roomMap = {}
const players = {}
const playersEmail = []
const arr = new Array()
const words = [['chair','fall','cat'],['traffic','light','flashlight'],['ghost','hen','iceland'],['kid','lamp','mount'],['nose','owl','potato'],['queen','russia','south']]
const k = 3 
let time
let tempscore = 0;
let currentTurn = -1; 
let turnInterval; 
 


//  function rotateTurns() {
//   const currPlayer = arr[(currentTurn + 1) % arr.length];
//   currentTurn = (currentTurn + 1) % arr.length;
//   if(currentTurn===0){
//     round = round + 1;
//   }
//   if(round === 1){
//     time = 1000
//   }
//   else {
//     time = 1000*20
//   }
//   console.log("current player",currPlayer)
//   const randomIndex = Math.floor(Math.random() * words.length);

  
//   const data = {
//     currPlayer:currPlayer,
//     words:words[randomIndex],
//   }

//   io.emit("turn", data);
//     console.log(data," turn sent")
//     setTimeout(() => { 
//         // const scoreJson = JSON.stringify(score);
//         let player = score.get(currPlayer);
        
//         let currPlayerScore = player[0]; 
//         currPlayerScore = currPlayerScore + parseInt(tempscore/2);
//         // console.log(tempscore);
//         player[0] = currPlayerScore
//         score.set(currPlayer,player)
        
//         io.emit("endTurn", currPlayer);
//         io.emit("playerScore", JSON.stringify([...score]));
//         console.log(score)
//         tempscore = 0;
//         rotateTurns(); 
//     }, time);
  
  
//   } 



const privateRotateTurn = (players,currTurn,room,roomSize) =>{
  const currPlayer = players[(currTurn + 1) % roomSize];
  currTurn = (currTurn + 1) % roomSize;
  // if(currTurn===0){
  //   round = round + 1;
  // }
  // if(round === 1){
  //   time = 1000
  // }
  // else {
  //   time = 1000*20
  // }
  console.log("current player",currPlayer.email)
  const randomIndex = Math.floor(Math.random() * words.length);

  
  const data = {
    currPlayer:currPlayer.email,
    words:words[randomIndex],
    roomNo:room,
    roomSize:roomSize,
    username:currPlayer.username,

  }


  io.to(room).emit("turn", data);
    console.log(data," turn sent")
    setTimeout(() => { 
        // const scoreJson = JSON.stringify(score);
        
        
        let currPlayerScore = currPlayer.score
        currPlayerScore = currPlayerScore + parseInt(tempscore/2);
        // const index = players.findIndex(item => item.email === email)
        players[currTurn].score =  currPlayerScore;
        
        io.to(room).emit("endTurn", currPlayer.email);
        io.to(room).emit("playerScore", players);
        console.log(players)
        tempscore = 0;
        privateRotateTurn(players,currTurn,room,roomSize);
    }, 1000*10);
}


  io.on("connection",(socket)=>{
  console.log(`user connected : ${socket.id}`)
   
  socket.on("joinRoom", (data)=>{
    const roomNo = data.roomNo;
    const email = data.email
    const username = data.username
    if(roomNo === 0){
      let room = Math.floor(Math.random() * 1000) + 1;
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
      } 
      players[data.email] = {
        roomNo:room,
        score:0,
        roomSize:data.roomSize,
        username:data.username
      }
      playersEmail.push(data.email);
      console.log("room : ",roomMap)
      io.to(room).emit("roomNo",room);
    }

    else{
      let roomSize = roomMap[roomNo].players.length;
      console.log(roomMap)
      socket.join(roomNo);
      if(roomSize < roomMap[roomNo].roomSize && roomMap[roomNo].players.findIndex(item => item.email === email)===-1){
        players[data.email] = {
          roomNo:roomNo,
          score:0,
          roomSize:roomMap[roomNo].roomSize,
          username:data.username
        }
        roomMap[roomNo].players.push({email:email,score:0,username:username});
        console.log(roomMap)
        io.to(roomNo).emit("roomNo",roomNo);
      }
      playersEmail.push(data.email)
    }
     
  })

  socket.on("playersNo", (data)=>{
    io.to(data).emit("roomPlayers",roomMap[data].players)
    if(roomMap[data].players.length === roomMap[data].roomSize){
      io.to(data).emit("canStart",true);
      io.to(data).emit("playerScore",roomMap[data].players)
      privateRotateTurn(roomMap[data].players,-1,data,roomMap[data].roomSize)
    }
  })

   

    socket.on("send_msg",(data)=>{
      io.to(data.roomNo).emit("receive_msg",data);
    })
  
    // socket.on("join",(data)=>{
    //     if( data.id !== "" && mp.get(data.id) !== "1"){
    //         mp.set(data.id,"1")
    //         score.set(data.id,[0,data.username]);
    //         arr.push(data.id)
    //         const s = arr.size;
    //         console.log("user id",data.id)
    //         console.log("map size",mp.size)
    //         // console.log("arr size",arr.length)
            
    //     }
    // })


    // socket.on("join",async (data) => {
    //   const email = data.email
    //       if( email !== "" && mp.get(email) !== "1"){
    //         mp.set(email,"1")
    //         score.set(email,[0,data.username]);
    //         arr.push(email)
    //         const s = arr.size;
    //         console.log("user id",email)
    //         console.log("map size",mp.size)
    //         if(arr.length===2){
             
    //           rotateTurns();
    //         }
    //         io.emit("playerScore",JSON.stringify([...score]))
            
    //     }
    //   // const userRoom = await UserRoom.findOne({email:email})
    //   // if(!userRoom){
    //   //   if(!room){
    //   //     randRoom();
    //   //     socket.join(room);
          
    //   //     createRoom(email,room);
    //   //     saveUserRoom(email,room) 
          
    //   //   }
    //   //   else if(room){
    //   //     const Room = await RoomModel.findOne({room:room})
    //   //     const userEmail = await RoomModel.findOne({ email: { $in: [email] } });
    //   //     if(!userEmail && Room.email.length >= limit){
    //   //       randRoom();
    //   //       socket.join(room)
    //   //       createRoom(email,room);
    //   //       saveUserRoom(email,room)
            
    //   //     }
    //   //     else if(!userEmail){
    //   //       socket.join(room)
    //   //       insertInRoom(email,room)
    //   //       saveUserRoom(email,room)
    //   //     }
          
    //   //   }
    //   // }
    //   // else{
    //   //   const user = await UserRoom.findOne({email:email})
    //   //   const room = user.room
    //   //   socket.join(room)
    //   // }
    //   // const user = await UserRoom.findOne({email:email})
      
    //   // io.to(user.room).emit("startGame",data)
    // })

    socket.on('undoRedo',(data)=>{
      io.to(data.roomNo).emit('performUndoRedo',data);
    })

    // socket.on("count",(data)=>{
    //   if(data !== '' && mp.get(data) !== undefined) {
    //     socket.emit("playercount",arr.length);
    //   }
    //   if(arr.length===2){
    //     currentTurn = -1;
    //     // io.emit("players",arr)
        
    //     rotateTurns();
    //   }
    //   if(arr.length>=2){
    //     io.emit("playerScore",JSON.stringify([...score]))
    //   }
    // })

    socket.on("sendstart",(data)=>{
        console.log("start")
        socket.broadcast.emit("receivestart",data)
    })

    socket.on("guessed",(data)=>{
      let sc = score.get(data.email)[0];
      let time = 100-data.time;
      score.set(data.email,[sc+time,data.username]);
      tempscore = tempscore + time;
      console.log("tempscore", tempscore);
    })
    
    socket.on("choosedWord",(data)=>{
      io.to(data.roomNo).emit("choosenWord",data);
    })

    socket.on("senddraw",(data)=>{
        console.log("move")
        io.to(data.roomNo).emit("receivedraw",data)
    })

    socket.on("disconnect",()=>{
        console.log(`disconnected ${socket.id}`)
        
        // mp.delete(socket.id)
    })

}) 