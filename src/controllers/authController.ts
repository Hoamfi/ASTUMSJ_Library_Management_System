import Student from "@/models/student";
import {Request, Response} from "express"
import Joi from "joi";
import bcrypy from "bcrypt"

export default async function authStudent(req: Request, res: Response) {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
         
    const student = await Student.findOne({email: req.body.email})
    if (!student) return res.status(400).send("Invalid email or password")

    const validPassword = await bcrypy.compare(req.body.password, student.password)
    if (!validPassword) return res.status(400).send("Invalid email or password")

    const token = student.generateAuthToken()
    return res.send(token);
} 

function validate(req: {email: String, password: String}) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(255)
    })

    return schema.validate(req)
}
