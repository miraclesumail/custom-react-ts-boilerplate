import { Request, Response, NextFunction } from "express";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = "bear";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers["x-access-token"] as any;
  if (!token) {
    return res.status(403).json({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (!err) {
      next();
    } else {
      console.log("the error00", err);
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
  });
}
