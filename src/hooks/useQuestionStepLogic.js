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
    if (!currentQuestion || currentQuestion.type === 'section') return null;
    return questions.slice(0, currentQuestionIndex + 1).filter(q => q.type !== 'section').length;
  }, [currentQuestionIndex, questions, currentQuestion]);

  // Helper: Initialize arrays for repeaters
  useEffect(() => {
    if (currentQuestion?.type === 'repeater' && !form[currentQuestion.key]) {
      updateForm({ [currentQuestion.key]: [] });
    }
    setError(null);
  }, [currentQuestionIndex]);

  // --- 1. TYPE VALIDATION CORE (Email/Phone/URL) ---
  const runTypeValidation = (key, value, platform = null) => {
    if (key === 'email' || platform === 'Email') return validateEmail(value);
    if (key === 'phone' || platform === 'Phone') return validatePhone(value);
    
    const urlPlatforms = ['LinkedIn', 'Twitter / X', 'Website', 'Instagram', 'Behance', 'GitHub'];
    if (urlPlatforms.includes(platform)) {
      return validateUrl(value, platform);
    }
    
    return { isValid: true };
  };

  // --- 2. MASTER VALIDATION FUNCTION (Enforces Rules) ---
  const validateStep = () => {
    const val = form[currentQuestion.key];
    
    // CASE A: REPEATER FIELDS
    if (currentQuestion.type === 'repeater') {
      const items = val || [];
      
      // Min/Max Quantity Check
      if (currentQuestion.min && items.length < currentQuestion.min) {
        return `Please add at least ${currentQuestion.min} item(s).`;
      }
      if (currentQuestion.max && items.length > currentQuestion.max) {
        return `You can only add up to ${currentQuestion.max} items.`;
      }

      // Check Required Fields inside rows
      // Supports both 'fields' (Old Config) and 'inputs' (New Config)
      if (currentQuestion.fields || currentQuestion.inputs) {
        const fieldsToCheck = currentQuestion.fields || currentQuestion.inputs;
        
        const missing = items.some(item => 
          fieldsToCheck.some(f => f.required && (!item[f.key] || !item[f.key].trim()))
        );
        if (missing) return "Please complete all required fields for each item.";
      }

      // Re-validate formats (Email/Phone inside repeater)
      for (const item of items) {
        if (item.platform && item.value) {
           const check = runTypeValidation(null, item.value, item.platform);
           if (!check.isValid) return check.error;
        }
      }
    } 
    
    // CASE B: STANDARD FIELDS (Text, Textarea)
    else {
      // 1. Required Check
      const isEmpty = !val || (typeof val === 'string' && !val.trim());
      if (currentQuestion.required && isEmpty) {
        return "This field is required.";
      }
      
      if (!isEmpty) {
        // 2. Character Length Check
        // We now check both 'min' OR 'minLength'
        const minLen = currentQuestion.min || currentQuestion.minLength;
        const maxLen = currentQuestion.max || currentQuestion.maxLength;

        if (minLen && val.length < minLen) {
          return `Please write at least ${minLen} characters. (Current: ${val.length})`;
        }
        
        if (maxLen && val.length > maxLen) {
           return `Please keep it under ${maxLen} characters. (Current: ${val.length})`;
        }

        // 3. Format Validation
        const check = runTypeValidation(currentQuestion.key, val);
        if (!check.isValid) {
          return check.error;
        }
      }
    }
    return null; // No errors
  };

  // --- HANDLERS ---
  const handleBlur = (e) => {
    // Only run format check on blur, not length (to avoid annoying user early)
    if (currentQuestion.type !== 'repeater') {
        const result = runTypeValidation(currentQuestion.key, e.target.value);
        if (!result.isValid) setError(result.error);
    }
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
      const updatedItems = [...(form[currentQuestion.key] || [])];
      updatedItems[index] = { ...updatedItems[index], [fieldKey]: url };
      updateForm({ [currentQuestion.key]: updatedItems });
    }
  };

  const handleRepeaterUpdate = (idx, key, val) => {
    if (error) setError(null);

    const items = form[currentQuestion.key] || [];
    const updated = [...items];
    
    updated[idx] = { ...updated[idx], [key]: val };
    updateForm({ [currentQuestion.key]: updated });
    
    // Real-time checks for Social/Contact
    const currentItem = updated[idx];
    const platform = currentItem.platform;
    const value = currentItem.value;

    if (key === 'value' || key === 'platform') {
      if (value) {
        const check = runTypeValidation(null, value, platform);
        if (!check.isValid) setError(check.error);

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

  // --- NEXT BUTTON LOGIC ---
  const handleNextClick = () => {
    // 1. Run Master Validation
    const validationError = validateStep();

    if (validationError) {
      setError(validationError);
      return; // Stop here if invalid
    }

    // 2. Proceed
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