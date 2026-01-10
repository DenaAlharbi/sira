import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ScrollingCover = ({ imageSrc, onClick, isSelected, isPaid }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Logic: If isPaid is explicitly false, it is Free.
  const isFree = !isPaid;
  
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => setIsLoaded(true);

  return (
    <div 
      onClick={onClick}
      // ELEGANT HOVER: Subtle lift and shadow
      className={`group relative w-full rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border border-slate-200 ${
        isSelected 
          ? 'ring-1 ring-slate-900 ring-offset-4 shadow-xl' 
          : 'hover:shadow-2xl hover:border-slate-300 hover:-translate-y-1'
      }`}
    >
      
      {/* --- THE "TEMPTING" BADGE (Shimmering Gradient Pill) --- */}
      {isFree && (
        <div className="absolute top-4 right-4 z-30 pointer-events-none">
          {/* Container for the shimmer effect */}
          <div className="relative overflow-hidden rounded-full p-[1px] bg-gradient-to-r from-slate-800 to-slate-900 border border-sira-purple/50 shadow-lg">
            
            {/* The glowing background with shimmer animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
              initial={{ x: '-150%' }}
              animate={{ x: '150%' }}
              transition={{ 
                repeat: Infinity, 
                duration: 2.5, 
                ease: "easeInOut",
                repeatDelay: 3 
              }}
            />
            
            {/* The actual content of the badge */}
            <div className="relative z-10 bg-slate-950/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              {/* Unlocked Padlock Icon - Soft Purple */}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-purple-200">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
              {/* Phrase */}
              <span className="text-white text-[9px] font-extrabold uppercase tracking-[0.2em]">
                Unlock for Free
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Overflow Container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-50">
        
        {/* Scroll Image */}
        <div 
          className={`
            w-full h-full 
            bg-no-repeat 
            bg-[length:100%_auto] 
            bg-top 
            group-hover:bg-bottom 
            transition-[background-position] duration-[6000ms] ease-in-out 
            will-change-[background-position] 
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            grayscale group-hover:grayscale-0 transition-all duration-700
          `}
          style={{ backgroundImage: `url(${imageSrc})` }}
        ></div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-50 animate-pulse flex items-center justify-center">
             <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Loading...</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500 flex items-center justify-center">
          {/* Button color updated to MATCH YOUR PROJECT (sira-purple) */}
          <span className={`px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${
            isFree 
              ? 'bg-sira-purple text-white' 
              : 'bg-white text-slate-900'
          }`}>
            {isFree ? 'Start Building Now' : 'Preview Template'}
          </span>
        </div>

        {/* Selected Indicator (Minimalist Corner) */}
        {isSelected && (
          <div className="absolute inset-0 border-[3px] border-slate-900 z-20 pointer-events-none">
             <div className="absolute bottom-0 right-0 bg-slate-900 text-white w-7 h-7 flex items-center justify-center pt-1 pl-1 rounded-tl-lg">
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScrollingCover;