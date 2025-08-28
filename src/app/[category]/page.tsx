
import { notFound } from "next/navigation";
import categories from "@/cms/categories.json";
import { getAllContent } from "@/lib/markdown";
import Link from "next/link";

interface Params {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: Params) {
  const { category } = params;
  
  const matchedCategory = categories.find((cat) => cat.slug === category);
  if (!matchedCategory) return notFound();
  
  const posts = getAllContent(matchedCategory.folder);
  
  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold">{matchedCategory.title}</h1>
        <p className="mt-2 text-gray-600">{matchedCategory.description}</p>
        <img
          src={matchedCategory.coverImage}
          alt={matchedCategory.title}
          className="mt-6 w-full h-64 object-cover rounded-lg"
        />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/${category}/${post.slug}`}
            className="block border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
          >
            {/* Cover Image */}
            {post.frontMatter.cover_image && (
              <img
                src={post.frontMatter.cover_image}
                alt={post.frontMatter.title}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Card Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                {post.frontMatter.title}
              </h2>
              {post.frontMatter.description && (
                <p className="text-gray-500 text-sm">
                  {post.frontMatter.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
