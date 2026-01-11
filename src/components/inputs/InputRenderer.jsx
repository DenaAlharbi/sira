import React from 'react';
import ImageInput from './ImageInput'; // Import your new component

export default function InputRenderer({ 
  question, 
  value, 
  form, 
  updateForm, 
  onChange, 
  onBlur, 
  onNext,
  onUpload,           // For single image uploads (e.g. Profile Pic)
  onRepeaterUpdate,   // For updating text in repeaters
  onRepeaterUpload,   // For uploading images in repeaters (Vanguard)
  uploadingState      // To show spinners
}) {

  // --- 1. SECTION ---
  if (question.type === 'section') return null;

  // --- 2. REPEATER INPUT (Projects, Contact) ---
  if (question.type === 'repeater') {
    const items = value || [];
    // Support both 'inputs' (new config) and 'fields' (old config)
    const subFields = question.inputs || question.fields || [];

    const handleAddItem = () => {
      if (question.max && items.length >= question.max) return;
      
      const newItem = subFields.reduce((acc, input) => {
        acc[input.key] = '';
        return acc;
      }, {});
      updateForm({ [question.key]: [...items, newItem] });
    };

    const handleRemoveItem = (index) => {
      const newItems = items.filter((_, i) => i !== index);
      updateForm({ [question.key]: newItems });
    };

    return (
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="p-4 md:p-6 bg-slate-50 rounded-xl border border-slate-200 relative group animate-fade-in-up">
            
            {/* Remove Button */}
            <button 
              onClick={() => handleRemoveItem(index)}
              className="absolute top-2 right-2 p-2 text-slate-300 hover:text-red-500 transition-colors"
              title="Remove Item"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Render Fields inside Repeater */}
            <div className="space-y-4">
              {subFields.map((input) => {
                
                // A. IMAGE INPUT (The new Vanguard feature)
                if (input.type === 'image') {
                   return (
                     <ImageInput 
                       key={input.key}
                       label={input.label}
                       helper={input.helper}
                       value={item[input.key]}
                       onChange={(val) => {
                         // Smart Handler: File -> Upload. String -> Update Text.
                         if (val instanceof File) {
                           onRepeaterUpload(index, input.key, val);
                         } else {
                           onRepeaterUpdate(index, input.key, val);
                         }
                       }}
                     />
                   );
                }

                // B. STANDARD INPUTS (Text, Textarea, Select)
                return (
                  <div key={input.key}>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">
                      {input.label} {input.required && '*'}
                    </label>
                    
                    {input.type === 'textarea' ? (
                      <textarea
                        value={item[input.key] || ''}
                        onChange={(e) => onRepeaterUpdate(index, input.key, e.target.value)}
                        placeholder={input.placeholder}
                        className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-sira-purple/20 focus:border-sira-purple outline-none transition-all resize-none h-24"
                      />
                    ) : input.type === 'select' ? (
                      <div className="relative">
                        <select
                          value={item[input.key] || ''}
                          onChange={(e) => onRepeaterUpdate(index, input.key, e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm appearance-none focus:ring-2 focus:ring-sira-purple/20 focus:border-sira-purple outline-none transition-all cursor-pointer"
                        >
                          <option value="" disabled>{input.placeholder || 'Select...'}</option>
                          {input.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    ) : (
                      <input
                        type={input.type || 'text'}
                        value={item[input.key] || ''}
                        onChange={(e) => onRepeaterUpdate(index, input.key, e.target.value)}
                        placeholder={input.placeholder}
                        className="w-full bg-white border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-sira-purple/20 focus:border-sira-purple outline-none transition-all"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Add Button */}
        {(!question.max || items.length < question.max) && (
          <button 
            onClick={handleAddItem}
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-sira-purple hover:border-sira-purple/50 hover:bg-sira-purple/5 transition-all flex items-center justify-center gap-2"
          >
            <span className="text-lg">+</span> Add Item
          </button>
        )}
      </div>
    );
  }

  // --- 3. SINGLE IMAGE (e.g. Profile Pic) ---
  if (question.type === 'image') {
    return (
      <ImageInput 
        label={question.label}
        helper={question.helper}
        value={value}
        onChange={(val) => {
          if (val instanceof File) {
             onUpload(question.key, val);
          } else {
             onChange(question.key, val);
          }
        }}
      />
    );
  }

  // --- 4. TEXTAREA ---
  if (question.type === 'textarea') {
    return (
      <div className="flex flex-col w-full">
        <textarea
          autoFocus
          rows={4}
          value={value || ''}
          onChange={(e) => onChange(question.key, e.target.value)}
          onBlur={() => onBlur(question.key, value)}
          placeholder={question.placeholder}
          className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 resize-none transition-colors"
        />
        {question.minLength && (
          <div className="text-right text-xs text-slate-300 mt-2">
            {(value || '').length} / {question.minLength} chars
          </div>
        )}
      </div>
    );
  }

  // --- 5. SELECT ---
  if (question.type === 'select') {
    return (
      <div className="relative">
        <select 
          className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 appearance-none cursor-pointer transition-colors"
          value={value || ''} 
          onChange={e => onChange(question.key, e.target.value)}
        >
          <option value="" disabled>Select an option...</option>
          {question.options?.map((opt, idx) => (
            <option key={idx} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
      </div>
    );
  }

  // --- 6. DEFAULT TEXT INPUT ---
  return (
    <input
      autoFocus
      type="text"
      value={value || ''}
      onChange={(e) => onChange(question.key, e.target.value)}
      onBlur={() => onBlur(question.key, value)}
      onKeyDown={(e) => { if(e.key === 'Enter') onNext(); }}
      placeholder={question.placeholder}
      className="w-full text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 transition-colors"
    />
  );
}