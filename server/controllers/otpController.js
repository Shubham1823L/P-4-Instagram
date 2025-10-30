import nodemailer from 'nodemailer'
import env from '../config/env.js';
import User from '../models/User.js';
import Temp_verification_token from '../models/Temp_verification_token.js';
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';


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
    const { otp_uuid, email } = req.cookies
    if (!otp_uuid || !email) return res.status(410).json({ error: "Session Expired , please signup again" })

    let otpData
    try {
        otpData = await Temp_verification_token.findOne({ otp_uuid })
        if (!otpData) return res.status(500)
        // email and otp_uuid.email will always match, no need to check since both are sent in cookies
        if (req.body.otp !== otpData.otp) return res.status(400).json({ error: "Incorrect Otp" })

        const expiresAt = otpData.createdAt + 5 * 60 * 1000
        if (expiresAt < Date.now()) return res.status(410).json({ error: "Otp expired " })
        // Otp is correct and not expired 
        // Creating New User in db and cleaning up

        res.clearCookie("otp_uuid", {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })
        res.clearCookie("email", {
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })



    } catch (error) {
        console.error("error hashing password " + error)
        return res.status(500).json({ error: "error hashing password " + error })
    }

    let hashedPassword
    const { username, fullName, password } = otpData
    try {
        hashedPassword = await bcrypt.hash(password, 10)
    } catch (error) {
        console.error("error finding otp_uuid " + error)
        return res.status(500).json({ error: "error finding otp_uuid " + error })
    }

    // Produce and send tokens
    try {
        const refreshToken = generateRefreshToken(email)
        res.cookie('refreshToken', refreshToken, env.COOKIE_OPTIONS)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

    try {
        const accessToken = generateAccessToken(email)
        try {
            const user = await User.create({ username, fullName, password: hashedPassword, email })
            return res.status(201).json({ user, accessToken, message: "Account Created Successfully" })
        } catch (error) {
            console.error("error creating new user " + error)
            return res.status(500).json({ error: "error creating new user " + error })
        }

    } catch (error) {
        return res.status(500).json({ error: error.message })
    }




}

