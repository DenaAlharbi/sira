import React from 'react';
import ImageInput from './ImageInput'; 
import StableInput from './StableInput'; // <--- Import here too

export default function RepeaterField({ 
  items, 
  fields, 
  onUpdate, 
  onAdd, 
  onRemove, 
  onUpload, 
  uploadingState, 
  isMaxReached, 
  limitReason,
  min 
}) {
  return (
    <div className="w-full flex flex-col h-full">
      <div className="space-y-3 md:space-y-4 overflow-y-auto pr-1 custom-scrollbar mb-3 md:mb-4 flex-1 min-h-0">
        {items.map((item, index) => (
          // IMPORTANT: Try to use a unique ID if possible, otherwise index is last resort
          <div key={index} className="p-3 md:p-5 bg-slate-50 rounded-lg md:rounded-xl relative border border-slate-100 shadow-sm animate-fade-in-up">
            
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  
                  {field.type === 'image' ? (
                    <ImageInput 
                      value={item[field.key]}
                      label={field.label}
                      helper={field.helper}
                      onChange={(val) => {
                         if (val instanceof File) {
                           onUpload(index, field.key, val);
                         } else {
                           onUpdate(index, field.key, val);
                         }
                      }}
                    />
                  ) : field.type === 'select' ? (
                    <div className="relative">
                      <select
                        className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md bg-white focus:border-sira-purple outline-none appearance-none cursor-pointer"
                        value={item[field.key] || ''}
                        onChange={(e) => onUpdate(index, field.key, e.target.value)}
                      >
                        <option value="" disabled>{field.placeholder || 'Select...'}</option>
                        {field.options && field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</div>
                    </div>
                  ) : field.type === 'textarea' ? (
                    // USE STABLE INPUT FOR TEXTAREA
                    <StableInput
                      type="textarea"
                      placeholder={field.placeholder}
                      value={item[field.key] || ''}
                      onChange={(val) => onUpdate(index, field.key, val)}
                    />
                  ) : (
                    // USE STABLE INPUT FOR TEXT
                    <StableInput
                      type="text"
                      placeholder={field.placeholder}
                      value={item[field.key] || ''}
                      onChange={(val) => onUpdate(index, field.key, val)}
                    />
                  )}
                </div>
              ))}
            </div>
            
            <button 
              onClick={() => onRemove(index)} 
              className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        ))}
      </div>

      {!isMaxReached ? (
        <button onClick={onAdd} className="w-full py-3 md:py-4 border border-dashed border-slate-300 rounded-lg md:rounded-xl text-slate-500 hover:border-sira-purple hover:text-sira-purple hover:bg-white transition-all text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shrink-0">
          <span>+ Add Item</span>
        </button>
      ) : (
        <div className="text-center p-2 bg-slate-50 border border-slate-100 rounded-lg shrink-0">
          <p className="text-xs text-slate-400">{limitReason || "Limit reached."}</p>
        </div>
      )}
    </div>
  );
}