// This file will now dynamically pull data from your CMS
import { getAllContent } from '../lib/cms';
import categories from '../../cms/categories.json';

// We will fetch the homeData from a new content file in the CMS
// This allows you to manage the homepage content without changing code
import { frontMatter as homePageData } from '../../cms/home-data.md';

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
  
  const stats = [
    { value: `${totalStats['scholarships'] || 0}+`, title: "Active Scholarships", icon: "scholarships" },
    { value: `${totalStats['coding-courses'] || 0}+`, title: "Coding Courses", icon: "coding-courses" },
    { value: `${totalStats['job-board'] || 0}+`, title: "Job Opportunities", icon: "job-board" },
    { value: `${totalStats['digital-skills'] || 0}+`, title: "Digital Resources", icon: "digital-skills" },
    { value: `${totalStats['blog-posts'] || 0}+`, title: "Blog Posts", icon: "blog-posts" },
  ];
  
  // Find featured categories based on the slugs in your CMS data
  const featuredCategories = categories.filter(category => homePageData.featuredCategories.includes(category.slug));
  
  return {
    stats,
    featuredCategories,
    featuredPosts,
    featuredJobs,
  };
}
