import { findUserByEmail } from "../utils/userUtils.js"
import { sendOtp } from "./otpController.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
import env from "../config/env.js"
import User from "../models/User.js"
import TempToken from "../models/Temp_verification_token.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Otp from '../models/Otp.js';


export async function signup(req, res) {//--> just for otp sending and email saving
    const { email, username, fullName, password } = req.body

    try {

        // Is the email already registered
        try {
            const user = await findUserByEmail(email)
            if (user) return res.status(409).json({ error: "User already exists", code: "USER_ALREADY_EXISTS" })
            //User must sign in , redirect him to signin page
        } catch (err) {
            return res.status(500).json({ error: err.details[0].message })
        }

        //User does not exist yet 
        // Check if username is available
        try {
            const user = await User.findOne({ username })
            if (user) return res.status(409).json({ error: "Username is taken", code: "USERNAME_IS_TAKEN" })
            // Username is already taken , ask user to select a different one
        } catch (error) {
            return res.status(500).json({ error: err.details[0].message })
        }

        // Username is available , creating a temporary verification token and sending otp
        const otp = Math.floor(Math.random() * (1e6 - 1e5) + 1e5)
        sendOtp(email, otp)

        // Sending cookie to confirm user later
        const otp_uuid = crypto.randomUUID()
        await TempToken.create({ email, password, username, fullName, otp, otp_uuid })
        res.cookie("email", email, {
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })
        res.cookie("otp_uuid", otp_uuid, {
            httpOnly: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000
        })

        return res.status(200).json({ message: "Otp sent" })



    } catch (error) {
        console.error("Error occured in user retrieval", error)
        return res.status(500).json({ error: "Error occured in user retrieval", error })
    }
}


// Let user Login even if he is already logged in for multi device support
export const login = async (req, res) => {
    const { email, password } = req.body //--> already non-empty , valid format
    const user = await User.findOne({ email }).select('+password')
    if (!user) return res.status(404).json({ message: "Email not registered. Please signup first" })

    // Authenticate using password
    try {
        const value = await bcrypt.compare(password, user.password)
        if (!value) return res.status(400).json({ message: "Incorrect Password" })

        // => value = true .Therefore try block will be exited and user is authenticated
    } catch (error) {
        console.error("Error comparing password:", error)
        return res.status(500).json({ error: error.details[0].message })
    }


    // Produce and send tokens
    try {
        const refreshToken = generateRefreshToken(email)
        res.cookie('refreshToken', refreshToken, env.COOKIE_OPTIONS)
    } catch (error) {
        return res.status(500).json({ error: error.details[0].message })
    }

    try {
        const accessToken = generateAccessToken(email)
        return res.status(200).json({
            message: "Logged in Successfully!",
            accessToken, user
        })
    } catch (error) {
        return res.status(500).json({ error: error.details[0].message })
    }


}

export const logout = async (req, res) => {
    res.clearCookie('refreshToken', env.COOKIE_OPTIONS)
    return res.sendStatus(204)
}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.status(404).json({ error: "Refresh Token NOT FOUND, please re-login" })
    try {
        const decoded = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET)
        const email = decoded.email
        const user = await findUserByEmail(email)
        if (!user) return res.status(404).json({ error: "User NOT FOUND" })
        try {
            const accessToken = generateAccessToken(email)
            return res.status(200).json({ message: "New Access Token Generated Successfully", accessToken, user })
        } catch (error) {
            console.error("Error generating accessToken:", error)
            return res.sendStatus(500)
        }
    } catch (err) {
        const error = err.name
        if (error === "TokenExpiredError") return res.status(401).json({ error: error.details[0].message })
        if (error === "JsonWebTokenError") return res.status(401).json({ error: error.details[0].message })
        return res.status(500).json({ error: error.details[0].message })
    }
}



