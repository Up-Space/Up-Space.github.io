import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';
import { contentSchema } from '../schema';

// Utility to slugify a string
const slugify = (text: string) => {
  return text.toString().toLowerCase()
    .trim()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-');      // Replace multiple - with single -
};

// Main function to get all content for a given category
export function getAllContent(categorySlug: string) {
  const contentDir = path.join(process.cwd(), 'content', categorySlug);
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found for category: ${categorySlug}`);
    return [];
  }
  
  const fileNames = fs.readdirSync(contentDir);

  const allContent = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(contentDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Validate front matter against the schema
    const validatedData = contentSchema.parse(data);

    return {
      slug,
      content,
      category: categorySlug,
      frontMatter: validatedData,
    };
  });

  return allContent;
}

// Function to get a single piece of content by category and slug
export async function getContentBySlug(categorySlug: string, slug: string) {
  const fullPath = path.join(process.cwd(), 'content', categorySlug, `${slug}.md`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Content file not found for slug: ${slug} in category: ${categorySlug}`);
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Validate front matter
  const validatedData = contentSchema.parse(data);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    category: categorySlug,
    frontMatter: validatedData,
  };
}
