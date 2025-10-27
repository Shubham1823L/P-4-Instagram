import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

const postCleanupService = async (post) => {
    const _id = post._id
    await Comment.deleteMany({ post: _id })
    await Post.deleteOne({ _id })
}

export default postCleanupService