import { notFound } from "next/navigation";
import {
  getContentBySlug,
  getFilePathsByDirectory,
  getDirectoryFromSlug,
} from "../../lib/markdown";

interface Params {
  params: {
    slug ? : string[];
  };
}

interface FrontMatter {
  title: string;
  description ? : string;
  [key: string]: any;
}

interface Post {
  content: string;
  frontMatter: FrontMatter;
}

// Generate static paths for all content files
export async function generateStaticParams(): Promise < { slug: string[] } [] > {
  const blogPosts = getFilePathsByDirectory("blog-posts");
  const scholarships = getFilePathsByDirectory("scholarships");
  return [...blogPosts, ...scholarships];
}

export default async function DynamicContentPage({ params }: Params) {
  const { slug } = params;
  
  if (!slug || slug.length === 0) {
    return notFound();
  }
  
  const category = getDirectoryFromSlug(slug);
  if (!category) {
    return notFound();
  }
  
  const slugString = slug.slice(1).join("/");
  const post: Post | null = await getContentBySlug(category, slugString);
  
  if (!post) {
    return notFound();
  }
  
  return (
    <div className="container mx-auto px-6 py-12">
      <article className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.frontMatter.title}</h1>
        {post.frontMatter.description && (
          <p className="text-xl text-gray-600 mb-8">
            {post.frontMatter.description}
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}