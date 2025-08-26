import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import authStudent from "./routes/auth";
import bookRouter from "./routes/book";
import studentRouter from "./routes/student";

const app = express();

app.use(express.json());
app.use(cors({ exposedHeaders: ["x-auth-token"] }));
app.use(helmet());

app.use("/api/students", studentRouter);
app.use("/api/books", bookRouter);
app.use("/api/auth", authStudent);

mongoose
  .connect("mongodb://localhost/project")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Couldnt connect to db ", err.message));

export default app;
