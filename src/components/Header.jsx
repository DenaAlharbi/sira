import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Header({ 
  onHome, 
  onTemplates, 
  onPricing, 
  onGetStarted, 
  onSignIn, // This connects to your AuthModal
  onOpenDashboard 
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Initial check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for login/logout events globally
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle Logout elegantly
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onHome(); // Redirect to gallery on logout
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[150] flex justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-200/40 rounded-2xl h-16 flex items-center justify-between px-8">
        
        {/* LOGO */}
        <div className="cursor-pointer flex items-baseline gap-2 group" onClick={onHome}>
          <span className="text-xl font-heading text-slate-900 font-bold tracking-tight">Sira</span>
          <span className="text-lg font-arabic text-slate-900/40">سيرة</span>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            <button onClick={onTemplates} className="hover:text-slate-900 transition-colors">Templates</button>
            <button onClick={onPricing} className="hover:text-slate-900 transition-colors">Pricing</button>
            
            {/* DYNAMIC AUTH SECTION */}
            {!user ? (
              <button 
                onClick={onSignIn} // FIXED: Now triggers the modal
                className="hover:text-slate-900 transition-colors border-l border-slate-200 pl-8"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-6 border-l border-slate-200 pl-8 animate-fadeIn">
                <button 
                  onClick={onOpenDashboard} 
                  className="text-sira-purple hover:text-slate-900 transition-all font-bold"
                >
                  My Portfolios
                </button>
                <button 
                  onClick={handleLogout}
                  className="hover:text-red-500 transition-colors opacity-50 hover:opacity-100"
                >
                  Logout
                </button>
              </div>
            )}
          </nav>
          
          <button 
            onClick={onGetStarted}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-sm active:scale-95"
          >
            {user ? 'Create New' : 'Get Started'}
          </button>
        </div>
      </div>
    </header>
  );
}