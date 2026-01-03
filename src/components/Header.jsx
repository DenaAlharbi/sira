import React, { useState } from 'react';
export default function Header({ onHome, onTemplates, onPricing, onGetStarted }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-200/40 rounded-2xl h-16 flex items-center justify-between px-8">
        
        {/* LOGO: Now in the deep Slate-900 color */}
        <div className="cursor-pointer flex items-baseline gap-2 group" onClick={onHome}>
          <span className="text-xl font-heading text-slate-900 font-bold tracking-tight">Sira</span>
          <span className="text-lg font-arabic text-slate-900/40">سيرة</span>
        </div>
        
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-8 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            <button onClick={onTemplates} className="hover:text-slate-900 transition-colors">Templates</button>
            <button onClick={onPricing} className="hover:text-slate-900 transition-colors">Pricing</button>
          </nav>
          
          <button 
            onClick={onGetStarted}
            className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-sm active:scale-95"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}