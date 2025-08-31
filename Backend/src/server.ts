import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());

// routes
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";
import router from "./routes/auth";

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/auth",router);

// start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
