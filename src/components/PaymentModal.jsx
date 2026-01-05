import React, { useEffect, useState } from 'react';

export default function PaymentModal({ isOpen, onClose, amount, onPaymentSuccess }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const initMoyasar = () => {
      if (window.Moyasar) {
        try {
          setLoading(false);
          window.Moyasar.init({
            // Your Test Key
            publishable_api_key: 'pk_test_8CYuPHhNbs5ZTg4T7Rn1qefcjozsTa6CVdTkYB3L',
            
            element: '.moyasar-form-container',
            amount: amount * 100,
            currency: 'SAR',
            description: 'Sira Portfolio License',
            
          // FIXED: This will now use https://sira-three.vercel.app when live
  callback_url: window.location.origin,
            // 2. FIX: Remove 'applepay' & 'stcpay' for localhost testing
            // Apple Pay requires a verified HTTPS domain, so we test with Cards only.
            methods: ['creditcard'], 
            
            supported_networks: ['visa', 'mastercard', 'mada'],

            on_completed: function (payment) {
              onPaymentSuccess(payment);
            },
            
            on_failed: function (error) {
              console.error("Payment failed", error);
            }
          });
        } catch (err) {
          console.error("Moyasar Init Error:", err);
          setError("Failed to initialize payment form.");
        }
      }
    };

    // Load Scripts (Same as before)
    const scriptId = 'moyasar-script';
    const existingScript = document.getElementById(scriptId);

    if (!existingScript) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://cdn.moyasar.com/mpf/1.14.0/moyasar.js';
      script.async = true;
      script.onload = initMoyasar;
      script.onerror = () => setError("Failed to load payment library.");
      document.body.appendChild(script);
      
      const polyfill = document.createElement('script');
      polyfill.src = "https://cdn.polyfill.io/v3/polyfill.min.js?features=fetch";
      document.body.appendChild(polyfill);

    } else {
      setTimeout(initMoyasar, 100); 
    }

  }, [isOpen, amount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-fadeIn">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <h2 className="text-xl font-heading mb-1 text-slate-900">Secure Checkout</h2>
        <p className="text-sm text-slate-500 mb-6">Complete your purchase to deploy.</p>

        {loading && !error && (
          <div className="text-center py-8 text-slate-400 flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-slate-200 border-t-sira-purple rounded-full animate-spin mb-2"></div>
            <span className="text-xs uppercase tracking-widest">Loading Gateway...</span>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-500 text-sm bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        <div className="moyasar-form-container"></div>

        <div className="mt-4 text-center">
           <span className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
             Encrypted & Secure via Moyasar
           </span>
        </div>
      </div>
    </div>
  );
}