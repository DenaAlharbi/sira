import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Component Imports
import Header from './components/Header';
import Gallery from './components/Gallery';
import QuestionStep from './components/QuestionStep';
import Preview from './components/Preview';
import OnboardingModal from './components/OnboardingModal';

export default function App() {
  // --- State Management ---
  // Views: 'gallery', 'pricing', 'questions', 'preview'
  const [view, setView] = useState('gallery'); 
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Centralized user data
  const [form, setForm] = useState({ 
    fullName: '', 
    title: '', 
    bio: '', 
    image: null 
  });

  // --- Helpers ---
  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  const handleHomeClick = () => {
    setView('gallery');
    setShowOnboarding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 antialiased selection:bg-sira-lavender selection:text-sira-purple">
      
      {/* 1. HEADER 
          Restored with Templates, Pricing, and Get Started triggers */}
      <Header 
        onHome={handleHomeClick} 
        onTemplates={() => setView('gallery')}
        onPricing={() => setView('pricing')}
        onGetStarted={() => setShowOnboarding(true)} 
      />

      {/* 2. ONBOARDING POPUP (How it Works) */}
      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal 
            isOpen={showOnboarding} 
            onClose={() => setShowOnboarding(false)} 
          />
        )}
      </AnimatePresence>
      
      {/* 3. MAIN CONTENT AREA */}
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          
          {/* VIEW: TEMPLATE GALLERY (Home) */}
          {view === 'gallery' && (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-heading text-slate-900 mb-4 tracking-tight">
                  Premium Templates
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                  Select a high-end architectural layout for your professional digital presence. 
                  Designed for the Kingdom's next generation of leaders.
                </p>
              </div>
              
              <Gallery onSelect={() => setView('questions')} />
            </motion.div>
          )}

          {/* VIEW: PRICING PAGE */}
          {/* VIEW: PRICING PAGE */}
{view === 'pricing' && (
  <motion.div 
    key="pricing"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-5xl mx-auto text-center"
  >
    <div className="mb-16">
      <h2 className="text-4xl font-heading text-slate-900 mb-4">Ownership & Licensing</h2>
      <p className="text-slate-500">Choose the level of control you need for your professional presence.</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
      {/* Tier 1: Standard Portfolio */}
      <div className="p-10 border border-slate-200 bg-white rounded-3xl shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-4">Individual License</h3>
          <div className="text-5xl font-heading mb-6 italic text-slate-900">249 <span className="text-xl">SAR</span></div>
          <p className="text-xs text-slate-400 mb-8 italic">Perfect for executives and professionals.</p>
          <ul className="text-sm text-slate-500 space-y-4 mb-10 text-left">
            <li className="flex items-center gap-3">✓ Full Deployment to Custom .sa Domain</li>
            <li className="flex items-center gap-3">✓ 1 Year of Premium Managed Hosting</li>
            <li className="flex items-center gap-3">✓ Bilingual Content Support (AR/EN)</li>
            <li className="flex items-center gap-3">✓ Automatic Security Updates</li>
          </ul>
        </div>
        <button 
          onClick={() => setView('gallery')} 
          className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-xl"
        >
          Purchase Portfolio
        </button>
      </div>

      {/* Tier 2: Source Code License */}
      <div className="p-10 border-2 border-sira-orange bg-white rounded-3xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
        <div className="absolute top-0 right-0 bg-sira-orange text-white px-4 py-1 text-[8px] font-bold uppercase tracking-widest">Full Ownership</div>
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-sira-orange font-bold mb-4">Developer License</h3>
          <div className="text-5xl font-heading mb-6 italic text-slate-900">899 <span className="text-xl">SAR</span></div>
          <p className="text-xs text-slate-400 mb-8 italic">Complete control for those who want to customize.</p>
          <ul className="text-sm text-slate-600 space-y-4 mb-10 text-left font-medium">
            <li className="flex items-center gap-3 font-bold text-slate-900">✓ Everything in Individual License</li>
            <li className="flex items-center gap-3">✓ Full React Source Code (.zip)</li>
            <li className="flex items-center gap-3">✓ Tailwind CSS Configuration Files</li>
            <li className="flex items-center gap-3">✓ Figma Design System Access</li>
            <li className="flex items-center gap-3">✓ Lifetime Commercial Usage</li>
          </ul>
        </div>
        <button 
          onClick={() => setView('gallery')} 
          className="w-full py-4 bg-sira-orange text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-xl shadow-orange-100"
        >
          Purchase with Source Code
        </button>
      </div>
    </div>
  </motion.div>
)}          {/* VIEW: INTERACTIVE MODAL QUESTIONNAIRE */}
          {view === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
              onClick={() => setView('gallery')} 
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()} 
                className="bg-white p-8 md:p-12 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 relative overflow-hidden"
              >
                <button 
                  onClick={() => setView('gallery')}
                  className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <QuestionStep 
                  form={form} 
                  updateForm={updateForm} 
                  onNext={() => setView('preview')} 
                  onExit={() => setView('gallery')} 
                />
              </motion.div>
            </motion.div>
          )}

          {/* VIEW: LIVE PREVIEW */}
          {view === 'preview' && (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-5xl mx-auto"
            >
              <div className="mb-8">
                <button 
                  onClick={() => setView('questions')}
                  className="group text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-sira-purple flex items-center gap-2 transition-colors"
                >
                  <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to Editor
                </button>
              </div>

              <Preview 
                form={form} 
                onBack={() => setView('questions')} 
                onNext={() => alert('Proceeding to Mada/Stripe Secure Checkout...')} 
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* 4. FOOTER: Professional Support & Credits */}
<footer className="mt-20 border-t border-slate-100 pt-16 pb-12 px-6">
  <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
    
    {/* Brand Section */}
    <div className="space-y-4">
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-heading text-slate-900 font-bold tracking-tight">Sira</span>
        <span className="text-lg font-arabic text-slate-900/40">سيرة</span>
      </div>
      <p className="text-xs text-slate-400 leading-relaxed max-w-xs uppercase tracking-widest">
        Architecting professional digital identities for the Kingdom's next generation of leaders.
      </p>
    </div>

    {/* Support Section */}
    <div className="space-y-4">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Support & Contact</h4>
      <div className="flex flex-col gap-2">
        <a href="mailto:support@sira.app" className="text-sm text-slate-500 hover:text-sira-purple transition-colors">support@sira.app</a>
        <p className="text-sm text-slate-500">Dhahran, Eastern Province, KSA</p>
      </div>
    </div>

    {/* Credits Section */}
    <div className="space-y-4 md:text-right">
      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Credits</h4>
      <p className="text-sm text-slate-500 leading-relaxed">
        Designed & Developed by <span className="text-slate-900 font-medium">Dena Alharbi</span>
      </p>
      <div className="flex md:justify-end gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
        <a href="#" className="hover:text-slate-900">Privacy</a>
        <a href="#" className="hover:text-slate-900">Terms</a>
      </div>
    </div>
  </div>
  
  <div className="mt-16 text-center">
    <span className="font-heading italic text-sm tracking-[0.3em] text-slate-200 uppercase">
      © 2026 Sira Premium Systems
    </span>
  </div>
</footer>
    </div>
  );
}