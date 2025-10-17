import express from 'express'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
import { getProfile } from '../controllers/userController.js'
const router = express.Router()


// These get routes are not to fetch pages but just the user data , since pages will be rendered by client i.e. CSR is being used
router.get('/profile', verifyAccessToken, getProfile)

// router.put('/profile', verifyAccessToken, updateProfile)




export default router