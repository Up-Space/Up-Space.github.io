import Link from 'next/link';
import { getAllContent } from '../../lib/markdown';

export default function JobBoard() {
  const jobs = getAllContent('job-board');

  const typeColors = {
    "Internship": "bg-blue-100 text-blue-800",
    "Full-time": "bg-green-100 text-green-800",
    "Part-time": "bg-yellow-100 text-yellow-800",
    "Contract": "bg-purple-100 text-purple-800"
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Job Board</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover exciting career opportunities from companies that value talent and growth. 
          Find your next opportunity here.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div key={job.slug} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{job.frontMatter.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    {job.frontMatter.company && (
                      <span className="text-lg font-semibold text-blue-600">{job.frontMatter.company}</span>
                    )}
                    {job.frontMatter.location && (
                      <span className="text-gray-600">{job.frontMatter.location}</span>
                    )}
                    {job.frontMatter.type && (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[job.frontMatter.type]}`}>
                        {job.frontMatter.type}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right mt-4 md:mt-0">
                  {job.frontMatter.salary && (
                    <div className="text-xl font-bold text-green-600">{job.frontMatter.salary}</div>
                  )}
                  {job.frontMatter.posted && (
                    <div className="text-sm text-gray-500">Posted {job.frontMatter.posted}</div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 mb-4">{job.frontMatter.description}</p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${job.frontMatter.category}/${job.slug}`} className="bg-blue-600 text-white text-center px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </Link>
                {/* Other buttons like Apply Now, Save Job, Share would link to dynamic pages or use external services */}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No jobs found in this category.</p>
        )}
      </div>

      {/* The load more button is a placeholder, as this would require more advanced fetching logic */}
      <div className="text-center mt-12">
        <button className="bg-yellow-400 text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
          Load More Jobs
        </button>
      </div>
    </div>
  );
}