import  express  from "express";
import http from "http"
import cors from "cors"

import { Server } from "socket.io";
import  {connectDB}  from "./data/database.js";
import { config } from "dotenv";

import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import authRoute from "./Routes/AuthRoute.js"
 
// const { MONGO_URL} = process.env;
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
     
const mp = new Map()
const arr = []
const words = [['a','b','c'],['d','e','f'],['g','h','i'],['k','l','m'],['n','o','p'],['q','r','s']]
const k = 3
let currentTurn = 0;
let turnInterval;

function rotateTurns() {
    console.log("rotate function")
    if (arr.length <k) {
      clearInterval(turnInterval);
      currentTurn = -1;
      return;
    }

    const nextPlayer = arr[(currentTurn + 1) % arr.length];
    currentTurn = (currentTurn + 1) % arr.length;
    console.log("current player",nextPlayer)
    io.emit("turn", nextPlayer);
  
    setTimeout(() => {
      io.emit("endTurn", nextPlayer);
      rotateTurns(); 
    }, 1000*10);
  }


  io.on("connection",(socket)=>{
  console.log(`user connected : ${socket.id}`)
  
  socket.on("send_msg",(data)=>{
    socket.broadcast.emit("receive_msg",data);
  })
  
    socket.on("join",(data)=>{
        if( mp.get(data)===undefined){
            mp.set(data,1)
            arr.push(data)
            console.log(mp.size)
        }
    })

    socket.on("count",(data)=>{
      if(mp.get(data)!==undefined) {
        io.emit("playercount",arr.length);
      }
      if(arr.length===k){
        currentTurn = 0;
        rotateTurns();
      }
    })

    socket.on("sendstart",(data)=>{
        console.log("start")
        socket.broadcast.emit("receivestart",data)
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