import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartAPI } from '../services/api';
import { setCart, updateCartItem, removeFromCart } from '../store/slices/cartSlice';
import { RootState } from '../store/store';

const Cart = () => {
  const { items, total } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await cartAPI.get();
        dispatch(setCart(response.data));
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };
    fetchCart();
  }, [dispatch]);

  const handleUpdateQuantity = async (itemId: number, quantity: number) => {
    try {
      await cartAPI.updateItem({ item_id: itemId, quantity });
      dispatch(updateCartItem({ id: itemId, quantity }));
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const handleRemove = async (itemId: number) => {
    try {
      await cartAPI.removeItem({ item_id: itemId });
      dispatch(removeFromCart(itemId));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container-custom text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-heading font-extrabold mb-4 text-gray-900">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Start adding medicines to your cart</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-lg transition-all duration-300 hover:shadow-xl">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Browse Medicines
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h1 className="text-4xl font-heading font-extrabold text-gray-900">Shopping Cart</h1>
        <span className="text-gray-500">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={item.product.image || 'https://via.placeholder.com/150'} 
                      alt={item.product.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        {item.product.category?.name}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove from cart"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    {/* Quantity Controls */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quantity</label>
                      <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)} 
                          className="w-16 px-2 py-2 text-center border-x-2 border-gray-200 focus:outline-none font-semibold"
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Price</p>
                      <p className="text-2xl font-bold text-blue-600">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-gray-500">₹{item.product.price} each</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>

            <Link 
              to="/checkout" 
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-lg transition-all duration-300 hover:shadow-xl flex items-center justify-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Proceed to Checkout
            </Link>

            <Link 
              to="/products" 
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>

            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure Checkout</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;