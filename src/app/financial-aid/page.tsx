import Link from 'next/link';
import { getAllContent } from '../../lib/markdown';

export default function FinancialAid() {
  const aids = getAllContent('financial-aid');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Financial Aid</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find comprehensive information about financial aid opportunities, grants, and funding options.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aids.length > 0 ? (
          aids.map((aid) => (
            <article key={aid.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">{aid.frontMatter.title}</h2>
                <p className="text-gray-600 mb-4">{aid.frontMatter.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Amount: {aid.frontMatter.amount || 'Varies'}</span>
                  <Link
                    href={`/${aid.frontMatter.category}/${aid.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No financial aid information found in this category.</p>
        )}
      </div>
    </div>
  );
}