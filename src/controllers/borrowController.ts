import { Request, Response } from "express";
import Book, { IBook } from "../models/book";
import Borrow, { IBorrow } from "../models/borrowModel";
import Student, { IStudent } from "../models/student";

// Borrow a book
export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const userId = (req as { user?: { id: string } }).user?.id;

  try {
    const student = await Student.findById(userId) as IStudent;
    if (!student) return res.status(404).json({ message: "Student not found" });

    if (student.membershipStatus !== "approved") {
      return res.status(403).json({ message: "Membership not active" });
    }

    const activeBorrows = await Borrow.countDocuments({
      user: userId,
      status: "borrowed",
    });

    if (activeBorrows >= 3) {
      return res
        .status(400)
        .json({ message: "Borrow limit reached (3 books)" });
    }

    const book = await Book.findById(bookId) as IBook;
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    const borrowedAt = new Date();
    const dueDate = new Date(borrowedAt);
    dueDate.setDate(dueDate.getDate() + 14);

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      borrowedAt,
      dueDate,
      status: "borrowed",
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
    if (!borrow)
      return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.returnedAt) {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrow.returnedAt = new Date();

    if (new Date() > borrow.dueDate) {
      borrow.status = "overdue";
    } else {
      borrow.status = "returned";
    }

    await borrow.save();

    const book = borrow.book as IBook;
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ message: "Book returned successfully", borrow });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get current student's borrows
export const getMyBorrows = async (req: Request, res: Response) => {
  const userId = (req as { user?: { id: string } }).user?.id;

  try {
    const borrows = await Borrow.find({ user: userId }).populate("book");
    res.status(200).json({ borrows });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all borrows (admin only)
export const getAllBorrows = async (_req: Request, res: Response) => {
  try {
    const borrows = await Borrow.find().populate("book user");
    res.status(200).json({ borrows });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
