import React from 'react';
import { getAllTemplatesList } from '../templates/templateRegistry';
import ScrollingCover from './ScrollingCover.jsx';

export default function Gallery({ onSelect, selectedTemplateId }) {
  const templates = getAllTemplatesList();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {templates.map((template) => (
        <div key={template.id} className="flex flex-col gap-3">
          
          {/* 1. The Scrolling Cover Card */}
          <ScrollingCover
            imageSrc={template.coverImage}
            title={template.title}
            isPaid={template.isPaid}
                      isSelected={selectedTemplateId === template.id}
            onClick={() => onSelect(template.id)}
          />

          {/* 2. Metadata below the card */}
          <div className="px-1 text-center sm:text-left">
            <p className="text-[10px] uppercase tracking-[0.25em] text-sira-orange font-extrabold mb-1">
              {template.category}
            </p>
            <h3 className="text-lg font-heading text-slate-900 leading-tight mb-1">
              {template.title}
            </h3>
            <p className="text-xs text-slate-400 leading-snug line-clamp-2">
              {template.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}