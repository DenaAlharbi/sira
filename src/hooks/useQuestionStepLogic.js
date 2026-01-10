import { useState, useMemo, useEffect } from 'react';
import { useImageUpload } from './useImageUpload'; // Assuming this exists
import { validateEmail, validatePhone, validateUrl, verifyGithubUser } from '../utils/validators';

export const useQuestionStepLogic = (questions, form, updateForm, onNext, onExit) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [githubTimer, setGithubTimer] = useState(null);
  
  const { uploadImage, uploadingState } = useImageUpload();
  const currentQuestion = questions[currentQuestionIndex];

  // Logic: Calculate visible question number
  const questionNumber = useMemo(() => {
    if (currentQuestion.type === 'section') return null;
    return questions.slice(0, currentQuestionIndex + 1).filter(q => q.type !== 'section').length;
  }, [currentQuestionIndex, questions, currentQuestion]);

  // Logic: Initialize arrays for repeaters
  useEffect(() => {
    if (currentQuestion?.type === 'repeater' && !form[currentQuestion.key]) {
      updateForm({ [currentQuestion.key]: [] });
    }
    setError(null);
  }, [currentQuestionIndex]);

  // --- VALIDATION CORE ---
  const runValidation = (key, value, platform = null) => {
    if (key === 'email' || platform === 'Email') return validateEmail(value);
    if (key === 'phone' || platform === 'Phone') return validatePhone(value);
    if (['LinkedIn', 'Twitter / X', 'Website', 'Instagram', 'Behance', 'GitHub'].includes(platform)) {
      return validateUrl(value, platform);
    }
    return { isValid: true };
  };

  // --- HANDLERS ---
  const handleBlur = (e) => {
    const result = runValidation(currentQuestion.key, e.target.value);
    if (!result.isValid) setError(result.error);
    else setError(null);
  };

  const handleChange = (val) => {
    if (error) setError(null);
    updateForm({ [currentQuestion.key]: val });
  };

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

  const handleRepeaterUpdate = (idx, key, val) => {
    const items = form[currentQuestion.key] || [];
    const updated = [...items];
    const platform = updated[idx].platform;
    
    updated[idx] = { ...updated[idx], [key]: val };
    updateForm({ [currentQuestion.key]: updated });

    if (key === 'value') {
      const check = runValidation(null, val, platform);
      if (!check.isValid) {
        setError(check.error);
        return;
      } else {
        setError(null);
      }

      // GitHub Debounce
      if (platform === 'GitHub' && val.length > 2) {
        if (githubTimer) clearTimeout(githubTimer);
        const timer = setTimeout(async () => {
             const ghCheck = await verifyGithubUser(val);
             if (!ghCheck.isValid) setError(ghCheck.error);
        }, 800);
        setGithubTimer(timer);
      }
    }
  };

  const handleNextClick = () => {
    if (error) return;

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

  const handleBackClick = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(prev => prev - 1);
    else onExit();
  };

  return {
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
  };
};