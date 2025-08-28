import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

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
}

export interface StaticPath {
  slug: string[];
}

// Get a single content file by category and slug
export async function getContentBySlug(
  category: string,
  slug: string
): Promise<Post | null> {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    frontMatter: data as FrontMatter,
    content: contentHtml,
  };
}

// Get all content from a specific category
export function getAllContent(category: string): Omit<Post, "content">[] {
  const categoryPath = path.join(contentDirectory, category);

  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = fs.readdirSync(categoryPath);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(categoryPath, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        frontMatter: data as FrontMatter,
      };
    })
    .sort(
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
export function getAllPosts(): (Omit<Post, "content"> & { category: string })[] {
  const allPosts: (Omit<Post, "content"> & { category: string })[] = [];

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