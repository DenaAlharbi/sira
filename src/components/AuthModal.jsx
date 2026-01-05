// src/components/AuthModal.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AuthModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin }
    });
    if (!error) setSent(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="bg-white p-10 rounded-3xl max-w-sm w-full shadow-2xl text-center">
        {!sent ? (
          <>
            <h2 className="text-2xl font-heading mb-2">Welcome Back</h2>
            <p className="text-sm text-slate-500 mb-8">Enter your email to receive a magic sign-in link.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input 
                type="email" placeholder="name@email.com" required
                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sira-purple transition-all text-center"
                value={email} onChange={e => setEmail(e.target.value)}
              />
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px]">
                Send Magic Link
              </button>
            </form>
          </>
        ) : (
          <div className="animate-fadeIn">
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
            <h2 className="text-2xl font-heading mb-2">Check your inbox</h2>
            <p className="text-sm text-slate-500">We've sent a login link to {email}.</p>
          </div>
        )}
        <button onClick={onClose} className="mt-8 text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-slate-900">Close</button>
      </div>
    </div>
  );
}