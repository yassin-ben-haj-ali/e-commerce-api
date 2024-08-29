import { Request, Response, NextFunction } from "express"
import { ErrorCode, HttpException } from "./exceptions/root"
import { InternalException } from "./exceptions/internal-exception"
import { ZodError } from "zod"
import { UnprocessableEntity } from "./exceptions/validation"

export const errorHandler = (fn: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        try {

            await fn(req, res, next)

        } catch (err: any) {
            let exception: HttpException;
            if (err instanceof HttpException) {
                exception = err
            } else {
                if (err instanceof ZodError) {
                    exception = new UnprocessableEntity(err.issues, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY)
                }
                exception = new InternalException('Something went wrong !', err, ErrorCode.INTERNAL_EXCEPTION)
            }
            next(exception)
        }
    }

}