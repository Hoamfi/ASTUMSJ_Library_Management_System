import express from "express";
import auth from "../middleware/auth";
import isAdmin from "../middleware/admin";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
  approveBorrow,
  getStudentBorrowHistory,
  approveReturn,
  getPendingBorrows,
  getPendingReturns,
} from "../controllers/borrowController";

const router = express.Router();

// user
router.post("/:bookId", auth, borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/myborrows", auth, getMyBorrows);

// admin
router.get("/admin/allborrows", auth, isAdmin, getAllBorrows);
router.get(
  "/admin/borrowhistory/:studentId",
  auth,
  isAdmin,
  getStudentBorrowHistory
);
router.get("/admin/pendingborrow", auth, isAdmin, getPendingBorrows);
router.get("/admin/pendingreturn", auth, isAdmin, getPendingReturns);
router.post("/admin/approveborrow/:borrowId", auth, isAdmin, approveBorrow);
router.post("/admin/approvereturn/:borrowId", auth, isAdmin, approveReturn);

export default router;
