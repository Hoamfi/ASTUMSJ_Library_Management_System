import express from "express";
import auth from "../middleware/auth";
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

import isAdmin from "@/middleware/admin";

const router = express.Router();

router.post("/:bookId",  borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/me/studentId", getMyBorrows);

router.get("/", [auth, isAdmin], getAllBorrows);
router.put("/admin/approvereturn/:borrowId",approveReturnBook);
router.get("/admin/:studentId",getStudentBorrowHistory);
router.put("/borrowapproved/:bookId",borrowBookApproved);
router.get("/admin/pendings",getPendingRequests);


export default router;
