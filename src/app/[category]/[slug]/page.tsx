import { notFound } from "next/navigation";
import { MDXRemote } from 'next-mdx-remote/rsc';
import categories from "../../../../cms/categories.json";
import { getContentBySlug } from "../../../lib/markdown";
import MDXContentProvider from "../../../components/MDXProvider";

interface Params {
  params: {
    category: string;
    slug: string;
  };
}

export default async function PostPage({ params }: Params) {
  const { category, slug } = params;

  // The slug parameter already gives us the folder we need.
  const post = await getContentBySlug(category, slug);
  if (!post) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">
            {post.frontMatter.title}
          </h1>

          {post.frontMatter.description && (
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {post.frontMatter.description}
            </p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
            {post.frontMatter.author && (
              <span>By {post.frontMatter.author}</span>
            )}
            {post.frontMatter.date && (
              <span>{new Date(post.frontMatter.date).toLocaleDateString()}</span>
            )}
            {(post.frontMatter.duration || post.frontMatter.reading_time) && (
              <span>{post.frontMatter.duration || post.frontMatter.reading_time} read</span>
            )}
          </div>

          {post.frontMatter.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.frontMatter.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Cover Image */}
        {(post.frontMatter.cover_image || post.frontMatter.featured_image) && (
          <img
            src={post.frontMatter.cover_image || post.frontMatter.featured_image}
            alt={post.frontMatter.title}
            className="w-full h-64 object-cover rounded-lg mb-8"
          />
        )}

        {/* MDX Content */}
        <MDXContentProvider>
          <div className="mdx-content">
            <MDXRemote source={post.content} />
          </div>
        </MDXContentProvider>

        {/* Attachment Link */}
        {post.frontMatter.attachment && (
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <a
              href={post.frontMatter.attachment}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              📎 Download Attachment
            </a>
          </div>
        )}

        {/* Application Link for Scholarships */}
        {post.frontMatter.application_link && (
          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <a
              href={post.frontMatter.application_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              🎓 Apply Now
            </a>
          </div>
        )}
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  const categoriesSlugs = categories.map((cat) => cat.slug);
  let params: { category: string; slug: string }[] = [];

  for (const categorySlug of categoriesSlugs) {
    const posts = await getAllPostsInCategory(categorySlug);
    const categoryParams = posts.map((post) => ({
      category: categorySlug,
      slug: post.slug,
    }));
    params = params.concat(categoryParams);
  }

  return params;
}

export async function generateMetadata({ params }: Params) {
  const { category, slug } = params;
  const post = await getContentBySlug(category, slug);

  if (!post) {
    return {
      title: "Content Not Found",
    };
  }

  // Get canonical URL from categories.json, fall back to default if not found
  const matchedCategory = categories.find(cat => cat.slug === category);
  const canonicalUrl = matchedCategory?.canonicalUrl || `/${category}/${slug}`;

  return {
    title: `${post.frontMatter.title} - QSpace`,
    description: post.frontMatter.description || "A resource from QSpace",
    openGraph: {
      title: `${post.frontMatter.title}`,
      description: post.frontMatter.description || "A resource from QSpace",
      type: "article",
      url: `https://your-website.com${canonicalUrl}`,
      images: [
        {
          url: post.frontMatter.featured_image || post.frontMatter.cover_image,
          alt: post.frontMatter.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.frontMatter.title}`,
      description: post.frontMatter.description || "A resource from QSpace",
      image: post.frontMatter.featured_image || post.frontMatter.cover_image,
    },
    alternates: {
      canonical: canonicalUrl,
    }
  };
}
