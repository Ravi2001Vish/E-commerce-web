import mongoose from "mongoose";
const Schema = mongoose.Schema;
const brand  = new Schema({
    name:{
        type:String,
        required:true
    },
    Logo:{
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
}
})
export default mongoose.model("brand", brand)