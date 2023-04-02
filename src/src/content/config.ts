import { z, defineCollection } from "astro:content";

const articlesCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).optional()
    })
});

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    publishDate: z.date()
  })
});

export const collections = {
    'articles': articlesCollection,
    'posts': postsCollection
};