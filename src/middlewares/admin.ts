import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

export const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const { role } = req.user;
    if (role == 'ADMIN') {
        next()
    }
    else {
        next(new UnauthorizedException('Unauthorized', ErrorCode.UNAUTHORIZED))
    }
}