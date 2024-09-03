import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./product";
import addressRoutes from "./user";
import cartRoutes from "./cart";
import ordersRoutes from "./orders";


const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/product", productRoutes);
rootRouter.use("/user", addressRoutes);
rootRouter.use("/cart", cartRoutes);
rootRouter.use("/orders", ordersRoutes);




export default rootRouter;