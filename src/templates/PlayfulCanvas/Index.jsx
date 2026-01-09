import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function PlayfulCanvas({ data, isMobilePreview = false }) {
  const {
    // heroImage removed from props
    introText = "One *smart* link for every logo file, *variation* and *format* your client will ever need.",
    fullName = "Sinqlo",
    tagline = "Effortless Logo Delivery",
    projects = [],
    contact = []
  } = data || {};

  // --- HARDCODED ASSET PATH ---
  const HERO_BIRD_IMAGE = "/assets/backgrounds/playfullcanvas.png"; 

  // --- FUN COLOR PALETTE ---
  const COLORS = {
    bg: '#F3F0E7',        // Beige Background
    card: '#D1F2C6',      // Mint Green Hero
    highlight1: '#FFD66E', // Yellow
    highlight2: '#F48B57', // Orange
    highlight3: '#B6D0F8', // Blue
    text: '#1A1A1A',
  };

  // --- HELPER: TEXT HIGHLIGHTER ---
  const renderHighlightedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*[^*]+\*)/g);
    let highlightIndex = 0;
    const highlightColors = [COLORS.highlight1, COLORS.highlight2, COLORS.highlight3];

    return parts.map((part, i) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        const content = part.slice(1, -1);
        const color = highlightColors[highlightIndex % highlightColors.length];
        highlightIndex++;
        return (
          <span 
            key={i} 
            className="inline-block px-2 py-0.5  mx-1 transform -rotate-2 font-bold border border-black/5 shadow-sm"
            style={{ backgroundColor: color }}
          >
            {content}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-[#FFD66E] overflow-x-hidden`}
      style={{ backgroundColor: COLORS.bg, color: COLORS.text }}
    >
      <div className={`mx-auto ${isMobilePreview ? 'p-4 max-w-[400px]' : 'p-8 md:p-12 max-w-6xl'}`}>
        
        {/* --- 1. THE BENTO HERO CARD --- */}
        <div 
          className={` overflow-hidden relative border border-black/5 shadow-sm transition-transform hover:scale-[1.005] duration-500 mb-20 ${isMobilePreview ? 'min-h-[500px]' : 'min-h-[600px]'}`}
          style={{ backgroundColor: COLORS.card }}
        >
            {/* A. TOP LEFT CONTENT (Name, Tagline, Intro) */}
            <div className={`absolute top-0 left-0 z-20 flex flex-col items-start ${isMobilePreview ? 'p-8' : 'p-12 md:p-16'}`}>
               {/* Giant Name */}
               <h1 className={`font-black tracking-tighter leading-[0.85] text-black mb-4 ${isMobilePreview ? 'text-7xl' : 'text-[8rem] md:text-[10rem]'}`}>
                 {fullName}
               </h1>
               
               {/* Tagline */}
               <div className="inline-block bg-black text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest mb-8 transform -rotate-1">
                  {tagline}
               </div>
               
               {/* Highlighted Intro */}
               <h2 className={`font-medium leading-snug max-w-xl ${isMobilePreview ? 'text-xl' : 'text-3xl md:text-4xl'}`}>
                 {renderHighlightedText(introText)}
               </h2>
            </div>

            {/* B. BOTTOM RIGHT IMAGE (Hardcoded Bird) */}
            {/* We use 'w-auto h-auto' and set max heights to ensure it sits nicely in the corner without stretching */}
            <img 
               src={HERO_BIRD_IMAGE} 
               alt="Hero Illustration" 
               className={`absolute bottom-0 right-0 z-10 object-contain drop-shadow-2xl pointer-events-none 
                  ${isMobilePreview 
                     ? 'w-[80%] max-h-[50%] -bottom-4 -right-4'  // Mobile sizing and positioning
                     : 'w-[60%] max-h-[70%] -bottom-8 -right-8'  // Desktop sizing and positioning
                  }`}
            />
        </div>


        {/* --- 3. PROJECTS GRID (Kept the same) --- */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-4 w-4 rounded-full bg-[#F48B57] border border-black/10"></div>
             <h3 className="text-xl font-bold uppercase tracking-widest">Selected Work</h3>
          </div>

          <div className={`grid ${isMobilePreview ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-8'}`}>
            {projects.map((item, idx) => (
              <a 
                key={idx} 
                href={item.projectLink} 
                target="_blank" 
                rel="noreferrer"
                className="group relative block bg-white rounded-[2rem] border border-black/5 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="aspect-[4/3] bg-[#F3F0E7] overflow-hidden relative">
                   <img 
                    src={item.projectImage || "https://placehold.co/600x400/F3F0E7/A0A0A0?text=Project"} 
                    alt={item.projectName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" 
                   />
                </div>
                
                {/* Content */}
                <div className="p-8 flex justify-between items-start">
                   <div>
                      <h4 className="text-2xl font-bold mb-2">{item.projectName}</h4>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#F3F0E7] border border-black/5 text-xs font-bold uppercase tracking-wider text-black/70">
                        {item.projectTag || 'Design'}
                      </span>
                   </div>
                   <div className="w-12 h-12 rounded-full bg-[#B6D0F8] border border-black/5 flex items-center justify-center group-hover:bg-[#FFD66E] group-hover:scale-110 transition-all">
                      <ArrowUpRight size={24} />
                   </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* --- 4. FOOTER PILLS (Kept the same) --- */}
        <div className="border-t-2 border-black/5 pt-12 pb-20">
           <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {contact.map((link, idx) => (
                <a 
                  key={idx}
                  href={link.value}
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 rounded-full border-2 border-black/5 bg-white font-bold hover:bg-[#FFD66E] hover:border-black transition-all hover:-rotate-2 shadow-sm"
                >
                  {link.type || 'Link'}
                </a>
              ))}
           </div>
           <div className="text-center md:text-left mt-8 opacity-40 text-sm font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} {fullName}
           </div>
        </div>

      </div>
    </div>
  );
}