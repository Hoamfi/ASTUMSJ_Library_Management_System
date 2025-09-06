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

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["x-auth-token"] }));
app.use(helmet());

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
  .connect("mongodb://localhost/project")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Couldnt connect to db ", err.message));

export default app;
