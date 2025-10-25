import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: String,
    likesCount: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    comments: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

})

export default mongoose.model('Post', postSchema)