import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { compareSync, hashSync } from "bcrypt"
import { sign } from "jsonwebtoken"
import { BadRequestException } from "../exceptions/bad-request";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";
import { signupSchema } from "../schema/users";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    signupSchema.parse(req.body);
    const { email, password, name } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } })

    if (user) {
        next(new BadRequestException("User already exists !", ErrorCode.USER_ALREADY_EXISTS))
    }
    user = await prismaClient.user.create({
        data: {
            ...req.body,
            password: hashSync(password, 10),
        }
    })
    res.json(user);
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    let user = await prismaClient.user.findFirst({ where: { email } })

    if (!user) {
        throw new NotFoundException("User not found.", ErrorCode.USER_NOT_FOUND)
    }
    if (!compareSync(password, user.password)) {
        throw new BadRequestException("Incorrect Password", ErrorCode.INCORRECT_PASSWORD)
    }

    const token = sign({
        userId: user.id
    },
        process.env.TOKEN_SECRET_KEY!
    )

    res.json({ user, token });

}

export const me = async (req: Request, res: Response) => {

    res.json(req.user);

}