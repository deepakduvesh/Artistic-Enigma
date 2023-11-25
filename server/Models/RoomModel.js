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
    }
});


export default mongoose.model("Room", RoomSchema);
