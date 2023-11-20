import mongoose from "mongoose";

const userRoomSchema = new mongoose.Schema({
  email:{
    type:String,
  },
  room:{
    type:Number,
  },
  score:{
    type:Number,
  },
  createdAt:{
    type:Date,
    default:Date.now,
    expires:24*60*60,
  }
});


export default mongoose.model("UserRoom", userRoomSchema);
