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
  getPendingRequests,



} from "../controllers/borrowController";

const router = express.Router();



// user
router.post("/:bookId", auth, borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/myborrows", auth, getMyBorrows);


// admin
router.get("/admin/allborrows", [auth, isAdmin], getAllBorrows);
router.get("/admin/borrowhistory/:studentId", auth, isAdmin, getStudentBorrowHistory);
router.put("/admin/approvereturn/:borrowId", auth, isAdmin, approveReturnBook);
router.put("/borrowapproved/:bookId", auth, isAdmin, borrowBookApproved);
router.get("/admin/pendings",getPendingRequests );

export default router;
