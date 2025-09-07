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
<<<<<<< HEAD
  getPendingRequests,

=======
>>>>>>> 2c8976bcd9baa1790c5e6102353e26256fb02dc3
} from "../controllers/borrowController";

const router = express.Router();

<<<<<<< HEAD
router.post("/:bookId",  borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/me/studentId", getMyBorrows);

router.get("/", [auth, isAdmin], getAllBorrows);
router.put("/admin/approvereturn/:borrowId",approveReturnBook);
router.get("/admin/:studentId",getStudentBorrowHistory);
router.put("/borrowapproved/:bookId",borrowBookApproved);
router.get("/admin/pendings",getPendingRequests);
=======
// user
router.post("/:bookId", auth, borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/myborrows", auth, getMyBorrows);
>>>>>>> 2c8976bcd9baa1790c5e6102353e26256fb02dc3

// admin
router.get("/admin/allborrows", [auth, isAdmin], getAllBorrows);
router.get("/admin/borrowhistory/:studentId", auth, isAdmin, getStudentBorrowHistory);
router.put("/admin/approvereturn/:borrowId", auth, isAdmin, approveReturnBook);
router.put("/borrowapproved/:bookId", auth, isAdmin, borrowBookApproved);

export default router;
