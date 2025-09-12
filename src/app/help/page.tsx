export default function HelpCenter() {
  const helpCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      description: "Learn the basics of using QSpace",
      articles: [
        "How to create your first account",
        "Navigating the dashboard",
        "Setting up your profile",
        "Understanding our categories"
      ]
    },
    {
      title: "Scholarships",
      icon: "🎓",
      description: "Find and apply for funding opportunities",
      articles: [
        "How to search for scholarships",
        "Application tips and best practices",
        "Understanding eligibility requirements",
        "Tracking your applications"
      ]
    },
    {
      title: "Career Resources",
      icon: "💼",
      description: "Advance your professional journey",
      articles: [
        "Using the job board effectively",
        "Building a strong resume",
        "Interview preparation guides",
        "Networking strategies"
      ]
    },
    {
      title: "Learning & Courses",
      icon: "📚",
      description: "Make the most of educational content",
      articles: [
        "Accessing coding courses",
        "Progress tracking",
        "Certificate programs",
        "Study group features"
      ]
    }
  ];

  const faqs = [
    {
      question: "Is QSpace free to use?",
      answer: "Yes! QSpace is completely free to use. We believe in making educational resources accessible to everyone. Some premium features may be introduced in the future, but our core content will always remain free."
    },
    {
      question: "How often is new content added?",
      answer: "We add new articles, scholarships, and opportunities daily. Our team of education professionals curates fresh content to ensure you have access to the latest information and opportunities."
    },
    {
      question: "Can I contribute content to QSpace?",
      answer: "Absolutely! We welcome contributions from experts, educators, and students. You can submit articles, share scholarship opportunities, or suggest improvements through our contact form."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on the 'Forgot Password' link on the login page, enter your email address, and we'll send you instructions to reset your password securely."
    },
    {
      question: "Are the scholarships listed legitimate?",
      answer: "Yes, all scholarships on our platform are verified by our team. We thoroughly research each opportunity to ensure they are legitimate and current. However, always verify details independently before applying."
    },
    {
      question: "How can I stay updated with new opportunities?",
      answer: "Subscribe to our newsletter in the footer, follow us on social media, or enable notifications in your dashboard settings to receive alerts about new scholarships and opportunities."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Help Center</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions and learn how to make the most of QSpace
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help articles..."
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {helpCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="text-4xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <ul className="space-y-2">
                {category.articles.map((article, articleIndex) => (
                  <li key={articleIndex}>
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-sm hover:underline">
                      {article}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
            <p className="text-blue-100 mb-6">Our support team is here to assist you with any questions</p>
            <a href="/contact" className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200">
              Contact Support
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
