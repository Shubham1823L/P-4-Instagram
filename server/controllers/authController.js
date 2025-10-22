import { findUserByEmail } from "../utils/userUtils.js"
import { sendOtp } from "./otpController.js"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js"
import env from "../config/env.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Otp from '../models/Otp.js';


export async function signup(req, res) {//--> just for otp sending and email saving
    const { email ,username} = req.body

    // Check if user already exists 
    try {

        try {
            const user = await findUserByEmail(email)

            // verified=>Pre-exisiting registered user, 409---> includes cases of logged in/out
            if (user && user.verified) return res.status(409).send("User already exists")
        } catch (err) {
            return res.status(500).json({ error: err.details[0].message })
        }

        const user = !await findUserByEmail(email) ? await User.create({ email,username }) : await User.findOne({ email })
        // NOT verified/NEW user => Sending otp
        const otp = Math.floor(Math.random() * (1_000_000 - 100_000) + 100_000)
        sendOtp(email, otp)

        // Sending cookie to confirm user later
        const otpToken = generateAccessToken(email)
        res.cookie('otpToken', otpToken, env.COOKIE_OPTIONS)
        await Otp.deleteMany({ user: user._id })
        await Otp.create({ otp, user: user._id })

        return res.status(200).send("Otp sent via email")



    } catch (error) {
        console.error("Error occured in user retrieval", error)
        return res.status(500).send("Server shit its pants, devs are sweating hard to fix this")
    }
}

// Register Password Logic
export const registerPass = async (req, res) => {
    const { email, password } = req.body
    const user = await findUserByEmail(email)

    if (!user) return res.status(404).json({ error: "User NOT FOUND" })
    if (!user.verified || user.password) return res.status(409).json({ error: "User already exists , please sign in" })
    // Hash Password
    try {
        const hashedPassword = await bcrypt.hash(password, 10)

        // Store HashedPassword in db
        await User.updateOne({ email }, { $set: { password: hashedPassword } })
    } catch (error) {
        console.error("Error hashing password:", error)
        return res.sendStatus(500)
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
        return res.status(201).json({ message: "Account Successfully Created!", accessToken })
    } catch (error) {
        return res.status(500).json({ error: error.details[0].message })
    }

}

// Let user Login even if he is already logged in for multi device support
export const login = async (req, res) => {
    const { email, password } = req.body //--> already non-empty , valid format
    const user = await User.findOne({email}).select('+password')
    if (!user || !user.verified) return res.status(404).json({ message: "Email not registered. Please signup first" })

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
        return res.status(200).json({ message: "Logged in Successfully!", accessToken })
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
            return res.status(200).json({ message: "New Access Token Generated Successfully", accessToken })
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



