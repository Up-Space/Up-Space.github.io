
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const contentDirectory = path.join(process.cwd(), "content");

export interface FrontMatter {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  category?: string;
  tags?: string[];
  level?: string;
  duration?: string;
  prerequisites?: string;
  featured?: boolean;
  cover_image?: string;
  amount?: string;
  deadline?: string;
  eligibility?: string;
  applicationLink?: string;
  attachment?: string;
  image?: string;
  readTime?: string;
  [key: string]: any;
}

export interface Post {
  slug: string;
  frontMatter: FrontMatter;
  content: string;
  mdxContent?: string;
}

export interface StaticPath {
  slug: string[];
}

// Get a single content file by category and slug (handles nested structure)
export async function getContentBySlug(
  category: string,
  slug: string
): Promise<Post | null> {
  const categoryPath = path.join(contentDirectory, category);
  
  // Recursively search for the file
  function findFile(dir: string): string | null {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        const found = findFile(fullPath);
        if (found) return found;
      } else if (item === `${slug}.md`) {
        return fullPath;
      }
    }
    return null;
  }
  
  const fullPath = findFile(categoryPath);
  if (!fullPath || !fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  try {
    // Compile MDX content
    const mdxContent = await compile(content, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
      outputFormat: 'function-body',
    });

    return {
      slug,
      frontMatter: data as FrontMatter,
      content: content, // Keep original markdown for fallback
      mdxContent: String(mdxContent),
    };
  } catch (error) {
    console.error(`Error compiling MDX for ${slug}:`, error);
    // Fallback to regular markdown if MDX compilation fails
    return {
      slug,
      frontMatter: data as FrontMatter,
      content: content,
    };
  }
}

// Get all content from a specific category (handles nested year/month structure)
export function getAllContent(category: string): Omit<Post, "content" | "mdxContent">[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const allFiles: Array<{ slug: string; frontMatter: FrontMatter }> = [];

  // Recursively find all .md files in subdirectories
  function findMarkdownFiles(dir: string): void {
    const items = fs.readdirSync(dir);
    
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        findMarkdownFiles(fullPath);
      } else if (item.endsWith('.md')) {
        const slug = item.replace(/\.md$/, "");
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);
        
        allFiles.push({
          slug,
          frontMatter: data as FrontMatter,
        });
      }
    });
  }

  findMarkdownFiles(categoryPath);

  return allFiles.sort(
    (a, b) =>
      new Date(b.frontMatter.date ?? "").getTime() -
      new Date(a.frontMatter.date ?? "").getTime()
  );
}

// Get all file paths for static generation
export function getFilePathsByDirectory(directory: string): StaticPath[] {
  const directoryPath = path.join(contentDirectory, directory);
  if (!fs.existsSync(directoryPath)) {
    return [];
  }

  const files = fs.readdirSync(directoryPath);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: [directory, file.replace(/\.md$/, "")],
    }));
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

  directories.forEach((dir) => {
    const dirPath = path.join(contentDirectory, dir);
    const files = fs.readdirSync(dirPath);

    files
      .filter((file) => file.endsWith(".md"))
      .forEach((file) => {
        const slug = file.replace(/\.md$/, "");
        const fullPath = path.join(dirPath, file);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        allPosts.push({
          slug,
          frontMatter: data as FrontMatter,
          category: dir,
        });
      });
  });

  return allPosts;
}
