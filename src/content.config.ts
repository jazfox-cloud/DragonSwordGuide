import { defineCollection, z } from 'astro:content';

const ja = defineCollection({
  type: 'data',
  schema: z.any(),
});

export const collections = { ja };
