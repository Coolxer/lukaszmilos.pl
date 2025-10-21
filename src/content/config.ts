import { defineCollection } from "astro:content"
import { blogSchema, portfolioSchema, reviewSchema, pricingSchema } from './schemas';
import { glob, file } from 'astro/loaders';


const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: blogSchema,
})

const portfolio = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/portfolio" }),
  schema: portfolioSchema,
})

const reviews = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/reviews" }),
  schema: reviewSchema,
})

const pricing = defineCollection({
  loader: file("src/content/pricing/pricing.json"),
  schema: pricingSchema,
})

export const collections = {
  blog, portfolio, reviews, pricing
}