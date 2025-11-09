import cloudinary from '../config/cloudinary.js'
import fs from 'fs'
import User from '../models/User.js'

export const uploadFileToCloudinary = async (req, res) => {
    const file = req.file
    if (!file) return res.status(400).json({ error: "File not found" })

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "instaProject_uploads",
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        })
        fs.unlink(file.path, (err) => {
            if (err) console.warn("File wasn't unlinked")
        })

        const { secure_url, public_id } = result

        if (file.fieldname == "profilePic") {
            try {
                await User.updateOne({ _id: req.user._id }, { $set: { profilePic: { secureUrl: secure_url, publicId: public_id } } })
            } catch (error) {
                console.log(error, "error user upadte dp")
            }

        }
        res.status(200).json({
            secureUrl: secure_url,
            publicId: public_id
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}
