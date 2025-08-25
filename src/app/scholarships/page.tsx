import Link from 'next/link';
import { getAllContent } from '../../lib/markdown';

export default function Scholarships() {
  const scholarships = getAllContent('scholarships');

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Scholarship Opportunities</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find financial aid opportunities to support your educational journey. New scholarships added regularly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {scholarships.length > 0 ? (
          scholarships.map((scholarship) => (
            <div key={scholarship.slug} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2 md:mb-0">
                  {scholarship.frontMatter.title}
                </h2>
                {scholarship.frontMatter.amount && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{scholarship.frontMatter.amount}</div>
                    <div className="text-sm text-gray-500">Award Amount</div>
                  </div>
                )}
              </div>

              <p className="text-gray-600 mb-4">{scholarship.frontMatter.description}</p>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                {scholarship.frontMatter.eligibility && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Eligibility</h4>
                    <p className="text-gray-600">{scholarship.frontMatter.eligibility}</p>
                  </div>
                )}
                {scholarship.frontMatter.deadline && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">Application Deadline</h4>
                    <p className="text-red-600 font-medium">{scholarship.frontMatter.deadline}</p>
                  </div>
                )}
              </div>

              <div className="flex space-x-4">
                <Link 
                  href={`/${scholarship.frontMatter.category}/${scholarship.slug}`}
                  className="bg-blue-600 text-white text-center px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Learn More
                </Link>
                {/* The Apply Now button would likely link to an external site, which should be handled within the markdown file itself */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No scholarships found.</p>
        )}
      </div>
    </div>
  );
}