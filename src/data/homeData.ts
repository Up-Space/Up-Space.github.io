import { getAllContent } from '../lib/cms';
import categories from '../../cms/categories.json';
import homeStats from '../../cms/stats.json';
import fs from 'fs/promises'; // Changed to fs/promises for async consistency
import path from 'path';
import matter from 'gray-matter';

const STATS_UPDATE_THRESHOLD = 20;

const contentBaseDir = path.join(process.cwd(), 'content');

/**
 * Read homepage data from CMS markdown file (Made async for consistency)
 */
async function getHomePageData() {
  const homeDataPath = path.join(process.cwd(), 'cms', 'home-data.md');
  // Using await fs.readFile for async consistency
  const fileContents = await fs.readFile(homeDataPath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}

/**
 * Dynamically fetches and organizes all data needed for the homepage.
 * This function will be called from your homepage component (`src/app/page.tsx`).
 */
export async function getHomePageDataForApp() {
  
  // Get home page configuration from CMS
  const homePageData = await getHomePageData(); // Use await here
  
  // Fetch featured posts and jobs based on slugs defined in the CMS
  // Use Promise.all to correctly handle multiple async content fetches
  const featuredPosts = (await Promise.all(
    homePageData.featuredPosts?.map(async (slug: any) => {
      // Await getAllContent inside the map
      const allContent = await getAllContent(path.join(contentBaseDir, slug.category), slug.category);
      return allContent.find(post => post.slug === slug.post);
    }) || []
  )).filter(Boolean);

  const featuredJobs = (await Promise.all(
    homePageData.featuredJobs?.map(async (slug: any) => {
      // Await getAllContent inside the map
      const allContent = await getAllContent(path.join(contentBaseDir, slug.category), slug.category);
      return allContent.find(job => job.slug === slug.job);
    }) || []
  )).filter(Boolean);
  
  // Calculate stats dynamically from all content
  const totalStatsPromises = categories.map(async (category) => { // Map returns promises
    const baseDir = category.slug === 'reviews' ? 'cms' : 'content';
    // Await getAllContent inside the map
    const content = await getAllContent(path.join(process.cwd(), baseDir, category.slug), category.slug);
    return { slug: category.slug, length: content.length };
  });

  const resolvedStats = await Promise.all(totalStatsPromises); // Await all promises
  
  const totalStats: Record<string, number> = resolvedStats.reduce((acc, stat) => {
    acc[stat.slug] = stat.length;
    return acc;
  }, {} as Record<string, number>);
  
  const stats = homeStats.stats.map(stat => {
    const dynamicValue = totalStats[stat.icon] || 0;
    // If dynamic count is at or above the threshold, use it. Otherwise, use the CMS value.
    const displayValue = dynamicValue >= STATS_UPDATE_THRESHOLD ? `${dynamicValue}+` : stat.value;
    return {
      ...stat,
      value: displayValue
    };
  });
  
  // Find featured categories based on the slugs in your CMS data
  const featuredCategories = categories.filter(category => 
    homePageData.featuredCategories?.includes(category.slug)
  );
  
  return {
    stats,
    featuredCategories,
    featuredPosts,
    featuredJobs,
  };
}
