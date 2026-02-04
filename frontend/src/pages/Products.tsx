import { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading medicines...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <svg className="w-8 h-8 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h1 className="text-4xl font-heading font-extrabold text-gray-900">All Medicines</h1>
        </div>
        <p className="text-gray-600 ml-11">Browse our complete range of quality healthcare products</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;