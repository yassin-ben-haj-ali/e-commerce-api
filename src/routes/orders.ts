import { Router } from "express";
import { createOrder } from "../controllers/orders";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const ordersRoutes: Router = Router();


ordersRoutes.post("/", [authMiddleware], errorHandler(createOrder));







export default ordersRoutes;