import { z } from "zod"


export const signupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})


export const adressSchema = z.object({
    lineOne: z.string(),
    lineTwo: z.string().optional(),
    city: z.string(),
    country: z.string(),
    pincode: z.string().length(6),
    userId: z.number(),
})

export const updateUserSchema = z.object({
    name: z.string().optional(),
    defaultShippingAddressId: z.number().optional(),
    defaultBillingAddressId: z.number().optional()
})
