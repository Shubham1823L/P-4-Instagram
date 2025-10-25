import Comment from "../models/Comment.js"

export const toggleLike = async (req, res) => {
    const user = req.user
    const post = req.post
    const likedBy = post.likedBy
    if (likedBy.find(e => e.equals(user._id))) {
        //Already Liked , unlike post now
        likedBy.pull(user._id)
        post.likesCount--
        await post.save()
        return res.status(200).json({ message: "Post like removed" })
    }
    else {
        //Not liked yet, like post now
        likedBy.push(user._id)
        post.likesCount++
        await post.save()
        return res.status(200).json({ message: "Post liked" })
    }
}

export const createComment = async (req, res) => {
    const post = req.post
    const user = req.user

    const { text } = req.body

    try {
        const comment = await Comment.create({ text, author: user._id, post: post._id })
        post.comments.push(comment._id)
        post.commentsCount++
        await post.save()
        return res.status(201).json({ message: "Comment Posted" })
    } catch (error) {
        return res.status(500).json({ error })
    }
}

export const getComments = async (req, res) => {
    const post = req.post
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    
    const comments = await Comment.aggregate([
        {
            $match: { _id: { $in: post.comments } }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        },
        {
            $unwind: '$author'
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $skip: (page - 1) * limit,

        },
        {
            $limit: limit
        },
        {
            $project: {
                text: 1,
                author: {
                    username: 1,
                    followersCount: 1,
                    _id: 1
                }
            }
        }
    ])
    return res.status(200).json(comments)
}


