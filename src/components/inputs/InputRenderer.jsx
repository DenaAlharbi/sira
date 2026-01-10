import React from 'react';
import RepeaterField from './RepeaterField';

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

  switch (question.type) {
    case 'text':
      return (
        <input 
          autoFocus 
          type="text" 
          className="w-full text-2xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 transition-colors" 
          placeholder={question.placeholder} 
          value={val} 
          onChange={e => onChange(e.target.value)} 
          onBlur={onBlur} 
          onKeyDown={e => e.key === 'Enter' && onNext()} 
        />
      );
    
    case 'textarea':
      return (
        <div className="flex flex-col w-full">
          <textarea 
            autoFocus 
            rows={4} 
            className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 resize-none" 
            placeholder={question.placeholder} 
            value={val} 
            onChange={e => onChange(e.target.value)} 
            onBlur={onBlur}
          />
          {/* Character Count Helper */}
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
            className="w-full text-xl font-light border-b-2 border-slate-100 focus:border-sira-purple outline-none bg-transparent py-4 appearance-none cursor-pointer"
            value={val} 
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

    case 'file':
      return (
        <div className="w-full">
          <div className="flex items-center gap-4 mb-4">
             {val ? (
               <div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-bold flex items-center gap-2">
                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                 File Uploaded
               </div>
             ) : (
               <div className="px-4 py-2 bg-slate-50 text-slate-400 rounded-lg text-sm font-bold">No file chosen</div>
             )}
          </div>
          <label className={`flex cursor-pointer border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-sira-purple transition-all px-6 py-10 rounded-xl flex-col items-center justify-center gap-3 ${uploadingState[question.key] ? 'opacity-50' : ''}`}>
            {uploadingState[question.key] ? <span>Uploading...</span> : (
              <>
                 <span className="font-bold text-slate-600 uppercase tracking-widest text-xs">
                   {val ? 'Replace File' : 'Upload PDF'}
                 </span>
              </>
            )}
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => onUpload(e.target.files[0])} />
          </label>
        </div>
      );

    case 'image':
      return (
        <div className="w-full flex items-center gap-6">
          {val && <img src={val} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-slate-300" />}
          <label className={`flex-1 cursor-pointer border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-sira-purple transition-all px-6 py-8 rounded-xl flex flex-col items-center justify-center gap-2 h-32 ${uploadingState[question.key] ? 'opacity-50' : ''}`}>
            {uploadingState[question.key] ? <span>Uploading...</span> : <span>{val ? 'Replace Image' : 'Click to Upload'}</span>}
            <input type="file" accept="image/*" className="hidden" onChange={e => onUpload(e.target.files[0])} />
          </label>
        </div>
      );

    case 'image-select':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {question.options?.map((optionUrl, idx) => (
              <button
                key={idx}
                onClick={() => onChange(optionUrl)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${val === optionUrl ? 'border-sira-purple ring-2 ring-sira-purple/20 scale-95' : 'border-slate-100 hover:border-sira-purple/50 hover:scale-105'}`}
              >
                <img src={optionUrl} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                {val === optionUrl && (
                  <div className="absolute inset-0 bg-sira-purple/20 flex items-center justify-center">
                    <div className="bg-white text-sira-purple rounded-full p-1 shadow-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="w-full mt-4">
             <label className={`flex cursor-pointer border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-white hover:border-sira-purple transition-all px-6 py-6 rounded-xl text-xs font-bold uppercase tracking-widest items-center justify-center gap-3 ${uploadingState[question.key] ? 'opacity-50 pointer-events-none' : ''}`}>
                {uploadingState[question.key] ? <span>Uploading...</span> : <span>Upload Custom Photo</span>}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(e.target.files[0])} />
              </label>
          </div>
        </div>
      );

    case 'repeater':
      // FIX: Ensure we have an array, even if state is undefined
      const items = Array.isArray(form[question.key]) ? form[question.key] : [];
      
      // FIX: Check for 'inputs' (New Config) OR 'fields' (Old Config)
      const subFields = question.inputs || question.fields || [];

      return (
        <RepeaterField 
          items={items}
          fields={subFields} // Pass the corrected fields
          questionKey={question.key}
          onUpdate={onRepeaterUpdate} 
          // Add Item Logic: Ensure we create a clean object
          onAdd={() => {
            if (!question.max || items.length < question.max) {
               // Create object with empty keys to prevent uncontrolled input warnings
               const newItem = {};
               subFields.forEach(f => newItem[f.key] = '');
               updateForm({ [question.key]: [...items, newItem] });
            }
          }}
          onRemove={(idx) => updateForm({ [question.key]: items.filter((_, i) => i !== idx) })}
          onUpload={onRepeaterUpload}
          uploadingState={uploadingState}
          isMaxReached={question.max && items.length >= question.max}
          limitReason={question.limitReason}
          min={question.min}
        />
      );

    default: return null;
  }
}