import { useState, useEffect } from 'react';
import axios from 'axios';

interface FAQItem {
  id: number;
  category: string;
  category_display: string;
  question: string;
  answer: string;
  order: number;
}

// Static fallback data shown while loading or if API fails
const STATIC_FAQS: FAQItem[] = [
  { id: 1, category: 'orders', category_display: 'Orders & Delivery', question: 'How long does delivery take?', answer: 'Standard delivery takes 24–48 hours within city limits. Orders placed before 2 PM are typically dispatched the same day. Remote locations may take 3–5 business days.', order: 1 },
  { id: 2, category: 'orders', category_display: 'Orders & Delivery', question: 'Can I track my order?', answer: 'Yes. Once your order is dispatched, you will receive an SMS and email with a tracking link. You can also track your order from the "My Orders" section in your account.', order: 2 },
  { id: 3, category: 'orders', category_display: 'Orders & Delivery', question: 'Is there a minimum order value for free delivery?', answer: 'We offer free delivery on all orders. There is no minimum order value requirement.', order: 3 },
  { id: 4, category: 'orders', category_display: 'Orders & Delivery', question: 'Can I change or cancel my order after placing it?', answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Please contact our support team immediately if you need to make changes.', order: 4 },
  { id: 5, category: 'medicines', category_display: 'Medicines & Prescriptions', question: 'Do I need a prescription to order medicines?', answer: 'Prescription medicines require a valid prescription uploaded at the time of order. Over-the-counter (OTC) medicines can be ordered without a prescription. Our pharmacists verify all prescriptions before dispatch.', order: 1 },
  { id: 6, category: 'medicines', category_display: 'Medicines & Prescriptions', question: 'How do I upload my prescription?', answer: 'Click on "Upload Prescription" in the navigation bar. You can upload a clear photo or scanned copy of your prescription in JPG, PNG, or PDF format. Our team will review it within a few hours.', order: 2 },
  { id: 7, category: 'medicines', category_display: 'Medicines & Prescriptions', question: 'Are all medicines genuine and certified?', answer: 'Yes. We source all medicines directly from licensed manufacturers and authorised distributors. Every product is quality-checked and FDA approved. We do not stock counterfeit or expired medicines.', order: 3 },
  { id: 8, category: 'payments', category_display: 'Payments & Refunds', question: 'What payment methods do you accept?', answer: 'We accept Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery (COD). All online payments are secured with 256-bit SSL encryption.', order: 1 },
  { id: 9, category: 'payments', category_display: 'Payments & Refunds', question: 'When will I receive my refund?', answer: 'Refunds are processed within 3–5 business days after the return is approved. The amount is credited back to your original payment method. COD refunds are transferred via bank transfer.', order: 2 },
  { id: 10, category: 'account', category_display: 'Account & Privacy', question: 'How do I create an account?', answer: 'Click "Create Account" on the login page and fill in your name, email, and password. You can also sign up using your mobile number. Account creation is free.', order: 1 },
  { id: 11, category: 'account', category_display: 'Account & Privacy', question: 'Is my personal health data safe?', answer: 'Absolutely. We follow strict data protection policies. Your prescriptions, health information, and personal details are encrypted and never shared with third parties without your consent.', order: 2 },
];

const CATEGORY_ORDER = ['orders', 'medicines', 'payments', 'account', 'general'];

const FAQ = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get('/api/products/faqs/');
        const data: FAQItem[] = response.data.results ?? response.data;
        setFaqs(data.length > 0 ? data : STATIC_FAQS);
      } catch {
        // Fallback to static data if API unavailable
        setFaqs(STATIC_FAQS);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // Group FAQs by category
  const grouped = CATEGORY_ORDER.reduce<Record<string, { display: string; items: FAQItem[] }>>((acc, cat) => {
    const items = faqs.filter((f) => f.category === cat);
    if (items.length > 0) {
      acc[cat] = { display: items[0].category_display, items };
    }
    return acc;
  }, {});

  // Also catch any category not in CATEGORY_ORDER
  faqs.forEach((f) => {
    if (!grouped[f.category]) {
      grouped[f.category] = { display: f.category_display, items: [] };
    }
    if (!grouped[f.category].items.find((i) => i.id === f.id)) {
      grouped[f.category].items.push(f);
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-3 sm:gap-4">
        <div className="loading-spinner"></div>
        <p className="text-sm sm:text-base text-gray-700 font-medium antialiased">Loading FAQs...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-6 sm:py-8 md:py-12 px-4">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-gray-900">Frequently Asked Questions</h1>
      </div>
      <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-10 ml-0 sm:ml-11">
        Find answers to common questions about MediCare's services.
      </p>

      <div className="space-y-6 sm:space-y-8">
        {Object.entries(grouped).map(([cat, { display, items }]) => (
          <div key={cat}>
            <h2 className="text-base sm:text-lg font-bold text-blue-600 uppercase tracking-wide mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-blue-600 rounded-full inline-block"></span>
              {display}
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {items.map((item) => {
                const isOpen = openIndex === item.id;
                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-200">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : item.id)}
                      className="w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-sm sm:text-base font-semibold text-gray-900">{item.question}</span>
                      <svg
                        className={`w-5 h-5 text-blue-600 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {isOpen && (
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 border-t border-gray-100">
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed pt-3">{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still have questions */}
      <div className="mt-8 sm:mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 sm:p-8 text-center">
        <svg className="w-10 h-10 text-blue-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Still have questions?</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-4">Our support team is available 24/7 to help you.</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-heading font-bold text-sm sm:text-base transition-all duration-300 hover:shadow-xl"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default FAQ;