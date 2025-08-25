import Link from 'next/link';
import { getAllContent } from '../../lib/markdown';

export default function HealthWellness() {
  const posts = getAllContent('health-wellness');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Health & Wellness</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Prioritize your well-being with comprehensive health and wellness resources.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {post.frontMatter.category && (
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                      {post.frontMatter.category}
                    </span>
                  )}
                  {post.frontMatter.readTime && (
                    <span className="text-gray-500 text-sm ml-auto">{post.frontMatter.readTime}</span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-blue-600">
                  <Link href={`/${post.frontMatter.category}/${post.slug}`}>
                    {post.frontMatter.title}
                  </Link>
                </h2>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.frontMatter.description}
                </p>

                <div className="flex items-center justify-between">
                  {post.frontMatter.date && (
                    <span className="text-gray-500 text-sm">{new Date(post.frontMatter.date).toLocaleDateString()}</span>
                  )}
                  <Link 
                    href={`/${post.frontMatter.category}/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No content found in this category.</p>
        )}
      </div>
    </div>
  );
}