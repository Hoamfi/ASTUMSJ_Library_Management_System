import mongoose, { Document, Schema } from "mongoose";

// 1. Interface
export interface IBook extends Document {
  title: string;
  author: string;
  publicationYear: number;
  bookCover: string;
  description?: string;
  borrowCount: number;
  isbn?: string;
  page: number;
  category: string;
  availableCopies: number;
  totalCopies: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema
const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    borrowCount: { type: Number, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    description: { type: String },
    isbn: {
      type: String,
      required: false,
      unique: true,
      index: true,
    },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// 3. Model
const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
