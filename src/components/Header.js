'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Image component

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const mainMenuItems = [
    { title: 'Blog Posts', href: '/blog-posts' },
    { title: 'Career Advancement', href: '/career-advancement' },
    { title: 'Scholarships', href: '/scholarships' },
    { title: 'Personal Development', href: '/personal-development' },
    { title: 'Coding Courses', href: '/coding-courses' },
    { title: 'Job Board', href: '/job-board' },
    { title: 'Health & Wellness', href: '/health-wellness' },
  ];

  const moreTopics = [
    { title: 'Education', href: '/education' },
    { title: 'Ebooks', href: '/ebooks' },
    { title: 'Lifestyle', href: '/lifestyle' },
    { title: 'Reviews', href: '/reviews' },
    { title: 'Creative Skills', href: '/creative-skills' },
    { title: 'Technology', href: '/technology' },
    { title: 'Financial Aid', href: '/financial-aid' },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <Image
              src="/logo.png" // Use the path to your image in the public folder
              alt="Scholars Scribe Logo"
              width={40} // Adjust width and height based on your logo's dimensions
              height={40} // The original SVG container was 40x40px (w-10 h-10)
              className="w-10 h-10 group-hover:scale-105 transition-transform"
            />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Scholars Scribe
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Academic Excellence Hub</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainMenuItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                {item.title}
              </Link>
            ))}
            
            {/* More Topics Dropdown */}
            <div className="relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'more' ? null : 'more')}
                className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
              >
                More Topics
                <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${activeDropdown === 'more' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {activeDropdown === 'more' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <div className="grid grid-cols-1 gap-1 px-2">
                    {moreTopics.map((topic) => (
                      <Link
                        key={topic.href}
                        href={topic.href}
                        className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {topic.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Search and Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Bar */}
            <form onSubmit={(e) => {
              e.preventDefault();
              const searchTerm = e.target.search.value.trim();
              if (searchTerm) {
                window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
              }
            }} className="relative">
              <input
                name="search"
                type="text"
                placeholder="Search articles..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all duration-200"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
            
            {/* Dashboard Button */}
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {/* Mobile Search */}
              <form onSubmit={(e) => {
                e.preventDefault();
                const searchTerm = e.target.search.value.trim();
                if (searchTerm) {
                  window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
                  setIsMenuOpen(false);
                }
              }} className="relative mb-4">
                <input
                  name="search"
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-4 h-4 text-gray-400 hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </form>

              {/* Mobile Navigation Links */}
              {mainMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
              
              {/* More Topics in Mobile */}
              <div className="border-t border-gray-100 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  More Topics
                </div>
                {moreTopics.map((topic) => (
                  <Link
                    key={topic.href}
                    href={topic.href}
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {topic.title}
                  </Link>
                ))}
              </div>
              
              {/* Mobile Dashboard Button */}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay for dropdown */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}
    </header>
  );
}
