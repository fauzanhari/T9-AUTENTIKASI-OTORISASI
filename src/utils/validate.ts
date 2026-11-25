import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";

export function validate(schema: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const pesan = error.details.map((d: any) => d.message).join("; ");
      return next(new AppError(422, pesan, "VALIDATION_ERROR"));
    }
    req.body = value;
    next();
  };
}
