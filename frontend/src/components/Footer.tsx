import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-8 sm:py-12 md:py-16 mt-8 sm:mt-12 md:mt-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 mb-6 sm:mb-8 md:mb-12">
          
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-heading font-extrabold">MediCare</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-xs sm:text-sm md:text-base mb-2 sm:mb-3 md:mb-4">
              Your trusted partner in healthcare. Quality medicines and reliable service, delivered to your doorstep.
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm mb-4">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Licensed & Certified Pharmacy</span>
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { href: '#', label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { href: '#', label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
                { href: '#', label: 'Instagram', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links — COMPLETE */}
          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 sm:mb-4 md:mb-6 flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Medicines' },
                { to: '/prescriptionupload', label: 'Upload Prescription' },
                { to: '/cart', label: 'My Cart' },
                { to: '/orders', label: 'My Orders' },
                { to: '/profile', label: 'My Account' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-xs sm:text-sm md:text-base transition-all duration-300 hover:text-blue-400 hover:pl-2 flex items-center gap-2 group"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support — COMPLETE */}
          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 sm:mb-4 md:mb-6 flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Help & Support
            </h4>
            <ul className="space-y-2 sm:space-y-2.5 md:space-y-3">
              {[
                { to: '/contact', label: 'Contact Us' },
                { to: '/faq', label: 'FAQ' },
                { to: '/shipping', label: 'Shipping Policy' },
                { to: '/returns', label: 'Return Policy' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms of Service' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 text-xs sm:text-sm md:text-base transition-all duration-300 hover:text-blue-400 hover:pl-2 flex items-center gap-2 group"
                  >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-blue-400 uppercase tracking-wider mb-3 sm:mb-4 md:mb-6 flex items-center gap-1.5 sm:gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Info
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 md:space-y-4">
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm md:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-0.5 sm:mb-1">24/7 Helpline</div>
                  <a href="tel:1800-123-4567" className="hover:text-blue-400 transition-colors break-all">
                    1800-123-4567
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm md:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-0.5 sm:mb-1">Email Support</div>
                  <a href="mailto:support@medicare.com" className="hover:text-blue-400 transition-colors break-all">
                    support@medicare.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm md:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-0.5 sm:mb-1">Visit Us</div>
                  <span>123 Healthcare Ave, Medical City</span>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm md:text-base">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-0.5 sm:mb-1">Working Hours</div>
                  <span>Mon–Sun: Open 24/7</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-6 md:pt-8 border-t border-gray-700 gap-2 sm:gap-3 md:gap-4">
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} MediCare Pharmacy. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <Link to="/privacy" className="text-gray-400 text-xs sm:text-sm transition-all duration-300 hover:text-blue-400 whitespace-nowrap">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-xs sm:text-sm transition-all duration-300 hover:text-blue-400 whitespace-nowrap">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="text-gray-400 text-xs sm:text-sm transition-all duration-300 hover:text-blue-400 whitespace-nowrap">
              Medical Disclaimer
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-gray-700">
          {[
            { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', label: 'FDA Approved' },
            { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', label: 'Secure Checkout' },
            { icon: 'M5 13l4 4L19 7', label: 'Quality Assured' },
            { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: '24/7 Support' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={badge.icon} />
              </svg>
              <span className="whitespace-nowrap">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;