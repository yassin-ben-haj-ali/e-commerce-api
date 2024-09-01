import { Request, Response } from "express"
import { adressSchema, updateUserSchema } from "../schema/users"
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Address } from "@prisma/client";
import { BadRequestException } from "../exceptions/bad-request";

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

export const updateUser = async (req: Request, res: Response) => {

    const validatedData = updateUserSchema.parse(req.body);

    let shippingAddress: Address;
    let billingAddress: Address;

    if (validatedData.defaultShippingAddressId) {
        shippingAddress = await prismaClient.address.findFirst({
            where: {
                id: validatedData.defaultShippingAddressId
            }
        })

        if (!shippingAddress) {
            throw new NotFoundException("Address not found.", ErrorCode.ADDRESS_NOT_FOUND)
        }

        if (shippingAddress.userId != req.user.id) {
            throw new BadRequestException("Address does not belong to user.", ErrorCode.ADDRESS_DOES_NOT_BELONG)
        }
    }

    if (validatedData.defaultBillingAddressId) {
        billingAddress = await prismaClient.address.findFirst({
            where: {
                id: validatedData.defaultBillingAddressId
            }
        })

        if (!billingAddress) {
            throw new NotFoundException("Address not found.", ErrorCode.ADDRESS_NOT_FOUND)
        }

        if (billingAddress.userId != req.user.id) {
            throw new BadRequestException("Address does not belong to user.", ErrorCode.ADDRESS_DOES_NOT_BELONG)
        }
    }
    const updatedUser = await prismaClient.user.update({
        where: {
            id: req.user.id
        },
        data: validatedData
    })
    res.json(updatedUser);
}