import { findUserByEmail } from "../utils/userUtils"
import { sendOtp } from "./otpController"
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken"
import env from "../config/env"
import User from "../models/User"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function signup(req, res) {//--> just for otp sending and email saving
    const { email } = req.body
    // Check if user already exists 
    try {
        const user = await findUserByEmail(email)

        // verified=>Pre-exisiting registered user, 409---> includes cases of logged in/out
        if (user && user.verified) return res.status(409).send("User already exists")

        // NOT verified/NEW user => Sending otp
        sendOtp(email)
        return res.status(200).send("Otp sent via email")
    } catch (error) {
        console.error("Error occured in user retrieval", error)
        return res.status(500).send("Server shit its pants, devs are sweating hard to fix this")
    }
}

// Register Password Logic
export const registerPass = async (req, res) => {
    const { email, password } = req.body

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
        return res.status(500).json({ error })
    }

    try {
        const accessToken = generateAccessToken(email)
        return res.status(201).json({ message: "Account Successfully Created!", accessToken })
    } catch (error) {
        return res.status(500).json({ error })
    }

}

// Let user Login even if he is already logged in for multi device support
export const login = async (req, res) => {
    const { email, password } = req.body //--> already non-empty , valid format
    const user = await findUserByEmail(email)
    if (!user || !user.verified) return res.status(404).json({ message: "Email not registered. Please signup first" })

    // Authenticate using password
    try {
        const value = await bcrypt.compare(password, user.password)
        if (!value) return res.status(400).json({ message: "Incorrect Password" })

        // => value = true .Therefore try block will be exited and user is authenticated
    } catch (error) {
        console.error("Error comparing password:", error)
        return res.status(500).json({ error })
    }


    // Produce and send tokens
    try {
        const refreshToken = generateRefreshToken(email)
        res.cookie('refreshToken', refreshToken, env.COOKIE_OPTIONS)
    } catch (error) {
        return res.status(500).json({ error })
    }

    try {
        const accessToken = generateAccessToken(email)
        return res.status(201).json({ message: "Account Successfully Created!", accessToken })
    } catch (error) {
        return res.status(500).json({ error })
    }


}

export const logout = async (req, res) => {
    res.clearCookie('refreshToken', env.COOKIE_OPTIONS)
    return res.sendStatus(204)
}

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies('refreshToken', env.COOKIE_OPTIONS)
    if (!refreshToken) return res.status(404).json({ error: "Refresh Token NOT FOUND" })
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
        if (error === "TokenExpiredError") return res.status(401).json({ error })
        if (error === "JsonWebTokenError") return res.status(401).json({ error })
        return res.status(500).json({ error })
    }
}



