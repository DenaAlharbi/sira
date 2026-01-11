import React from 'react';
import RepeaterField from './RepeaterField';
import ImageInput from './ImageInput';
import StableInput from './StableInput';

export default function InputRenderer({ 
  question, 
  value, 
  form, 
  updateForm, 
  onChange, 
  onBlur, 
  onNext,
  onUpload, 
  onRepeaterUpdate, 
  onRepeaterUpload, 
  uploadingState 
}) {
  const val = value || '';

  // --- 1. SECTION ---
  if (question.type === 'section') return null;

  // --- 2. REPEATER INPUT ---
  if (question.type === 'repeater') {
    const items = Array.isArray(value) ? value : [];
    const subFields = question.inputs || question.fields || [];

    return (
      <RepeaterField 
        items={items}
        fields={subFields}
        questionKey={question.key}
        onUpdate={onRepeaterUpdate} 
        onUpload={onRepeaterUpload}
        onRemove={(idx) => updateForm({ [question.key]: items.filter((_, i) => i !== idx) })}
        uploadingState={uploadingState}
        
        onAdd={() => {
           if (!question.max || items.length < question.max) {
              const newItem = {};
              subFields.forEach(f => newItem[f.key] = '');
              updateForm({ [question.key]: [...items, newItem] });
           }
        }}
        
        isMaxReached={question.max && items.length >= question.max}
        limitReason={question.limitReason}
        min={question.min}
      />
    );
  }

  // --- 3. SINGLE IMAGE ---
  if (question.type === 'image') {
    return (
      <ImageInput 
        label={question.label}
        helper={question.helper}
        value={val}
        onChange={(v) => v instanceof File ? onUpload(question.key, v) : onChange(v)}
      />
    );
  }

  // --- 4. STANDARD FIELDS ---
  switch (question.type) {
    case 'text':
      return (
        <StableInput
          type="text"
          placeholder={question.placeholder}
          value={val}
          // FIX: Pass the value directly, do NOT pass question.key
          onChange={onChange} 
          onBlur={() => onBlur(question.key, val)}
          onKeyDown={(e) => { if(e.key === 'Enter') onNext(); }}
        />
      );
    
    case 'textarea':
      return (
        <div className="flex flex-col w-full">
          <StableInput
            type="textarea"
            placeholder={question.placeholder}
            value={val}
            // FIX: Pass the value directly
            onChange={onChange}
            onBlur={() => onBlur(question.key, val)}
          />
          {(question.maxLength || question.max) && (
            <div className="text-right text-xs text-slate-300 mt-2">
              {val.length} / {question.maxLength || question.max}
            </div>
          )}
        </div>
      );
    
    case 'select':
      return (
        <div className="relative">
          <select 
            className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 appearance-none cursor-pointer transition-colors"
            value={val} 
            // Select doesn't use StableInput, so we handle event manually
            onChange={e => onChange(e.target.value)}
          >
            <option value="" disabled>Select an option...</option>
            {question.options?.map((opt, idx) => (
              <option key={idx} value={opt}>{opt}</option>
            ))}
          </select>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
        </div>
      );

    default: return null;
  }
}