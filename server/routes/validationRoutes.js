import express from 'express'
import { validateEmail, validateUsername } from '../controllers/validationController.js'

const router = express.Router()

router.post('/email',validateEmail)
router.post('/username',validateUsername)

export default router