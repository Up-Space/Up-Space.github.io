import { getAllContent } from '../lib/cms';
import categories from '../../cms/categories.json';
import { stats as homeStats } from '../../cms/stats.json';
import { frontMatter as homePageData } from '../../cms/home-data.md';

const STATS_UPDATE_THRESHOLD = 20;

/**
 * Dynamically fetches and organizes all data needed for the homepage.
 * This function will be called from your homepage component (`src/app/page.tsx`).
 */
export async function getHomePageData() {
  
  // Fetch featured posts and jobs based on slugs defined in the CMS
  const featuredPosts = homePageData.featuredPosts
    .map(slug => getAllContent(slug.category).find(post => post.slug === slug.post))
    .filter(Boolean); // Filter out any posts that weren't found

  const featuredJobs = homePageData.featuredJobs
    .map(slug => getAllContent(slug.category).find(job => job.slug === slug.job))
    .filter(Boolean);
  
  // Calculate stats dynamically from all content
  const totalStats = categories.reduce((acc, category) => {
    const content = getAllContent(category.slug);
    acc[category.slug] = content.length;
    return acc;
  }, {});
  
  const stats = homeStats.map(stat => {
    const dynamicValue = totalStats[stat.icon] || 0;
    // If dynamic count is at or above the threshold, use it. Otherwise, use the CMS value.
    const displayValue = dynamicValue >= STATS_UPDATE_THRESHOLD ? `${dynamicValue}+` : stat.value;
    return {
      ...stat,
      value: displayValue
    };
  });
  
  // Find featured categories based on the slugs in your CMS data
  const featuredCategories = categories.filter(category => homePageData.featuredCategories.includes(category.slug));
  
  return {
    stats,
    featuredCategories,
    featuredPosts,
    featuredJobs,
  };
}
