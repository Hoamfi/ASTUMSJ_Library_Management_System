import { ENV } from "@/config/env";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export interface IStudent {
  name: string;
  email: string;
  password: string;
  campusId: string | null;
  studyYear: string;
  department: string;
  status: string;
  isAdmin: Boolean;
  createdAt: Date;
  updatedAt: Date;
  profileCompleted: Boolean;
  generateAuthToken(): string;
  otpCode: string | null;
  otpExpires: Date | null;
  isOtpVerified: Boolean;
  resetPasswordToken: string | null;
  resetPasswordExpires: Date | null;
}

const studentSchema = new mongoose.Schema<IStudent>(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    campusId: {
      type: String,
      default: null,
    },
    studyYear: {
      type: String,
      default: null,
    },
    department: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: "active",
    },
    profileCompleted: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    otpCode: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    ENV.JWT_SECRET_KEY
  );
  return token;
};

const Student = mongoose.model("Student", studentSchema);

export default Student;
