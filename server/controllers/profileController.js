import User from "../models/User.js"

export const getProfileData = (req, res) => {
    const user = req.user
    res.status(200).json({ user })
}

export const updateProfileData = async (req, res) => {
    const user = req.user
    const _id = user._id
    const updates = req.body
    const updated = {$set:{}}
    for (const key in updates) {
        updated.$set[key] = updates[key]
    }
    await User.updateOne({_id},updated)
    res.status(200).json({message:"Profile Updated"})
}
