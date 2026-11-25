import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);
  console.error(err);
  const status = Number(err.status) || 500;
  const pesan = status === 500 ? "Internal server error" : (err.message || "Terjadi kesalahan");
  const kode = err.kode || (status === 422 ? "VALIDATION_ERROR" : status === 404 ? "NOT_FOUND" : status === 409 ? "CONFLICT" : status === 401 ? "UNAUTHORIZED" : status === 500 ? "INTERNAL_SERVER_ERROR" : "BAD_REQUEST");
  res.status(status).json({ error: { pesan, kode } });
}
