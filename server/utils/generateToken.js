import jwt from 'jsonwebtoken'
import env from '../config/env'

export const generateAccessToken = (payload) => jwt.sign({ email: payload }, env.ACCESS_TOKEN_SECRET, { expiresIn: "2m" })

export const generateRefreshToken = (payload) => jwt.sign({ email: payload }, env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })





