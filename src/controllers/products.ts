import { NextFunction, Response, Request } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createProduct = async (req: Request, res: Response, nex: NextFunction) => {

    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })

    res.json(product)

}


export const updateProduct = async (req: Request, res: Response, nex: NextFunction) => {
    const product = req.body;
    if (product.tags) {
        product.tags = product.tags.join(',')
    }
    const updateProduct = await prismaClient.product.update({
        where: {
            id: +req.params.id
        },
        data: product
    })
    res.json(updateProduct);
}

export const deleteProduct = async (req: Request, res: Response, nex: NextFunction) => {

    const product = await prismaClient.product.findFirst({
        where: {
            id: +req.params.id
        }
    })
    if (!product) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
    await prismaClient.product.delete({
        where: {
            id: +req.params.id
        }
    })
    res.json(product)
}

export const getProduct = async (req: Request, res: Response, nex: NextFunction) => {

    const product = await prismaClient.product.findFirst({
        where: {
            id: +req.params.id
        }
    })
    if (!product) {
        throw new NotFoundException('Product not found', ErrorCode.PRODUCT_NOT_FOUND)
    }
    res.json(product)
}

export const getProducts = async (req: Request, res: Response, nex: NextFunction) => {

    const count = await prismaClient.product.count();
    const products = await prismaClient.product.findMany({
        skip: +req.query.skip || 0,
        take: 5
    })
    res.json({ products, count })
}