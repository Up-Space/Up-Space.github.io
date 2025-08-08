import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

// Helper function to get a single content file by category and slug
export async function getContentBySlug(category, slug) {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    frontMatter: data,
    content: contentHtml
  };
}

// Function to get all content from a specific category
export function getAllContent(category) {
  const categoryPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace(/\.md$/, '');
      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        frontMatter: data,
      };
    })
    .sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date));
}

// Function to get all file paths for static generation
export function getFilePathsByDirectory(directory) {
  const directoryPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  const files = fs.readdirSync(directoryPath);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      slug: [directory, file.replace(/\.md$/, '')]
    }));
}

// Function to get the category from the slug array
export function getDirectoryFromSlug(slug) {
  if (Array.isArray(slug) && slug.length > 0) {
    return slug[0];
  }
  return null;
}

// NEW FUNCTION: To get all content from all directories for a full-site search
export function getAllPosts() {
  const allPosts = [];
  const directories = fs.readdirSync(contentDirectory)
    .filter(file => fs.statSync(path.join(contentDirectory, file)).isDirectory());
  
  directories.forEach(dir => {
    const dirPath = path.join(contentDirectory, dir);
    const files = fs.readdirSync(dirPath);
    
    files.filter(file => file.endsWith('.md'))
      .forEach(file => {
        const slug = file.replace(/\.md$/, '');
        const fullPath = path.join(dirPath, file);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        allPosts.push({
          slug,
          frontMatter: data,
          category: dir,
        });
      });
  });
  
  return allPosts;
}
