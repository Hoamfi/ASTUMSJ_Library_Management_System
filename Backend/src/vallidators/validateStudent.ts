import Joi from "joi";

interface Students {
    name: String,
    email: String, 
    password: String
}

export default function validateStudent(student: Students) {
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(255),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(255)
    })

    return schema.validate(student)
}