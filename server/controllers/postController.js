import Post from '../models/Post.js'
import User from '../models/User.js'

export const createPost = async (req, res) => {
    const postData = req.body
    const user = req.user
    const post = await Post.create({
        ...postData,
        author: user._id
    })
    await User.updateOne({ _id: user._id }, { $set: { posts: [...user.posts, post._id] } })
    res.status(200).json({ message: "New post published" })
}

export const getPost = async (req, res) => {
    const postId = req.params.postId
    try {
        const post = await Post.findById(postId).populate('author')
        return res.status(200).json({ message: post })
    } catch (error) {
        return res.status(500).json({ error })
    }

}

export const getFeedPosts = async (req, res) => {
    const user = req.user
    const following = (await user.populate({
        path: 'following',
        populate: {
            path: 'posts',
            select: '-__v -_id',
            populate:{
                path:'author',
                select:'username -_id'
            }
        }
    })).following

    const posts = []
    following.forEach(e=> {
        e.posts.forEach(post => {
            posts.push(post)
        });
    });
    return res.status(200).json({ posts })
}


