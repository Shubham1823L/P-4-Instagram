import Post from '../models/Post'

export const createPost = async (req, res) => {
    const postData = req.body
    const user = req.user
    await Post.create({
        ...postData,
        author: user._id
    })
}

export const getPost = async (req, res) => {
    const postId = req.params
    try {
        const post = await Post.findById(postId, { populate: 'author' })
        return res.status(200).json({ message: post })
    } catch (error) {
        return res.status(500).json({ error })
    }

}

export const getFeedPosts = async (req, res) => {
    const user = req.user
    try {
        const posts = (await user.populate({
            path: 'posts',
            match: { _id: { $in: user.following } }
        })).posts
        return res.status(200).json({ message: posts })
    } catch (error) {
        return res.status(500).json({ error })
    }
}


