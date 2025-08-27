import { featuredCategories } from "@/data/homeData";
import { notFound } from "next/navigation";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = featuredCategories.find(cat =>
    cat.title.toLowerCase().replace(/\s+/g, "-") === params.slug
  );

  if (!category) return notFound();

  return (
    <main className="py-20 px-6">
      <h1 className="text-4xl font-bold mb-4">{category.title}</h1>
      <p className="text-lg text-gray-600">{category.description}</p>

      {/* You can add more content here later */}
    </main>
  );
}