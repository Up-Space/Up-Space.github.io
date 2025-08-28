
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import categories from "../../../cms/categories.json";
import { getAllContent } from "../../lib/markdown";

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  
  const categoryData = categories.find(cat => cat.slug === category);
  
  if (!categoryData) {
    notFound();
  }

  const posts = getAllContent(category);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mr-4">
              <Image
                src={categoryData.icon}
                alt={categoryData.title}
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
              {categoryData.title}
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            {categoryData.description}
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No posts available yet
              </h2>
              <p className="text-gray-600 mb-8">
                We're working on adding great content to this category. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link key={post.slug} href={`/${category}/${post.slug}`}>
                  <article className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {post.frontMatter.title}
                      </h2>
                      {post.frontMatter.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.frontMatter.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.frontMatter.author || 'Anonymous'}</span>
                        <span>
                          {post.frontMatter.date 
                            ? new Date(post.frontMatter.date).toLocaleDateString()
                            : 'No date'
                          }
                        </span>
                      </div>
                      {post.frontMatter.tags && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {post.frontMatter.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
