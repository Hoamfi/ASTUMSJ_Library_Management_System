import express from "express";
import { createAccount,verifyRegistrationOtp} from "../controllers/creatingController";

const router = express.Router();

router.post("/register", createAccount);
router.post("/verifyregistration", verifyRegistrationOtp);

export default router ;