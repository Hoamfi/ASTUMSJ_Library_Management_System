import { Router } from "express";
import {
  addnewBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getMostBorrowedBooks,
  searchBooks,
} from "../controllers/bookController";

import isAdmin from "../middleware/admin";
import auth from "@/middleware/auth";

const router: Router = Router();

router.get("/search", searchBooks);
router.post("/addnewbook", auth, isAdmin, addnewBook); // admin only
router.get("/", getBooks); // public
router.get("/mostborrowed", getMostBorrowedBooks);
router.get("/:id", getBookById); // public
router.put("/:id", auth, isAdmin, updateBook); // admin only
router.delete("/:id", auth, isAdmin, deleteBook); // admin only

export default router;
