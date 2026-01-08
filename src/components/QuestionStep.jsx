import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTemplateQuestions } from '../templates/templateRegistry';
import { useImageUpload } from '../hooks/useImageUpload'; 
import RepeaterField from './inputs/RepeaterField';       

export default function QuestionStep({ templateId, form, updateForm, onNext, onExit }) {
  const questions = getTemplateQuestions(templateId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  
  // Use custom hook for uploads
  const { uploadImage, uploadingState } = useImageUpload(); 

  const currentQuestion = questions[currentQuestionIndex];

  // --- LOGIC ---
  const questionNumber = useMemo(() => {
    if (currentQuestion.type === 'section') return null;
    return questions.slice(0, currentQuestionIndex + 1).filter(q => q.type !== 'section').length;
  }, [currentQuestionIndex, questions, currentQuestion]);

  useEffect(() => {
    if (currentQuestion?.type === 'repeater' && !form[currentQuestion.key]) {
      updateForm({ [currentQuestion.key]: [] });
    }
    setError(null);
  }, [currentQuestionIndex]);

  // --- HANDLERS ---
  const handleSingleUpload = async (file) => {
    const url = await uploadImage(file, currentQuestion.key);
    if (url) updateForm({ [currentQuestion.key]: url });
  };

  const handleRepeaterUpload = async (file, index, fieldKey) => {
    const url = await uploadImage(file, `${index}-${fieldKey}`);
    if (url) {
      const updatedItems = [...form[currentQuestion.key]];
      updatedItems[index] = { ...updatedItems[index], [fieldKey]: url };
      updateForm({ [currentQuestion.key]: updatedItems });
    }
  };

  const handleNextClick = () => {
    // Validation
    const val = form[currentQuestion.key];
    
    if (currentQuestion.type === 'repeater') {
      const items = val || [];
      if (currentQuestion.min && items.length < currentQuestion.min) return setError(`Add at least ${currentQuestion.min} item(s).`);
      if (currentQuestion.fields) {
        const missing = items.some(item => currentQuestion.fields.some(f => f.required && !item[f.key]));
        if (missing) return setError("Please complete all required fields.");
      }
    } else if (currentQuestion.required && (!val || !val.trim())) {
      return setError("This field is required.");
    }

    setError(null);
    if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(prev => prev + 1);
    else onNext();
  };

  // --- RENDERERS ---
  const renderInput = () => {
    const value = form[currentQuestion.key] || '';

    switch (currentQuestion.type) {
      case 'text':
        return <input autoFocus type="text" className="w-full text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 transition-colors" placeholder={currentQuestion.placeholder} value={value} onChange={e => updateForm({ [currentQuestion.key]: e.target.value })} onKeyDown={e => e.key === 'Enter' && handleNextClick()} />;
      
      case 'textarea':
        return <textarea autoFocus rows={4} className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 resize-none" placeholder={currentQuestion.placeholder} value={value} onChange={e => updateForm({ [currentQuestion.key]: e.target.value })} />;
      
      case 'image':
        return (
          <div className="w-full flex items-center gap-6">
            {value && <img src={value} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-slate-300" />}
            <label className={`flex-1 cursor-pointer border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-sira-purple transition-all px-6 py-8 rounded-xl flex flex-col items-center justify-center gap-2 h-32 ${uploadingState[currentQuestion.key] ? 'opacity-50' : ''}`}>
              {uploadingState[currentQuestion.key] ? <span>Uploading...</span> : <span>{value ? 'Replace Image' : 'Click to Upload'}</span>}
              <input type="file" accept="image/*" className="hidden" onChange={e => handleSingleUpload(e.target.files[0])} />
            </label>
          </div>
        );

      case 'image-select':
        return (
          <div className="space-y-6">
            {/* 1. The Presets Grid */}
            <div className="grid grid-cols-3 gap-4">
              {currentQuestion.options?.map((optionUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => updateForm({ [currentQuestion.key]: optionUrl })}
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                    value === optionUrl 
                      ? 'border-sira-purple ring-2 ring-sira-purple/20 scale-95' 
                      : 'border-slate-100 hover:border-sira-purple/50 hover:scale-105'
                  }`}
                >
                  <img src={optionUrl} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                  
                  {/* Selected Checkmark */}
                  {value === optionUrl && (
                    <div className="absolute inset-0 bg-sira-purple/20 flex items-center justify-center">
                      <div className="bg-white text-sira-purple rounded-full p-1 shadow-sm">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5" /></svg>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
               <div className="h-px bg-slate-200 flex-1"></div>
               <span className="text-[10px] uppercase text-slate-400 font-bold tracking-widest">OR</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            {/* 2. The Upload Button */}
            <div className="w-full">
               <label className={`flex cursor-pointer border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-sira-purple transition-all px-6 py-6 rounded-xl text-xs font-bold uppercase tracking-widest items-center justify-center gap-3 ${uploadingState[currentQuestion.key] ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploadingState[currentQuestion.key] ? (
                     <span>Uploading...</span>
                  ) : (
                     <span>Upload Custom Photo</span>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleUpload(e.target.files[0])} />
                </label>
            </div>
          </div>
        );

      case 'repeater':
        const items = form[currentQuestion.key] || [];
        return (
          <RepeaterField 
            items={items}
            fields={currentQuestion.fields}
            questionKey={currentQuestion.key}
            onUpdate={(idx, key, val) => {
              const updated = [...items];
              updated[idx] = { ...updated[idx], [key]: val };
              updateForm({ [currentQuestion.key]: updated });
            }}
            onAdd={() => !currentQuestion.max || items.length < currentQuestion.max ? updateForm({ [currentQuestion.key]: [...items, {}] }) : null}
            onRemove={(idx) => updateForm({ [currentQuestion.key]: items.filter((_, i) => i !== idx) })}
            onUpload={handleRepeaterUpload}
            uploadingState={uploadingState}
            isMaxReached={currentQuestion.max && items.length >= currentQuestion.max}
            limitReason={currentQuestion.limitReason}
            min={currentQuestion.min}
          />
        );
      default: return null;
    }
  };

  // --- SECTION VIEW ---
  if (currentQuestion?.type === 'section') {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center px-4 py-8">
        <h2 className="text-4xl font-heading text-slate-900 mb-4">{currentQuestion.label}</h2>
        <div className="w-16 h-1 bg-sira-purple mb-8"></div>
        <button onClick={handleNextClick} className="bg-slate-900 text-white px-8 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">Begin Section</button>
      </div>
    );
  }

  // --- MAIN VIEW ---
  return (
    <div className="relative flex flex-col h-full justify-between">
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestionIndex} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex-1 flex flex-col min-h-0">
          <div className="shrink-0 mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-sira-orange font-bold block mb-2">Question {questionNumber}</span>
            <h2 className="text-3xl font-heading text-slate-900 mb-2 leading-tight">{currentQuestion.label} {currentQuestion.required && <span className="text-sira-purple text-lg">*</span>}</h2>
            {currentQuestion.sub && <p className="text-slate-400 text-sm mb-6">{currentQuestion.sub}</p>}
          </div>
          <div className="flex-1 min-h-0 flex flex-col">{renderInput()}</div>
          {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg">{error}</div>}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4 gap-3 shrink-0">
        <button onClick={() => currentQuestionIndex > 0 ? setCurrentQuestionIndex(prev => prev - 1) : onExit()} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 p-2">Back</button>
        <div className="flex gap-3">
          <button onClick={onExit} className="text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-red-500 py-2 px-2">Exit</button>
          <button onClick={handleNextClick} className="bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-sira-purple transition-all shadow-lg">
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}