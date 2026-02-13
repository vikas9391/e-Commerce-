import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import { useAppSelector } from '../store/hooks';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getAll({ page_size: 6 });
        setFeaturedProducts(response.data.results || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handlePrescriptionUpload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated) {
      e.preventDefault();
      // Store the intended destination
      sessionStorage.setItem('redirectAfterLogin', '/prescriptionupload');
      navigate('/login');
    }
  };

  return (
    <div className="w-full antialiased">
      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12 sm:py-16 px-4 sm:px-8">
        <div className="max-w-[900px] text-center z-10 relative animate-fadeInUp">
          {/* Medical Icon */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold mb-4 sm:mb-6 leading-tight text-gray-900 antialiased px-4">
            Your Health,
            <span className="block mt-1 sm:mt-2 text-blue-600 antialiased"> Our Priority</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-10 max-w-[700px] mx-auto leading-relaxed font-medium antialiased px-4">
            Quality medicines delivered to your doorstep. Licensed pharmacy with certified healthcare products.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-4">
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-md"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Browse Medicines
            </Link>
            
            <Link 
              to="/prescriptionupload" 
              onClick={handlePrescriptionUpload}
              className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:bg-blue-600 hover:text-white shadow-md hover:shadow-xl"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Upload Prescription
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 mt-8 sm:mt-12 bg-white/90 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm mx-4">
            <div className="flex items-center gap-2 text-gray-800 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-bold whitespace-nowrap">Licensed Pharmacy</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-bold whitespace-nowrap">Genuine Products</span>
            </div>
            <div className="flex items-center gap-2 text-gray-800 text-xs sm:text-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-bold whitespace-nowrap">24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Decorative Circles with animate-float */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] -top-[100px] -left-[100px] rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 animate-float"></div>
          <div className="absolute w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] bottom-12 right-12 sm:right-24 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-[100px] h-[100px] sm:w-[150px] sm:h-[150px] top-1/2 -right-8 sm:-right-12 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-[1400px] mx-auto py-12 sm:py-20 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-gray-900 mb-1 sm:mb-2 antialiased">
              Featured Medicines
            </h2>
            <p className="text-sm sm:text-base text-gray-700 font-medium antialiased">Trusted healthcare products for your wellbeing</p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center gap-2 text-blue-600 font-bold text-sm sm:text-base transition-all duration-300 hover:gap-3 hover:text-blue-700 whitespace-nowrap"
          >
            View All
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] gap-4">
            <div className="loading-spinner"></div>
            <p className="text-sm sm:text-base text-gray-700 font-medium antialiased">Loading medicines...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 animate-fadeIn">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 mb-3 sm:mb-4 antialiased px-4">
              Why Choose MediCare?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium antialiased px-4">Your health and safety are our top priorities</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { 
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Fast Delivery', 
                description: 'Quick and reliable medicine delivery to your doorstep' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Certified Products', 
                description: 'All medicines are FDA approved and quality checked' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Secure Payments', 
                description: 'Your transactions are encrypted and completely secure' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ),
                title: '24/7 Support', 
                description: 'Expert pharmacists available round the clock for assistance' 
              },
            ].map((feature, index) => (
              <div 
                key={index}
                className="text-center p-6 sm:p-8 bg-white rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-gray-100"
              >
                <div className="text-blue-600 mb-3 sm:mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold mb-2 sm:mb-3 text-gray-900 antialiased">{feature.title}</h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium antialiased">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;