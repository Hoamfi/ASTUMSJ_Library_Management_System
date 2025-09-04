import express from "express";
import auth from "@/middleware/auth";
import {
  addStudent,
  me,
  updateStudent,
  getAllStudents,
  searchStudents,
  getStudentById
} from "../controllers/studentController";
import admin from "@/middleware/admin";

const studentRouter = express.Router();

studentRouter.get("/all", auth, admin, getAllStudents);
studentRouter.get("/search", auth, admin, searchStudents);
studentRouter.get("/me", auth, me);
studentRouter.get("/:id", auth, admin, getStudentById);
studentRouter.post("/", addStudent);
studentRouter.put("/updateStudent", auth, admin, updateStudent);

export default studentRouter;
