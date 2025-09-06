import express from "express";
import auth from "../middleware/auth";
import isAdmin from "@/middleware/admin";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
  approveReturnBook,
  getStudentBorrowHistory,
  borrowBookApproved,
} from "../controllers/borrowController";

const router = express.Router();

router.post("/:bookId", auth, borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/myborrows", auth, getMyBorrows);

router.get("/", [auth, isAdmin], getAllBorrows);
router.get("/admin/borrowhistory/:studentId", auth, isAdmin, getStudentBorrowHistory);
router.put("/admin/approvereturn/:borrowId", auth, isAdmin, approveReturnBook);
router.put("/borrowapproved/:bookId", auth, isAdmin, borrowBookApproved);

export default router;
