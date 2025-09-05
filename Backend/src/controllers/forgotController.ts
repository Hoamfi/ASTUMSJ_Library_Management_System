import student from "@/models/student";
import Student from "@/models/student";
import {Request,Response} from "express";
import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

export async function forgotPassword(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });

    if (!student) return res.status(400).send("User not found");

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    student.resetPasswordToken = resetToken;
    student.resetPasswordExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
    await student.save();


    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"Library System" <${process.env.EMAIL_USER}>`,
      to: student.email,
      subject: "Password Reset",
      text: ` Dear our student Click the link to reset your password: ${resetLink}`,
    });

    res.send("Password reset link sent to your email");
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).send("something went wrong . Please try again later.");
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const student = await Student.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // check expiration
    });
       if (!student) return res.status(400).send("Invalid or expired token");

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    student.password = await bcrypt.hash(newPassword, salt);

    // Clear reset fields
    student.resetPasswordToken =null ;
    student.resetPasswordExpires = null;
    await student.save();

    res.send("Password has been reset successfully");
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).send("Server error");
  }
}
