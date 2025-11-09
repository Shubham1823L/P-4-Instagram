import express from 'express'
import upload from '../middlewares/multerMiddleware.js'
import { uploadFileToCloudinary } from '../controllers/uploadController.js'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/newPost', verifyAccessToken, upload.single('newPost'), uploadFileToCloudinary)

router.post('/profilePic',verifyAccessToken,upload.single('profilePic'),uploadFileToCloudinary)

//inside single() we put the fieldname i.e. name attribute value of form input
export default router

