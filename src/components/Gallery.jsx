import React from 'react';

// --- SUB-COMPONENT: TEMPLATE MINIATURE (The Preview Image) ---
const TemplateMiniature = ({ templateId }) => {
  
  // THE FIX: PERCENTAGE SCALING (No Hardcoded Pixels)
  // 1. w-[400%] h-[400%]: Creates a canvas exactly 4x the size of the parent card.
  // 2. scale-[0.25]: Shrinks it back down by 4x to fit perfectly.
  // This ensures it adapts to any screen size (Mobile or Desktop).
  const scaleWrapperClass = "absolute top-0 left-0 w-[400%] h-[400%] origin-top-left transform scale-[0.25] bg-white pointer-events-none select-none";

  // 1. THE STANDARD (BasicFree)
  if (templateId === 'BasicFree') {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden text-left">
        <div className={scaleWrapperClass}>
          {/* PADDING: p-16 (Scales down to ~1rem visually) */}
          <div className="p-16 flex flex-col h-full text-slate-900 font-sans">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-8xl font-bold tracking-tight mb-4 text-black">Sara Al-Amri</h1>
              <p className="text-4xl text-gray-400 font-medium">Digital Marketing</p>
              <div className="w-full h-3 bg-black mt-8"></div>
            </div>

            {/* Content Spacing - Tightened to space-y-10 to fit everything */}
            <div className="space-y-10">
              
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">About</h2>
                <p className="text-4xl text-gray-800 leading-relaxed max-w-6xl">
                  Strategic marketer with 5+ years of experience driving growth for Saudi startups.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Experience</h2>
                <div className="border-l-[6px] border-gray-100 pl-10 space-y-10 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[54px] top-4 w-6 h-6 rounded-full bg-gray-200 border-[6px] border-white"></div>
                    <h3 className="text-4xl font-bold">Miswog Agency</h3>
                    <p className="text-3xl text-gray-500 uppercase mt-2">Senior Manager</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[54px] top-4 w-6 h-6 rounded-full bg-gray-200 border-[6px] border-white"></div>
                    <h3 className="text-4xl font-bold">Tamara</h3>
                    <p className="text-3xl text-gray-500 uppercase mt-2">Strategist</p>
                  </div>
                </div>
              </div>

              {/* Connect - Now fully visible */}
              <div className="pt-2">
                 <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Connect</h2>
                 <div className="border-[3px] border-gray-200 p-8 rounded-3xl w-full">
                   <span className="text-2xl uppercase tracking-widest text-gray-400 block mb-3">Email</span>
                   <span className="text-3xl font-bold truncate block">sara@example.com</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
// 4. PROJECT FOCUS (The Maker) - Updated Visuals
  if (templateId === 'ProjectFocus') {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden text-left">
        <div className={scaleWrapperClass}>
          {/* BACKGROUND: Matching the new gradient theme */}
          <div className="p-16 flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative">
             
             {/* DECORATIVE MESH BLOBS */}
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

             {/* HEADER */}
             <div className="relative z-10 mb-16 px-4">
               <h1 className="text-9xl font-bold mb-6 text-slate-900 tracking-tight">Dena</h1>
               <p className="text-5xl text-indigo-600 font-medium mb-12">App Developer</p>
               
               {/* Bio Box Preview */}
               <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-indigo-50 shadow-sm w-3/4">
                  <div className="h-5 bg-slate-200 rounded-full w-full mb-5"></div>
                  <div className="h-5 bg-slate-200 rounded-full w-2/3"></div>
               </div>
             </div>
             
             {/* GRID */}
             <div className="relative z-10 grid grid-cols-2 gap-10 px-4">
               
               {/* Card 1 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-md">
                 <div className="flex justify-between items-start mb-8">
                   <h3 className="text-5xl font-bold text-slate-800">Sira App</h3>
                   <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                     <span className="text-3xl">↗</span>
                   </div>
                 </div>
                 <div className="h-4 bg-slate-100 rounded-full w-full mb-8"></div>
                 <div className="w-full h-2 bg-indigo-100 rounded-full"></div>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-md">
                 <div className="flex justify-between items-start mb-8">
                   <h3 className="text-5xl font-bold text-slate-800">Portfolio</h3>
                   <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                     <span className="text-3xl">↗</span>
                   </div>
                 </div>
                 <div className="h-4 bg-slate-100 rounded-full w-3/4 mb-8"></div>
                 <div className="w-full h-2 bg-indigo-100 rounded-full"></div>
               </div>

             </div>
          </div>
        </div>
      </div>
    );
  }
    if (templateId === 'Vanguard') {
  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden text-left">
      <div className={scaleWrapperClass}>
        <div className="p-12 flex flex-col h-full bg-slate-950 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="border-l-4 border-cyan-500 pl-8 mb-12 relative z-10">
              <h1 className="text-7xl font-bold text-white mb-4">ALEX<br/>MERCER</h1>
              <p className="text-3xl text-cyan-400 font-mono">FULL STACK</p>
            </div>
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                 <div className="h-32 w-full bg-slate-800 mb-4 rounded-lg"></div>
                 <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
  // 2. HERITAGE (Locked)
  if (templateId === 'Heritage') {
    return (
      <div className="w-full h-full relative bg-[#F9F7F2] overflow-hidden">
        <div className={`${scaleWrapperClass} bg-[#F9F7F2] flex flex-col items-center text-center border-[16px] border-double border-[#1B3022]/20 p-16`}>
          <div className="w-40 h-40 rounded-full border-4 border-[#D4AF37] mb-12 flex items-center justify-center text-[#1B3022] font-serif font-bold text-6xl bg-[#1B3022]/5">
            KA
          </div>
          <h1 className="text-8xl font-serif font-bold text-[#1B3022] mb-6">Khalid Al-Saud</h1>
          <p className="text-4xl text-[#D4AF37] mb-16 font-serif italic">Executive Director</p>
          <div className="w-48 h-[3px] bg-[#1B3022]/30 mb-16"></div>
          <p className="text-3xl font-serif text-[#1B3022]/80 leading-loose max-w-4xl mx-auto mb-16">
            "Leadership is not about being in charge. It is about taking care of those in your charge."
          </p>
        </div>
      </div>
    );
  }

  // 3. SWISS (Locked)
  return (
    <div className="w-full h-full relative bg-slate-50 overflow-hidden">
      <div className={scaleWrapperClass}>
        <div className="p-16">
           <h1 className="text-9xl font-bold tracking-tighter text-slate-900 mb-0">HELO.</h1>
           <div className="grid grid-cols-2 gap-10 mt-24">
               <div className="h-64 bg-slate-200"></div>
               <div className="h-64 bg-slate-900"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN GALLERY COMPONENT ---
export default function Gallery({ onSelect }) {
  
  const templates = [
    { 
      id: 'BasicFree', 
      name: 'The Standard', 
      cat: 'Essential', 
      color: '#000000', 
      description: 'Clean, monochrome, and effective. The standard for professional clarity. (Free)' 
    },{ 
    id: 'ProjectFocus', 
    name: 'The Maker', 
    cat: 'Creative', 
    color: '#334155', 
    description: 'Grid layout focused entirely on your projects. (Free)' 
  },
    { 
      id: 'Heritage', 
      name: 'Al-Majlis', 
      cat: 'Leadership', 
      color: '#1B3022', 
      description: 'Serif-heavy leadership layout.',
      locked: true
    },
    { 
  id: 'Vanguard', 
  name: 'Vanguard', 
  cat: 'Technical', 
  color: '#0f172a', // Dark Slate
  description: 'High-contrast dark mode with image support for high-end technical leads.',
  price: '$299' // Premium price
},
    { 
      id: 'Swiss', 
      name: 'Structure v.01', 
      cat: 'Engineering', 
      color: '#111111', 
      description: 'Bold geometry & storytelling.',
      locked: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 px-4 md:px-0">
      {templates.map(t => (
        <div 
          key={t.id} 
          onClick={() => !t.locked && onSelect(t.id)} 
          className={`group cursor-pointer flex flex-col max-w-[280px] mx-auto sm:max-w-none w-full ${t.locked ? 'opacity-75 grayscale' : ''}`}
        >
          {/* Card Container */}
          <div className="aspect-[4/5] bg-slate-100 rounded-xl mb-4 overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative">
            
            {/* 1. THE MINIATURE */}
            <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                <TemplateMiniature templateId={t.id} />
            </div>
            
            {/* 2. Glass Overlay */}
            {!t.locked && (
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
            )}
            
            {/* 3. Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
               {t.locked ? (
                 <span className="bg-slate-100 text-slate-400 px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg cursor-not-allowed">
                   Locked
                 </span>
               ) : (
                 <span className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                   Customize
                 </span>
               )}
            </div>

            {/* Locked Badge */}
            {t.locked && (
                <div className="absolute top-3 right-3">
                    <span className="bg-white/80 backdrop-blur-md text-slate-900 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest border border-slate-200">
                        Soon
                    </span>
                </div>
            )}
          </div>

          {/* Metadata */}
          <div className="px-1 text-center sm:text-left">
            <p className="text-[9px] uppercase tracking-[0.25em] text-sira-orange font-extrabold mb-1">
              {t.cat}
            </p>
            <h3 className="text-lg font-heading text-slate-900 group-hover:text-sira-purple transition-colors duration-300">
              {t.name}
            </h3>
            <p className="text-[12px] text-slate-400 mt-1 leading-snug line-clamp-2">
              {t.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}