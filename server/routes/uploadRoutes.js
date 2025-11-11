import express from 'express'
import upload from '../middlewares/multerMiddleware.js'
import { checkUploadsExists, uploadFileToCloudinary } from '../controllers/uploadController.js'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.use(checkUploadsExists)

router.post('/newPost', verifyAccessToken, upload.single('newPost'), uploadFileToCloudinary)

router.post('/avatar', verifyAccessToken, upload.single('avatar'), uploadFileToCloudinary)

//inside single() we put the fieldname i.e. name attribute value of form input
export default router

