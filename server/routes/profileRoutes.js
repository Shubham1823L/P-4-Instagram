import express from 'express'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
import User from '../models/User.js'
import { deleteProfile, getProfileData, updateProfileData } from '../controllers/profileController.js'



const router = express.Router()

router.get('/:username', getProfileData)

router.patch('/update', verifyAccessToken, updateProfileData)

router.delete('/', verifyAccessToken, deleteProfile)


router.param('username', async (req, res, next, username) => {
    const user = await User.findOne({ username })
    if (!user) return res.status(404).json({ error: "User not found" })
    req.user = user
    next()
})


export default router
