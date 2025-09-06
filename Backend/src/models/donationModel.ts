import mongoose, { Schema, Document } from "mongoose";
import { email } from "zod";

export interface IDonation extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  screenshot: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: Date;
  email:string;
  name:string;
}

const donationSchema = new Schema<IDonation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    amount: {
      type: Number,
      min: 0,
      required: false,
    },

    screenshot: {
      type: String,
      required: false,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    email:{
      type:String,
  },
  name:{
    type:String,
  }
},
  {
    timestamps: true, // Add and update automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//for frontend fast
donationSchema.index({ status: 1, createdAt: -1 });

donationSchema.virtual("isPending").get(function () {
  return this.status === "Pending";
});

const Donation = mongoose.model<IDonation>("Donation", donationSchema);

export default Donation;
