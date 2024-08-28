import { Request, Response, NextFunction } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"

export const errorHandler = (fn: Function) => {
    return async(req: Request, res: Response, next: NextFunction) => {

        try {

            await fn(req, res, next)

        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException) {
                exception = err
            } else {
                exception = new InternalException('Something went wrong !', err, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }

}