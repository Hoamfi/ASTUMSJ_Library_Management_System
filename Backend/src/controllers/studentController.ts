import Student from "@/models/student";
import validateStudent from "../vallidators.ts/student";
import { Request, Response, RequestHandler } from "express";
import _ from "lodash";
import bcryp from "bcrypt";

export async function addStudent(req: Request, res: Response) {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = await Student.findOne({ email: req.body.email });
  if (student) return res.status(400).send("Email already registered");

  student = new Student(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcryp.genSalt(10);
  student.password = await bcryp.hash(student.password, salt);

  student = await student.save();
  const token = student.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(student, ["_id", "name", "email"]));
}

export const student: RequestHandler = async (req, res) => {
  const student = await Student.findById((req as any).user._id).select(
    "-password"
  );
  res.send(student);
};
