import express from "express";
import authStudent from "@/controllers/authController";
import {verifyOtp} from "@/controllers/verifyOtp";
import { forgotPassword, resetPassword } from "@/controllers/forgotController";




const router = express.Router();
router.post("/", authStudent);



// Step 2: email + OTP → JWT
router.post("/verifyotp", verifyOtp);

export default router;
