'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post } from '../../../cms/types'; // Assuming types.ts defines this interface
import categories from '../../../cms/categories.json';

export default function ClientSearchPage({ allContent }: { allContent: Post[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState < Post[] > ([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, []);
  
  const performSearch = (term: string) => {
    setLoading(true);
    setTimeout(() => {
      if (!term.trim()) {
        setResults([]);
      } else {
        const filteredResults = allContent.filter(item =>
          item.frontMatter.title?.toLowerCase().includes(term.toLowerCase()) ||
          item.frontMatter.description?.toLowerCase().includes(term.toLowerCase())
        );
        setResults(filteredResults);
      }
      setLoading(false);
    }, 500);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchTerm);
    window.history.pushState({}, '', `/search?q=${encodeURIComponent(searchTerm)}`);
  };
  
  const typeColors: Record < string, string > = {
    "blog-posts": "bg-blue-100 text-blue-800",
    "scholarships": "bg-green-100 text-green-800",
    "coding-courses": "bg-orange-100 text-orange-800",
    "reviews": "bg-purple-100 text-purple-800",
    "personal-development": "bg-yellow-100 text-yellow-800",
  };

  const getCategoryTitle = (slug: string) => {
    const category = categories.find(cat => cat.slug === slug);
    return category ? category.title : slug;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Results</h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles, scholarships, jobs, and more..."
                className="w-full pl-12 pr-16 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Searching...</p>
          </div>
        )}

        {/* Search Results */}
        {!loading && searchTerm && (
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-semibold">{results.length}</span> results for "{searchTerm}"
            </p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-6">
            {results.map((result) => (
              <div key={result.slug} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[result.category] || 'bg-gray-100 text-gray-800'}`}>
                        {getCategoryTitle(result.category)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600">
                      <Link href={`/${result.category}/${result.slug}`}>
                        {result.frontMatter.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{result.frontMatter.description}</p>
                  </div>
                </div>
                <Link
                  href={`/${result.category}/${result.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && searchTerm && results.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search terms or browse our categories below.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/blog-posts" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Browse Articles
              </Link>
              <Link href="/scholarships" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                Find Scholarships
              </Link>
              <Link href="/job-board" className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                View Jobs
              </Link>
            </div>
          </div>
        )}

        {!loading && !searchTerm && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Popular Searches</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['study tips', 'scholarships', 'resume', 'javascript', 'internships', 'career advice'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    performSearch(term);
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
