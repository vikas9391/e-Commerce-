import { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.data.results || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 sm:gap-4">
        <div className="loading-spinner"></div>
        <p className="text-sm sm:text-base text-gray-700 font-medium antialiased">Loading medicines...</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', padding: '24px 16px' }}>

      {/* Header — centered */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900 antialiased">
            Browse Medicines
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-500 font-medium antialiased">
          Browse our complete range of quality healthcare products
        </p>
      </div>

      {/* Search Bar — centered with controlled width */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ position: 'relative', width: '50%', minWidth: '320px', maxWidth: '560px' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '16px', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
            <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search medicines by name, category, or description..."
            style={{
              width: '100%',
              paddingLeft: '48px',
              paddingRight: searchQuery ? '48px' : '16px',
              paddingTop: '14px',
              paddingBottom: '14px',
              borderRadius: '12px',
              border: '2px solid #e5e7eb',
              outline: 'none',
              fontSize: '15px',
              color: '#111827',
              backgroundColor: '#fff',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 4px rgba(59,130,246,0.1)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e5e7eb'; e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'; }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', top: 0, bottom: 0, right: '16px', display: 'flex', alignItems: 'center', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchQuery && (
          <p style={{ marginTop: '10px', fontSize: '13px', color: '#6b7280', textAlign: 'center' }}>
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for{' '}
            <span style={{ fontWeight: 600, color: '#2563eb' }}>"{searchQuery}"</span>
          </p>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {searchQuery ? 'No medicines found' : 'No products found'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {searchQuery ? 'Try a different search term' : 'Check back soon for new medicines'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold text-sm transition-all hover:bg-blue-700"
            >
              Clear Search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;