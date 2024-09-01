import { Router } from "express";
import { addItemToCart, deleteItemFromCart } from "../controllers/cart";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const cartRoutes: Router = Router();


cartRoutes.post("/", [authMiddleware], errorHandler(addItemToCart));
cartRoutes.delete("/:id", [authMiddleware], errorHandler(deleteItemFromCart));






export default cartRoutes;