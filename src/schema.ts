import { z } from 'zod';

// Define the schema for a blog post's front matter
export const blogPostSchema = z.object({
  title: z.string(),
  date: z.string().datetime(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  readTime: z.string().optional(),
});

// Define the schema for a career advancement article's front matter
export const careerAdvancementSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for a coding course's front matter
export const codingCourseSchema = z.object({
  title: z.string(),
  description: z.string(),
  instructor: z.string(),
  duration: z.string(),
  difficulty: z.string(),
  price: z.string(),
});

// Define the schema for a creative skills article's front matter
export const creativeSkillsSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for a digital skills article's front matter
export const digitalSkillsSchema = z.object({
  title: z.string(),
  description: z.string(),
  instructor: z.string(),
  difficulty: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for an education article's front matter
export const educationSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for an entrepreneurship article's front matter
export const entrepreneurshipSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for a financial aid article's front matter
export const financialAidSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for a health & wellness article's front matter
export const healthWellnessSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for a job post's front matter
export const jobBoardSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  salary: z.string(),
  description: z.string(),
  applicationLink: z.string().url(),
});

// Define the schema for a learning resource's front matter
export const learningResourcesSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  resourceType: z.string(),
  link: z.string().url(),
});

// Define the schema for a lifestyle article's front matter
export const lifestyleSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// Define the schema for a personal development article's front matter
export const personalDevelopmentSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  readTime: z.string(),
  tags: z.array(z.string()),
});

// Define the schema for a scholarship's front matter
export const scholarshipSchema = z.object({
  title: z.string(),
  amount: z.string(),
  deadline: z.string().datetime(),
  eligibility: z.string(),
  description: z.string().optional(),
  applicationLink: z.string().url().optional(),
});


// Define a flexible base content schema that works with all content types
export const contentSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  // Allow any additional fields
}).passthrough();

// Infer the TypeScript types from the schemas
export type BlogPost = z.infer<typeof blogPostSchema>;
export type CareerAdvancement = z.infer<typeof careerAdvancementSchema>;
export type CodingCourse = z.infer<typeof codingCourseSchema>;
export type CreativeSkills = z.infer<typeof creativeSkillsSchema>;
export type DigitalSkills = z.infer<typeof digitalSkillsSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Entrepreneurship = z.infer<typeof entrepreneurshipSchema>;
export type FinancialAid = z.infer<typeof financialAidSchema>;
export type HealthWellness = z.infer<typeof healthWellnessSchema>;
export type JobPost = z.infer<typeof jobBoardSchema>;
export type LearningResources = z.infer<typeof learningResourcesSchema>;
export type Lifestyle = z.infer<typeof lifestyleSchema>;
export type PersonalDevelopment = z.infer<typeof personalDevelopmentSchema>;
export type Scholarship = z.infer<typeof scholarshipSchema>;

export type Content = z.infer<typeof contentSchema>;
