import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "dev_secret_key",
  PORT: process.env.PORT || 3000,
  ATLAS_URL: "mongodb+srv://hostech888_db_user:o6zTIg7gnO7Fs8mX@cluster0.fq3oh1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
};
