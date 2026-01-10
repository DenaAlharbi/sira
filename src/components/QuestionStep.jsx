import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTemplateQuestions } from '../templates/templateRegistry';
import { useQuestionStepLogic } from '../hooks/useQuestionStepLogic';
import InputRenderer from './inputs/InputRenderer';

export default function QuestionStep({ templateId, form, updateForm, onNext, onExit }) {
  const questions = getTemplateQuestions(templateId);
  
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

  // --- SECTION VIEW (Responsive) ---
  if (currentQuestion?.type === 'section') {
    return (
      <div className="w-full h-full flex flex-col">
        
        {/* HEADER BAR: Back button */}
        <div className="w-full p-4 md:p-6 flex justify-between items-start shrink-0">
          <button 
            onClick={handleBackClick}
            className="text-slate-300 hover:text-slate-900 transition-colors p-2 -ml-2 rounded-full hover:bg-slate-50 group flex items-center gap-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              Back
            </span>
          </button>
        </div>

        {/* CENTERED CONTENT */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 -mt-10">
          {/* Mobile: text-3xl | Desktop: text-5xl */}
          <h2 className="text-3xl md:text-5xl font-heading text-slate-900 mb-4 leading-tight">
            {currentQuestion.label}
          </h2>
          <div className="w-12 md:w-16 h-1 bg-sira-purple mb-6 md:mb-8"></div>
          <button 
            onClick={handleNextClick} 
            className="bg-slate-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
          >
            Begin Section
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW (Responsive) ---
  return (
    <div className="relative flex flex-col h-full justify-between">
      
      {/* Content Area */}
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
            {/* Header: More compact on mobile */}
            <div className="shrink-0 mb-4 md:mb-8">
              <span className="text-[10px] uppercase tracking-[0.2em] text-sira-orange font-bold block mb-2 md:mb-3">
                Question {questionNumber}
              </span>
              
              {/* Mobile: text-2xl | Desktop: text-4xl */}
              <h2 className="text-2xl md:text-4xl font-heading text-slate-900 mb-2 md:mb-3 leading-tight">
                {currentQuestion.label} {currentQuestion.required && <span className="text-sira-purple text-lg align-top">*</span>}
              </h2>
              
              {currentQuestion.sub && (
                <p className="text-slate-400 text-sm font-light leading-relaxed max-w-md">
                  {currentQuestion.sub}
                </p>
              )}
            </div>
            
            {/* Input Renderer */}
            <div className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 md:pr-2 custom-scrollbar pb-12">
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

        {/* ERROR TOAST (Fixed Size Icon + Better Z-Index) */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-0 left-0 right-0 z-20 px-2 md:px-4 pb-2"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-red-600 shadow-lg mx-auto w-full md:w-fit max-w-md">
                <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-red-100 rounded-full">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-semibold tracking-wide leading-tight flex-1">
                  {error}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-3 md:pt-6 border-t border-slate-50 mt-3 md:mt-6 gap-3 shrink-0 bg-white">
        <button 
          onClick={handleBackClick} 
          className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 py-3 px-2 transition-colors"
        >
          Back
        </button>
        
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={onExit} 
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-red-300 hover:text-red-500 py-3 px-2 transition-colors"
          >
            Exit
          </button>
          
          <button 
            onClick={handleNextClick} 
            className="bg-slate-900 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-sira-purple hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}