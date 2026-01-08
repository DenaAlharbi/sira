import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getTemplateQuestions } from '../templates/templateRegistry';
import { supabase } from '../supabaseClient'; 

export default function QuestionStep({ templateId, form, updateForm, onNext, onExit }) {
  const questions = getTemplateQuestions(templateId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  
  // Track uploading state
  const [uploadingState, setUploadingState] = useState({}); 

  const currentQuestion = questions[currentQuestionIndex];

  // --- SMART NUMBERING ---
  const questionNumber = useMemo(() => {
    if (currentQuestion.type === 'section') return null;
    let count = 0;
    for (let i = 0; i <= currentQuestionIndex; i++) {
      if (questions[i].type !== 'section') count++;
    }
    return count;
  }, [currentQuestionIndex, questions, currentQuestion]);

  // --- INITIALIZATION ---
  useEffect(() => {
    if (currentQuestion && currentQuestion.type === 'repeater' && !form[currentQuestion.key]) {
      updateForm({ [currentQuestion.key]: [] });
    }
    setError(null);
  }, [currentQuestionIndex]);

  // --- HANDLERS ---
  const handleChange = (e) => updateForm({ [currentQuestion.key]: e.target.value });

  const handleRepeaterChange = (fieldKey, itemIndex, subFieldKey, value) => {
    const updatedItems = [...form[fieldKey]];
    updatedItems[itemIndex] = { ...updatedItems[itemIndex], [subFieldKey]: value };
    updateForm({ [fieldKey]: updatedItems });
  };

  const addRepeaterItem = (fieldKey) => {
    const currentItems = form[fieldKey] || [];
    if (currentQuestion.max && currentItems.length >= currentQuestion.max) {
      return; 
    }
    updateForm({ [fieldKey]: [...currentItems, {}] });
    setError(null);
  };

  const removeRepeaterItem = (fieldKey, itemIndex) => {
    const updatedItems = form[fieldKey].filter((_, i) => i !== itemIndex);
    updateForm({ [fieldKey]: updatedItems });
  };

  // --- IMAGE COMPRESSION HELPER ---
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200; 
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }, 'image/jpeg', 0.7); 
        };
      };
    });
  };

  // --- REPEATER UPLOAD LOGIC ---
  const handleImageUpload = async (originalFile, index, fieldKey) => {
    try {
      if (!originalFile) return;

      const loaderKey = `${index}-${fieldKey}`;
      setUploadingState(prev => ({ ...prev, [loaderKey]: true }));

      const file = await compressImage(originalFile);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets') 
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(fileName);

      handleRepeaterChange(currentQuestion.key, index, fieldKey, data.publicUrl);

    } catch (error) {
      console.error(error);
      alert('Upload failed: ' + (error.message || "Network Error"));
    } finally {
      const loaderKey = `${index}-${fieldKey}`;
      setUploadingState(prev => ({ ...prev, [loaderKey]: false }));
    }
  };

  // --- SINGLE IMAGE UPLOAD LOGIC (For Headers) ---
  const handleSingleImageUpload = async (originalFile) => {
    try {
      if (!originalFile) return;
      const loaderKey = currentQuestion.key;
      setUploadingState(prev => ({ ...prev, [loaderKey]: true }));
      
      const file = await compressImage(originalFile);
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
      
      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(fileName, file);
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(fileName);
      updateForm({ [currentQuestion.key]: data.publicUrl }); 
      
    } catch (error) {
      alert('Upload failed: ' + error.message);
    } finally {
      setUploadingState(prev => ({ ...prev, [currentQuestion.key]: false }));
    }
  };

  // --- NAVIGATION & VALIDATION ---
  const handleNext = () => {
    // Validation for Repeater
    if (currentQuestion.type === 'repeater') {
      const currentItems = form[currentQuestion.key] || [];
      if (currentQuestion.min && currentItems.length < currentQuestion.min) {
        setError(`Please add at least ${currentQuestion.min} item(s) to proceed.`);
        return;
      }
      if (currentQuestion.fields) {
        for (let item of currentItems) {
           for (let field of currentQuestion.fields) {
              if (field.required && (!item[field.key] || item[field.key].trim() === '')) {
                 setError(`Please fill in the "${field.label}" field for all items.`);
                 return;
              }
           }
        }
      }
    }

    // Validation for Text/Textarea/Image
    if (['text', 'textarea', 'image'].includes(currentQuestion.type)) {
       const value = form[currentQuestion.key] || '';
       if (currentQuestion.required && (!value || value.trim() === '')) {
         setError("This field is required.");
         return;
       }
       if (currentQuestion.minLength && value.length < currentQuestion.minLength) {
         setError(`Please keep writing! Minimum ${currentQuestion.minLength} characters required.`);
         return;
       }
    }

    setError(null);
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

  // --- RENDER HELPERS ---
  const renderInput = (question) => {
    switch (question.type) {
      case 'text':
        return (
          <input
            autoFocus
            type="text"
            className="w-full text-lg md:text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-2 md:py-4 placeholder:text-slate-300 transition-colors"
            placeholder={question.placeholder}
            value={form[question.key] || ''}
            onChange={handleChange}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />
        );
      case 'textarea':
        const val = form[question.key] || '';
        return (
          <div className="relative">
            <textarea
              autoFocus
              rows={4}
              className="w-full text-base md:text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-2 md:py-4 placeholder:text-slate-300 resize-none transition-colors"
              placeholder={question.placeholder}
              value={val}
              onChange={handleChange}
            />
            {question.minLength && (
               <div className={`text-right text-[10px] md:text-xs mt-1 font-mono ${val.length < question.minLength ? 'text-sira-orange' : 'text-green-500'}`}>
                 {val.length} / {question.minLength}
               </div>
            )}
          </div>
        );

      // --- THIS WAS MISSING IN YOUR CODE ---
      case 'image':
        return (
          <div className="w-full">
             <div className="flex items-center gap-6">
                {/* Preview Box */}
                {form[question.key] && (
                  <div className="w-24 h-24 rounded-xl bg-slate-200 overflow-hidden border border-slate-300 shadow-sm shrink-0">
                    <img src={form[question.key]} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                {/* Upload Button */}
                <label className={`flex-1 cursor-pointer border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-sira-purple hover:text-sira-purple transition-all px-6 py-8 rounded-xl text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-2 h-32 ${uploadingState[question.key] ? 'opacity-50 pointer-events-none' : ''}`}>
                  {uploadingState[question.key] ? (
                     <div className="flex flex-col items-center gap-2">
                       <div className="w-5 h-5 border-2 border-sira-purple border-t-transparent rounded-full animate-spin"></div>
                       <span>Uploading...</span>
                     </div>
                  ) : (
                     <>
                       <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                       <span>{form[question.key] ? 'Replace Image' : 'Click to Upload Image'}</span>
                     </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSingleImageUpload(e.target.files[0])} />
                </label>
             </div>
             {question.helper && <p className="text-xs text-slate-400 mt-3 text-center">{question.helper}</p>}
          </div>
        );
      // ------------------------------------

      case 'repeater':
        const items = form[question.key] || [];
        const isMaxReached = question.max && items.length >= question.max;

        return (
          <div className="w-full flex flex-col h-full">
            <div className="space-y-3 md:space-y-4 overflow-y-auto pr-1 custom-scrollbar mb-3 md:mb-4 flex-1 min-h-0">
              {items.map((item, index) => (
                <div key={index} className="p-3 md:p-5 bg-slate-50 rounded-lg md:rounded-xl relative border border-slate-100 shadow-sm animate-fadeIn">
                  <div className="grid grid-cols-1 gap-3 md:gap-4">
                    {question.fields.map((field) => (
                      <div key={field.key}>
                        {field.type === 'image' ? (
                          <div className="space-y-2">
                             <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                               {field.label} {field.required && <span className="text-red-400">*</span>}
                             </label>
                             <div className="flex items-start gap-4">
                               {item[field.key] && (
                                 <div className="w-20 h-20 rounded-lg bg-slate-200 overflow-hidden border border-slate-300 shadow-sm shrink-0">
                                   <img src={item[field.key]} alt="Preview" className="w-full h-full object-cover" />
                                 </div>
                               )}
                               <div className="flex-1">
                                 <label className={`cursor-pointer border border-slate-200 bg-white hover:border-sira-purple hover:text-sira-purple transition-all px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-2 w-full h-20 border-dashed ${uploadingState[`${index}-${field.key}`] ? 'opacity-50 pointer-events-none bg-slate-50' : ''}`}>
                                   {uploadingState[`${index}-${field.key}`] ? (
                                     <>
                                       <div className="w-4 h-4 border-2 border-sira-purple border-t-transparent rounded-full animate-spin"></div>
                                       <span>Uploading...</span>
                                     </>
                                   ) : (
                                     <>
                                       <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                       <span>{item[field.key] ? 'Replace Image' : 'Click to Upload'}</span>
                                     </>
                                   )}
                                   <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e.target.files[0], index, field.key)} />
                                 </label>
                               </div>
                             </div>
                          </div>
                        ) : (
                          /* STANDARD INPUTS */
                          <>
                            <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                              {field.label} {field.required && <span className="text-red-400">*</span>}
                            </label>
                            {field.type === 'select' ? (
                              <div className="relative">
                                <select
                                  className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md md:rounded-lg bg-white appearance-none focus:border-sira-purple outline-none transition-colors"
                                  value={item[field.key] || ''}
                                  onChange={(e) => handleRepeaterChange(question.key, index, field.key, e.target.value)}
                                >
                                  <option value="" disabled>{field.placeholder || 'Select...'}</option>
                                  {field.options.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              </div>
                            ) : field.type === 'textarea' ? (
                              <textarea
                                rows={2}
                                className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md md:rounded-lg bg-white focus:border-sira-purple outline-none transition-colors resize-none"
                                placeholder={field.placeholder}
                                value={item[field.key] || ''}
                                onChange={(e) => handleRepeaterChange(question.key, index, field.key, e.target.value)}
                              />
                            ) : (
                              <input
                                type="text"
                                className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md md:rounded-lg bg-white focus:border-sira-purple outline-none transition-colors"
                                placeholder={field.placeholder}
                                value={item[field.key] || ''}
                                onChange={(e) => handleRepeaterChange(question.key, index, field.key, e.target.value)}
                              />
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => removeRepeaterItem(question.key, index)}
                    className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>

            {!isMaxReached ? (
              <button 
                onClick={() => addRepeaterItem(question.key)}
                className="w-full py-3 md:py-4 border border-dashed border-slate-300 rounded-lg md:rounded-xl text-slate-500 hover:border-sira-purple hover:text-sira-purple hover:bg-slate-50 transition-all text-[10px] md:text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shrink-0"
              >
                <span className="text-sm md:text-lg">+</span> Add {question.label} Item
              </button>
            ) : (
               <div className="text-center p-2 bg-slate-50 border border-slate-100 rounded-lg shrink-0">
                 <p className="text-[10px] md:text-xs text-slate-400 font-medium">
                   {question.limitReason || "Limit reached."}
                 </p>
               </div>
            )}
             {question.min && items.length < question.min && (
               <p className="text-center text-[10px] text-sira-orange mt-2 font-medium shrink-0">
                 * Required: Please add at least {question.min} entry.
               </p>
            )}
          </div>
        );
      default: return null;
    }
  };

  if (currentQuestion && currentQuestion.type === 'section') {
    return (
      <div className="flex flex-col justify-center items-center h-full text-center px-4 py-8">
        <h2 className="text-2xl md:text-4xl font-heading text-slate-900 mb-4">{currentQuestion.label}</h2>
        <div className="w-12 md:w-16 h-1 bg-sira-purple mb-6 md:mb-8"></div>
        <button 
          onClick={handleNext} 
          className="bg-slate-900 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform w-full md:w-auto shadow-xl"
        >
          Begin Section
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full justify-between">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="shrink-0">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-sira-orange font-bold block mb-1 md:mb-2">
              Question {questionNumber}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading text-slate-900 mb-1 md:mb-2 leading-tight">
              {currentQuestion.label} {currentQuestion.required && <span className="text-sira-purple text-lg align-top">*</span>}
            </h2>
            {currentQuestion.sub && (
              <p className="text-slate-400 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">
                {currentQuestion.sub}
              </p>
            )}
          </div>

          <div className="flex-1 min-h-0 flex flex-col">
            {renderInput(currentQuestion)}
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -5 }} 
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 md:mt-4 p-3 bg-red-50 text-red-600 text-xs md:text-sm font-medium rounded-lg flex items-center gap-2 border border-red-100 shadow-sm shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-500">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              {error}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-4 md:pt-8 border-t border-slate-50 mt-3 md:mt-4 gap-3 shrink-0">
        <button onClick={handleBack} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 py-2 px-2">Back</button>
        <div className="flex gap-3">
            <button onClick={onExit} className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-red-300 hover:text-red-500 py-2 px-2">Exit</button>
            <button 
              onClick={handleNext} 
              className="bg-slate-900 text-white px-6 py-3 md:px-8 md:py-3 rounded-lg md:rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-sira-purple transition-all shadow-lg active:scale-95"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
        </div>
      </div>
    </div>
  );
}