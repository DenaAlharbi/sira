import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClaimModal({ isOpen, onClose, onClaim }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await onClaim(email);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-300 hover:text-slate-900">✕</button>
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-sira-purple/10 rounded-full flex items-center justify-center mx-auto mb-4 text-sira-purple">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <h3 className="text-xl font-heading text-slate-900">Link your Portfolio</h3>
          <p className="text-slate-500 text-xs mt-2">Enter your email to claim this site so you can edit it later.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sira-purple focus:ring-1 focus:ring-sira-purple transition-all"
            required
          />
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-colors disabled:opacity-50"
          >
            {submitting ? 'Linking...' : 'Confirm & Deploy'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}