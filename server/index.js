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

let room = null;
const limit = 10;
const randRoom = () =>{
  room = Math.floor(Math.random() * 1000) + 1;
  // return room;
}

const saveUserRoom = (email,room) =>{
  const userRoom  = new UserRoom({
    email:email,
    room:room,
  })

  userRoom.save()
          .then(savedUser => {
            console.log("user saved in room:", savedUser);
          })
          .catch(error => {
            console.error("Error saving room:", error);
          });
}

const createRoom = (email,room) =>{
  const newRoom = new RoomModel({
    room:room,
    email:[email],
  })
  newRoom.save()
  .then(savedRoom => {
    console.log("Room saved:", savedRoom);
  })
  .catch(error => {
    console.error("Error saving room:", error);
  });

}

const insertInRoom = (email,room) =>{
  RoomModel.findOneAndUpdate(
    { room: room },
    { $push: { email: email } },
    { new: true }
  )
    .then(updatedRoom => {
      if (updatedRoom) {
        console.log("Room updated:", updatedRoom);
      } else {
        console.log("Room not found");
      }
    })
    .catch(error => {
      console.error("Error updating room:", error);
    });
}

const mp = new Map()
const score = new Map()
const arr = new Array()
const words = [['a','b','c'],['d','e','f'],['g','h','i'],['k','l','m'],['n','o','p'],['q','r','s']]
const k = 3 
let tempscore = 0;
mp.clear()
let currentTurn = -1; 
let turnInterval; 
 
function rotateTurns() {
    console.log("rotate function")
    const currPlayer = arr[(currentTurn + 1) % arr.length];
    currentTurn = (currentTurn + 1) % arr.length;
    console.log("current player",currPlayer)
    const randomIndex = Math.floor(Math.random() * words.length);

    const data = {
      currPlayer:currPlayer,
      words:words[randomIndex],
    }

    io.emit("turn", data);
    setTimeout(() => { 
        // const scoreJson = JSON.stringify(score);
        let player = score.get(currPlayer);
        
        let currPlayerScore = player[0];
        currPlayerScore = currPlayerScore + parseInt(tempscore/2);
        // console.log(tempscore);
        player[0] = currPlayerScore
        score.set(currPlayer,player)
        
        io.emit("endTurn", currPlayer);
        io.emit("playerScore", JSON.stringify([...score]));
        console.log(score)
        tempscore = 0;
        rotateTurns(); 
    }, 1000*10*6*5);
     
  }


  io.on("connection",(socket)=>{
  console.log(`user connected : ${socket.id}`)
  
    socket.on("send_msg",(data)=>{
      socket.broadcast.emit("receive_msg",data);
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


    socket.on("join",async (data) => {
      const email = data.email
          if( email !== "" && mp.get(email) !== "1"){
            mp.set(email,"1")
            score.set(email,[0,data.username]);
            arr.push(email)
            const s = arr.size;
            console.log("user id",email)
            console.log("map size",mp.size)
            if(arr.length===2){
              rotateTurns();
            }
            // console.log("arr size",arr.length)
            
        }
      const userRoom = await UserRoom.findOne({email:email})
      if(!userRoom){
        if(!room){
          randRoom();
          socket.join(room);
          
          createRoom(email,room);
          saveUserRoom(email,room) 
          
        }
        else if(room){
          const Room = await RoomModel.findOne({room:room})
          const userEmail = await RoomModel.findOne({ email: { $in: [email] } });
          if(!userEmail && Room.email.length >= limit){
            randRoom();
            socket.join(room)
            createRoom(email,room);
            saveUserRoom(email,room)
            
          }
          else if(!userEmail){
            socket.join(room)
            insertInRoom(email,room)
            saveUserRoom(email,room)
          }
          
        }
      }
      else{
        const user = await UserRoom.findOne({email:email})
        const room = user.room
        socket.join(room)
      }
      const user = await UserRoom.findOne({email:email})
      
      // io.to(user.room).emit("startGame",data)
    })

    socket.on('undoRedo',(data)=>{
      io.emit('performUndoRedo',data);
    })

    socket.on("count",(data)=>{
      if(data !== '' && mp.get(data) !== undefined) {
        socket.emit("playercount",arr.length);
      }
      if(arr.length===2){
        currentTurn = -1;
        // io.emit("players",arr)
        
        rotateTurns();
      }
      if(arr.length>=2){
        io.emit("playerScore",JSON.stringify([...score]))
      }
    })

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
      io.emit("choosenWord",data);
    })

    socket.on("senddraw",(data)=>{
        console.log("move")
        io.emit("receivedraw",data)
    })

    socket.on("disconnect",()=>{
        console.log(`disconnected ${socket.id}`)
        
        mp.delete(socket.id)
    })

}) 