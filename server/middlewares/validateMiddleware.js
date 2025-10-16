import Joi from "joi";

export const validateEmail = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })
    const { value, error } = schema.validate({email:req.body.email})
    if (error) return res.status(400).json({ error: error.details[0].message })
    next()
}

export const validatePassword = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string().required().min(8)
    })
    const { value, error } = schema.validate({password:req.body.password})
    if (error) return res.status(400).json({error: error.details[0].message })
    next()
}


