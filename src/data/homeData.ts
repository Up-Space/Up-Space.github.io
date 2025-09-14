import { getAllContent } from '../lib/cms';
import categories from '../../cms/categories.json';
import homeStats from '../../cms/stats.json';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const STATS_UPDATE_THRESHOLD = 20;

/**
 * Read homepage data from CMS markdown file
 */
function getHomePageData() {
  const homeDataPath = path.join(process.cwd(), 'cms', 'home-data.md');
  const fileContents = fs.readFileSync(homeDataPath, 'utf8');
  const { data } = matter(fileContents);
  return data;
}

/**
 * Dynamically fetches and organizes all data needed for the homepage.
 * This function will be called from your homepage component (`src/app/page.tsx`).
 */
export async function getHomePageDataForApp() {
  
  // Get home page configuration from CMS
  const homePageData = getHomePageData();
  
  // Fetch featured posts and jobs based on slugs defined in the CMS
  const featuredPosts = homePageData.featuredPosts
    ?.map((slug: any) => getAllContent(slug.category).find(post => post.slug === slug.post))
    .filter(Boolean) || []; // Filter out any posts that weren't found

  const featuredJobs = homePageData.featuredJobs
    ?.map((slug: any) => getAllContent(slug.category).find(job => job.slug === slug.job))
    .filter(Boolean) || [];
  
  // Calculate stats dynamically from all content
  const totalStats: Record<string, number> = categories.reduce((acc, category) => {
    const content = getAllContent(category.slug);
    acc[category.slug] = content.length;
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
