import dotenv from "dotenv";

dotenv.config();


export const ENV = {
  EMAIL_PASS:process.env.EMAIL_PASS,
  EMAIL_USER:process.env.EMAIL_USER,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "dev_secret_key",
  PORT: process.env.PORT || 3000,
  ATLAS_URL:process.env.ATLAS_URL,
};
