import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'
import env from './config/env.js'

import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import otpRoutes from './routes/otpRoutes.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/otp',otpRoutes)

connectDB()
app.listen(env.PORT || 3000)