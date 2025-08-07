import { z } from 'zod';

// Define the schema for a blog post's front matter
export const blogPostSchema = z.object({
  title: z.string(),
  date: z.string().datetime(),
  description: z.string(),
  category: z.string(),
  tags: z.array(z.string()).optional(),
  readTime: z.string().optional(),
});

// Define the schema for a scholarship's front matter
export const scholarshipSchema = z.object({
  title: z.string(),
  amount: z.string(),
  deadline: z.string().datetime(),
  eligibility: z.string(),
  description: z.string().optional(),
  applicationLink: z.string().url().optional(),
  category: z.string().default('scholarships'),
});

// Define a union type for all content types
export const contentSchema = z.union([blogPostSchema, scholarshipSchema]);

// Infer the TypeScript types from the schemas
export type BlogPost = z.infer<typeof blogPostSchema>;
export type Scholarship = z.infer<typeof scholarshipSchema>;
export type Content = z.infer<typeof contentSchema>;
