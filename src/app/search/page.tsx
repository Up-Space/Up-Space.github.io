import { getAllContent } from '../../lib/markdown';
import ClientSearchPage from './ClientSearchPage';

export default function SearchPage() {
  const allContent = getAllContent(''); // Server-side fetch
  return <ClientSearchPage allContent={allContent} />;
}
