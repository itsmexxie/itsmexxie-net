import { z } from "astro/zod";

const postSchema = z.object({
  layout: z.string(),
  title: z.string(),
  description: z.optional(z.string()),
  dates: z.optional(z.object({
    publish: z.date(),
    edited: z.optional(z.date()),
  })),
  tags: z.optional(z.array(z.string())),
});

export { postSchema };
