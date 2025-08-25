import { notFound } from "next/navigation";
import { getContentBySlug, getFilePathsByDirectory, getDirectoryFromSlug } from "../../lib/markdown";

// This function generates static paths for all your content files.
export async function generateStaticParams() {
  const blogPosts = getFilePathsByDirectory('blog-posts');
  const scholarships = getFilePathsByDirectory('scholarships');
  const allPaths = [...blogPosts, ...scholarships];

  return allPaths;
}

export default async function DynamicContentPage({ params }) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return notFound();
  }

  // The first part of the slug is the category name (e.g., 'blog-posts').
  const category = getDirectoryFromSlug(slug);

  if (!category) {
    return notFound();
  }

  const slugString = slug.slice(1).join('/'); // Rejoin the rest of the path

  const post = await getContentBySlug(category, slugString);

  if (!post) {
    return notFound();
  }

  // Content is already processed by getContentBySlug
  const contentHtml = post.content;

  return (
    <div className="container mx-auto px-6 py-12">
      <article className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.frontMatter.title}</h1>
        {post.frontMatter.description && (
          <p className="text-xl text-gray-600 mb-8">{post.frontMatter.description}</p>
        )}
        {/* Render other frontmatter fields as needed */}
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </div>
  );
}