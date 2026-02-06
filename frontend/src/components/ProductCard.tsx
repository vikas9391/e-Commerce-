import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);

  // Fallback image component
  const NoImagePlaceholder = () => (
    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
      <div className="text-center">
        <svg className="w-20 h-20 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-sm font-medium">No Image</p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100 hover:border-blue-300 group">
      <Link to={`/products/${product.slug}`}>
        {/* Image Section */}
        <div className="relative w-full pt-[100%] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {!imgError && product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              onError={() => setImgError(true)}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <NoImagePlaceholder />
          )}
          
          {/* Stock Badge */}
          {product.stock === 0 ? (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Out of Stock
            </div>
          ) : product.stock < 10 && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Low Stock
            </div>
          )}

          {/* Prescription Required Badge */}
          {product.category?.name === 'Prescription' && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wide shadow-lg flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Rx
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="p-5">
          {/* Category */}
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
              {product.category?.name || 'General'}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-lg font-bold mb-3 text-gray-800 line-clamp-2 leading-tight min-h-[3.5rem] group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Price & Rating Row */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            {/* Price */}
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-500 font-medium">₹</span>
              <span className="text-2xl font-bold text-blue-600">{product.price}</span>
            </div>
            
            {/* Rating */}
            {product.average_rating > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1.5 rounded-lg">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-bold">{product.average_rating.toFixed(1)}</span>
              </div>
            )}
          </div>

          {/* Stock Info */}
          <div className="mt-3 flex items-center gap-2">
            {product.stock > 0 ? (
              <div className="flex items-center gap-1.5 text-xs text-green-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">In Stock ({product.stock} available)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-red-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Currently Unavailable</span>
              </div>
            )}
          </div>

          {/* View Details Button */}
          <button className="mt-4 w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group-hover:gap-3">
            View Details
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;