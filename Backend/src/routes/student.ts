import express from "express";
import auth from "@/middleware/auth";
import { addStudent, student } from "../controllers/studentController";

const studentRouter = express.Router();

studentRouter.post("/", addStudent);
studentRouter.get("/me", auth, student);

export default studentRouter;
