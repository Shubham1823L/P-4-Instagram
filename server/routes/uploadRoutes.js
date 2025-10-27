import express from 'express'
import upload from '../middlewares/multerMiddleware.js'
import { uploadImage } from '../controllers/uploadController.js'

const router = express.Router()

router.post('/image',upload.single('image'),uploadImage)
//inside single() we put the fieldname i.e. name attribute value of form input
export default router

