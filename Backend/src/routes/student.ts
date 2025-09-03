import express from "express";
import auth from "@/middleware/auth";
import {
  addStudent,
  me,
  updateStudent,
  getAllStudents,
  searchStudents,
} from "../controllers/studentController";
import admin from "@/middleware/admin";

const studentRouter = express.Router();

studentRouter.get("/all", auth, admin, getAllStudents);
studentRouter.get("/search", auth, admin, searchStudents);
studentRouter.post("/", addStudent);
studentRouter.get("/me", auth, me);
studentRouter.put("/updateStudent", auth, admin, updateStudent);

export default studentRouter;
