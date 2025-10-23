import express from 'express'
import { createPost, getFeedPosts, getPost } from '../controllers/postController'
import { verifyAccessToken } from '../middlewares/authMiddleware'
const router = express.Router()

router.post('/',verifyAccessToken,createPost)

router.get('/:postId',getPost)

router.get('/feed',verifyAccessToken,getFeedPosts)


export default router