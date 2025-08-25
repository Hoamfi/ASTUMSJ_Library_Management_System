import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
import isAdmin from "../middleware/admin";
import auth from "@/middleware/auth";

const bookRouter = Router();

bookRouter.post("/", auth, isAdmin, createBook); // admin only
bookRouter.get("/", auth, isAdmin, getBooks); // public
bookRouter.get("/:id", getBookById); // public
bookRouter.put("/:id", auth, isAdmin, updateBook); // admin only
bookRouter.delete("/:id", auth, isAdmin, deleteBook); // admin only

export default bookRouter;
