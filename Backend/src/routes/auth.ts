import express from "express";
import authStudent from "@/controllers/authController";
import {verifyOtp} from "@/controllers/verifyOtp";

const router = express.Router();
router.post("/", authStudent);



// Step 1: email + password → OTP
router.post("/login", authStudent);

// Step 2: email + OTP → JWT
router.post("/verify-otp", verifyOtp);

export default router;
