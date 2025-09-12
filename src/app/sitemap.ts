import { MetadataRoute } from 'next';
import categories from '../../cms/categories.json';
import { getAllContent } from '../lib/cms';

// Use an environment variable for the base URL, with a fallback for development.
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.qspace.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes = [
    '', // Home page
    '/contact',
    '/privacy',
    '/terms',
    '/help',
    '/search',
    '/dashboard',
  ];

  const staticPages = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Category pages from the CMS
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Content pages from all categories
  const contentPages = categories.flatMap(category => {
    try {
      // Correctly fetch content for each specific category
      const categoryContent = getAllContent(category.slug);

      return categoryContent.map(post => {
        return {
          url: `${baseUrl}/${category.slug}/${post.slug}`,
          lastModified: post.frontMatter.date ? new Date(post.frontMatter.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
    } catch (error) {
      console.error(`Error fetching content for category: ${category.slug}`, error);
      return []; // Return an empty array to continue generating the sitemap
    }
  });

  return [...staticPages, ...categoryPages, ...contentPages];
}
