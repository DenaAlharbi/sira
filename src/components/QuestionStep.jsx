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

  // --- SECTION VIEW ---
  if (currentQuestion?.type === 'section') {
    return (
      <div className="w-full h-full flex flex-col">
        {/* Header Bar */}
        <div className="w-full p-4 flex justify-between items-start shrink-0">
          <button 
            onClick={handleBackClick}
            className="text-slate-200 hover:text-slate-900 transition-colors p-1 -ml-2 rounded-full hover:bg-slate-50 group flex items-center gap-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
              Back
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-4 -mt-10">
          <h2 className="text-3xl md:text-5xl font-heading text-slate-900 mb-4 leading-tight">
            {currentQuestion.label}
          </h2>
          <div className="w-12 h-1 bg-sira-purple mb-6 md:mb-8"></div>
          <button 
            onClick={handleNextClick} 
            className="bg-slate-900 text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl text-[11px] md:text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-lg"
          >
            Begin Section
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN VIEW ---
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
            {/* HEADER */}
            <div className="shrink-0 mb-2 md:mb-8">
              <div className="flex flex-col items-start mb-1 md:mb-3">
                 <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-sira-orange font-bold mb-1 md:mb-3">
                  Question {questionNumber}
                </span>
                <h2 className="text-xl md:text-4xl font-heading text-slate-900 leading-tight">
                  {currentQuestion.label} {currentQuestion.required && <span className="text-sira-purple text-base md:text-lg align-top">*</span>}
                </h2>
              </div>
              
             
            </div>
            
            {/* INPUT RENDERER */}
            {/* Added a shake animation if there is an error */}
            <motion.div 
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex-1 min-h-0 flex flex-col overflow-y-auto pr-1 md:pr-2 custom-scrollbar pb-2 [&_::placeholder]:!text-[13px] md:[&_::placeholder]:!text-3xl"
            >
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
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ERROR TOAST - RESTORED & POSITIONED */}
        <AnimatePresence>
          {error && (
            <motion.div 
              // Slide down from top on mobile, up from bottom on desktop
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-0 left-0 right-0 z-50 md:top-auto md:bottom-0 p-4 pointer-events-none"
            >
              <div className="flex items-center gap-3 px-4 py-3 bg-red-50/95 border border-red-100 rounded-xl text-red-600 shadow-xl backdrop-blur-md mx-auto w-full max-w-sm md:w-fit pointer-events-auto">
                <div className="shrink-0 w-6 h-6 flex items-center justify-center bg-red-100 rounded-full">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-bold tracking-wide leading-tight flex-1">
                  {error}
                </span>
                {/* Close Button for Error */}
                <button onClick={() => handleBlur()} className="p-1 hover:bg-red-100 rounded-full transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between mt-2 md:pt-6 md:border-t md:border-slate-50 md:mt-6 gap-3 shrink-0 md:bg-white pb-2 md:pb-0 px-1 md:px-0">
        <button 
          onClick={handleBackClick} 
          className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 p-2 transition-colors"
        >
          Back
        </button>
        
        <div>
          <button 
            onClick={handleNextClick} 
            className="text-sira-purple hover:text-sira-purple-dark md:bg-slate-900 md:text-white md:px-8 md:py-3.5 md:rounded-xl text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] md:hover:bg-sira-purple md:hover:shadow-lg md:hover:-translate-y-0.5 md:active:translate-y-0 transition-all duration-300 p-2"
          >
            {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}