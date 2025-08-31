import mongoose, { Document, Schema } from "mongoose";
import { IBook } from "./book";

// 1. Interface
export interface IBorrow extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId | IBook;
  borrowedAt: Date;
  returnedAt?: Date;
  status: "borrowed" | "returned" | "overdue";
  dueDate: Date;
}

// 2. Schema
const borrowSchema = new Schema<IBorrow>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },
    borrowedAt: {
      type: Date,
      default: Date.now,
    },
    returnedAt: {
      type: Date,
    },
    status: {
      type: String,
      enum: ["borrowed", "returned", "overdue"],
      default: "borrowed",
      index: true,
    },

  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// 3. Virtual due date
borrowSchema.virtual("dueDate").get(function (this: IBorrow) {
  const due = new Date(this.borrowedAt);
  due.setDate(due.getDate() + 14);
  return due;
});

// 4. Pre-save hook for overdue flag
borrowSchema.pre("save", function (next) {
  if (!this.returnedAt && this.status === "borrowed") {
    const now = new Date();
    const dueDate = new Date(this.borrowedAt);
    dueDate.setDate(dueDate.getDate() + 14);
    if (now > dueDate) {
      this.status = "overdue";
    }
  }
  next();
});

// 5. Model
const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);
export default Borrow;
