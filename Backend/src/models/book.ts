import mongoose, { Document, Schema } from "mongoose";

// 1. Interface
export interface IBook extends Document {
  title: string;
  author: string;
  bookCover: string;
  publicationYear: number;
  catagory: string;
  description?: string;
  totalCopies: number;
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schema
const bookSchema: Schema<IBook> = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    bookCover: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    catagory: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

// 3. Model
const Book = mongoose.model<IBook>("Book", bookSchema);

export default Book;
