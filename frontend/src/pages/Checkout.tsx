import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ordersAPI } from '../services/api';
import { clearCart } from '../store/slices/cartSlice';
import { RootState } from '../store/store';
import { CheckoutData } from '../types';

const PAYPAL_CLIENT_ID = 'AQJPsCw17o0SQYvHDeMoZRD20eXhYcgO7hiLU9-kiHCYtq7YR6ezOGPCasfizYMSD8N1FQBJxg84CeTa';

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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [paypalReady, setPaypalReady] = useState(false);
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const paypalRendered = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load PayPal SDK
  useEffect(() => {
    if (document.getElementById('paypal-sdk')) {
      setPaypalReady(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=USD`;
    script.onload = () => setPaypalReady(true);
    document.body.appendChild(script);
  }, []);

  // Render PayPal button when ready and payment method is 'card'
  useEffect(() => {
    if (!paypalReady || formData.payment_method !== 'card') return;
    if (paypalRendered.current) return;
    if (!paypalContainerRef.current) return;

    const win = window as any;
    if (!win.paypal) return;

    paypalRendered.current = true;

    win.paypal.Buttons({
      style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'pay' },
      createOrder: (_data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: 'MyShop Order',
            amount: {
              currency_code: 'USD',
              value: total.toFixed(2),
            },
          }],
        });
      },
      onApprove: async (_data: any, actions: any) => {
        const details = await actions.order.capture();
        // Save order to backend
        try {
          await ordersAPI.create({ ...formData, payment_method: 'paypal' });
          dispatch(clearCart());
        } catch (e) {
          console.error('Order save failed', e);
        }
        setTransactionId(details.id);
        setShowSuccessPopup(true);
      },
      onError: (err: any) => {
        console.error('PayPal error', err);
        alert('Payment failed. Please try again.');
      },
      onCancel: () => {
        alert('Payment cancelled.');
      },
    }).render('#paypal-button-container');
  }, [paypalReady, formData.payment_method]);

  // Reset PayPal button when switching back to card
  useEffect(() => {
    if (formData.payment_method !== 'card') {
      paypalRendered.current = false;
    }
  }, [formData.payment_method]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.payment_method === 'card') return; // PayPal handles this
    setLoading(true);
    try {
      await ordersAPI.create(formData);
      dispatch(clearCart());
      setTransactionId('COD-' + Date.now());
      setShowSuccessPopup(true);
    } catch (error) {
      alert('Error placing order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4">

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-500 text-sm mb-5">Thank you! Your order has been placed and confirmed.</p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-semibold text-gray-800 text-xs break-all max-w-[160px] text-right">{transactionId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-semibold text-gray-800">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className="font-semibold text-green-600">Completed ✓</span>
              </div>
            </div>
            <button
              onClick={() => { setShowSuccessPopup(false); navigate('/orders'); }}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 transition-colors"
            >
              View My Orders
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Shipping Information */}
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Shipping Address
              </h2>
              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="form-label text-sm sm:text-base">Street Address</label>
                  <textarea
                    className="form-textarea text-sm sm:text-base"
                    value={formData.shipping_address}
                    onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
                    required
                    rows={3}
                    placeholder="House/Flat number, Street name, Area"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="form-label text-sm sm:text-base">City</label>
                    <input
                      type="text"
                      className="form-input text-sm sm:text-base"
                      value={formData.shipping_city}
                      onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })}
                      required
                      placeholder="Your city"
                    />
                  </div>
                  <div>
                    <label className="form-label text-sm sm:text-base">Postal Code</label>
                    <input
                      type="text"
                      className="form-input text-sm sm:text-base"
                      value={formData.shipping_postal_code}
                      onChange={(e) => setFormData({ ...formData, shipping_postal_code: e.target.value })}
                      required
                      placeholder="PIN code"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="form-label text-sm sm:text-base">Country</label>
                    <input
                      type="text"
                      className="form-input text-sm sm:text-base"
                      value={formData.shipping_country}
                      onChange={(e) => setFormData({ ...formData, shipping_country: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label text-sm sm:text-base">Phone Number</label>
                    <input
                      type="tel"
                      className="form-input text-sm sm:text-base"
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
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payment Method
              </h2>

              <div className="space-y-2 sm:space-y-3">
                {/* PayPal option */}
                <label className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.payment_method === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment_method === 'card'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0"
                  />
                  <div className="ml-2 sm:ml-3 flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H4.73a.75.75 0 01-.742-.648L2.004 4.31a.75.75 0 01.742-.852h4.95c2.52 0 4.3 1.22 4.3 3.37 0 2.56-1.98 4.01-4.92 4.01H5.53l-.45 2.78h1.996a.75.75 0 01.742.648l.258 1.57zM20.925 8.39c0 2.75-1.87 4.32-5.12 4.32h-1.55l-.56 3.47a.75.75 0 01-.742.648h-2.3a.75.75 0 01-.742-.852l1.984-12.38a.75.75 0 01.742-.648h4.71c2.52 0 3.578 1.22 3.578 3.44z"/>
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">PayPal</p>
                      <p className="text-xs sm:text-sm text-gray-500">Pay securely with PayPal</p>
                    </div>
                  </div>
                </label>

                {/* PayPal Button renders here */}
                {formData.payment_method === 'card' && (
                  <div className="px-2 pb-2">
                    <div id="paypal-button-container" ref={paypalContainerRef}></div>
                    {!paypalReady && (
                      <div className="text-center py-4 text-gray-400 text-sm">Loading PayPal...</div>
                    )}
                  </div>
                )}

                {/* COD */}
                <label className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.payment_method === 'cod' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={formData.payment_method === 'cod'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0"
                  />
                  <div className="ml-2 sm:ml-3 flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Cash on Delivery</p>
                      <p className="text-xs sm:text-sm text-gray-500">Pay when you receive</p>
                    </div>
                  </div>
                </label>

                {/* UPI */}
                <label className={`flex items-start sm:items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.payment_method === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-600'}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={formData.payment_method === 'upi'}
                    onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5 sm:mt-0"
                  />
                  <div className="ml-2 sm:ml-3 flex items-start sm:items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">UPI Payment</p>
                      <p className="text-xs sm:text-sm text-gray-500">Pay using UPI apps</p>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit button — only show for COD and UPI */}
            {formData.payment_method !== 'card' && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-base sm:text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 active:scale-95"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-sm sm:text-base">Processing Order...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Place Order
                  </>
                )}
              </button>
            )}
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200 lg:sticky lg:top-24">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Order Summary
            </h2>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 max-h-48 sm:max-h-64 overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-gray-100">
                  <img
                    src={item.product.image || 'https://via.placeholder.com/60'}
                    alt={item.product.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2">{item.product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-blue-600">₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Subtotal</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                <span>Delivery Charges</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>
              <div className="border-t-2 border-gray-200 pt-2 sm:pt-3 flex justify-between items-center">
                <span className="text-base sm:text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 flex items-start sm:items-center gap-2 sm:gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-green-900 text-xs sm:text-sm">100% Secure Checkout</p>
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