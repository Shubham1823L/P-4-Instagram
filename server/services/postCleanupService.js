import Comment from "../models/Comment.js"
import Post from "../models/Post.js"
import User from "../models/User.js"

const postCleanupService = async (post, user) => {
    const _id = post._id
    await Comment.deleteMany({ post: _id })
    await Post.deleteOne({ _id })
    await User.updateOne({ _id: user._id }, { $pull: { posts: _id } })
}

export default postCleanupService