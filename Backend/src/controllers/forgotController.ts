import Student from "../models/student";
import { Request, Response } from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

// POST /api/forgotpassword
export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });

    if (!student) return res.status(400).send("User not found");

    const otp = crypto.randomInt(100000, 999999).toString();
    student.resetPasswordToken = otp;
    student.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 min
    student.isOtpVerified = false; // Reset verification status
    await student.save();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Astu Msj Library System" <${process.env.EMAIL_USER}>`,
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

// POST /api/forgotpassword/verifyotp
export async function verifyOtp(req: Request, res: Response) {
  try {
    const { email, otp } = req.body;
    const student = await Student.findOne({ email });

    if (!student || !student.resetPasswordToken) {
      return res.status(400).send("Invalid or expired OTP");
    }

    const isMatch = student.resetPasswordToken === otp;
    const isExpired =
      !student.resetPasswordExpires ||
      student.resetPasswordExpires < new Date();

    if (!isMatch || isExpired) {
      return res.status(400).send("Invalid or expired OTP");
    }

    student.isOtpVerified = true;
    await student.save();

    res.send("OTP is valid");
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).send("Something went wrong. Please try again later.");
  }
}

// POST /api/forgotpassword/resetpassword
export async function resetPassword(req: Request, res: Response) {
  try {
    const { email, otp, newPassword } = req.body;

    const student = await Student.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!student) return res.status(400).send("Invalid or expired OTP");

    if (!student.isOtpVerified) {
      return res.status(403).send("OTP not verified. Please verify first.");
    }

    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    student.resetPasswordToken = null;
    student.resetPasswordExpires = null;
    student.isOtpVerified = false;
    await student.save();

    res.send("Password has been reset successfully");
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).send("Server error");
  }
}
