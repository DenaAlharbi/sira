import React from 'react';
import { getAllTemplatesList } from '../templates/templateRegistry';
import ScrollingCover from './ScrollingCover.jsx';

export default function Gallery({ onSelect, selectedTemplateId }) {
  const templates = getAllTemplatesList();

  // If no ID is passed, default to the first one (or null)
  const activeId = selectedTemplateId || 'BasicFree';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {templates.map((template) => (
        <div key={template.id} className="flex flex-col gap-3 group/card">
          
          {/* 1. The Scrolling Cover Card */}
          <ScrollingCover
            imageSrc={template.coverImage}
            title={template.title}
            isPaid={template.isPaid}
            isSelected={activeId === template.id} // Matches the active template
            onClick={() => onSelect(template.id)}
          />

          {/* 2. Metadata below the card */}
          <div className="px-1 text-center sm:text-left transition-opacity duration-300 group-hover/card:opacity-100 opacity-80">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-sira-orange font-extrabold mb-1">
                    {template.category}
                  </p>
                  <h3 className="text-lg font-heading text-slate-900 leading-tight mb-1">
                    {template.title}
                  </h3>
               </div>
               {/* Optional: Show Price Tag or 'Free' text */}
               <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${template.isPaid ? 'bg-slate-100 text-slate-500' : 'bg-green-50 text-green-600'}`}>
                 {template.isPaid ? '$50' : 'Free'}
               </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-snug line-clamp-2 mt-1">
              {template.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}