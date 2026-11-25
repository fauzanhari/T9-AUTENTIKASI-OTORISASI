import { Router } from "express";
import { authController } from "../controllers/authController";
import { butuhLogin } from "../middleware/auth";
import { validate } from "../utils/validate";
import { registerSchema, loginSchema } from "../validators/authValidator";

const router = Router();
router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/saya", butuhLogin, authController.saya);
export default router;
