const ReturnPolicy = () => {
  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Return Policy</h1>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-10 ml-0 sm:ml-11">Last updated: January 2025</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              7-Day Return Window
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              We accept returns within <strong>7 days</strong> of delivery for eligible products. To qualify, items must be unused, in their original sealed packaging, and accompanied by the original invoice. Returns requested after 7 days will not be accepted.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              Eligible for Return
            </h2>
            <div className="space-y-2">
              {[
                'Wrong product delivered (different from what was ordered)',
                'Damaged or defective product received',
                'Product received past its expiry date',
                'Sealed & unopened OTC medicines within 7 days',
                'Missing items from the order',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              Not Eligible for Return
            </h2>
            <div className="space-y-2">
              {[
                'Opened or used medicines or healthcare products',
                'Prescription medicines (once dispensed as per valid prescription)',
                'Products with broken seals not due to damage in transit',
                'Refrigerated or temperature-sensitive products',
                'Products returned after the 7-day window',
                'Items purchased during clearance or final sale',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-sm sm:text-base text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              How to Initiate a Return
            </h2>
            <ol className="space-y-3 sm:space-y-4">
              {[
                { step: '1', title: 'Contact Support', desc: 'Email us at support@medicare.com or call 1800-123-4567 within 7 days of delivery. Mention your order number and reason for return.' },
                { step: '2', title: 'Return Approval', desc: 'Our team will review your request within 24 hours and send a Return Merchandise Authorization (RMA) number if approved.' },
                { step: '3', title: 'Pack & Ship', desc: 'Pack the item securely in its original packaging with all accessories and the invoice. Our courier partner will arrange a pickup at no cost to you.' },
                { step: '4', title: 'Refund Processed', desc: 'Once we receive and inspect the returned item, your refund will be processed within 3–5 business days to your original payment method.' },
              ].map((s, i) => (
                <div key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm flex-shrink-0">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">{s.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </ol>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              Refund Timeline
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {[
                { method: 'Credit / Debit Card', time: '3 – 5 business days' },
                { method: 'UPI / Net Banking', time: '1 – 3 business days' },
                { method: 'Cash on Delivery (COD)', time: '5 – 7 business days (bank transfer)' },
                { method: 'Wallet / Store Credit', time: 'Instant' },
              ].map((row, ri) => (
                <div key={ri} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700">{row.method}</span>
                  <span className="text-sm font-bold text-blue-600">{row.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="font-bold text-amber-900 text-sm sm:text-base">Important Note</h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-800">Prescription medicines are non-returnable once dispensed, as per Indian pharmacy regulations.</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-2">Return Window</h3>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-1">7 Days</div>
            <p className="text-xs sm:text-sm text-gray-500">from the date of delivery</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-md">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-3">Need to Return?</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Contact our team and we'll guide you through the process.</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-xs sm:text-sm transition-all hover:shadow-lg w-full justify-center">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;