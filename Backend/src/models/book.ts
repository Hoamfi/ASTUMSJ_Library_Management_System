import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publicationYear: number;
  bookCover?: string;
  description?: string;
  borrowCount: number; // defaults to 0
  isbn?: string;
  page: number;
  catagory: string;
  availableCopies: number; // defaults to 0
  totalCopies: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Schema
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    bookCover: { type: String },
    description: { type: String },
    page: { type: Number, required: true },
    catagory: { type: String, required: true }, 
    borrowCount: { type: Number, default: 0 },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, min: 0 },
    isbn: {
      type: String,
      required: false,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

// 3. Model
const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
