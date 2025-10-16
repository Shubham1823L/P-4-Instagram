import express from 'express'
import { signup, login, logout, refresh } from '../controllers/authController'
import { verifyToken } from '../middlewares/authMiddleware'
import { validateEmail, validatePassword } from '../middlewares/validateMiddleware'
import { verifyOtp } from '../controllers/otpController'
const router = express.Router()


router.post('/signup', validateEmail, signup)

router.post('/signup/verify', verifyOtp)

router.post('/login', validateEmail, validatePassword, login)

router.post('/logout', verifyToken, logout)

router.post('/refresh', refresh)


export default router