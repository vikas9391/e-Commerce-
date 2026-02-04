import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ordersAPI } from '../services/api';
import { clearCart } from '../store/slices/cartSlice';
import { RootState } from '../store/store';
import { CheckoutData } from '../types';

const Checkout = () => {
  const { total, items } = useSelector((state: RootState) => state.cart);
  const [formData, setFormData] = useState<CheckoutData>({
    shipping_address: '',
    shipping_city: '',
    shipping_country: 'India',
    shipping_postal_code: '',
    phone: '',
    payment_method: 'card',
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await ordersAPI.create(formData);
      dispatch(clearCart());
      
      // Success notification
      const notification = document.createElement('div');
      notification.className = 'fixed top-24 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 flex items-center gap-3';
      notification.innerHTML = `
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span>Order placed successfully!</span>
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
      navigate('/orders');
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-12">
      <div className="flex items-center gap-3 mb-8">
        <svg className="w-8 h-8 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-heading font-extrabold text-gray-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Address
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="form-label">Street Address</label>
                  <textarea 
                    className="form-textarea" 
                    value={formData.shipping_address} 
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })} 
                    required 
                    rows={3}
                    placeholder="House/Flat number, Street name, Area"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">City</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.shipping_city} 
                      onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })} 
                      required 
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="form-label">Postal Code</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.shipping_postal_code} 
                      onChange={(e) => setFormData({ ...formData, shipping_postal_code: e.target.value })} 
                      required 
                      placeholder="PIN code"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Country</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      value={formData.shipping_country} 
                      onChange={(e) => setFormData({ ...formData, shipping_country: e.target.value })} 
                      required 
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                      required 
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-medical-primary transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="card"
                    checked={formData.payment_method === 'card'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-5 h-5 text-medical-primary"
                  />
                  <div className="ml-3 flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Credit / Debit Card</p>
                      <p className="text-sm text-gray-500">Pay securely with your card</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-medical-primary transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-5 h-5 text-medical-primary"
                  />
                  <div className="ml-3 flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">Cash on Delivery</p>
                      <p className="text-sm text-gray-500">Pay when you receive</p>
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-medical-primary transition-colors">
                  <input 
                    type="radio" 
                    name="payment" 
                    value="upi"
                    checked={formData.payment_method === 'upi'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-5 h-5 text-medical-primary"
                  />
                  <div className="ml-3 flex items-center gap-3">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-gray-900">UPI Payment</p>
                      <p className="text-sm text-gray-500">Pay using UPI apps</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-medical-primary to-medical-secondary text-white rounded-lg font-heading font-bold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Order...
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Place Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-medical-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100">
                  <img 
                    src={item.product.image || 'https://via.placeholder.com/60'} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-900 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-medical-primary">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charges</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-3xl font-bold text-medical-primary">₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <p className="font-semibold text-green-900 text-sm">100% Secure Checkout</p>
                <p className="text-xs text-green-700">Your data is encrypted and protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;