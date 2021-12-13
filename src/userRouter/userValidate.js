import Joi from 'joi'

const userValidation = Joi.object({
    username: Joi.string().min(4).max(25).required(),
    password: Joi.string().min(8).max(1000).required()
})

export default userValidation;