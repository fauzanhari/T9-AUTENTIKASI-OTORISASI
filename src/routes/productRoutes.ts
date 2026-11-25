import { Router } from "express";
import { productController } from "../controllers/productController";
import { productSchema } from "../validators/productValidator";
import { validate } from "../utils/validate";
import { butuhLogin } from "../middleware/auth";

const router = Router();
router.get("/", productController.list);
router.get("/:id", productController.get);
router.post("/", butuhLogin, validate(productSchema), productController.create);
router.put("/:id", butuhLogin, validate(productSchema), productController.update);
router.delete("/:id", butuhLogin, productController.remove);
export default router;
