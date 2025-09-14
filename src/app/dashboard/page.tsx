import Link from 'next/link';

// Mock data to simulate a fetch from an API
const getDashboardData = async () => {
  // In a real application, this would be an API call
  // const res = await fetch('https://api.upspace.com/dashboard');
  // const data = await res.json();
  // return data;

  // Mock data for demonstration
  return {
    userStats: {
      articlesRead: 12,
      coursesCompleted: 3,
      scholarshipsApplied: 5,
      savedItems: 8
    },
    recentActivity: [
      { action: "Read article", item: "Study Tips for Academic Success", date: "2 hours ago" },
      { action: "Bookmarked", item: "Top Scholarship Opportunities", date: "1 day ago" },
      { action: "Completed", item: "Resume Building Course", date: "3 days ago" }
    ],
  };
};

export default async function Dashboard() {
  const { userStats, recentActivity } = await getDashboardData();
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your learning progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-12">
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">{userStats.articlesRead}</div>
          <div className="text-gray-600">Articles Read</div>
        </div>
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">{userStats.coursesCompleted}</div>
          <div className="text-600">Courses Completed</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-yellow-600 mb-2">{userStats.scholarshipsApplied}</div>
          <div className="text-gray-600">Scholarships Applied</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">{userStats.savedItems}</div>
          <div className="text-gray-600">Saved Items</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <div className="font-medium text-gray-800">{activity.action}</div>
                  <div className="text-sm text-gray-600">{activity.item}</div>
                </div>
                <div className="text-sm text-gray-500">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link 
              href="/scholarships"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
            >
              Find New Scholarships
            </Link>
            <Link 
              href="/job-board"
              className="block w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-center font-medium"
            >
              Browse Job Opportunities
            </Link>
            <Link 
              href="/coding-courses"
              className="block w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition-colors text-center font-medium"
            >
              Continue Learning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
