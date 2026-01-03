import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    title: "Select Your Signature",
    desc: "Browse our curated collection of architectural templates designed for high-impact professional profiles.",
    icon: "01"
  },
  {
    title: "Refine Your Narrative",
    desc: "Answer a few refined questions. We use your data to architect a layout that speaks to your expertise.",
    icon: "02"
  },
  {
    title: "Global Deployment",
    desc: "Preview your live portfolio, secure your custom domain, and launch your presence to the world.",
    icon: "03"
  }
];

export default function OnboardingModal({ isOpen, onClose }) {
  const [current, setCurrent] = useState(0);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white max-w-lg w-full rounded-3xl p-10 shadow-2xl relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "circOut" }}
            className="text-center"
          >
            <div className="text-6xl font-heading italic text-sira-purple/10 mb-6">{steps[current].icon}</div>
            <h2 className="text-3xl font-heading text-slate-900 mb-4">{steps[current].title}</h2>
            <p className="text-slate-500 leading-relaxed mb-10">{steps[current].desc}</p>
          </motion.div>
        </AnimatePresence>

        {/* Slider Indicators */}
        <div className="flex justify-center gap-2 mb-10">
          {steps.map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 rounded-full ${i === current ? 'w-8 bg-sira-purple' : 'w-2 bg-slate-100'}`}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button 
            onClick={() => current > 0 && setCurrent(current - 1)}
            className={`text-[10px] font-bold uppercase tracking-widest ${current === 0 ? 'opacity-0' : 'text-slate-400'}`}
          >
            Back
          </button>
          
          {current < steps.length - 1 ? (
            <button 
              onClick={() => setCurrent(current + 1)}
              className="bg-sira-purple text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest"
            >
              Next Step
            </button>
          ) : (
            <button 
              onClick={onClose}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-xl"
            >
              Begin Journey
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}