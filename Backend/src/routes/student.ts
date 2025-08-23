import express from "express";
import auth from "@/middleware/auth";
import { addStudent, student } from "../controllers/studentController";

const router = express.Router();

router.post("/", addStudent);
router.get("/me", auth, student);

export default router;
