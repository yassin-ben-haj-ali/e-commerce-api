import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/error";

dotenv.config({ path: ".env" })

const app: Express = express();


app.get("/", (req: Request, res: Response) => {
    res.send("hello world !")
});

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
    log: ['query']
}).$extends({
    result: {
        address: {
            formattedAddress: {
                needs: {
                    lineOne: true,
                    lineTwo: true,
                    country: true,
                    city: true,
                    pincode: true
                },
                compute:(adr)=>{
                    return `${adr.lineOne}, ${adr.lineTwo}, ${adr.country}, ${adr.city}-${adr.pincode}`
                }
            }
        }
    }
})

app.use(errorMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => console.log("App Working !!"));
