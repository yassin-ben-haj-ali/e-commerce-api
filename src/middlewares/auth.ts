import { NextFunction, Request, Response } from "express";
import { UnothorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import { verify } from "jsonwebtoken";
import { prismaClient } from "..";
import { User } from "@prisma/client";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    // 1.extract the token from header 
    const token = req.headers.authorization
    // 2. if token is not present, throw an error of unauthorized 
    if (!token) {
        next(new UnothorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
    try {
        // 3.if the token is present, verify that token and extract the payload
        const payload = verify(token, process.env.TOKEN_SECRET_KEY) as any;
        // 4.to get the user from the payload
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } })
        if (!user) {
            next(new UnothorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
        }
        // 5.to attach the user to the current request object
        req.user = user
        next()


    } catch (err) {
        next(new UnothorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }


}