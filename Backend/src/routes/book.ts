import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import isAdmin from "../middleware/admin";

const bookRouter = Router();

bookRouter.post("/", isAdmin, createBook); // admin only
bookRouter.get("/", getBooks); // public
bookRouter.get("/:id", getBookById); // public
bookRouter.put("/:id", isAdmin, updateBook); // admin only
bookRouter.delete("/:id", isAdmin, deleteBook); // admin only

export default bookRouter;
