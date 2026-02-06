import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { productsAPI, cartAPI } from '../services/api';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [imgError, setImgError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      if (slug) {
        const response = await productsAPI.getBySlug(slug);
        setProduct(response.data);
      }
    };
    fetchProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    setAddingToCart(true);
    try {
      await cartAPI.add({ product_id: product.id, quantity });
      dispatch(addToCart({ product, quantity }));
      
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-24 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3 animate-slideDown';
      notification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Added to cart successfully!</span>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (error) {
      alert('Please login to add items to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  // No Image Placeholder Component
  const NoImagePlaceholder = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center min-h-[500px]">
      <div className="text-center">
        <svg className="w-32 h-32 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-gray-500 text-lg font-medium">No Image Available</p>
      </div>
    </div>
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="loading-spinner"></div>
        <p className="text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 flex items-center justify-center">
          {!imgError && product.image ? (
            <img 
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              className="max-w-full max-h-[500px] object-contain rounded-xl"
            />
          ) : (
            <NoImagePlaceholder />
          )}
        </div>

        {/* Product Info */}
        <div>
          {/* Category Badge */}
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
              {product.category?.name || 'General Medicine'}
            </span>
          </div>

          {/* Product Name */}
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold mb-6 text-gray-900 leading-tight">
            {product.name}
          </h1>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-blue-600">₹{product.price}</span>
            <span className="text-gray-500 text-lg">per unit</span>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">In Stock ({product.stock} units available)</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-semibold">Currently Out of Stock</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Product Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
          </div>

          {/* Prescription Warning */}
          {product.category?.name === 'Prescription' && (
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="font-bold text-amber-900 mb-1">Prescription Required</h4>
                  <p className="text-sm text-amber-800">This medicine requires a valid prescription. Please upload your prescription during checkout.</p>
                </div>
              </div>
            </div>
          )}

          {/* Add to Cart Section */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <input 
                type="number" 
                min="1" 
                max={product.stock}
                value={quantity} 
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))} 
                className="w-20 px-4 py-3 text-center border-x-2 border-gray-200 focus:outline-none font-bold"
              />
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                disabled={quantity >= product.stock}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <button 
              onClick={handleAddToCart} 
              disabled={product.stock === 0 || addingToCart}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {addingToCart ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </>
              )}
            </button>
          </div>

          {/* Additional Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span><strong>100% Genuine</strong> products from licensed manufacturers</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span><strong>Fast Delivery</strong> to your doorstep within 24-48 hours</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              <span><strong>Easy Returns</strong> within 7 days if unopened</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;