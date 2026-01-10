import { useState, useMemo, useEffect } from 'react';
import { useImageUpload } from './useImageUpload'; 
import { validateEmail, validatePhone, validateUrl, verifyGithubUser } from '../utils/validators';

export const useQuestionStepLogic = (questions, form, updateForm, onNext, onExit) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [githubTimer, setGithubTimer] = useState(null);
  
  const { uploadImage, uploadingState } = useImageUpload();
  const currentQuestion = questions[currentQuestionIndex];

  // Helper: Calculate visible question number
  const questionNumber = useMemo(() => {
    if (currentQuestion.type === 'section') return null;
    return questions.slice(0, currentQuestionIndex + 1).filter(q => q.type !== 'section').length;
  }, [currentQuestionIndex, questions, currentQuestion]);

  // Helper: Initialize arrays
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
    
    const urlPlatforms = ['LinkedIn', 'Twitter / X', 'Website', 'Instagram', 'Behance', 'GitHub'];
    if (urlPlatforms.includes(platform)) {
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

  // --- UPDATED REPEATER LOGIC ---
  const handleRepeaterUpdate = (idx, key, val) => {
    const items = form[currentQuestion.key] || [];
    const updated = [...items];
    
    // Update the value
    updated[idx] = { ...updated[idx], [key]: val };
    updateForm({ [currentQuestion.key]: updated });
    
    // Get latest state of this item
    const currentItem = updated[idx];
    const platform = currentItem.platform;
    const value = currentItem.value;

    // VALIDATE: Trigger if we change the VALUE -OR- the PLATFORM
    if (key === 'value' || key === 'platform') {
      
      // Only validate if we actually have a value to check
      if (value) {
        const check = runValidation(null, value, platform);
        
        if (!check.isValid) {
          setError(check.error);
          return; 
        } else {
          setError(null);
        }

        // GitHub Debounce (Only triggers if typing value, not changing platform)
        if (key === 'value' && platform === 'GitHub' && value.length > 2) {
          if (githubTimer) clearTimeout(githubTimer);
          const timer = setTimeout(async () => {
              const ghCheck = await verifyGithubUser(value);
              if (!ghCheck.isValid) setError(ghCheck.error);
          }, 800);
          setGithubTimer(timer);
        }
      }
    }
  };

  // --- UPDATED NEXT BUTTON LOGIC (THE FIX) ---
  const handleNextClick = () => {
    // 1. Check if there is an existing error displayed
    if (error) return;

    const val = form[currentQuestion.key];

    // 2. REPEATER VALIDATION (Strict Check)
    if (currentQuestion.type === 'repeater') {
      const items = val || [];
      
      // A. Check Min Length
      if (currentQuestion.min && items.length < currentQuestion.min) {
        return setError(`Add at least ${currentQuestion.min} item(s).`);
      }

      // B. Check Empty Required Fields
      if (currentQuestion.fields) {
        const missing = items.some(item => currentQuestion.fields.some(f => f.required && !item[f.key]));
        if (missing) return setError("Please complete all required fields.");
      }

      // C. FORCE RE-VALIDATION OF CONTENT (The Fix)
      // Loop through every item and run the validator again.
      for (const item of items) {
        // Check Contact Repeater items specifically
        if (item.platform && item.value) {
           const check = runValidation(null, item.value, item.platform);
           if (!check.isValid) {
             return setError(check.error); // Stop and show error
           }
        }
      }
    } 
    // 3. STANDARD FIELD VALIDATION
    else {
      // A. Check Required
      if (currentQuestion.required && (!val || !val.trim())) {
        return setError("This field is required.");
      }
      
      // B. Force Re-Validation (e.g. Email/Phone input)
      const check = runValidation(currentQuestion.key, val);
      if (!check.isValid) {
        return setError(check.error);
      }
    }

    // 4. Success -> Move Next
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