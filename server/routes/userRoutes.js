import express from 'express'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
import { getUsers } from '../controllers/userController.js'

const router =express.Router()

router.get('/:username',verifyAccessToken,getUsers)

export default router