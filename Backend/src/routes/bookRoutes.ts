
import { Router } from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController";


function bookRouter(): Router {
  const router: Router = Router();

  router.post("/", createBook);      
  router.get("/", getBooks);          
  router.get("/:id", getBookById);    
  router.put("/:id", updateBook);     
  router.delete("/:id", deleteBook);  

  return router;
}


export default bookRouter;
