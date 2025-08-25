import { Request, Response } from "express";
import Book, { IBook } from "../models/book";
import Borrow, { IBorrow } from "../models/borrowModel";

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const userId = (req as { user?: { id: string } }).user?.id;


  try {
    const book = await Book.findById(bookId) as IBook;
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowedAt: new Date(),
    });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({ message: "Book borrowed successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Return a book
export const returnBook = async (req: Request, res: Response) => {
  const { borrowId } = req.params;

  try {
    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow) return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.returnedAt) {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrow.returnedAt = new Date();
    borrow.status = "returned";
    await borrow.save();

    const book = borrow.book as IBook;
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ message: "Book returned successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get current user's borrows
export const getMyBorrows = async (req: Request, res: Response) => {
  const userId = (req as { user?: { id: string } }).user?.id;


  try {
    const borrows = await Borrow.find({ user: userId }).populate("book");
    res.status(200).json({ borrows });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all borrows (admin)
export const getAllBorrows = async (_req: Request, res: Response) => {
  try {
    const borrows = await Borrow.find().populate("book user");
    res.status(200).json({ borrows });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
