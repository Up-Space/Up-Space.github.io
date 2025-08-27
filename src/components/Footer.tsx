'use client';

import Link from 'next/link';
import Image from 'next/image'; // Import the Image component

export default function Footer() {
  const footerLinks = {
    'Resources': [
      { name: 'Blog Posts', href: '/blog-posts' },
      { name: 'Scholarships', href: '/scholarships' },
      { name: 'Coding Courses', href: '/coding-courses' },
      { name: 'Job Board', href: '/job-board' }
    ],
    'Categories': [
      { name: 'Career Advancement', href: '/career-advancement' },
      { name: 'Personal Development', href: '/personal-development' },
      { name: 'Health & Wellness', href: '/health-wellness' },
      { name: 'Technology', href: '/technology' }
    ],
    'Support': [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/message/TIAXAJNGMFRDH1',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/scholarsspace',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/scholars-space',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/scholarsspace',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986s11.987-5.368 11.987-11.986C24.014 5.367 18.635.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.324-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.417-3.325c.876-.876 2.027-1.416 3.324-1.416s2.448.54 3.325 1.416c.876.877 1.416 2.028 1.416 3.325s-.54 2.448-1.416 3.324c-.877.807-2.028 1.217-3.325 1.217zm7.441-9.317c-.507 0-.916-.41-.916-.917 0-.506.409-.916.916-.916.507 0 .917.41.917.916 0 .507-.41.917-.917.917zm-7.441 7.441c.876 0 1.657-.35 2.231-.916.565-.566.916-1.355.916-2.231 0-.876-.351-1.666-.916-2.232-.574-.565-1.355-.915-2.231-.915-.877 0-1.666.35-2.232.915-.565.566-.915 1.356-.915 2.232 0 .876.35 1.665.915 2.231.566.566 1.355.916 2.232.916z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center justify-center lg:justify-start mb-6">
                <Image 
                  src="/logo.png"
                  alt="Scholars Space Logo"
                  width={120}
                  height={30}
                  className="w-30 h-auto"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </Link>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering students and professionals worldwide with curated resources for academic success and career advancement.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold mb-3 text-gray-200">Stay Updated</h4>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  const email = e.target.email.value;
                  window.location.href = `mailto:hello.scholarsspace@outlook.com?subject=Newsletter Subscription&body=Please subscribe ${email} to your newsletter.`;
                }} className="flex">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
                  />
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-r-lg font-medium transition-all duration-200">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-lg font-semibold mb-6 text-white">{title}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-200 hover:underline"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright and License */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-gray-400 text-sm">
              <p>© 2024 Scholars Space. All rights reserved.</p>
              <div className="flex items-center space-x-1">
                <span>Licensed under</span>
                <Link 
                  href="https://opensource.org/licenses/MIT" 
                  className="text-blue-400 hover:text-blue-300 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MIT License
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 hover:scale-105"
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              Questions or feedback? Reach us at{' '}
              <a 
                href="mailto:hello.scholarsspace@outlook.com" 
                className="text-blue-400 hover:text-blue-300 underline"
              >
                hello.scholarsspace@outlook.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

