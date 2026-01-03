import React, { useState } from 'react';

export default function Preview({ form, onBack, onNext }) {
  const [device, setDevice] = useState('desktop'); // 'desktop' or 'mobile'

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start">
      
      {/* LEFT: Live Customization Panel */}
      <aside className="w-full lg:w-1/3 space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <h3 className="text-2xl font-heading text-slate-900 mb-2">Final Review</h3>
          <p className="text-slate-400 text-xs uppercase tracking-widest">Verify your digital architectural data</p>
        </div>

        <div className="space-y-6">
          <div className="pb-4 border-b border-slate-50">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest block mb-1">Full Name</span>
            <p className="font-medium text-slate-900">{form.fullName || 'Not provided'}</p>
          </div>
          <div className="pb-4 border-b border-slate-50">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest block mb-1">Expertise</span>
            <p className="font-medium text-slate-900">{form.title || 'Not provided'}</p>
          </div>
          <div className="pb-4">
            <span className="text-[10px] text-slate-300 uppercase font-bold tracking-widest block mb-1">Biography</span>
            <p className="text-sm text-slate-500 leading-relaxed italic line-clamp-3">"{form.bio || 'Waiting for narrative...'}"</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <button 
            onClick={onNext}
            className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-xl"
          >
            Confirm & Deploy
          </button>
          <button 
            onClick={onBack}
            className="w-full py-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-900 transition-colors"
          >
            Edit Details
          </button>
        </div>
      </aside>

      {/* RIGHT: High-End Live Preview Display */}
      <div className="w-full lg:w-2/3">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 italic">Viewport Rendering</h4>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setDevice('desktop')}
              className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-md transition-all ${device === 'desktop' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
            >
              Desktop
            </button>
            <button 
              onClick={() => setDevice('mobile')}
              className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest rounded-md transition-all ${device === 'mobile' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
            >
              Mobile
            </button>
          </div>
        </div>

        {/* The "Device Frame" */}
        <div className={`mx-auto transition-all duration-700 bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden border-8 border-slate-900 ${device === 'desktop' ? 'w-full aspect-video' : 'w-[320px] h-[600px]'}`}>
          <div className="w-full h-full overflow-y-auto p-12 bg-[#FDFCFB] text-center font-heading">
             {/* This simulates their actual chosen template layout */}
             <div className="mt-20">
               <span className="text-sira-orange text-[10px] tracking-[0.4em] uppercase font-bold">Preview Mode</span>
               <h1 className="text-5xl mt-4 mb-2">{form.fullName || 'Abdullah Ahmed'}</h1>
               <div className="h-px w-24 bg-sira-purple mx-auto mb-6 opacity-30"></div>
               <p className="font-arabic text-2xl text-slate-700">{form.title || 'Professional Title'}</p>
               <p className="mt-12 text-sm text-slate-400 max-w-sm mx-auto leading-relaxed italic">
                 {form.bio || 'Your biography will appear here in a premium typographic layout.'}
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}