const PrivacyPolicy = () => {
  const sections = [
    {
      icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      title: '1. Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'When you create an account or place an order, we collect your name, email address, phone number, delivery address, and payment details. This information is required to process your orders and deliver medicines to you.',
        },
        {
          subtitle: 'Health Information',
          text: 'When you upload a prescription or provide details about your health condition, we collect that information solely to fulfil your medicine orders. This data is treated with the highest level of confidentiality.',
        },
        {
          subtitle: 'Usage Data',
          text: 'We automatically collect information about how you interact with our platform, including pages visited, products viewed, search queries, and device/browser information. This helps us improve your experience.',
        },
      ],
    },
    {
      icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
      title: '2. How We Use Your Information',
      content: [
        {
          subtitle: null,
          text: 'We use the information we collect to:',
        },
      ],
      list: [
        'Process and fulfil your medicine orders',
        'Verify prescriptions with our licensed pharmacists',
        'Send order confirmations, shipping updates, and delivery notifications',
        'Provide customer support and respond to your queries',
        'Personalise your shopping experience and product recommendations',
        'Detect and prevent fraudulent transactions',
        'Comply with applicable laws and pharmacy regulations',
        'Send occasional promotional offers (only with your consent)',
      ],
    },
    {
      icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z',
      title: '3. Sharing of Information',
      content: [
        {
          subtitle: null,
          text: 'We do not sell or rent your personal information to any third party. We may share your data only in the following limited circumstances:',
        },
      ],
      list: [
        'With delivery partners and logistics providers to fulfil your order',
        'With payment gateway providers to process secure transactions',
        'With licensed pharmacists to verify prescriptions',
        'With law enforcement or regulatory authorities when legally required',
        'With service providers who assist in operating our platform (under strict confidentiality agreements)',
      ],
    },
    {
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      title: '4. Data Security',
      content: [
        {
          subtitle: null,
          text: 'We implement industry-standard security measures to protect your personal data, including 256-bit SSL encryption for all data in transit, secure storage with access controls, regular security audits and vulnerability assessments, and PCI-DSS compliant payment processing. While we take all reasonable steps to protect your information, no system is completely infallible. We encourage you to use a strong password and keep your login credentials confidential.',
        },
      ],
    },
    {
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      title: '5. Data Retention',
      content: [
        {
          subtitle: null,
          text: 'We retain your personal data for as long as your account is active or as required to provide services and comply with legal obligations. Order and prescription records are retained for a minimum of 5 years as required by Indian pharmacy regulations. You may request deletion of your account and associated data at any time, subject to legal retention requirements.',
        },
      ],
    },
    {
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      title: '6. Your Rights',
      content: [
        {
          subtitle: null,
          text: 'You have the following rights regarding your personal data:',
        },
      ],
      list: [
        'Access – Request a copy of the personal data we hold about you',
        'Correction – Request correction of inaccurate or incomplete data',
        'Deletion – Request deletion of your personal data (subject to legal requirements)',
        'Opt-Out – Unsubscribe from marketing communications at any time',
        'Portability – Request your data in a portable, machine-readable format',
      ],
    },
    {
      icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z',
      title: '7. Cookies',
      content: [
        {
          subtitle: null,
          text: 'We use cookies and similar tracking technologies to improve your browsing experience, analyse usage patterns, and remember your preferences. You can control or disable cookies through your browser settings. Disabling cookies may affect some features of our platform.',
        },
      ],
    },
    {
      icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      title: '8. Changes to this Policy',
      content: [
        {
          subtitle: null,
          text: 'We may update this Privacy Policy from time to time. When we make significant changes, we will notify you via email or a prominent notice on our website. Your continued use of MediCare after such changes constitutes acceptance of the updated policy.',
        },
      ],
    },
  ];

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Privacy Policy</h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-10 ml-0 sm:ml-11">Last updated: January 2025</p>

      {/* Intro */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-blue-900 leading-relaxed">
          At MediCare, we are committed to protecting your privacy and handling your personal health information with care and respect. This Privacy Policy explains what data we collect, how we use it, and your rights as a user of our platform.
        </p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {sections.map((section, i) => (
          <div key={i} className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                </svg>
              </div>
              {section.title}
            </h2>
            <div className="space-y-3">
              {section.content.map((block, bi) => (
                <div key={bi}>
                  {block.subtitle && (
                    <p className="text-sm font-semibold text-gray-800 mb-1">{block.subtitle}</p>
                  )}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{block.text}</p>
                </div>
              ))}
              {section.list && (
                <ul className="space-y-2 mt-2">
                  {section.list.map((item, li) => (
                    <li key={li} className="flex items-start gap-2 sm:gap-3">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-sm sm:text-base text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2">9. Contact Us About Privacy</h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer:
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="mailto:privacy@medicare.com" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm transition-all hover:shadow-lg">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            privacy@medicare.com
          </a>
          <a href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-sm transition-all hover:bg-blue-600 hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;