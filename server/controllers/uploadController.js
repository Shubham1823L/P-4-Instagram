import cloudinary from '../config/cloudinary.js'
import fs from 'fs'

export const uploadPostToCloudinary = async (req, res) => {
    const file = req.file
    if (!file) return res.status(400).json({ error: "File not found" })

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "instaProject_uploads",
            use_filename:true,
            unique_filename:true,
            resource_type:"auto"
        })
        fs.unlink(file.path, (err) => {
            if (err) console.warn("File wasn't unlinked")
        })
        res.status(200).json({
            secureUrl: result.secure_url,
            publicId: result.public_id
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}
