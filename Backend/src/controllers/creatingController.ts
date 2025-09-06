import Student from "@/models/student";
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// POST /api/creating/register
export async function createAccount(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).send("Email already registered");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = crypto.randomInt(100000, 999999).toString();

    const student = new Student({
      name,
      email,
      password: hashedPassword,
      otpCode: otp,
      otpExpires: new Date(Date.now() + 5 * 60 * 1000),
      isVerified: false, 
    });

    await student.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Astu MsjLibrary System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Account",
      text: `Welcome ${name},\n\nYour OTP for account verification is: ${otp}\nIt will expire in 5 minutes.\n\nThanks for registering!`,
    });

    res.send("Email verification code is sent to your email.");
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

// POST /api/creating/verifyregistration
export async function verifyRegistrationOtp(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;

    const student = await Student.findOne({ email });
    if (!student || !student.otpCode) {
      return res.status(400).send("No OTP found. Please register again.");
    }

    const isMatch = student.otpCode === otp;
    const isExpired = !student.otpExpires || student.otpExpires < new Date();

    if (!isMatch || isExpired) {
      return res.status(400).send("Invalid or expired OTP.");
    }

    student.otpCode = null;
    student.otpExpires = null;
    student.isVerified = true; 
    await student.save();

    res.send("Account verified successfully.");
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}
