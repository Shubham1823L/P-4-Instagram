import jwt from 'jsonwebtoken'
import env from '../config/env.js'

export const generateAccessToken = (payload) => {
    try {
        return jwt.sign({ email: payload }, env.ACCESS_TOKEN_SECRET, { expiresIn: "2m" })
    } catch (error) {
        console.error("Error signing JWT", payload, error)
        throw error
    }
}

export const generateRefreshToken = (payload) => {
    try {
        return jwt.sign({ email: payload }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
    } catch (error) {
        console.error("Error signing JWT", payload, error)
        throw error
    }
}





