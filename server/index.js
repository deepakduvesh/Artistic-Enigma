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
     
io.on("connection",(socket)=>{
  console.log(`user connected : ${socket.id}`)
  
  socket.on("send_msg",(data)=>{
    socket.broadcast.emit("receive_msg",data);
  })
  
  socket.on("disconnect",()=>{
    console.log("user disconnected",socket.id);
  })
}) 