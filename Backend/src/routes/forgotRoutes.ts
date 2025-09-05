import { forgotPassword, resetPassword, verifyOtp} from "@/controllers/forgotController";
import express from "express";

const router =express.Router();

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
router.post("/verifyotp",verifyOtp)

export default router;