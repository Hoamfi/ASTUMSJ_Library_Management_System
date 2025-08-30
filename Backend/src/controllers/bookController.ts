import validateBook from "../vallidators/validateBook";
// controllers/bookController.ts
import { Request, Response } from "express";
import Book, { IBook } from "../models/book";
import _ from "lodash";

// Create Book
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book: IBook = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Get All Books
export const getBooks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const catagory = (_req.query.catagory as string) || undefined;
    let filter = {};

    if (catagory) {
      filter = { catagory: catagory };
    }

    const books: IBook[] = await Book.find(filter).select({
      createdDate: 0,
      updatedAt: 0,
    });
    res.json(books);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get Book by ID
export const getBookById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book: IBook | null = await Book.findById(req.params.id).select({
      createdDate: 0,
      updatedAt: 0,
    });
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json(book);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Update Book
export const updateBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book: IBook | null = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json(book);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Book
export const deleteBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book: IBook | null = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json({ message: "Book deleted" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
