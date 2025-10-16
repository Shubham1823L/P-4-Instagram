import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import Otp from '../models/Otp.js';
import env from '../config/env.js';
import User from '../models/User.js';
import { generateAccessToken } from '../utils/generateToken.js';



export const sendOtp = async (email) => {
    const otp = Math.floor(Math.random() * (1_000_000 - 100_000) + 100_000)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: env.EMAIL_ID, pass: env.EMAIL_PASS }
    });
    await transporter.sendMail({
        from: `"Shubham" <${env.EMAIL_ID}>`,
        to: email,
        subject: 'A fun Message from The Great Dev',
        text: `Why don't you do ${otp} pushups today?`,
    })

    // Sending cookie to confirm user later
    const otpToken = generateAccessToken(email)
    res.cookie('otpToken', otpToken, env.COOKIE_OPTIONS)
    await Otp.create({ otp, user: user._id })
}



export const verifyOtp = async (req, res) => {
    const { otp } = req.body
    // otpToken contains JWT signed email of user
    const otpToken = req.cookies.otpToken
    // Checking if received otp corresponds to correct user
    const user = (await Otp.findOne({ otp }).populate("user")).user
    
    try {
        const payload = jwt.verify(otpToken, env.ACCESS_TOKEN_SECRET)
        if (payload.email !== user.email) return res.status(400).json({messagae:"Invalid OTP"})

        //Set User verified :true
        await User.updateOne({ email: user.email }, { $set: { verified: true } })
    } catch (error) {
        console.error("Error in JWT verification", error)
        return res.status(500).json({ message: "Internal Server Error,JWT Verification Failed" })
    }
}

