import express from "express";
import auth from "@/middleware/auth";
import {
  addStudent,
  student,
  updateStudent,
} from "../controllers/studentController";

const studentRouter = express.Router();

studentRouter.post("/", addStudent);
studentRouter.put("/updateStudent", auth, updateStudent);
studentRouter.get("/me", auth, student);

export default studentRouter;
