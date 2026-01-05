import React from 'react';

// --- SUB-COMPONENT: TEMPLATE MINIATURE (The Preview Image) ---
const TemplateMiniature = ({ templateId }) => {
  // SCALING LOGIC:
  // Virtual Canvas: 1200px wide.
  // Scale: 0.2 (Shrinks it down to fits the small card).
  const scaleWrapperClass = "absolute top-0 left-0 w-[1200px] h-[1600px] origin-top-left transform scale-[0.2] sm:scale-[0.2] bg-white pointer-events-none select-none";

  // 1. THE STANDARD (BasicFree)
  if (templateId === 'BasicFree') {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden text-left">
        <div className={scaleWrapperClass}>
          {/* TIGHTER PADDING: Reduced from p-16 to p-10 so content starts higher */}
          <div className="p-10 flex flex-col h-full text-slate-900 font-sans">
            
            {/* Header - TIGHTER MARGINS */}
            <div className="mb-8">
              <h1 className="text-7xl font-bold tracking-tight mb-2 text-black">Sara Al-Amri</h1>
              <p className="text-3xl text-gray-400 font-medium">Digital Marketing</p>
              <div className="w-full h-3 bg-black mt-6"></div>
            </div>

            {/* Content Spacing - Reduced space-y-12 to space-y-8 */}
            <div className="space-y-8">
              
              {/* About */}
              <div>
                <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">About</h2>
                <p className="text-3xl text-gray-800 leading-relaxed max-w-4xl">
                  Strategic marketer with 5+ years of experience driving growth for Saudi startups. Specialized in social media strategy.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Experience</h2>
                <div className="border-l-4 border-gray-100 pl-8 space-y-6 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[42px] top-3 w-5 h-5 rounded-full bg-gray-200 border-4 border-white"></div>
                    <h3 className="text-3xl font-bold">Miswog Agency</h3>
                    <p className="text-xl text-gray-500 uppercase mt-1">Senior Manager</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[42px] top-3 w-5 h-5 rounded-full bg-gray-200 border-4 border-white"></div>
                    <h3 className="text-3xl font-bold">Tamara</h3>
                    <p className="text-xl text-gray-500 uppercase mt-1">Strategist</p>
                  </div>
                </div>
              </div>

              {/* Connect - Now fits because we saved space above */}
              <div className="pt-2">
                 <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Connect</h2>
                 <div className="border-2 border-gray-200 p-6 rounded-xl w-full">
                   <span className="text-lg uppercase tracking-widest text-gray-400 block mb-2">Email</span>
                   <span className="text-2xl font-bold truncate block">sara@example.com</span>
                 </div>
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
        <div className={`${scaleWrapperClass} bg-[#F9F7F2] flex flex-col items-center text-center border-[12px] border-double border-[#1B3022]/20 p-12`}>
          <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] mb-8 flex items-center justify-center text-[#1B3022] font-serif font-bold text-5xl bg-[#1B3022]/5">
            KA
          </div>
          <h1 className="text-6xl font-serif font-bold text-[#1B3022] mb-4">Khalid Al-Saud</h1>
          <p className="text-3xl text-[#D4AF37] mb-12 font-serif italic">Executive Director</p>
          <div className="w-40 h-[2px] bg-[#1B3022]/30 mb-12"></div>
          <p className="text-2xl font-serif text-[#1B3022]/80 leading-loose max-w-2xl mx-auto mb-16">
            "Leadership is not about being in charge. It is about taking care of those in your charge. Building a legacy for Vision 2030."
          </p>
        </div>
      </div>
    );
  }

  // 3. SWISS (Locked)
  return (
    <div className="w-full h-full relative bg-slate-50 overflow-hidden">
      <div className={scaleWrapperClass}>
        <div className="p-12">
           <h1 className="text-8xl font-bold tracking-tighter text-slate-900 mb-0">HELO.</h1>
           <div className="grid grid-cols-2 gap-6 mt-16">
               <div className="h-48 bg-slate-200"></div>
               <div className="h-48 bg-slate-900"></div>
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
