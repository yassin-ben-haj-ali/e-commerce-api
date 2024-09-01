import { Router } from "express";
import { addAddress, deleteAddress, getAddresses } from "../controllers/users";
import { errorHandler } from "../error-handler";
import { authMiddleware } from "../middlewares/auth";

const userRoutes: Router = Router();


userRoutes.post("/address",[authMiddleware],errorHandler(addAddress));
userRoutes.get("/address",[authMiddleware],errorHandler(getAddresses));
userRoutes.delete("/address/:id",[authMiddleware],errorHandler(deleteAddress));
userRoutes.put("/",[authMiddleware],errorHandler(deleteAddress));






export default userRoutes;