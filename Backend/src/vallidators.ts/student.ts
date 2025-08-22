import Joi from "joi";

interface Students {
    
}

export default function validateStudent(student: Students) {
    const schema = Joi.object({

    })

    return schema.validate(student)
}