import express from 'express'
import { validateEmail, validateUsername } from '../controllers/validationController.js'

const router = express.Router()

router.post('/email', asyncHandler(validateEmail))

router.post('/username', asyncHandler(validateUsername))

export default router