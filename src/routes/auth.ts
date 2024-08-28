import { Router } from "express";
import { signup } from "../controllers/auth";

const authRoutes: Router = Router();


authRoutes.post("/signup", signup);

export default authRoutes;