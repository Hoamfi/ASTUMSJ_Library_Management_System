import express from "express";
import auth from "../middleware/auth";
import {
  borrowBook,
  returnBook,
  getMyBorrows,
  getAllBorrows,
} from "../controllers/borrowController";

import isAdmin from "@/middleware/admin";

const router = express.Router();

router.post("/:bookId", auth, borrowBook);
router.put("/return/:borrowId", auth, returnBook);
router.get("/me", auth, getMyBorrows);

router.get("/", [auth, isAdmin], getAllBorrows);

export default router;
