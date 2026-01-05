import React, { useState } from 'react';
import BasicFree from '../templates/BasicFree/index';

const templateMap = {
  'BasicFree': BasicFree,
};

export default function Preview({ form, onBack, onNext }) {
  const [device, setDevice] = useState('mobile'); // Default to mobile to test the fix

  const SelectedTemplate = templateMap[form.templateId] || templateMap['BasicFree'];

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start h-[calc(100vh-140px)]">
      
      {/* LEFT PANEL: Controls (No changes here) */}
      <aside className="w-full lg:w-1/4 space-y-6 flex flex-col h-full">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 flex flex-col">
          <h3 className="text-xl font-heading text-slate-900 mb-1">Final Review</h3>
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-6">Ready to deploy</p>
          
          <div className="space-y-4 mb-8">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest block mb-1">Live URL Preview</span>
              <p className="font-mono text-xs text-sira-purple truncate">
                sira.app/{form.fullName ? form.fullName.split(' ')[0].toLowerCase() : 'user'}
              </p>
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest block">Owner</span>
              <p className="font-medium text-slate-900">{form.fullName || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-auto">
            <button onClick={onNext} className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-xl active:scale-95">
              Confirm & Deploy
            </button>
            <button onClick={onBack} className="w-full py-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-900">
              Edit Content
            </button>
          </div>
        </div>

        {/* Device Toggles */}
        <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex">
          <button 
            onClick={() => setDevice('desktop')}
            className={`flex-1 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${device === 'desktop' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Desktop
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={`flex-1 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${device === 'mobile' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Mobile
          </button>
        </div>
      </aside>

      {/* RIGHT PANEL: The Preview Area */}
      {/* 1. Use 'flex items-center justify-center' to center the phone */}
      {/* 2. Remove 'overflow-hidden' from this parent so we don't clip shadows */}
      <div className="w-full lg:w-3/4 bg-[#Eef0f2] rounded-3xl border border-slate-200 h-full relative flex items-center justify-center p-4 shadow-inner z-0">
        
        {/* ================= DESKTOP FRAME ================= */}
        {device === 'desktop' && (
          <div className="w-full h-full max-w-6xl bg-white rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col border border-slate-300/60 ring-4 ring-white/50">
            <div className="h-10 bg-[#F3F4F6] border-b border-slate-300/50 flex items-center px-4 gap-4 flex-shrink-0 select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
              </div>
              <div className="flex-1 bg-white h-7 rounded text-center text-[10px] text-slate-500 flex items-center justify-center shadow-sm border border-slate-200">
                 sira.app/preview
              </div>
            </div>
            <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
               <SelectedTemplate data={form} />
            </div>
          </div>
        )}

        {/* ================= MOBILE FRAME (FIXED) ================= */}
        {device === 'mobile' && (
          // 3. THE SCALE WRAPPER
          // We force scale-[0.65] (65% size) so the big 850px phone fits in the ~600px container.
          // We use 'origin-center' so it shrinks right into the middle.
          <div className="transform scale-[0.65] lg:scale-[0.70] xl:scale-[0.80] transition-transform duration-500 origin-center">
            
            {/* The Physical Device Body (Fixed Dimensions: 393x852) */}
            <div className="relative mx-auto border-gray-900 bg-gray-900 border-[14px] rounded-[55px] h-[852px] w-[393px] shadow-[0_0_0_2px_#333,0_30px_60px_-10px_rgba(0,0,0,0.5)] z-20 overflow-hidden">
              
              {/* Hardware Buttons */}
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[115px] rounded-l-lg border-r border-gray-700"></div> 
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[170px] rounded-l-lg border-r border-gray-700"></div> 
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[230px] rounded-l-lg border-r border-gray-700"></div> 
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[200px] rounded-r-lg border-l border-gray-700"></div> 

              {/* The Screen Area */}
              <div className="h-full w-full bg-white rounded-[42px] overflow-hidden relative flex flex-col">
                
                {/* STATUS BAR (Fixed at top, on top of scroll) */}
                <div className="absolute top-0 left-0 w-full h-[50px] z-50 flex justify-between items-center px-8 pt-2 text-white font-semibold text-[14px] pointer-events-none mix-blend-difference">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <svg width="16" height="10" viewBox="0 0 18 12" fill="currentColor"><path d="M1 10h3v-2H1v2zm4 0h3V6H5v4zm4 0h3V3H9v7zm4 0h3V1h-3v9z"/></svg>
                    <svg width="22" height="11" viewBox="0 0 24 12" fill="currentColor"><rect x="1" y="1" width="19" height="10" rx="2" stroke="currentColor" strokeWidth="2"/><rect x="3" y="3" width="15" height="6" rx="1" fill="currentColor"/><path d="M23 4v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </div>
                </div>

                {/* DYNAMIC ISLAND (Fixed) */}
                <div className="absolute top-[11px] left-1/2 -translate-x-1/2 h-[35px] w-[120px] bg-black rounded-[20px] z-50 pointer-events-none flex items-center justify-end pr-3">
                   <div className="w-3 h-3 rounded-full bg-[#111] shadow-inner"></div>
                </div>

                {/* SCROLLABLE CONTENT 
                    - This is where the scroll happens.
                    - pt-[50px] ensures content starts BELOW the notch.
                    - pb-[30px] ensures content isn't covered by the home bar. 
                */}
                <div className="flex-1 w-full overflow-y-auto custom-scrollbar pt-[50px] pb-[30px] bg-white">
                  <SelectedTemplate data={form} />
                </div>

                {/* HOME INDICATOR (Fixed at bottom) */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-black rounded-full z-50 opacity-30"></div>
              
              </div>
            </div>
            
          </div>
        )}
        
      </div>
    </div>
  );
}