
export default function Terms() {
  const lastUpdated = "January 15, 2024";
  const effectiveDate = "January 1, 2024";

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing and using Scholars Scribe, you accept and agree to be bound by the terms and provision of this agreement. These Terms of Service apply to all visitors, users, and others who access or use the service."
    },
    {
      title: "Description of Service",
      content: "Scholars Scribe provides educational resources, scholarship information, career guidance, and learning materials through our web platform. Our service includes articles, courses, job boards, and other educational content designed to support academic and professional development."
    },
    {
      title: "User Accounts",
      content: "When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for keeping your account information current. You are fully responsible for all activities that occur under your account."
    },
    {
      title: "Acceptable Use",
      content: "You may use our service only for lawful purposes and in accordance with these Terms. You agree not to use the service to transmit, distribute, store or destroy material that could constitute or encourage conduct that would be considered a criminal offense, give rise to civil liability, or otherwise violate any law or regulation."
    },
    {
      title: "Content and Intellectual Property",
      content: "The service and its original content, features, and functionality are and will remain the exclusive property of Scholars Scribe and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks may not be used without our express written permission."
    },
    {
      title: "User-Generated Content",
      content: "You retain any and all of your rights to any content you submit, post or display on or through the service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, copy, reproduce, process, adapt, modify, publish, transmit, display and distribute such content."
    },
    {
      title: "Prohibited Activities",
      content: "Users may not engage in activities that violate these terms, including but not limited to: harassment of other users, posting false or misleading information, attempting to gain unauthorized access to our systems, or using automated tools to access our service without permission."
    },
    {
      title: "Privacy Policy",
      content: "Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices regarding the collection and use of your personal information."
    },
    {
      title: "Disclaimers",
      content: "The information on this service is provided on an 'as is' basis. To the fullest extent permitted by law, we exclude all representations, warranties, obligations, and liabilities arising out of or in connection with your use of this service."
    },
    {
      title: "Limitation of Liability",
      content: "In no event shall Scholars Scribe, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses."
    },
    {
      title: "Termination",
      content: "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms."
    },
    {
      title: "Changes to Terms",
      content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <div className="text-lg text-gray-600 space-y-1">
            <p>Last updated: {lastUpdated}</p>
            <p>Effective date: {effectiveDate}</p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Scholars Scribe</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of our website located at scholarsscribe.com 
            (the "Service") operated by Scholars Scribe ("us", "we", or "our").
          </p>
          <p className="text-gray-600 leading-relaxed">
            Please read these Terms of Service carefully before using our Service. By accessing or using our Service, 
            you agree to be bound by these Terms. If you disagree with any part of these terms, 
            then you may not access the Service.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{index + 1}. {section.title}</h3>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white mt-12">
          <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
          <p className="text-purple-100 mb-6">
            If you have any questions about these Terms of Service, please contact us. 
            We're here to help clarify any concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              Contact Us
            </a>
            <a 
              href="mailto:legal@scholarsscribe.com" 
              className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              legal@scholarsscribe.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
