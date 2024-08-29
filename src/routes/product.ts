import { Router } from "express";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/products";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRoutes: Router = Router();


productRoutes.post("/",[authMiddleware,adminMiddleware],errorHandler(createProduct));
productRoutes.get("/",[authMiddleware,adminMiddleware],errorHandler(getProducts));
productRoutes.get("/:id",[authMiddleware,adminMiddleware],errorHandler(getProduct));
productRoutes.put("/:id",[authMiddleware,adminMiddleware],errorHandler(updateProduct));
productRoutes.delete("/:id",[authMiddleware,adminMiddleware],errorHandler(deleteProduct));





export default productRoutes;