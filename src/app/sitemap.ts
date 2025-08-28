
import { MetadataRoute } from 'next';
import categories from '../../cms/categories.json';
import { getAllContent } from '../lib/markdown';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://scholars-space.replit.app';
  
  // Static pages
  const staticPages = [
    '',
    '/contact',
    '/privacy',
    '/terms',
    '/help',
    '/search',
    '/dashboard',
    '/reviews'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Category pages
  const categoryPages = categories.map(category => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Content pages
  const contentPages: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: 'weekly';
    priority: number;
  }> = [];

  categories.forEach(category => {
    try {
      const posts = getAllContent(category.slug);
      posts.forEach(post => {
        contentPages.push({
          url: `${baseUrl}/${category.slug}/${post.slug}`,
          lastModified: post.frontMatter.date ? new Date(post.frontMatter.date) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.7,
        });
      });
    } catch (error) {
      console.error(`Error generating sitemap for category ${category.slug}:`, error);
    }
  });

  return [...staticPages, ...categoryPages, ...contentPages];
}
