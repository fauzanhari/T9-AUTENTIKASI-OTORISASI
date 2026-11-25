import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errors";

export function butuhLogin(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ") || !authorization.slice(7).trim()) {
    return next(new AppError(401, "Token diperlukan", "TOKEN_DIPERLUKAN"));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return next(new AppError(500, "Konfigurasi JWT_SECRET belum tersedia", "INTERNAL_SERVER_ERROR"));

  try {
    const decoded = jwt.verify(authorization.slice(7).trim(), secret);
    if (typeof decoded === "string" || typeof decoded.id !== "number") {
      return next(new AppError(401, "Token tidak valid", "TOKEN_TIDAK_VALID"));
    }
    req.user = { id: decoded.id, iat: decoded.iat, exp: decoded.exp };
    next();
  } catch {
    next(new AppError(401, "Token tidak valid atau expired", "TOKEN_TIDAK_VALID"));
  }
}
