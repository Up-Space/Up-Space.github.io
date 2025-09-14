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

// Recursive function to find all markdown files in subdirectories
function findMarkdownFilesRecursively(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      findMarkdownFilesRecursively(filePath, fileList);
    } else if (file.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Main function to get all content for a given category
export function getAllContent(categorySlug: string) {
  const contentDir = path.join(process.cwd(), 'content', categorySlug);
  
  // Check if directory exists
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found for category: ${categorySlug}`);
    return [];
  }
  
  // Get all markdown files recursively
  const allMarkdownFiles = findMarkdownFilesRecursively(contentDir);

  const allContent = allMarkdownFiles.map(fullPath => {
    const fileName = path.basename(fullPath);
    const slug = fileName.replace(/\.md$/, '');
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Use the data as-is without strict validation
    const validatedData = data;

    return {
      slug,
      content,
      category: categorySlug,
      frontMatter: validatedData,
    };
  });

  // Sort by date (newest first) if date exists in frontMatter
  return allContent.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date || '');
    const dateB = new Date(b.frontMatter.date || '');
    return dateB.getTime() - dateA.getTime();
  });
}

// Function to get a single piece of content by category and slug
export async function getContentBySlug(categorySlug: string, slug: string) {
  const contentDir = path.join(process.cwd(), 'content', categorySlug);
  
  // Check if category directory exists
  if (!fs.existsSync(contentDir)) {
    throw new Error(`Content directory not found for category: ${categorySlug}`);
  }

  // Find the file recursively in subdirectories
  const allMarkdownFiles = findMarkdownFilesRecursively(contentDir);
  const fullPath = allMarkdownFiles.find(filePath => {
    const fileName = path.basename(filePath, '.md');
    return fileName === slug;
  });

  // Check if file exists
  if (!fullPath || !fs.existsSync(fullPath)) {
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
