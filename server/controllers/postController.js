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
    const following = user.following
    console.log(user)
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const posts = await Post.aggregate([
        {
            $match: { author: { $in: following } }
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author"
            }
        },
        {
            $unwind: "$author"
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $limit: limit
        },
        {
            $project: {
                likesCount:1,
                commentsCount:1,
                createdAt:1,
                text:1,
                author:{
                    username:1,
                    _id:1,
                    followersCount:1
                }
            }
        }
    ])
    return res.status(200).json(posts)
}


