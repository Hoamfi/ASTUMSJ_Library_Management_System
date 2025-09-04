import express from "express";
import auth from "@/middleware/auth";
import {
  addStudent,
  me,
  updateStudent,
  getAllStudents,
  searchStudents,
  getStudentById,
  updateStudentStatus,
} from "../controllers/studentController";
import admin from "@/middleware/admin";

const studentRouter = express.Router();

studentRouter.get("/all", auth, admin, getAllStudents);
studentRouter.get("/search", auth, admin, searchStudents);
studentRouter.get("/me", auth, me);
studentRouter.get("/:id", auth, admin, getStudentById);
studentRouter.patch("/updateStatus/:id", auth, admin, updateStudentStatus);
studentRouter.post("/", addStudent);
studentRouter.put("/updateStudent", auth, updateStudent);

export default studentRouter;
