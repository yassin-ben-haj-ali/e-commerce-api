import { Router } from "express";
import { addItemToCart, changeQuantity, deleteItemFromCart, getCart } from "../controllers/cart";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const cartRoutes: Router = Router();


cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));
cartRoutes.put("/:id", [authMiddleware], errorHandler(changeQuantity));
cartRoutes.get("/", [authMiddleware], errorHandler(getCart));







export default cartRoutes;