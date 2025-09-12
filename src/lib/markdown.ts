import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const contentDirectory = path.join(process.cwd(), 'content');

export interface PostMetadata {
  title: string;
  description: string;
  author?: string;
  date: string;
  category: string;
  tags?: string[];
  level?: string;
  duration?: string;
  prerequisites?: string;
  featured?: boolean;
  cover_image?: string;
  attachment?: string;
  applicationLink?: string;
  readTime?: string;
  [key: string]: any;
}

export interface Post {
  slug: string;
  frontMatter: PostMetadata;
  content: string;
  mdxContent?: string;
}

export interface StaticPath {
  slug: string[];
}

// Recursive helper function to find all markdown files
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

// Get a single content file by category and slug
export async function getContentBySlug(
  category: string,
  slug: string
): Promise<Post | null> {
  const categoryPath = path.join(contentDirectory, category);
  
  // Find the file path for the given slug
  const files = findMarkdownFilesRecursively(categoryPath);
  const fullPath = files.find(filePath => path.basename(filePath) === `${slug}.md`);

  if (!fullPath || !fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  try {
    const mdxContent = await compile(content, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      outputFormat: 'function-body',
    });

    return {
      slug,
      frontMatter: data as PostMetadata,
      content: content,
      mdxContent: String(mdxContent),
    };
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    return {
      slug,
      frontMatter: data as PostMetadata,
      content: content,
    };
  }
}

// Get all content from a specific category
export function getAllContent(category: string): Omit<Post, "content" | "mdxContent">[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const allFiles = findMarkdownFilesRecursively(categoryPath);
  const posts: Omit<Post, "content" | "mdxContent">[] = [];

  for (const fullPath of allFiles) {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    const slug = path.basename(fullPath, '.md');

    posts.push({
      slug,
      frontMatter: data as PostMetadata,
    });
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontMatter.date ?? "").getTime() -
      new Date(a.frontMatter.date ?? "").getTime()
  );
}

// Get all file paths for static generation
export function getFilePathsByDirectory(category: string): StaticPath[] {
  const categoryPath = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryPath)) {
    return [];
  }
  
  const allFiles = findMarkdownFilesRecursively(categoryPath);
  const paths: StaticPath[] = [];

  for (const filePath of allFiles) {
    // Determine the part of the path after 'content/category'
    const relativePath = path.relative(path.join(contentDirectory, category), filePath);
    // Split the path into an array of slug segments
    const slugSegments = relativePath.replace(/\.md$/, '').split(path.sep);
    paths.push({
      slug: [category, ...slugSegments]
    });
  }
  
  return paths;
}


// Get the category from the slug array
export function getDirectoryFromSlug(slug: string[] | undefined): string | null {
  return Array.isArray(slug) && slug.length > 0 ? slug[0] : null;
}

// Get all content from all directories
export function getAllPosts(): (Omit<Post, "content" | "mdxContent"> & { category: string })[] {
  const allPosts: (Omit<Post, "content" | "mdxContent"> & { category: string })[] = [];

  const directories = fs
    .readdirSync(contentDirectory)
    .filter((file) =>
      fs.statSync(path.join(contentDirectory, file)).isDirectory()
    );

  for (const dir of directories) {
    const dirPath = path.join(contentDirectory, dir);
    const allFiles = findMarkdownFilesRecursively(dirPath);

    for (const fullPath of allFiles) {
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      const slug = path.basename(fullPath, '.md');
      
      allPosts.push({
        slug,
        frontMatter: data as PostMetadata,
        category: dir,
      });
    }
  }

  return allPosts;
}

// Get all content from a category, specifically for nested year/month structure
export function getAllPostsInCategory(category: string) {
  try {
    const categoryPath = path.join(contentDirectory, category);

    if (!fs.existsSync(categoryPath)) {
      return [];
    }

    const posts: any[] = [];
    const allFiles = findMarkdownFilesRecursively(categoryPath);

    for (const fullPath of allFiles) {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      const slug = path.basename(fullPath, '.md');
      
      // Determine year and month from the file path
      const pathParts = path.relative(categoryPath, fullPath).split(path.sep);
      const year = pathParts[0];
      const month = pathParts[1];

      posts.push({
        slug,
        category,
        year,
        month,
        ...data,
        content,
      });
    }

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error(`Error loading posts for category ${category}:`, error);
    return [];
  }
}
