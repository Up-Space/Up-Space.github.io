import Link from "next/link";
import { StatCard } from "@/components/StatCard";
import { CategoryCard } from "@/components/CategoryCard";
import { stats, featuredCategories } from "@/data/homeData";

export default function HomePage() {
  return (
    <>
      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="py-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl font-bold mb-6">Welcome to Scholars Space</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Your gateway to scholarships, jobs, and global opportunities.
            </p>
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Explore Dashboard
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-12">Featured Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCategories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of ambitious learners and take the next step toward achieving your academic and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/scholarships"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition"
              >
                Discover Scholarships
              </Link>
              <Link
                href="/job-board"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition border border-white/20"
              >
                Browse Opportunities
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}