import Post from '../models/Post.js'
import postCleanupService from '../services/postCleanupService.js'

export const createPost = async (req, res) => {
    const postData = req.body
    if (!postData) return res.status(404).json({ error: "Nothing received in postData" })
    const user = req.user
    const post = await Post.create({
        author: user._id,
        content: {
            secureUrl: postData.secureUrl,
            publicId: postData.publicId
        }
    })
    user.posts.push(post._id)
    await user.save()
    res.status(200).json({ post })
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
                likesCount: 1,
                commentsCount: 1,
                createdAt: 1,
                text: 1,
                commentsCount: 1,
                author: {
                    username: 1,
                    followersCount: 1
                }
            }
        }
    ])
    return res.status(200).json(posts)
}

export const getMyPosts = async (req, res) => {
    const user = req.user
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const posts = await Post.aggregate([
        {
            $match: { author: user._id }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $limit: limit
        },
        {
            $skip: (page - 1) * limit
        }
    ])

    return res.status(200).json({ posts })
}




export const deletePost = async (req, res) => {
    const user = req.user
    const post = await Post.findById(req.params.postId)

    if (!post) return res.status(404).json({ error: "Post not found!" })
    if (post.author.toString() != user._id.toString()) return res.status(403).json({ error: "Forbidden! Cannot delete posts of other users" })

    await postCleanupService(post,user)
    res.sendStatus(204)
}



