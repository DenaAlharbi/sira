import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questionLibrary } from '../data/questionLibrary';

export default function QuestionStep({ templateId, form, updateForm, onNext, onExit }) {
  const questions = questionLibrary[templateId] || questionLibrary['Heritage']; 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null); // State to track validation errors

  const currentQuestion = questions[currentQuestionIndex];

  // Initialize arrays for repeaters
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'repeater' && !form[currentQuestion.key]) {
      updateForm({ [currentQuestion.key]: [] });
    }
    setError(null); // Clear errors when switching questions
  }, [currentQuestionIndex]); // Dependency on index ensures it runs on question switch

  // --- HANDLERS ---
  const handleChange = (e) => updateForm({ [currentQuestion.key]: e.target.value });

  const handleRepeaterChange = (fieldKey, itemIndex, subFieldKey, value) => {
    const updatedItems = [...form[fieldKey]];
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], [subFieldKey]: value };
    updateForm({ [fieldKey]: updatedItems });
  };

  const addRepeaterItem = (fieldKey) => {
    updateForm({ [fieldKey]: [...(form[fieldKey] || []), {}] });
    setError(null); // Clear error when user adds an item
  };

  const removeRepeaterItem = (fieldKey, itemIndex) => {
    const updatedItems = form[fieldKey].filter((_, i) => i !== itemIndex);
    updateForm({ [fieldKey]: updatedItems });
  };

  // --- VALIDATION & NAVIGATION ---
  const handleNext = () => {
    // 1. Check Repeater Minimum Requirement
    if (currentQuestion.type === 'repeater' && currentQuestion.min) {
      const currentItems = form[currentQuestion.key] || [];
      if (currentItems.length < currentQuestion.min) {
        setError(`Please add at least ${currentQuestion.min} item(s) to proceed.`);
        return; // Stop! Do not go to next step.
      }
    }

    // 2. Check Required Text Fields (Optional: if you want to enforce names/bios)
    if (['text', 'textarea'].includes(currentQuestion.type) && !form[currentQuestion.key]) {
       // You can enable this if you want to force them to type a name
       // setError("This field is required.");
       // return;
    }

    setError(null); // Clear errors
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onNext();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onExit();
    }
  };

  // --- RENDERERS ---
  const renderInput = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <input
            autoFocus
            type="text"
            className="w-full text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 placeholder:text-slate-200"
            placeholder={question.placeholder}
            value={form[question.key] || ''}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />
        );
      case 'textarea':
        return (
          <textarea
            autoFocus
            rows={4}
            className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 placeholder:text-slate-200 resize-none"
            placeholder={question.placeholder}
            value={form[question.key] || ''}
            onChange={handleChange}
          />
        );
      case 'repeater':
        const items = form[question.key] || [];
        return (
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item, index) => (
              <div key={index} className="p-5 bg-slate-50 rounded-xl relative border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 gap-4">
                  {question.fields.map((field) => (
                    <div key={field.key}>
                      <label className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                        {field.label}
                      </label>
                      
                      {/* NEW: SELECT INPUT RENDERER */}
                      {field.type === 'select' ? (
                        <div className="relative">
                          <select
                            className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-white appearance-none focus:border-sira-purple outline-none"
                            value={item[field.key] || ''}
                            onChange={(e) => handleRepeaterChange(question.key, index, field.key, e.target.value)}
                          >
                            <option value="" disabled>{field.placeholder || 'Select...'}</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {/* Custom Arrow Icon */}
                          <div className="absolute right-3 top-3 pointer-events-none text-slate-400">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                          </div>
                        </div>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-white focus:border-sira-purple outline-none"
                          placeholder={field.placeholder}
                          value={item[field.key] || ''}
                          onChange={(e) => handleRepeaterChange(question.key, index, field.key, e.target.value)}
                        />
                      ) : (
                        <input
                          type="text"
                          className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-white focus:border-sira-purple outline-none"
                          placeholder={field.placeholder}
                          value={item[field.key] || ''}
                          onChange={(e) => handleRepeaterChange(question.key, index, field.key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => removeRepeaterItem(question.key, index)}
                  className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"
                  title="Remove Item"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            ))}
            
            <button 
              onClick={() => addRepeaterItem(question.key)}
              className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-sira-purple hover:text-sira-purple hover:bg-slate-50 transition-all text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2"
            >
              <span className="text-lg">+</span> Add {question.label} Item
            </button>
            
            {/* Helper Text for Requirement */}
            {question.min && items.length < question.min && (
               <p className="text-center text-xs text-sira-orange mt-2 font-medium animate-pulse">
                 * Required: Please add at least {question.min} {question.label.toLowerCase()} item.
               </p>
            )}
          </div>
        );
      default: return null;
    }
  };

  // ... Section Rendering Logic ...
  if (currentQuestion && currentQuestion.type === 'section') {
    return (
      <div className="flex flex-col justify-center items-center h-[400px] text-center">
        <h2 className="text-4xl font-heading text-slate-900 mb-4">{currentQuestion.label}</h2>
        <div className="w-16 h-1 bg-sira-purple mb-8"></div>
        <button onClick={handleNext} className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">Begin Section</button>
      </div>
    );
  }

  return (
    <div className="relative min-h-[450px] flex flex-col justify-between">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="py-4"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-sira-orange font-bold">Question {currentQuestionIndex + 1}</span>
          <h2 className="text-3xl font-heading text-slate-900 mt-2 mb-2">{currentQuestion.label}</h2>
          {currentQuestion.sub && <p className="text-slate-400 text-sm mb-6">{currentQuestion.sub}</p>}

          {renderInput(currentQuestion)}
          
          {/* Validation Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-red-50 text-red-500 text-sm rounded-lg flex items-center gap-2"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12" y2="16"/></svg>
              {error}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-8 border-t border-slate-50 mt-4">
        <div className="flex gap-4">
          <button onClick={handleBack} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900">Back</button>
          <button onClick={onExit} className="text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-red-500">Exit</button>
        </div>
        <button onClick={handleNext} className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-sira-purple transition-all shadow-lg active:scale-95">
          {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}