import Joi from "joi"
import { findUserByEmail, findUserByUsername } from "../utils/userUtils.js"

export const validateEmail = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    const { value, error } = schema.validate({ email: req.body.email })
    if (error) return res.status(400).json({ error: error.details[0].message, code: "INVALID_FORMAT" })

    try {

        const user = await findUserByEmail(value.email)
        if (user) return res.status(409).json({ error: "User already exists", code: "USER_ALREADY_EXISTS" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.details[0].message })
    }
    return res.sendStatus(200)
}


export const validateUsername = async (req, res) => {
    try {
        const user = await findUserByUsername(req.body.username)
        if (user) return res.status(409).json({ error: "Username already taken", code: "USERNAME_ALREADY_TAKEN" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: error.detail[0].message })
    }
    return res.sendStatus(200)
}
