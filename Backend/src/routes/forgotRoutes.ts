import {
  forgotPassword,
  resetPassword,
  verifyOtp,
} from "@/controllers/forgotController";
import express from "express";

const router = express.Router();

router.post("/", forgotPassword);
router.post("/resetpassword", resetPassword);
router.post("/verifyotp",verifyOtp)

export default router;
