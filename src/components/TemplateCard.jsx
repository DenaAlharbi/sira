import React from 'react';
import { motion } from 'framer-motion';

export default function TemplateCard({ template, onSelect }) {
  const isFree = template.id === 'basic-free';

  return (
    <div className="relative group">
      
      {/* --- THE FREE BADGE (Sticker Style) --- */}
      {/* Only renders if it is the Free Template */}
      {isFree && (
        <div className="absolute -top-4 -right-3 z-20 pointer-events-none">
          <motion.div 
            initial={{ rotate: 12, scale: 0.9 }}
            animate={{ rotate: 12, scale: 1 }}
            whileHover={{ rotate: 0, scale: 1.1 }}
            className="bg-emerald-500 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border-2 border-white flex items-center gap-1.5"
          >
            {/* Simple Star Icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-100">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="uppercase tracking-wider">Free Forever</span>
          </motion.div>
          {/* Little drop shadow element for depth */}
          <div className="absolute inset-0 bg-black/20 rounded-full blur-sm -z-10 translate-y-1 translate-x-1"></div>
        </div>
      )}

      {/* --- MAIN CARD --- */}
      <button 
        onClick={() => onSelect(template)}
        className={`relative w-full text-left bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
          isFree 
            ? 'border-2 border-emerald-500/30 ring-4 ring-emerald-500/5 hover:border-emerald-500 shadow-emerald-100' 
            : 'border border-slate-200 hover:border-slate-300 hover:shadow-xl shadow-sm'
        } shadow-lg`}
      >
        {/* Preview Image Area */}
        <div className="aspect-[4/3] bg-slate-50 relative overflow-hidden group-hover:opacity-100">
           {/* If you have images: <img src={template.thumbnail} ... /> */}
           {/* Fallback Placeholder */}
           <div className="absolute inset-0 flex items-center justify-center text-slate-300 font-heading text-4xl font-bold opacity-20 select-none uppercase tracking-widest">
             {template.id === 'basic-free' ? 'Basic' : 'Pro'}
           </div>
           
           {/* Hover Overlay */}
           <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-300" />
        </div>

        {/* Card Footer / Info */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-heading text-slate-900 leading-tight">
                {template.name}
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-1">
                {template.category || 'Portfolio'}
              </p>
            </div>
            
            {/* Price Tag in Corner */}
            <div className={`text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider ${
              isFree ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
            }`}>
              {isFree ? 'Free' : '$19'}
            </div>
          </div>
          
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
            {template.description}
          </p>

          {/* CTA Button (Changes based on free status) */}
          <div className={`mt-5 w-full py-3 rounded-xl text-xs font-bold uppercase tracking-[0.15em] text-center transition-colors ${
             isFree 
              ? 'bg-emerald-500 text-white group-hover:bg-emerald-600'
              : 'bg-slate-900 text-white group-hover:bg-black'
          }`}>
            {isFree ? 'Start Building' : 'Buy Template'}
          </div>
        </div>

      </button>
    </div>
  );
}