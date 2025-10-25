import express from 'express'
import { createComment, getComments, toggleLike } from '../controllers/postInteractionController.js'
import { verifyAccessToken } from '../middlewares/authMiddleware.js'
import Post from '../models/Post.js'

const router = express.Router({ mergeParams: true })

router.use(async (req, res, next) => {
    const id = req.params.id
    const post = await Post.findById(id)
    if (!post) return res.status(404).json({ error: "Post Not Found" })
    req.post = post
    next()
})

router.post('/like', verifyAccessToken, toggleLike)

router.post('/comment', verifyAccessToken, createComment)

router.get('/comments', getComments)

export default router