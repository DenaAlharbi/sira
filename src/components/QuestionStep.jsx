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
      <AnimatePresence mode="wait">
        <motion.div key={currentQuestionIndex} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="flex-1 flex flex-col min-h-0">
          
          {/* Header */}
          <div className="shrink-0 mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-sira-orange font-bold block mb-2">Question {questionNumber}</span>
            <h2 className="text-3xl font-heading text-slate-900 mb-2 leading-tight">
              {currentQuestion.label} {currentQuestion.required && <span className="text-sira-purple text-lg">*</span>}
            </h2>
            {currentQuestion.sub && <p className="text-slate-400 text-sm mb-6">{currentQuestion.sub}</p>}
          </div>
          
          {/* Render Input via Sub-Component */}
          <div className="flex-1 min-h-0 flex flex-col">
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

          {/* Error */}
          {error && <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg animate-pulse">⚠️ {error}</div>}
        </motion.div>
      </AnimatePresence>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4 gap-3 shrink-0">
        <button onClick={handleBackClick} className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 p-2">Back</button>
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