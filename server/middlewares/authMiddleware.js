import jwt from 'jsonwebtoken'
import env from '../config/env'
import { findUserByEmail } from '../utils/userUtils'

export const verifyAccessToken = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (!accessToken) return res.status(400).json({ error: "Authorization Header was empty or had an invalid format" })

    // accessToken acquired
    try {
        const decoded = jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET)
        const user = await findUserByEmail(decoded.email)
        if (!user) return res.status(404).json({ error: "User NOT FOUND" })
        req.user = user
        return next()
    } catch (err) {
        const error = err.name
        switch (error) {
            case "TokenExpiredError": return res.status(401).json({ error: "Session/Token Expired" })
            // Frontend will handle calling refresh endpoint and recalling the needed endpoint
            case "JsonWebTokenError": return res.status(401).json({ error: "Invalid Session/Token, please relogin" })
            default: return res.sendStatus(500)
        }
    }
}
