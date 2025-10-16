import dotenv from 'dotenv'
dotenv.config()

const env = {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASS: process.env.EMAIL_PASS,
    COOKIE_OPTIONS: process.env.COOKIE_OPTIONS
}
export default env