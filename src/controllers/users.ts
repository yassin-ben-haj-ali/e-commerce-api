import { Request, Response } from "express"
import { adressSchema } from "../schema/users"
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const addAddress = async (req: Request, res: Response) => {
    adressSchema.parse(req.body);
    const address = await prismaClient.address.create({
        data: {
            ...req.body,
            user: req.user.id
        }
    })

    res.json(address)
}


export const deleteAddress = async (req: Request, res: Response) => {

    const address = await prismaClient.address.findFirst({
        where: {
            id: +req.params.id
        }
    })
    if (!address) {
        throw new NotFoundException("Address not found.", ErrorCode.USER_NOT_FOUND);
    }

    await prismaClient.address.delete({
        where: {
            id: +req.params.id
        }
    })

    res.json({ address, success: true })

}


export const getAddresses = async (req: Request, res: Response) => {


    const addresses = await prismaClient.address.findMany({
        where: {
            userId: req.user.id
        }
    });

    res.json(addresses)
}