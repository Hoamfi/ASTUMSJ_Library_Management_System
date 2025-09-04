import express from "express";
import authStudent from "@/controllers/authController";
import {verifyOtp} from "@/controllers/verifyOtp";
import { forgotPassword, resetPassword } from "@/controllers/forgotController";




const router = express.Router();
router.post("/", authStudent);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);


// Step 2: email + OTP → JWT
router.post("/verify-otp", verifyOtp);

export default router;
