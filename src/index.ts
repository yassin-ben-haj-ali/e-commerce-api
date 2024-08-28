import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";

dotenv.config({ path: ".env" })

const app: Express = express();


app.get("/", (req: Request, res: Response) => {
    res.send("hello world !")
});

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query']
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("App Working !!"));
