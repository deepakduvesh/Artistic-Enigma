import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    room:{
        type: Number,
    },
    email:{
        type:[String],
    },
    turn:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:new Date(),
        // expires:24*60*60,
    }
});


export default mongoose.model("Room", RoomSchema);
