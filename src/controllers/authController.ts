import { Request, Response, NextFunction } from "express";
import { authService } from "../services/authService";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (e) { next(e); }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await authService.login(req.body));
    } catch (e) { next(e); }
  },
  saya: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await authService.saya(req.user!.id));
    } catch (e) { next(e); }
  },
};
