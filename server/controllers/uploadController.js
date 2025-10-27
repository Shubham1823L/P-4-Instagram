import cloudinary from 'cloudinary'
import fs from 'fs'

export const uploadImage = async (req, res) => {
    const file = req.file
    if (!file) return res.status(400).json({ error: "File not found" })
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "test_uploads"
        })
        fs.unlinkSync(file.path)
        res.status(200).json({
            message: "File uploaded successfully",
            url: result.secure_url,
            publicId: result.public_id
        })
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}
