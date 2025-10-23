import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'
import env from './config/env.js'

import authRoutes from './routes/authRoutes.js'
import profileRoutes from './routes/profileRoutes.js'
import followRoutes from './routes/followRoutes.js'
import postRoutes from './routes/postRoutes.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api/auth',authRoutes)
app.use('/api/profile',profileRoutes)
app.use('/api',followRoutes)
app.use('/api/posts',postRoutes)


connectDB()
app.listen(env.PORT || 3000)