import { Router } from "express";
import { orderController } from "../controllers/orderController";
import { orderSchema } from "../validators/orderValidator";
import { validate } from "../utils/validate";
import { butuhLogin } from "../middleware/auth";

const router = Router();
router.get("/", orderController.list);
router.get("/:id", orderController.get);
router.post("/", butuhLogin, validate(orderSchema), orderController.create);
export default router;
