import express from "express";
import auth from "@/middleware/auth";
import {
  addStudent,
  me,
  updateStudentPassword,
  getAllStudents,
  searchStudents,
  getStudentById,
  updateStudentStatus,
  completeProfile,
  getTotalNumber
} from "../controllers/studentController";
import admin from "@/middleware/admin";

const studentRouter = express.Router();

studentRouter.get("/all", auth, admin, getAllStudents);
studentRouter.get("/allcount", auth, admin, getTotalNumber);
studentRouter.get("/search", auth, admin, searchStudents);
studentRouter.get("/me", auth, me);
studentRouter.get("/:id", auth, admin, getStudentById);
studentRouter.patch("/updateStatus/:id", auth, admin, updateStudentStatus);
studentRouter.post("/", addStudent);
studentRouter.put("/changePassword", auth, updateStudentPassword);
studentRouter.patch("/completeprofile", auth, completeProfile);

export default studentRouter;
