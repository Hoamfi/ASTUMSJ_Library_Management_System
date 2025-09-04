import Student from "@/models/student";
import validateStudent from "../vallidators/validateStudent";
import { Request, Response, RequestHandler } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function addStudent(req: Request, res: Response) {
  const { error } = validateStudent(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let student = await Student.findOne({ email: req.body.email });
  if (student) return res.status(400).send("Email already registered");

  student = new Student(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);

  student = await student.save();
  const token = student.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(student, ["_id", "name", "email", "isAdmin"]));
}

export async function me(req: Request, res: Response) {
  const student = await Student.findById((req as any).user._id).select(
    "-password"
  );
  res.send(student);
}

export async function getAllStudents(req: Request, res: Response) {
  const students = await Student.find().select(["-password", "-isAdmin"]);
  res.send(students);
}

export async function getStudentById(req: Request, res: Response) {
  const id = req.params.id.trim();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid student ID" });
    return;
  }

  const students = await Student.findById(id).select(["-password", "-isAdmin"]);
  res.send(students);
}

export async function updateStudent(req: Request, res: Response) {
  let student = await Student.findOne({ _id: req.body._id });
  if (!student) return res.status(400).send("Bad Request");

  const validPassword = await bcrypt.compare(
    req.body.currentPassword,
    student.password
  );
  if (!validPassword) return res.status(400).send("Incorrect current Password");

  const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

  student = await Student.findOneAndUpdate(
    { _id: req.body._id },
    {
      email: req.body.email,
      password: hashedPassword,
    },
    { new: true }
  );
  res.send(_.pick(student, ["_id", "email"]));
}

// GET /api/students/search?q=query
export const searchStudents = async (req: Request, res: Response) => {
  try {
    const query = (req.query.q as string) || "";

    const students = await Student.find({ name: new RegExp(query, "i") });
    res.send(students);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
