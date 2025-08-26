import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

import  isAdmin  from "../middleware/admin"; 


  const router: Router = Router();

  router.post("/", isAdmin, createBook);       // admin only
  router.get("/", getBooks);                   // public
  router.get("/:id", getBookById);            // public
  router.put("/:id", isAdmin, updateBook);    // admin only
  router.delete("/:id", isAdmin, deleteBook); // admin only

  

export default Router;
