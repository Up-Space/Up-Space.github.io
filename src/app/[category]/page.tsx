import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import categories from "../../../cms/categories.json";
import { getAllPostsInCategory } from "../../lib/markdown";

interface Params {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: Params) {
  const { category } = params;

  const matchedCategory = categories.find((cat) => cat.slug === category);
  if (!matchedCategory) return notFound();

  const posts = await getAllPostsInCategory(matchedCategory.folder);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <Image
                  src={matchedCategory.icon}
                  alt={matchedCategory.title}
                  width={40}
                  height={40}
                  className="w-10 h-1-0"
                />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {matchedCategory.title}
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {matchedCategory.description}
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                No content available yet
              </h2>
              <p className="text-gray-600">
                We're working on adding great content to this category. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${category}/${post.slug}`}
                  className="group"
                >
                  <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
                    {(post.frontMatter.featured_image || post.frontMatter.cover_image) && (
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={post.frontMatter.featured_image || post.frontMatter.cover_image}
                          alt={post.frontMatter.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        {post.frontMatter.date && (
                          <span>{new Date(post.frontMatter.date).toLocaleDateString()}</span>
                        )}
                        {(post.frontMatter.duration || post.frontMatter.reading_time) && (
                          <>
                            <span className="mx-2">•</span>
                            <span>{post.frontMatter.duration || post.frontMatter.reading_time}</span>
                          </>
                        )}
                      </div>
                      
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {post.frontMatter.title}
                      </h2>
                      
                      {post.frontMatter.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.frontMatter.description}
                        </p>
                      )}
                      
                      {post.frontMatter.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.frontMatter.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {post.frontMatter.author && (
                          <span className="text-sm text-gray-500">
                            By {post.frontMatter.author}
                          </span>
                        )}
                        
                        <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                          Read more →
                        </span>
                      </div>
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

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: Params) {
  const { category } = params;
  const matchedCategory = categories.find((cat) => cat.slug === category);
  
  if (!matchedCategory) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${matchedCategory.title} - QSpace`,
    description: matchedCategory.description,
  };
}
