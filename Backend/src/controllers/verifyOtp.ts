import {Request,Response} from "express";
import Student from "@/models/student";

export async function verifyOtp(req:Request,res:Response){
    const {email,otp} =req.body;
    const student = await  Student.findOne({email});
    if (!student || !student.otpCode){
        return res.status(400).send("No Otp found ,please login again. ");
    }
    if (student.otpCode !==otp || !student.otpExpires || student.otpExpires< new Date()){
        return res.status(400).send("Invalid or Expired OTP .");
    }
    // clear otp after verification
    student.otpCode = null;
    student.otpExpires = null;
    await student.save();

    const token = student.generateAuthToken();
    return res.send ({ message: "Login sucessfull",token});

}