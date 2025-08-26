import { ENV } from "../config/env";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export interface IStudent  {
    name: string;
    email: string;
    password: string;
    isAdmin: Boolean;
    membershipStatus:'pending'|'approved'|'rejected';
    generateAuthToken(): string;
}

const studentSchema = new mongoose.Schema<IStudent>({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    isAdmin: Boolean
})

studentSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, ENV.JWT_SECRET_KEY);
    return token;
}

const Student = mongoose.model("Student", studentSchema)

export default  Student;