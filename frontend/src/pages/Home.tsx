import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handlePrescriptionUpload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      sessionStorage.setItem('redirectAfterLogin', '/prescriptionupload');
      navigate('/login');
    }
  };

  return (
    <div className="w-full antialiased">

      {/* Hero Section */}
      <section className="relative min-h-[450px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-[900px] text-center z-10 relative animate-fadeInUp">
          {/* Medical Icon */}
          <div className="flex justify-center mb-3 sm:mb-4 md:mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-extrabold mb-3 sm:mb-4 md:mb-6 leading-tight text-gray-900 antialiased px-2 sm:px-4">
            Your Health,
            <span className="block mt-1 sm:mt-2 text-blue-600 antialiased"> Our Priority</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 mb-5 sm:mb-6 md:mb-10 max-w-[700px] mx-auto leading-relaxed font-medium antialiased px-2 sm:px-4">
            Quality medicines delivered to your doorstep. Licensed pharmacy with certified healthcare products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-4">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-heading font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Medicines
            </Link>
            
            <Link 
              to="/prescriptionupload" 
              onClick={handlePrescriptionUpload}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-heading font-bold text-sm sm:text-base md:text-lg transition-all duration-300 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-xl active:scale-95"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Upload Prescription
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-6 mt-6 sm:mt-8 md:mt-12 bg-white/90 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 md:p-4 shadow-sm mx-2 sm:mx-4">
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-800 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-bold whitespace-nowrap">Licensed Pharmacy</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-800 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold whitespace-nowrap">Genuine Products</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300"></div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-gray-800 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] -top-[75px] -left-[75px] sm:-top-[100px] sm:-left-[100px] rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 animate-float"></div>
          <div className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] bottom-8 right-8 sm:bottom-12 sm:right-12 md:right-24 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] top-1/2 -right-6 sm:-right-8 md:-right-12 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </section>

      {/* Stats Section — professional, no emojis */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: '10,000+', label: 'Medicines Available', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
              { value: '50,000+', label: 'Happy Customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
              { value: '100%', label: 'Certified & Genuine', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { value: '24/7', label: 'Expert Support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none mb-1">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose MediCare */}
      <section className="bg-gray-50 py-8 sm:py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="text-center mb-6 sm:mb-10 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900 mb-2 sm:mb-3 md:mb-4 antialiased px-2 sm:px-4">
              Why Choose MediCare?
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 font-medium antialiased px-2 sm:px-4">
              Your health and safety are our top priorities
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {[
              {
                icon: 'M13 10V3L4 14h7v7l9-11h-7z',
                title: 'Fast Delivery',
                description: 'Quick and reliable medicine delivery to your doorstep within 24–48 hours.',
              },
              {
                icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                title: 'Certified Products',
                description: 'All medicines are sourced from licensed manufacturers and quality checked.',
              },
              {
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                title: 'Secure Payments',
                description: 'Your transactions are fully encrypted and protected with industry-standard security.',
              },
              {
                icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
                title: '24/7 Support',
                description: 'Expert pharmacists available round the clock to assist you with any questions.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold mb-1.5 sm:mb-2 md:mb-3 text-gray-900 antialiased">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium antialiased">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-10 sm:py-14">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-white mb-3 antialiased">
            Need medicines delivered today?
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mb-6 max-w-xl mx-auto">
            Browse thousands of certified medicines and healthcare products — all delivered fast and safely.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white text-blue-600 rounded-lg font-heading font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Shop Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;