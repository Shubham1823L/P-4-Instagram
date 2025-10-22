import express from 'express'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
import User from '../models/User.js'
import { toggleFollow } from '../controllers/followController.js'

const router = express.Router()

router.post('/follow/:username', verifyAccessToken, toggleFollow)

router.delete('/unfollow/:username', verifyAccessToken, toggleFollow)

router.param('username', async (req, res, next, username) => {
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: "User not found" })
    req.toBeFollowed = user
    next()
})


export default router