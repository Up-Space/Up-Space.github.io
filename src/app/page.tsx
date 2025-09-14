import Link from 'next/link';
import Image from 'next/image';
import Header from '@/src/components/Header';
import { getHomePageData } from '@/src/data/homeData';
import { StatCard } from '@/src/components/StatCard';
import { CategoryCard } from '@/src/components/CategoryCard';
import allCategories from '../../cms/categories.json';

// Metadata for the page, updated with the new brand name
export const metadata = {
  title: 'UpSpace | Your Hub for Digital, Tech & Career Growth',
  description: 'Discover resources, master new digital skills, and accelerate your academic and professional journey with curated content and opportunities.',
};

// This is a server component, indicated by the 'async' keyword
export default async function HomePage() {
  // Fetch all necessary data for the page in one call
  const { stats, featuredCategories, featuredPosts, featuredJobs } = await getHomePageData();
  
  return (
    <div className="min-h-screen">
      <Header categories={allCategories} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                Your Space to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Build, Grow,
                </span>{' '}
                and{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Lead
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-body text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Discover digital skills, master new technologies, and accelerate your academic and professional journey with curated resources designed for success.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/coding-courses"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg text-center"
                >
                  Browse Courses
                </Link>
                <Link
                  href="/digital-skills"
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500 text-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-200 text-center"
                >
                  Explore Digital Skills
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl transform rotate-6 opacity-20"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-6 lg:p-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                  <div className="text-center space-y-6">
                    <div>
                      <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">{stats[0].value}</div>
                      <div className="text-sm lg:text-base text-gray-600">{stats[0].title}</div>
                    </div>
                    <div>
                      <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-1">{stats[4].value}</div>
                      <div className="text-sm lg:text-base text-gray-600">{stats[4].title}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-12">
            {stats.map((stat) => (
              <StatCard key={stat.icon} title={stat.title} value={stat.value} icon={stat.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Explore Our Categories
            </h2>
            <p className="text-lg sm:text-xl font-body text-gray-600 max-w-3xl mx-auto px-4">
              Discover curated resources across multiple domains to support your academic and professional growth.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {featuredCategories.map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Posts */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900">Trending Blog Posts</h2>
            <Link href="/blog-posts" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
              View All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.map((post) => (
              <Link key={post.slug} href={`/${post.category}/${post.slug}`} className="group">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-100">
                  {post.frontMatter.image && (
                    <div className="relative h-48 rounded-t-2xl overflow-hidden">
                      <Image
                        src={post.frontMatter.image}
                        alt={post.frontMatter.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 sm:p-8">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">{post.frontMatter.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base font-body leading-relaxed">{post.frontMatter.excerpt}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-gray-900">Featured Job Opportunities</h2>
            <Link href="/job-board" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200">
              View All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredJobs.map((job) => (
              <div key={job.slug} className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-2">
                <div className="flex items-start mb-4">
                  {job.frontMatter.companyLogo && (
                    <Image
                      src={job.frontMatter.companyLogo}
                      alt={`${job.frontMatter.company} logo`}
                      width={48}
                      height={48}
                      className="rounded-full mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-1">{job.frontMatter.title}</h3>
                    <p className="text-gray-600 text-sm font-body">{job.frontMatter.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 font-body mb-4">{job.frontMatter.location}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {job.frontMatter.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 font-body font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/${job.category}/${job.slug}`}
                  className="mt-6 inline-block text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                >
                  Apply Now →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 sm:mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg sm:text-xl font-body text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Join thousands of students and professionals who are already accelerating their success with UpSpace.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
            <Link
              href="/dashboard"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
