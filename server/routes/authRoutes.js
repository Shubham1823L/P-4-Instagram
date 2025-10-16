import express from 'express'
import { signup, login, logout, registerPass, refreshAccessToken } from '../controllers/authController.js'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
import { validateEmail, validatePassword } from '../middlewares/validateMiddleware.js'
import { verifyOtp } from '../controllers/otpController.js'
const router = express.Router()


router.post('/signup', validateEmail, signup)

router.post('/signup/verify', verifyOtp)

router.post('/signup/register', validatePassword, registerPass)

router.post('/login', validateEmail, validatePassword, login)

router.post('/logout', verifyAccessToken, logout)

router.post('/refresh', refreshAccessToken)


export default router