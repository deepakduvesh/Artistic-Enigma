import  {connectDB}  from "./data/database.js";
import {server} from "./index.js"
connectDB();

server.listen(process.env.PORT,()=>{ 
    console.log("server is working")
}) 