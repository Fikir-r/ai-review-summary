import { z } from 'zod';


export const ReviewSchema = z.object({
    reviewer: z.string(),
    stars: z.number().min(1).max(5),
    review: z.string(),
    date: z.string(),
});

export const ProductSchema = z.object({
    slug: z.string(),
    name: z.string(),
    description: z.string(),
    reviews: z.array(ReviewSchema),
});

export type Review = z.infer<typeof ReviewSchema>;
export type Product = z.infer<typeof ProductSchema>;