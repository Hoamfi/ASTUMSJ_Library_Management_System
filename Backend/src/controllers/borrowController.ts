import { Request, Response } from "express";
import Book, { IBook } from "../models/book";
import Borrow, { IBorrow } from "../models/borrowModel";
import Student from "../models/student";
import { IStudent } from "../models/student";

// POST /api/borrow/:bookId
export const borrowBook = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const userId = req.body.userId;

  try {
    const student = (await Student.findById(userId)) as IStudent;
    if (!student) return res.status(404).json({ message: "Student not found" });

    const activeBorrows = await Borrow.countDocuments({
      user: userId,
      status: "borrowed",
    });

    if (activeBorrows >= 3) {
      return res
        .status(400)
        .json({ message: "Borrow limit reached (3 books)" });
    }

    const book = (await Book.findById(bookId)) as IBook;
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
      status: "Pending",
    });
    // counting how many times borrowed one book
    await Book.findByIdAndUpdate(book.id, { $inc: { borrowCount: 1 } });

    book.availableCopies -= 1;
    await book.save();

    res.status(201).json({
      message: "borrowed request submitted.Awaiting admin approval",
      borrow,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. please try again later", error });
  }
};

// PUT /api/return/:borrowId
export const returnBook = async (req: Request, res: Response) => {
  const { borrowId } = req.params;

  try {
    const borrow = await Borrow.findById(borrowId).populate("book");
    if (!borrow)
      return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.returnedAt) {
      return res.status(400).json({ message: "Book already returned" });
    }

    borrow.status = "Pending_return";
    await borrow.save();

    res.status(200).json({
      message: "Return request submitted. Awaiting admin approval.",
      borrow,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error,
    });
  }
};

// GET /api/myborrows
export const getMyBorrows = async (req: Request, res: Response) => {
  const userId = await Student.findById((req as any).user._id).select("_id");

  try {
    const borrows = await Borrow.find({ user: userId }).populate(
      "book",
      "title bookCover catagory"
    );
    res.status(200).send(borrows);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong . Please try again later",
      error,
    });
  }
};
// GET /api/borrows
export const getAllBorrows = async (_req: Request, res: Response) => {
  try {
    const borrows = await Borrow.find().populate("book", "title");
    // .populate("user", "name");
    const count = await Borrow.find().countDocuments();
    res.status(200).json({ borrows, count });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong . Please try again later",
      error,
    });
  }
};

// PUT /api/admin/approvereturn/:borrowId
export const approveReturnBook = async (req: Request, res: Response) => {
  const { borrowId } = req.params;

  try {
    const borrow = await Borrow.findById(borrowId).populate("book user");
    if (!borrow)
      return res.status(404).json({ message: "Borrow record not found" });

    if (borrow.status !== "Pending_return") {
      return res
        .status(400)
        .json({ message: "This borrow is not pending return approval" });
    }

    borrow.returnedAt = new Date();
    borrow.status = new Date() > borrow.dueDate ? "overdue" : "returned";

    await borrow.save();

    const book = borrow.book as IBook;
    book.availableCopies += 1;
    await book.save();

    res.status(200).json({ message: "Return approved successfully", borrow });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error,
    });
  }
};

// GET /api/borrows/admin/:studentId
export const getStudentBorrowHistory = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  try {
    const borrows = await Borrow.find({ user: studentId }).populate(
      "book",
      "title"
    );
    // .populate("user");

    if (!borrows || borrows.length === 0) {
      return res
        .status(404)
        .json({ message: "No borrow history found for this student" });
    }

    res.status(200).json({ borrows, count: borrows.length });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
      error,
    });
  }
};

// POST /api/borrowapproved/:bookId
export const borrowBookApproved = async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const userId = (req as { user?: { id: string } }).user?.id;

  try {
    const student = await Student.findById(userId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const activeBorrows = await Borrow.countDocuments({
      user: userId,
      status: "borrowed",
    });

    if (activeBorrows >= 3) {
      return res
        .status(400)
        .json({ message: "Borrow limit reached (3 books)" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.availableCopies < 1) {
      return res.status(400).json({ message: "No copies available" });
    }

    const borrow = await Borrow.create({
      user: userId,
      book: bookId,
      status: "Pending_borrow",
    });

    res.status(201).json({
      message: "Borrow request submitted. Awaiting admin approval.",
      borrow,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
