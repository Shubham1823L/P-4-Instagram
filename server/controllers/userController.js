import User from "../models/User.js"

export const getUsers = async (req, res) => {
    const username = req.params.username
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    // We have to find all users whose username contains the queried username
    const users = await User.aggregate([
        {
            $match: { username: { $regex: username, $options: "i" } }
        },
        {
            $sort: { followersCount: -1 }
        },
        {
            $limit: limit
        },
        {
            $skip: (page - 1) * limit
        },
        {
            $project: {
                followersCount: 1,
                _id: 1,
                username: 1,
                fullName: 1,
                profilePic:1,
            }
        }
    ])

    return res.status(200).json({ users })
}
