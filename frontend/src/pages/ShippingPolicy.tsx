const ShippingPolicy = () => {
  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Shipping Policy</h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-10 ml-0 sm:ml-11">Last updated: January 2025</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          {[
            {
              icon: 'M5 13l4 4L19 7',
              title: 'Free Shipping on All Orders',
              content: 'MediCare offers free standard shipping on all orders across India, regardless of order value. There are no hidden delivery charges at checkout.',
            },
            {
              icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
              title: 'Delivery Timeframes',
              content: null,
              list: [
                { label: 'Metro Cities (Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad)', value: '24 – 48 hours' },
                { label: 'Tier-2 & Tier-3 Cities', value: '2 – 4 business days' },
                { label: 'Remote & Rural Areas', value: '4 – 7 business days' },
                { label: 'Prescription Orders', value: 'Dispatched after prescription verification (additional 2–4 hours)' },
              ],
            },
            {
              icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
              title: 'Order Processing',
              content: 'Orders placed before 2:00 PM (IST) on business days are processed and dispatched the same day. Orders placed after 2:00 PM or on public holidays are dispatched the next business day. You will receive a dispatch confirmation email with tracking details once your order ships.',
            },
            {
              icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
              title: 'Order Tracking',
              content: 'Once dispatched, you will receive an SMS and email with your shipment tracking number. You can track your order in real time from the "My Orders" section in your account or through our logistics partner\'s website.',
            },
            {
              icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
              title: 'Delivery Exceptions',
              content: 'Delivery timelines may be affected by factors beyond our control, including natural calamities, public strikes, government restrictions, or courier network disruptions. In such cases, we will notify you promptly and work to deliver your order at the earliest.',
            },
            {
              icon: 'M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6',
              title: 'Failed Delivery Attempts',
              content: 'Our delivery partner will attempt delivery up to 3 times. If all attempts fail due to an incorrect address or unavailability, the order will be returned to our warehouse. In such cases, you can choose to have the order re-shipped (shipping charges may apply) or receive a full refund.',
            },
          ].map((section, i) => (
            <div key={i} className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                  </svg>
                </div>
                {section.title}
              </h2>
              {section.content && (
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{section.content}</p>
              )}
              {section.list && (
                <div className="space-y-2 sm:space-y-3">
                  {section.list.map((row, ri) => (
                    <div key={ri} className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-gray-700 flex-1">{row.label}</span>
                      <span className="text-sm font-bold text-blue-600 sm:text-right whitespace-nowrap">{row.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-green-900 text-sm sm:text-base">Free Delivery</h3>
            </div>
            <p className="text-xs sm:text-sm text-green-800">On all orders across India. No minimum order value required.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">Need Help?</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">For shipping related queries, reach out to our support team.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all hover:shadow-lg w-full justify-center">
              Contact Support
            </a>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-5">
            <h3 className="font-bold text-blue-900 text-sm sm:text-base mb-2">Quick Summary</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Same-day dispatch before 2 PM
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Real-time order tracking
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                3 delivery attempts before return
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                Delivery across all of India
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;