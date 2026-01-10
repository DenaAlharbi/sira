import React, { useState } from 'react';

const ScrollingCover = ({ imageSrc, onClick, isSelected }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Pre-load logic
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => setIsLoaded(true);

  return (
    <div 
      onClick={onClick}
      // Added 'group' here so children can react to hover state
      className={`group relative w-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border border-slate-200 shadow-sm ${isSelected ? 'ring-4 ring-sira-purple ring-offset-2' : 'hover:shadow-2xl hover:-translate-y-2'}`}
    >
      {/* Scroll Image */}
      <div 
        className={`
          w-full aspect-[4/5] 
          bg-no-repeat 
          bg-[length:100%_auto] 
          bg-top 
          group-hover:bg-bottom 
          transition-[background-position] duration-[5000ms] ease-in-out 
          will-change-[background-position] 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        style={{ backgroundImage: `url(${imageSrc})` }}
      ></div>

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
           <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Loading...</span>
        </div>
      )}

      {/* Hover Overlay with Button */}
      {/* This sits ON TOP of the image, which is why we needed group-hover above */}
      <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-300 flex items-center justify-center">
        <span className="bg-slate-900 text-white px-6 py-3 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          Select Template
        </span>
      </div>

      {/* Selected Indicator (Checkmark) */}
      {isSelected && (
        <div className="absolute inset-0 border-4 border-sira-purple rounded-xl z-20 pointer-events-none">
           <div className="absolute top-3 right-3 bg-sira-purple text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md animate-bounce">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
           </div>
        </div>
      )}
    </div>
  );
};

export default ScrollingCover;