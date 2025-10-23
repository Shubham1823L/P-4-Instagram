import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    text:String,
    timestamps:String,
    likesCount:{
        type:Number,
        default:0
    },
    commentsCount:{
        type:Number,
        default:0
    }

})

export default mongoose.model('Post',postSchema)