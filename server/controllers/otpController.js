import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import env from '../config/env.js';
import User from '../models/User.js';
import Otp from '../models/Otp.js'



export const sendOtp = async (email, otp) => {

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


}



export const verifyOtp = async (req, res) => {
    const { otp } = req.body
    // otpToken contains JWT signed email of user
    const otpToken = req.cookies.otpToken
    // Checking if received otp corresponds to correct user
    const otpData = await Otp.findOne({ otp }).populate("user")
    const user = otpData && otpData.user
    if(!user) return res.status(400).json({error:"Invalid/Expired Otp"})

    try {
        const payload = jwt.verify(otpToken, env.ACCESS_TOKEN_SECRET)
        if (payload.email !== user.email) return res.status(400).json({ messagae: "Invalid OTP" })

        //Set User verified :true
        await User.updateOne({ email: user.email }, { $set: { verified: true } })
        res.clearCookie('otpToken')
        await Otp.deleteOne({ user: user._id })
        return res.status(200).json({ message: "Account Verified Successfully" })
    } catch (error) {
        console.error("Error in JWT verification", error)
        return res.status(500).json({ message: "Internal Server Error,JWT Verification Failed" })
    }
}

