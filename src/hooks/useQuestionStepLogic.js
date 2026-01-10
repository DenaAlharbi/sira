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

 const handleRepeaterUpdate = (idx, key, val) => {
    // 1. CLEAR ERROR: Remove the error message as soon as the user types
    if (error) setError(null);

    const items = form[currentQuestion.key] || [];
    const updated = [...items];
    
    // Update the value
    updated[idx] = { ...updated[idx], [key]: val };
    updateForm({ [currentQuestion.key]: updated });
    
    // Get latest state of this item
    const currentItem = updated[idx];
    const platform = currentItem.platform;
    const value = currentItem.value;

    // VALIDATE: Trigger specific checks (only for Contact/Social fields)
    if (key === 'value' || key === 'platform') {
      
      if (value) {
        const check = runValidation(null, value, platform);
        
        // Note: We don't block typing here, just show error if invalid format
        if (!check.isValid) {
          setError(check.error);
        }

        // GitHub Debounce
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
// --- SAFER NEXT BUTTON LOGIC ---
  const handleNextClick = () => {
    // 1. Block if there is an existing validation error (like invalid email format)
    if (error) return;

    const val = form[currentQuestion.key];

    // --- CASE A: REPEATER FIELDS ---
    if (currentQuestion.type === 'repeater') {
      const items = val || [];
      
      // Check Min Quantity
      if (currentQuestion.min && items.length < currentQuestion.min) {
        return setError(`Add at least ${currentQuestion.min} item(s).`);
      }

      // Check Required Fields inside the repeater
      if (currentQuestion.fields) {
        const missing = items.some(item => currentQuestion.fields.some(f => f.required && !item[f.key]));
        if (missing) return setError("Please complete all required fields.");
      }

      // Re-validate content (Email/Phone inside repeater)
      for (const item of items) {
        if (item.platform && item.value) {
           const check = runValidation(null, item.value, item.platform);
           if (!check.isValid) return setError(check.error);
        }
      }
    } 
    
    // --- CASE B: STANDARD FIELDS (Text, Textarea, Select) ---
    else {
      // 1. Check Required (Is it empty?)
      // We check !val first. If it exists, we trim it to ensure it's not just spaces.
      const isEmpty = !val || (typeof val === 'string' && !val.trim());
      
      if (currentQuestion.required && isEmpty) {
        return setError("This field is required.");
      }
      
      // 2. Check Character Limits (Run only if not empty)
      if (!isEmpty) {
        // Min Length Check
        if (currentQuestion.minLength && val.length < currentQuestion.minLength) {
          return setError(`Must be at least ${currentQuestion.minLength} characters. (Current: ${val.length})`);
        }
        
        // Max Length Check
        if (currentQuestion.maxLength && val.length > currentQuestion.maxLength) {
           return setError(`Must be less than ${currentQuestion.maxLength} characters.`);
        }
      }

      // 3. Type Validation (Email/Phone/URL format)
      if (!isEmpty) {
        const check = runValidation(currentQuestion.key, val);
        if (!check.isValid) {
          return setError(check.error);
        }
      }
    }

    // --- SUCCESS: PROCEED ---
    setError(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      onNext();
    }
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