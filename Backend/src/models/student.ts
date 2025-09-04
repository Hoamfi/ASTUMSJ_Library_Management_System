import { ENV } from "@/config/env";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export interface IStudent {
  name: string;
  email: string;
  password: string;
  campusId: string;
  idPhoto: string;
  studyYear: string;
  department: string;
  status: string;
  isAdmin: Boolean;
  createdAt: Date;
  updatedAt: Date;
  generateAuthToken(): string;
  otpCode: string | null;
  otpExpires: Date | null; 
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
    },
    idPhoto: {
      type: String,
    },
    studyYear: {
      type: String,
    },
    department: {
      type: String,
    },
    status: {
      type: String,
      default: "active",
    },
    isAdmin: { type: Boolean, default: false },
    otpCode: { type: String, default:null },
    otpExpires: { type: Date , default:null},
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
