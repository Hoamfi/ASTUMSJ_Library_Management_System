import dotenv from "dotenv"

dotenv.config()

export const ENV ={
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "dev_secret_key" ,
    PORT: process.env.PORT || 3000
}