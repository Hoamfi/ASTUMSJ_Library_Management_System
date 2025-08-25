import mongoose, { Document, Schema } from "mongoose";


export interface IBorrow extends Document {
  user: mongoose.Types.ObjectId;
  book: mongoose.Types.ObjectId;
  borrowedAt: Date;
  returnedAt?: Date;
  status: "borrowed" | "returned" | "overdue";
  dueDate?: Date; 
}

// 2. Define the Mongoose schema
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
      index: true, // 🔍 useful for filtering by status
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

borrowSchema.virtual("dueDate").get(function (this: IBorrow) {
  const due = new Date(this.borrowedAt);
  due.setDate(due.getDate() + 14);
  return due;
});


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

// 5. Export the model
const Borrow = mongoose.model<IBorrow>("Borrow", borrowSchema);

export default Borrow;
