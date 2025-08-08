import { getAllContent } from '../../../lib/markdown'; // Assuming this function is modified to get all content
import ClientSearchPage from './page';

// This is a server component wrapper
export default function SearchLayout({ children }) {
  // You would need a new function in markdown.js that fetches from all directories
  // For example:
  // const allContent = getAllPosts();
  
  return (
    // You would pass the fetched content here as a prop
    // <ClientSearchPage allContent={allContent}>
    <ClientSearchPage>
      {children}
    </ClientSearchPage>
  );
}
