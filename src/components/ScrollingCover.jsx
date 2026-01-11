import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ScrollingCover = ({ imageSrc, onClick, isPaid }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isFree = !isPaid;
  
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => setIsLoaded(true);

  return (
    <div 
      onClick={onClick}
      className="group relative w-full rounded-xl overflow-hidden cursor-pointer transition-all duration-500 border border-slate-200 hover:shadow-2xl hover:border-slate-300 hover:-translate-y-1"
    >
      {/* Inject Keyframes for Auto-Scroll */}
      <style>{`
        @keyframes auto-scroll {
          0% { background-position: top center; }
          50% { background-position: bottom center; }
          100% { background-position: top center; }
        }
      `}</style>
      
      {/* --- "TEMPTING" BADGE --- */}
      {isFree && (
        <div className="absolute top-4 right-4 z-30 pointer-events-none">
          <div className="relative overflow-hidden rounded-full p-[1px] bg-gradient-to-r from-slate-800 to-slate-900 border border-sira-purple/50 shadow-lg">
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
            <div className="relative z-10 bg-slate-950/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-purple-200">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
              </svg>
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
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            transition-opacity duration-700
            filter-none grayscale-0 
          `}
          style={{ 
            backgroundImage: `url(${imageSrc})`,
            // Infinite scrolling animation (20s loop)
            animation: isLoaded ? 'auto-scroll 20s ease-in-out infinite' : 'none'
          }}
        ></div>

        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-50 animate-pulse flex items-center justify-center">
             <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Loading...</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500 flex items-center justify-center">
          <span className={`px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase shadow-2xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ${
            isFree 
              ? 'bg-sira-purple text-white' 
              : 'bg-white text-slate-900'
          }`}>
            {isFree ? 'Start Building Now' : 'Preview Template'}
          </span>
        </div>

      </div>
    </div>
  );
};

export default ScrollingCover;