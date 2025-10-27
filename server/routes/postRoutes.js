import express from 'express'
import { createPost, deletePost, getFeedPosts, getPost } from '../controllers/postController.js'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/', verifyAccessToken, createPost)

router.get('/feed', verifyAccessToken, getFeedPosts)

router.get('/:postId', getPost)

router.delete('/:postId', verifyAccessToken, deletePost)


export default router