import React, { useState } from 'react';
import Header from './components/Header';
import Gallery from './components/Gallery';
import QuestionStep from './components/QuestionStep';
import Preview from './components/Preview';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  // Current view state: 'gallery', 'questions', or 'preview'
  const [view, setView] = useState('gallery');
  
  // Centralized user data
  const [form, setForm] = useState({ 
    fullName: '', 
    title: '', 
    bio: '', 
    image: null 
  });

  // Helper to update specific form fields
  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 antialiased selection:bg-sira-lavender selection:text-sira-purple">
      {/* Floating Glass Header */}
      <Header onHome={() => setView('gallery')} />
      
      {/* Main Content Area */}
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: TEMPLATE GALLERY */}
          {view === 'gallery' && (
            <motion.div 
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-heading text-slate-900 mb-4">
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

          {/* VIEW 2: MODAL QUESTIONNAIRE */}
          {view === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-12 rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100"
              >
                <QuestionStep 
                  form={form} 
                  updateForm={updateForm} 
                  onNext={() => setView('preview')} 
                />
              </motion.div>
            </motion.div>
          )}

          {/* VIEW 3: LIVE PREVIEW */}
          {view === 'preview' && (
            <motion.div 
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="animate-in fade-in duration-700"
            >
              <div className="max-w-5xl mx-auto">
                <Preview 
                  form={form} 
                  onBack={() => setView('questions')} 
                  onNext={() => alert('Proceeding to Mada/Stripe Payment...')} 
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* Subtle Luxury Footer Decoration */}
      <footer className="py-10 text-center opacity-20 pointer-events-none">
        <span className="font-heading italic text-sm tracking-widest text-sira-purple">
          Sira Premium Systems — 2026
        </span>
      </footer>
    </div>
  );
}