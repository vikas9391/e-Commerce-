const TermsOfService = () => {
  const sections = [
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: '1. Acceptance of Terms',
      text: 'By accessing or using the MediCare platform (website or mobile application), you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and customers of MediCare.',
    },
    {
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      title: '2. Account Registration',
      text: 'To place orders, you must create a MediCare account. You agree to provide accurate, complete, and current information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. MediCare reserves the right to suspend or terminate accounts that provide false information or violate these terms.',
    },
    {
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      title: '3. Prescription Requirements',
      text: 'MediCare is a licensed online pharmacy operating in compliance with Indian pharmacy regulations. Prescription medicines may only be dispensed against a valid prescription issued by a registered medical practitioner. By uploading a prescription, you confirm that it is genuine and has been issued to you by a licensed doctor. Submitting a forged or invalid prescription is a criminal offence and will result in immediate account termination and reporting to relevant authorities.',
    },
    {
      icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
      title: '4. Product Information & Availability',
      text: 'We make every effort to ensure product descriptions, prices, and availability information are accurate. However, errors may occasionally occur. MediCare reserves the right to correct any inaccuracies and to cancel orders where products are mispriced or unavailable. Product images are for illustrative purposes and actual packaging may vary. All medicines are dispensed strictly as per the manufacturer\'s original packaging.',
    },
    {
      icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z',
      title: '5. Pricing & Payment',
      text: 'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes. Prices are subject to change without prior notice. Payment must be completed at the time of order placement for online payment methods. For Cash on Delivery (COD) orders, payment is due at the time of delivery. MediCare is not responsible for any additional bank charges, international transaction fees, or currency conversion fees.',
    },
    {
      icon: 'M13 10V3L4 14h7v7l9-11h-7z',
      title: '6. Delivery',
      text: 'Delivery timelines are estimates and not guaranteed. MediCare shall not be liable for delays caused by factors beyond our control, including natural disasters, strikes, government restrictions, or courier network disruptions. Risk of loss or damage passes to you upon delivery. Please refer to our Shipping Policy for detailed information on delivery timeframes and procedures.',
    },
    {
      icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
      title: '7. Returns & Refunds',
      text: 'Returns are accepted within 7 days of delivery for eligible products as described in our Return Policy. Prescription medicines are non-returnable once dispensed. Refunds are processed to the original payment method within 3–7 business days of return approval. MediCare reserves the right to refuse returns that do not comply with our Return Policy.',
    },
    {
      icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
      title: '8. Medical Disclaimer',
      text: 'MediCare is a pharmacy platform and not a medical consultation service. The information provided on our platform, including product descriptions and health content, is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before starting, stopping, or changing any medication. MediCare is not liable for any adverse effects resulting from self-medication.',
    },
    {
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      title: '9. Intellectual Property',
      text: 'All content on the MediCare platform, including but not limited to logos, trademarks, text, graphics, images, and software, is the intellectual property of MediCare or its licensors. You may not reproduce, distribute, modify, or create derivative works without our express written permission.',
    },
    {
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      title: '10. Limitation of Liability',
      text: 'To the fullest extent permitted by law, MediCare shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability to you for any claim shall not exceed the amount paid by you for the specific order giving rise to the claim.',
    },
    {
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      title: '11. Changes to Terms',
      text: 'MediCare reserves the right to update these Terms of Service at any time. Significant changes will be communicated via email or a prominent notice on our platform. Your continued use of our services after any changes constitutes acceptance of the revised terms. We recommend reviewing these terms periodically.',
    },
    {
      icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
      title: '12. Governing Law',
      text: 'These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms or your use of MediCare services shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.',
    },
  ];

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Terms of Service</h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-10 ml-0 sm:ml-11">Last updated: January 2025</p>

      {/* Intro Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
          Please read these Terms of Service carefully before using MediCare. These terms govern your use of our platform and constitute a legally binding agreement between you and MediCare Pharmacy.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-3 sm:space-y-4">
        {sections.map((section, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                </svg>
              </div>
              {section.title}
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{section.text}</p>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">Questions About These Terms?</h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          If you have any questions about our Terms of Service, please contact our legal team at:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:legal@medicare.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm transition-all hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            legal@medicare.com
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-sm transition-all hover:bg-blue-600 hover:text-white"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;