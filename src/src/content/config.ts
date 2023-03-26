import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional()
    })
});

export const collections = {
    'articles': articlesCollection,
};