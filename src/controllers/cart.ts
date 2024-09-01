import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { Product } from "@prisma/client";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { BadRequestException } from "../exceptions/bad-request";

export const addItemToCart = async (req: Request, res: Response) => {

    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product

    product = await prismaClient.product.findFirst({
        where: {
            id: validatedData.productId
        }
    })

    if (!product) {
        throw new NotFoundException("Product not found.", ErrorCode.PRODUCT_NOT_FOUND)
    }

    const cart = await prismaClient.cartItem.findFirst({
        where: {
            productId: product.id,
            userId: req.user.id
        }
    })

    if (cart) {
        throw new BadRequestException("product already exists in your cart.", ErrorCode.PRODUCT_ALREADY_EXISTS)
    }

    const createdCart = await prismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: product.id,
            quantity: validatedData.quantity
        }
    })

    res.json(createdCart)

}


export const deleteItemFromCart = async (req: Request, res: Response) => {
    const cart = await prismaClient.cartItem.findFirst({
        where: {
            id: +req.params.id
        }
    })
    if (cart.userId != req.user.id) {
        throw new BadRequestException("User cannot delete this item", ErrorCode.UNAUTHORIZED)
    }
    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    })
}

export const changeQuantity = async (req: Request, res: Response) => {
    const validatedData = ChangeQuantitySchema.parse(req.body)
    const cart = await prismaClient.cartItem.findFirst({
        where: {
            id: +req.params.id
        }
    })
    if (cart.userId != req.user.id) {
        throw new BadRequestException("User cannot update this item", ErrorCode.UNAUTHORIZED)
    }

    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validatedData.quantity
        }
    })
    res.json(updatedCart)
}

export const getCart = async (req: Request, res: Response) => {

    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    })
    res.json(cart)
}