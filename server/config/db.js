import mongoose from 'mongoose'
import env from './env.js'

async function connectDB() {
    try {
        await mongoose.connect(env.MONGO_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.error(error)
    }
}

export default connectDB