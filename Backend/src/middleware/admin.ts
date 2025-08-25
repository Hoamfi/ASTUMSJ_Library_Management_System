import { Request, Response } from "express";

export default function isAdmin(req: Request, res: Response, next: () => void) {
  if (!(req as any).user.isAdmin) return res.status(403).send("Access denied.");
  next();
}
