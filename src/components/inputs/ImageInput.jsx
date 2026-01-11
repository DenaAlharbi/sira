import React, { useState, useEffect } from 'react';

export default function ImageInput({ value, onChange, label, helper }) {
  const [mode, setMode] = useState('upload'); // 'upload' | 'link'
  const [preview, setPreview] = useState(null);
  const [linkInput, setLinkInput] = useState('');

  // Sync internal state with prop value
  useEffect(() => {
    if (value) {
      // If value is a File object (upload), create a preview URL
      if (value instanceof File) {
        setPreview(URL.createObjectURL(value));
      } else if (typeof value === 'string') {
        // If value is a string (URL), use it directly
        setPreview(value);
        setLinkInput(value);
      }
    } else {
      setPreview(null);
      setLinkInput('');
    }
  }, [value]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange(file); // Pass File object up to parent
    }
  };

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      onChange(linkInput); // Pass String URL up to parent
    }
  };

  const handleRemove = () => {
    onChange(''); // Clear value
    setPreview(null);
    setLinkInput('');
  };

  // --- RENDER: PREVIEW MODE (Professional Card) ---
  if (preview) {
    return (
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
          {label}
        </label>
        
        <div className="relative group w-full aspect-video bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x450?text=Invalid+Image+Link'; }}
          />
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
             <p className="text-white text-xs font-medium tracking-widest uppercase">Image Active</p>
             <button 
               onClick={handleRemove}
               className="px-4 py-2 bg-white text-slate-900 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-rose-500 hover:text-white transition-colors"
             >
               Remove / Replace
             </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: INPUT MODE (Upload OR Link) ---
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
          {label}
        </label>
        
        {/* Toggle Switch */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('link')}
            className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${mode === 'link' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Link
          </button>
        </div>
      </div>

      <div className="p-1">
        {mode === 'upload' ? (
          // UPLOAD AREA
          <div className="relative w-full h-32 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-white hover:border-indigo-400 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-8 h-8 mb-2 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            </div>
            <p className="text-xs font-medium text-slate-500">Click to upload image</p>
            <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, GIF up to 5MB</p>
          </div>
        ) : (
          // LINK AREA
          <div className="flex gap-2">
            <input 
              type="text" 
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              placeholder="https://example.com/image.png"
              className="flex-1 bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-slate-300"
            />
            <button 
              type="button"
              onClick={handleLinkSubmit}
              disabled={!linkInput}
              className="bg-slate-900 text-white px-5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-slate-900 transition-colors"
            >
              Fetch
            </button>
          </div>
        )}
      </div>

      {helper && <p className="text-[10px] text-slate-400 mt-2 ml-1">{helper}</p>}
    </div>
  );
}