
export default function Privacy() {
  const lastUpdated = "January 15, 2024";

  const sections = [
    {
      title: "Information We Collect",
      content: [
        "Personal information you provide (name, email, educational background)",
        "Usage data and analytics to improve our services",
        "Device information and browser details",
        "Cookies and similar tracking technologies"
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our educational services",
        "To send you relevant scholarship and career opportunities",
        "To personalize your learning experience",
        "To communicate important updates and notifications"
      ]
    },
    {
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "Scholarship providers may receive basic information when you apply",
        "Service providers who help us operate the platform",
        "Legal compliance when required by law"
      ]
    },
    {
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission",
        "Secure servers and regular security audits",
        "Limited access to personal information",
        "Regular data backups and recovery procedures"
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access and review your personal information",
        "Request corrections to inaccurate data",
        "Delete your account and associated data",
        "Opt-out of marketing communications"
      ]
    },
    {
      title: "Cookies and Tracking",
      content: [
        "Essential cookies for platform functionality",
        "Analytics cookies to understand user behavior",
        "Marketing cookies for relevant advertisements",
        "Third-party cookies from integrated services"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {lastUpdated}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            At Scholars Scribe, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our educational platform and services.
          </p>
          <p className="text-gray-600 leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            We encourage you to read this policy carefully and contact us if you have any questions.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white mt-12">
          <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
          <p className="text-blue-100 mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to reach out to our privacy team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Contact Us
            </a>
            <a 
              href="mailto:privacy@scholarsscribe.com" 
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              privacy@scholarsscribe.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
