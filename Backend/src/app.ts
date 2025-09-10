import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import authStudent from "./routes/auth";
import router from "./routes/bookRoutes";
import studentRouter from "./routes/student";
import donationRoutes from "./routes/donationRoutes";
import forgotRoutes from "./routes/forgotRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import creatingRoutes from "./routes/creatingRoutes";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["x-auth-token"] }));
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://astumsj-library.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    exposedHeaders: ["x-auth-token"],
    credentials: true,
  })
);
app.use("/api/students", studentRouter);
app.use("/api/books", router);
app.use("/api/auth", authStudent);
app.use("/api/auth/student", authStudent);
app.use("/api/donations", donationRoutes);
app.use("/api/auth", forgotRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/creating", creatingRoutes);
app.use("/api/forgotpassword", forgotRoutes);

mongoose
  .connect(process.env.ATLAS_URL as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

export default app;
