import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ENV } from "../config/env";

function auth(req: Request, res: Response, next: () => void) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);
    if (typeof decoded === "string") {
      return res.status(400).send("Invalid token payload.");
    }
    (req as any).user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}

export default auth;
