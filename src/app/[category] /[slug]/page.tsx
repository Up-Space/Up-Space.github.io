import { notFound } from "next/navigation";
import categories from "@/cms/categories.json";
import { getContentBySlug } from "@/lib/markdown";

interface Params {
  params: {
    category: string;
    slug: string;
  };
}

export default async function PostPage({ params }: Params) {
  const { category, slug } = params;

  const matchedCategory = categories.find((cat) => cat.slug === category);
  if (!matchedCategory) return notFound();

  const post = await getContentBySlug(matchedCategory.folder, slug);
  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <article className="prose prose-lg">
        <h1 className="text-4xl font-bold mb-4">{post.frontMatter.title}</h1>

        {post.frontMatter.description && (
          <p className="text-xl text-gray-600 mb-6">
            {post.frontMatter.description}
          </p>
        )}

        {/* Optional: Display image if available */}
        {post.frontMatter.image && (
          <img
            src={post.frontMatter.image}
            alt={post.frontMatter.title}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        {/* Full HTML content */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Optional: Display attachment link */}
        {post.frontMatter.attachment && (
          <div className="mt-8">
            <a
              href={post.frontMatter.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download Attachment
            </a>
          </div>
        )}
      </article>
    </main>
  );
}