import express from "express";
import { createAccount,verifyRegistrationOtp} from "@/controllers/creatingController";

const router = express.Router();

router.post("/register", createAccount);
router.post("/verify-registration", verifyRegistrationOtp);

export default router ;