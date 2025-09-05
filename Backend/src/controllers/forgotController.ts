import Student from "@/models/student";
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";


export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });

    if (!student) return res.status(400).send("User not found");

    // Generate OTP (6 digits)
    const otp = crypto.randomInt(100000, 999999).toString();

    // Save OTP + Expiration
    student.resetPasswordToken = otp;
    student.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await student.save();

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP Email
    await transporter.sendMail({
      from: `"Library System" <${process.env.EMAIL_USER}>`,
      to: student.email,
      subject: "Password Reset OTP",
      text: `Dear student,\n\nYour OTP for password reset is: ${otp}\nIt will expire in 5 minutes.\n\nIf you did not request this, please ignore this email.`,
    });

    res.send("OTP has been sent to your email");
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}


export async function resetPassword(req: Request, res: Response) {
  try {
    const { otp, newPassword } = req.body;

    const student = await Student.findOne({
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() }, 
    });

    if (!student) return res.status(400).send("Invalid or expired OTP");

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    student.resetPasswordToken = null;
    student.resetPasswordExpires = null;
    await student.save();

    res.send("Password has been reset successfully");
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).send("Server error");
  }
}
