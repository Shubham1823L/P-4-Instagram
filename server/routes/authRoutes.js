import express from 'express'
import { signup, login, logout, refresh, registerPass, refreshAccessToken } from '../controllers/authController'
import { verifyAccessToken } from '../middlewares/authMiddleware'
import { validateEmail, validatePassword } from '../middlewares/validateMiddleware'
import { verifyOtp } from '../controllers/otpController'
const router = express.Router()


router.post('/signup', validateEmail, signup)

router.post('/signup/verify', verifyOtp)

router.post('/signup/register', validatePassword, registerPass)

router.post('/login', validateEmail, validatePassword, login)

router.post('/logout', verifyAccessToken, logout)

router.post('/refresh', refreshAccessToken)


export default router