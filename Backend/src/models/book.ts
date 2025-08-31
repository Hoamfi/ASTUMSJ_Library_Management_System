import mongoose, { Document, Schema } from "mongoose";

// 1. Interface
export interface IBook extends Document {
  title: string;
  author: string;
  releasedYear: number;
  description?: string;
  isbn: string;
  availableCopies: number;
  totalCopies: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema
const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    releasedYear: { type: Number, required: true },
    description: { type: String },
    isbn: {
      type: String,
      required: true,
      unique: true,
      index: true,
      match: /^[0-9\-]{10,17}$/, 
    },
    totalCopies: { type: Number, required: true, min: 0 },
    availableCopies: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

// 3. Model
const Book = mongoose.model<IBook>("Book", bookSchema);
export default Book;
