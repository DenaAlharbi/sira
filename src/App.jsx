import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Component Imports
import Header from './components/Header';
import Gallery from './components/Gallery';
import QuestionStep from './components/QuestionStep';
import Preview from './components/Preview';
import OnboardingModal from './components/OnboardingModal';

// Optional: Import library to test downloading (if you kept that feature)
import { questionLibrary } from './data/questionLibrary';

export default function App() {
  // --- State Management ---
  const [view, setView] = useState('gallery'); 
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // 1. NEW STATE: Track which template was clicked
  // Default to 'BasicFree' so something always loads if logic fails
  const [selectedTemplate, setSelectedTemplate] = useState('BasicFree'); 

  // Centralized user data
  const [form, setForm] = useState({ 
    fullName: '', 
    title: '', 
    bio: '', 
    image: null,
    // Initialize arrays to prevent crashes
    experience: [],
    projects: [],
    contact: [],
    skills: [],
    portfolio: [],
    certifications: [],
    publications: []
  });

  // --- Helpers ---
  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  // 2. NEW HANDLER: Catches the ID from Gallery and switches view
  const handleSelectTemplate = (templateId) => {
    console.log("Template Selected:", templateId); // Check console to verify
    setSelectedTemplate(templateId);
    setView('questions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setView('gallery');
    setShowOnboarding(false);
    setSelectedTemplate(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 antialiased selection:bg-sira-lavender selection:text-sira-purple">
      
      <Header 
        onHome={handleHomeClick} 
        onTemplates={() => setView('gallery')}
        onPricing={() => setView('pricing')}
        onGetStarted={() => setShowOnboarding(true)} 
      />

      <AnimatePresence>
        {showOnboarding && (
          <OnboardingModal 
            isOpen={showOnboarding} 
            onClose={() => setShowOnboarding(false)} 
          />
        )}
      </AnimatePresence>
      
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          
          {/* VIEW: TEMPLATE GALLERY */}
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
              
              {/* 3. FIX: Pass the specific handler, not just setView */}
              <Gallery onSelect={handleSelectTemplate} />
            </motion.div>
          )}

          {/* VIEW: PRICING PAGE */}
          {view === 'pricing' && (
            <motion.div 
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto text-center"
            >
               {/* ... (Your Pricing Code remains the same) ... */}
               <div className="text-center py-20">
                 <h2 className="text-3xl font-heading">Pricing Plans</h2>
                 <button onClick={() => setView('gallery')} className="mt-8 text-sira-purple font-bold">Back to Gallery</button>
               </div>
            </motion.div>
          )}

          {/* VIEW: INTERACTIVE MODAL QUESTIONNAIRE */}
          {view === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md"
              onClick={handleHomeClick} 
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                onClick={(e) => e.stopPropagation()} 
                className="bg-white p-8 md:p-12 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 relative overflow-hidden"
              >
                <button 
                  onClick={handleHomeClick}
                  className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <QuestionStep 
                  templateId={selectedTemplate} // 4. FIX: Pass the ID to the questions
                  form={form} 
                  updateForm={updateForm} 
                  onNext={() => setView('preview')} 
                  onExit={handleHomeClick} 
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
              className="max-w-6xl mx-auto" // Slightly wider for the device preview
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

              {/* Pass the form (which contains templateId implicitly if you saved it, or pass selectedTemplate explicitly) */}
              <Preview 
                form={{...form, templateId: selectedTemplate}} // Ensure Preview knows which template to render
                onBack={() => setView('questions')} 
                onNext={() => alert('Proceeding to Checkout...')} 
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-100 pt-16 pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-heading text-slate-900 font-bold tracking-tight">Sira</span>
              <span className="text-lg font-arabic text-slate-900/40">سيرة</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs uppercase tracking-widest">
              Architecting professional digital identities for the Kingdom's next generation of leaders.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Support & Contact</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@sira.app" className="text-sm text-slate-500 hover:text-sira-purple transition-colors">support@sira.app</a>
              <p className="text-sm text-slate-500">Dhahran, Eastern Province, KSA</p>
            </div>
          </div>

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