import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTemplateQuestions } from '../templates/templateRegistry';
import { useQuestionStepLogic } from '../hooks/useQuestionStepLogic';
import InputRenderer from './inputs/InputRenderer';

export default function QuestionStep({ templateId, form, updateForm, onNext, onExit }) {
  const questions = getTemplateQuestions(templateId);
  
  // 1. USE THE CUSTOM HOOK
  const {
    currentQuestion,
    currentQuestionIndex,
    questionNumber,
    error,
    uploadingState,
    handleChange,
    handleBlur,
    handleSingleUpload,
    handleRepeaterUpload,
    handleRepeaterUpdate,
    handleNextClick,
    handleBackClick
  } = useQuestionStepLogic(questions, form, updateForm, onNext, onExit);

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
      
      {/* Content Area (Includes Header, Input, and Error Toast) */}
      <div className="flex-1 flex flex-col min-h-0 relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentQuestionIndex} 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col min-h-0"
          >
            {/* Header */}
            <div className="shrink-0 mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-sira-orange font-bold block mb-3">
                Question {questionNumber}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading text-slate-900 mb-3 leading-tight">
                {currentQuestion.label} {currentQuestion.required && <span className="text-sira-purple text-lg align-top">*</span>}
              </h2>
              {currentQuestion.sub && (
                <p className="text-slate-400 text-base font-light">{currentQuestion.sub}</p>
              )}
            </div>
            
            {/* Input Renderer */}
            <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-2 custom-scrollbar">
              <InputRenderer 
                question={currentQuestion}
                value={form[currentQuestion.key]}
                form={form}
                updateForm={updateForm}
                onChange={handleChange}
                onBlur={handleBlur}
                onNext={handleNextClick}
                onUpload={handleSingleUpload}
                onRepeaterUpdate={handleRepeaterUpdate}
                onRepeaterUpload={handleRepeaterUpload}
                uploadingState={uploadingState}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Floating Error Toast */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-0 left-0 right-0 z-10"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 shadow-sm mx-auto w-fit max-w-full">
                <div className="shrink-0 bg-red-100 p-1 rounded-full">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/><circle cx="12" cy="12" r="10"/></svg>
                </div>
                <span className="text-sm font-semibold tracking-wide">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6 gap-4 shrink-0 bg-white">
        <button 
          onClick={handleBackClick} 
          className="text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 py-3 px-2 transition-colors"
        >
          Back
        </button>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onExit} 
            className="text-[11px] font-bold uppercase tracking-widest text-red-300 hover:text-red-500 py-3 px-2 transition-colors"
          >
            Exit
          </button>
          
          <button 
            onClick={handleNextClick} 
            className="bg-slate-900 text-white px-8 py-3.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-sira-purple hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}