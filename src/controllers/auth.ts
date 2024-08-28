import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt"
import { sign } from "jsonwebtoken"
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, password, name } = req.body;

        let user = await prismaClient.user.findFirst({ where: { email } })

        if (user) {
            next(new BadRequestException("User already exists !", ErrorCode.USER_ALREADY_EXISTS))
        }
        user = await prismaClient.user.create({
            data: {
                email,
                password: hashSync(password, 10),
                name
            }
        })

        res.json(user);
    } catch (err: any) {
        next(new UnprocessableEntity(err?.issues, 'Unprocessable entity', ErrorCode.UNPROCESSABLE_ENTITY))
    }


}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } })

    if (!user) {
        throw Error("User does not exists !")
    }
    if (!compareSync(password, user.password)) {
        throw Error("Incorrect Password !")
    }

    const token = sign({
        userId: user.id
    },
        process.env.TOKEN_SECRET_KEY!
    )

    res.json({ user, token });

}