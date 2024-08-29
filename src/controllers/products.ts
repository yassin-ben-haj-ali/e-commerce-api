import { NextFunction, Response, Request } from "express";
import { prismaClient } from "..";

export const createProduct = async (req: Request, res: Response, nex: NextFunction) => {

    const product = await prismaClient.product.create({
        data: {
            ...req.body,
            tags: req.body.tags.join(',')
        }
    })

    res.json(product)

}