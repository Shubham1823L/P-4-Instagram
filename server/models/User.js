import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: String,
    verified:{
        type:Boolean,
        default:false
    }
})

export default mongoose.model('User',userSchema)