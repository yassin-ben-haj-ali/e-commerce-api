import { Router } from "express";
import { addAddress, deleteAddress, getAddresses } from "../controllers/users";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const productRoutes: Router = Router();


productRoutes.post("/address",[authMiddleware],errorHandler(addAddress));
productRoutes.get("/address",[authMiddleware],errorHandler(getAddresses));
productRoutes.delete("/address/:id",[authMiddleware],errorHandler(deleteAddress));





export default productRoutes;