import { getAllPosts } from '../../lib/markdown';
import ClientSearchPage from './ClientSearchPage';

export default function SearchPage() {
  const allContent = getAllPosts(); // Server-side fetch
  return <ClientSearchPage allContent={allContent} />;
}