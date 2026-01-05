import React from 'react';
import TemplateMiniature from './TemplateMiniature'; // Import the new component

const templates = [
  { 
    id: 'BasicFree', 
    name: 'The Standard', 
    cat: 'Essential', 
    color: '#000000', 
    description: 'Clean, monochrome, and effective. The standard for professional clarity. (Free)' 
  },
  { id: 'Heritage', name: 'Al-Majlis', cat: 'Leadership', color: '#1B3022', description: 'Serif-heavy leadership layout.' },
  { id: 'Brutalist', name: 'Structure v.01', cat: 'Engineering', color: '#111111', description: 'Bold geometry & storytelling.' },
  { id: 'Tech', name: 'Dark Matter', cat: 'Developer', color: '#38BDF8', description: 'Sleek, dark-mode professional.' },
  // ... add your other templates
];

export default function Gallery({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {templates.map(t => (
        <div 
          key={t.id} 
          onClick={() => onSelect(t.id)} 
          className="group cursor-pointer flex flex-col"
        >
          {/* Card Container */}
          <div className="aspect-[4/5] bg-slate-100 rounded-xl mb-4 overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative">
            
            {/* 1. THE MINIATURE (The key change) */}
            {/* We scale it slightly on hover for a nice effect */}
            <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
               <TemplateMiniature templateId={t.id} color={t.color} />
            </div>
            
            {/* 2. Glass Overlay (Makes it look premium/unclickable until hovered) */}
            <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
            
            {/* 3. Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
               <span className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                 Customize
               </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="px-1">
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