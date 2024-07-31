import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserShema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        default:null
    },
    image:{
        type:String,
        default:null
    },

    status:{
        type:Number,
        default:1
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
})

export default mongoose.model("User" , UserShema)