import  express  from "express";
import http from "http"
import cors from "cors"
import { Server } from "socket.io";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import authRoute from "./Routes/AuthRoute.js"

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
    }, 1000*20);
     
  }


  io.on("connection",(socket)=>{
  console.log(`user connected : ${socket.id}`)
  
    socket.on("send_msg",(data)=>{
      socket.broadcast.emit("receive_msg",data);
    })
  
    socket.on("join",(data)=>{
        if( data.id !== "" && mp.get(data.id) !== "1"){
            mp.set(data.id,"1")
            score.set(data.id,[0,data.username]);
            arr.push(data.id)
            const s = arr.size;
            console.log("user id",data.id)
            console.log("map size",mp.size)
            // console.log("arr size",arr.length)
            
        }
    })

    socket.on("count",(data)=>{
      if(data !== undefined && mp.get(data) !== undefined) {
        io.emit("playercount",arr.length);
      }
      if(arr.length===k){
        currentTurn = -1;
        io.emit("players",arr)
        io.emit("playerScore",JSON.stringify([...score]))
        rotateTurns();
      }
    })

    socket.on("sendstart",(data)=>{
        console.log("start")
        socket.broadcast.emit("receivestart",data)
    })

    socket.on("guessed",(data)=>{
      let sc = score.get(data.myid)[0];
      let time = 100-data.time;
      score.set(data.myid,[sc+time,data.username]);
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