import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

const commentCleanupService = async (comment) => {
    const _id = comment._id
    await Post.updateOne({ comments: _id }, {
        $pull: { comments: _id },
        $inc: { commentsCount: -1 }
    })
    await Comment.deleteOne({ _id })
}

export default commentCleanupService