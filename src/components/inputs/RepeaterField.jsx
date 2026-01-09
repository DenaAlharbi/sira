import React from 'react';

export default function RepeaterField({ 
  items, 
  fields, 
  questionKey, 
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
          <div key={index} className="p-3 md:p-5 bg-slate-50 rounded-lg md:rounded-xl relative border border-slate-100 shadow-sm animate-fadeIn">
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              {fields.map((field) => (
                <div key={field.key}>
                  {/* Only show label if there are multiple fields, or always if you prefer */}
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  
                  {/* --- FIELD TYPES SWITCH --- */}
                  
                  {/* 1. IMAGE UPLOAD */}
                  {field.type === 'image' ? (
                    <div className="flex items-start gap-4">
                      {item[field.key] && (
                        <div className="w-20 h-20 rounded-lg bg-slate-200 overflow-hidden border border-slate-300 shadow-sm shrink-0">
                          <img src={item[field.key]} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <label className={`cursor-pointer border border-slate-200 bg-white hover:border-sira-purple hover:text-sira-purple transition-all px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-2 w-full h-20 border-dashed ${uploadingState[`${index}-${field.key}`] ? 'opacity-50 pointer-events-none bg-slate-50' : ''}`}>
                          {uploadingState[`${index}-${field.key}`] ? <span>Uploading...</span> : <span>{item[field.key] ? 'Replace' : 'Upload'}</span>}
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(e.target.files[0], index, field.key)} />
                        </label>
                      </div>
                    </div>

                  /* 2. SELECT DROPDOWN */
                  ) : field.type === 'select' ? (
                    <div className="relative">
                      <select
                        className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md bg-white focus:border-sira-purple outline-none appearance-none"
                        value={item[field.key] || ''}
                        onChange={(e) => onUpdate(index, field.key, e.target.value)}
                      >
                        <option value="" disabled>{field.placeholder || 'Select...'}</option>
                        {field.options && field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      {/* Arrow Icon */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </div>

                  /* 3. TEXTAREA (Added support for descriptions) */
                  ) : field.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md bg-white focus:border-sira-purple outline-none resize-none"
                      placeholder={field.placeholder}
                      value={item[field.key] || ''}
                      onChange={(e) => onUpdate(index, field.key, e.target.value)}
                    />

                  /* 4. FILE UPLOAD (Added safe fallback) */
                  ) : field.type === 'file' ? (
                    <div className="flex items-center gap-2">
                       <label className="cursor-pointer bg-white border border-slate-200 hover:border-sira-purple text-slate-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex-1 text-center">
                          {item[field.key] ? 'File Uploaded (Click to change)' : 'Upload File'}
                          <input type="file" className="hidden" onChange={(e) => onUpload(e.target.files[0], index, field.key)} />
                       </label>
                       {item[field.key] && (
                         <div className="text-green-500">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                         </div>
                       )}
                    </div>

                  /* 5. DEFAULT TEXT INPUT */
                  ) : (
                    <input
                      type="text"
                      className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md bg-white focus:border-sira-purple outline-none"
                      placeholder={field.placeholder}
                      value={item[field.key] || ''}
                      onChange={(e) => onUpdate(index, field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Remove Button */}
            <button 
              onClick={() => onRemove(index)} 
              className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500 transition-colors"
              title="Remove Item"
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
      
      {min && items.length < min && (
        <p className="text-center text-[10px] text-sira-orange mt-2">
          * Required: Add at least {min} entry.
        </p>
      )}
    </div>
  );
}