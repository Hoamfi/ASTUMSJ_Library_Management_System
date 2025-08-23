import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors"
import students from "./routes/student";
<<<<<<< HEAD
import books from "./routes/bookRoutes";
=======
import books from "./routes/book";
import authStudent from "./routes/auth";
>>>>>>> c1d321f5b3ac64a13083beab8c47b01e8be4f565

const app = express();

app.use(express.json());
app.use(cors())
app.use(helmet());

app.use('/api/students', students)
app.use('/api/books', books)
app.use('/api/auth', authStudent)

mongoose
  .connect("mongodb://localhost/project")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.log("Couldnt connect to db ", err.message));

export default app