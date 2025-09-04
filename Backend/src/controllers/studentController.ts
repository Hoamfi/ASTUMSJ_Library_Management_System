import Student from "@/models/student";
import validateStudent from "../vallidators/validateStudent";
import { Request, Response } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function addStudent(req: Request, res: Response) {
  const { error } = validateStudent(req.body);
  if (error) return res.status(400).send(error.message);

  let existing = await Student.findOne({ email: req.body.email });
  if (existing) return res.status(400).send("Email already registered");

  let student = new Student(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  student.password = await bcrypt.hash(student.password, salt);

  // Generate 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  student.otpCode = otp;
  student.otpExpires = new Date(Date.now() + 3 * 60 * 1000);

  // Save to DB
  student = await student.save();

  // Send OTP email
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Library System" <${process.env.EMAIL_USER}>`,
      to: student.email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It expires in 3 minutes.`,
    });

    return res.status(201).send("Account created. OTP sent to email.");
  } catch (err) {
    console.error("Email send failed:", err);
    return res
      .status(500)
      .send("Account created but failed to send OTP. Try again.");
  }
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

  const student = await Student.findById(id).select(["-password", "-isAdmin"]);
  res.send(student);
}

export async function updateStudentPassword(req: Request, res: Response) {
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
      password: hashedPassword,
    },
    { new: true }
  );
  res.send(_.pick(student, ["_id", "email"]));
}

export async function completeProfile(req: Request, res: Response) {
  let student = await Student.findOne({ _id: req.body._id });
  if (!student) return res.status(400).send("Bad Request");

  student = await Student.findOneAndUpdate(
    { _id: req.body._id },
    {
      campusId: req.body.campusId,
      studyYear: req.body.studyYear,
      department: req.body.department,
      profileCompleted: true,
    },
    { new: true }
  );
  res.send(_.omit(student, ["password", "isAdmin"]));
}

export async function updateStudentStatus(req: Request, res: Response) {
  const id = req.params.id.trim();
  let student = await Student.findById(id);
  if (!student) return res.status(400).send("Bad Request");

  student.status = req.body.status;
  const result = await student.save();
  res.send({ status: result.status });
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
