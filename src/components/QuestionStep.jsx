import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function QuestionStep({ form, updateForm, onNext, onExit }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      id: 'name',
      label: 'Your Name',
      sub: 'The foundation of your digital identity.',
      placeholder: 'Abdullah Bin Ahmed',
      key: 'fullName',
      type: 'text'
    },
    {
      id: 'title',
      label: 'Professional Title',
      sub: 'How should the world recognize your expertise?',
      placeholder: 'Architectural Consultant',
      key: 'title',
      type: 'text'
    },
    {
      id: 'bio',
      label: 'Your Narrative',
      sub: 'A brief summary of your vision and journey.',
      placeholder: 'Describe your expertise...',
      key: 'bio',
      type: 'textarea'
    }
  ];

  const nextChild = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onNext();
    }
  };

  const prevChild = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const current = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="relative min-h-[400px] flex flex-col justify-between">
      {/* Progress Bar */}
      <div className="absolute -top-8 left-0 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-sira-purple"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="py-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-sira-orange font-bold">
            Step 0{currentStep + 1}
          </span>
          <h2 className="text-3xl font-heading text-slate-900 mt-2 mb-1">{current.label}</h2>
          <p className="text-slate-400 text-sm mb-10">{current.sub}</p>

          {current.type === 'text' ? (
            <input
              autoFocus
              className="w-full text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 transition-all placeholder:text-slate-200"
              placeholder={current.placeholder}
              value={form[current.key]}
              onChange={(e) => updateForm({ [current.key]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && nextChild()}
            />
          ) : (
            <textarea
              autoFocus
              className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 transition-all placeholder:text-slate-200 min-h-[150px] resize-none"
              placeholder={current.placeholder}
              value={form[current.key]}
              onChange={(e) => updateForm({ [current.key]: e.target.value })}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-10 border-t border-slate-50">
        <div className="flex gap-6">
          {/* Back Button */}
          <button 
            type="button"
            onClick={prevChild}
            className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
              currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-slate-900'
            }`}
          >
            Back
          </button>
          
          {/* Exit Button - Now explicitly uses onExit */}
          <button 
            type="button"
            onClick={onExit} 
            className="text-[10px] font-bold uppercase tracking-widest text-slate-300 hover:text-red-500 transition-colors"
          >
            Cancel & Exit
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-[10px] text-slate-300 font-bold uppercase tracking-widest">
            Press Enter ↵
          </span>
          <button 
            type="button"
            onClick={nextChild}
            className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-sira-purple transition-all shadow-lg active:scale-95"
          >
            {currentStep === steps.length - 1 ? 'See Preview' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}