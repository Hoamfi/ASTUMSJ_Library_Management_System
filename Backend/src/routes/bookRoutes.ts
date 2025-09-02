import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  getMostBorrowedBooks,
} from "../controllers/bookController";

import isAdmin from "../middleware/admin";

const router: Router = Router();

  router.post("/", createBook);       // admin only
  router.get("/", getBooks); // public
  router.get("/mostborrowed",getMostBorrowedBooks);
  router.get("/:id", getBookById);            // public
  router.put("/:id", updateBook);    // admin only
  router.delete("/:id",  deleteBook); // admin only

  

export default router;
