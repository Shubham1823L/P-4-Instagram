import express from 'express'
import { createPost, deletePost, getFeedPosts, getMyPosts, getPost } from '../controllers/postController.js'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.post('/', verifyAccessToken, createPost)

router.get('/',verifyAccessToken,getMyPosts)

router.get('/feed', verifyAccessToken, getFeedPosts)

router.get('/:postId', getPost)

router.delete('/:postId', verifyAccessToken, deletePost)


export default router