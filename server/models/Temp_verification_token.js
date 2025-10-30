import mongoose from "mongoose";

const tempTokenSchema = new mongoose.Schema({
    email: String,
    password: String,
    username: String,
    otp_uuid: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Temp_verification_token", tempTokenSchema)