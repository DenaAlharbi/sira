import React, { useEffect, useState } from 'react';

export default function PaymentModal({ isOpen, onClose, amount, onPaymentSuccess }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NEW: State to collect email for "Lazy Auth"
  const [email, setEmail] = useState('');

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
            
            // FIXED: Uses location.origin so it works on Localhost & Vercel
            callback_url: window.location.origin, 

            // FIXED: Only credit card for stable testing on localhost
            methods: ['creditcard'], 
            
            supported_networks: ['visa', 'mastercard', 'mada'],

            on_completed: function (payment) {
              // Pass the email back with the payment result to save to Supabase
              onPaymentSuccess({ ...payment, owner_email: email });
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

    // Load Scripts
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

  }, [isOpen, amount, email]); // Added email to deps so on_completed has latest value

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl animate-fadeIn">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="mb-8">
          <h2 className="text-2xl font-heading text-slate-900 mb-2">Secure Checkout</h2>
          <p className="text-sm text-slate-500">Claim your professional portfolio and go live.</p>
        </div>

        {/* NEW: Email Collection Field (Lazy Auth) */}
        <div className="mb-6">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 block">
            Owner Email
          </label>
          <input 
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-sira-purple focus:ring-4 focus:ring-sira-purple/5 transition-all"
          />
          <p className="mt-2 text-[10px] text-slate-400">
            This email will be used to send your private edit link.
          </p>
        </div>

        <div className="border-t border-slate-100 my-6"></div>

        {loading && !error && (
          <div className="text-center py-12 text-slate-400 flex flex-col items-center">
            <div className="w-8 h-8 border-2 border-slate-100 border-t-sira-purple rounded-full animate-spin mb-4"></div>
            <span className="text-[10px] uppercase tracking-widest font-bold">Encrypting Channel...</span>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-red-500 text-sm bg-red-50 rounded-2xl mb-4">
            {error}
          </div>
        )}

        <div className="moyasar-form-container"></div>

        <div className="mt-8 text-center">
           <span className="text-[9px] text-slate-300 uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-50"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
             PCI-DSS Certified Gateway
           </span>
        </div>
      </div>
    </div>
  );
}