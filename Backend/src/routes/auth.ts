import express from "express";
import authStudent from "../controllers/authController";



const router = express.Router();
router.post("/", authStudent);


export default router;
