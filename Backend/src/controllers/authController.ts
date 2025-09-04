import Student from "@/models/student";
import { Request, Response } from "express";
import Joi from "joi";
import bcrypt from "bcrypt";
import crypto from "crypto";
import nodemailer from "nodemailer";

export default async function authStudent(req: Request, res: Response) {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Student.findOne({ email: req.body.email });
    if (!student) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, student.password);
    if (!validPassword) return res.status(400).send("Invalid email or password");

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP for 3 minutes
    student.otpCode = otp;
    student.otpExpires = new Date(Date.now() + 3 * 60 * 1000);
    await student.save();

    // Create mail transporter
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

    return res.send("OTP sent to your email. Please verify to continue.");
}

function validate(req: { email: string; password: string }) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(255),
    });

    return schema.validate(req);
}
