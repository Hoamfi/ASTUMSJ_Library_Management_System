import express from "express";
import auth from "../middleware/auth";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
  approveReturnBook,
  getStudentBorrowHistory,

} from "../controllers/borrowController";

import isAdmin from "@/middleware/admin";

const router = express.Router();

router.post("/:bookId", auth, borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/me/studentId", getMyBorrows);

router.get("/", [auth, isAdmin], getAllBorrows);
router.put("/admin/approvereturn/:borrowId",approveReturnBook);
router.get("/admin/:studentId",getStudentBorrowHistory);


export default router;
