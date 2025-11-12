import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
        //1e9 = 1x10^9
        cb(null, uniqueName)
    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype.startWith('video/') ) return cb(null, true)
    return cb(new Error("Only images and videos are allowed"), false)
}

const upload = multer({ storage, fileFilter })
export default upload
