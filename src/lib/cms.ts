import fs from 'fs/promises';
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
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// Function to get categories
export async function getCategories() {
  const filePath = path.join(process.cwd(), 'cms', 'categories.json');
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const categories = JSON.parse(fileContents);
    return { categories };
  } catch (error) {
    console.error(`Error reading categories data:`, error);
    return { categories: [] };
  }
}

// Recursive function to find all markdown files in subdirectories
async function findMarkdownFilesRecursively(dir: string, fileList: string[] = []): Promise<string[]> {
  try {
    const files = await fs.readdir(dir);
    await Promise.all(files.map(async (file) => {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await findMarkdownFilesRecursively(filePath, fileList);
      } else if (file.endsWith('.md')) {
        fileList.push(filePath);
      }
    }));
  } catch (error) {
    console.warn(`Directory not found or could not be read: ${dir}`, error);
  }
  return fileList;
}

// Main function to get all content for a given directory
export async function getAllContent(dir: string, categorySlug: string) {
  const allMarkdownFiles = await findMarkdownFilesRecursively(dir);

  const allContent = await Promise.all(
    allMarkdownFiles.map(async (fullPath) => {
      const fileName = path.basename(fullPath);
      const slug = fileName.replace(/\.md$/, '');
      const fileContents = await fs.readFile(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      const validatedData = data;

      return {
        slug,
        content,
        category: categorySlug,
        frontMatter: validatedData,
      };
    })
  );

  return allContent.sort((a, b) => {
    const dateA = new Date(a.frontMatter.date || '');
    const dateB = new Date(b.frontMatter.date || '');
    return dateB.getTime() - dateA.getTime();
  });
}

// Function to get a single piece of content by category and slug
export async function getContentBySlug(categorySlug: string, slug: string) {
  const baseDir = path.join(process.cwd(), 'content', categorySlug);

  try {
    await fs.stat(baseDir);
  } catch (error) {
    throw new Error(`Content directory not found for category: ${categorySlug}`);
  }

  const allMarkdownFiles = await findMarkdownFilesRecursively(baseDir);
  const fullPath = allMarkdownFiles.find(filePath => {
    const fileName = path.basename(filePath, '.md');
    return fileName === slug;
  });

  if (!fullPath) {
    throw new Error(`Content file not found for slug: ${slug} in category: ${categorySlug}`);
  }

  const fileContents = await fs.readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const validatedData = contentSchema.parse(data);

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
