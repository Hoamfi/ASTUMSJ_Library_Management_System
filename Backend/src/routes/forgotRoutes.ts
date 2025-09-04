import { forgotPassword, resetPassword } from "@/controllers/forgotController";
import express from "express";

const router =express.Router();

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

export default router;