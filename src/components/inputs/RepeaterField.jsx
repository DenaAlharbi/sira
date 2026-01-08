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
                  <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-400 block mb-1 font-bold">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  
                  {/* --- FIELD TYPES --- */}
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
                  ) : field.type === 'select' ? (
                    <select
                      className="w-full p-2 md:p-3 text-sm border border-slate-200 rounded-md bg-white focus:border-sira-purple outline-none"
                      value={item[field.key] || ''}
                      onChange={(e) => onUpdate(index, field.key, e.target.value)}
                    >
                      <option value="" disabled>{field.placeholder || 'Select...'}</option>
                      {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
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
            <button onClick={() => onRemove(index)} className="absolute top-2 right-2 p-1.5 text-slate-300 hover:text-red-500">✕</button>
          </div>
        ))}
      </div>

      {!isMaxReached ? (
        <button onClick={onAdd} className="w-full py-3 md:py-4 border border-dashed border-slate-300 rounded-lg md:rounded-xl text-slate-500 hover:border-sira-purple text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shrink-0">+ Add Item</button>
      ) : (
        <div className="text-center p-2 bg-slate-50 border border-slate-100 rounded-lg shrink-0"><p className="text-xs text-slate-400">{limitReason || "Limit reached."}</p></div>
      )}
      {min && items.length < min && <p className="text-center text-[10px] text-sira-orange mt-2">* Required: Add at least {min} entry.</p>}
    </div>
  );
}