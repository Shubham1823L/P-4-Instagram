import { findUserByEmail } from "../utils/userUtils"
import { sendOtp } from "./otpController"
import { generateAccessToken } from "../utils/generateToken"
import env from "../config/env"
import Otp from "../models/Otp"

export async function signup(req, res) {//--> just for otp sending and email saving
    const { email } = req.body
    // Check if user already exists 
    try {
        const user = await findUserByEmail(email)

        if (user) {
            const verified = user.verified
            // verified=>Pre-exisiting registered user, 409---> includes cases of logged in/out
            if (verified) return res.status(409).send("User already exists")
        }


        // NOT verified/NEW user => Sending otp
       
        sendOtp(email)
        return res.status(200).send("Otp sent via email")
    } catch (error) {
        console.error("Error occured in user retrieval", error)
        return res.status(500).send("Server shit its pants, devs are sweating hard to fix this")
    }
}

// REGISTER PASSWORD LOGIC LATER

// Let user Login even if he is already logged in for multi device support

export const login = (req,res) => {
  const {email,password} = req.body
  
}

