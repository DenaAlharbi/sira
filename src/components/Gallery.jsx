const templates = [
  { id: 1, name: 'The Diplomat', cat: 'Executive', description: 'Serif-heavy leadership layout.' },
  { id: 2, name: 'Creative Avant', cat: 'Designer', description: 'Bold geometry & storytelling.' },
  { id: 3, name: 'The Consultant', cat: 'Corporate', description: 'Ultra-clean, high-readability.' },
  { id: 4, name: 'Heritage Luxe', cat: 'Architecture', description: 'Classic Arabic-centric design.' },
  { id: 5, name: 'Minimal Mono', cat: 'Tech', description: 'Sleek, dark-mode professional.' },
  { id: 6, name: 'Editorial', cat: 'Writer', description: 'Magazine-style typography.' },
  { id: 7, name: 'Foundry', cat: 'Engineer', description: 'Structured, precise, and bold.' },
  { id: 8, name: 'Visionary', cat: 'Director', description: 'Cinematic, image-focused.' }
];

export default function Gallery({ onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      {templates.map(t => (
        <div 
          key={t.id} 
          onClick={onSelect} 
          className="group cursor-pointer flex flex-col"
        >
          {/* Smaller, Refined Preview Box */}
          <div className="aspect-[4/5] bg-slate-50 rounded-lg mb-4 overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-500 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-sira-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            {/* Minimalist Logo Placeholder */}
            <span className="text-slate-200 text-4xl font-heading font-bold select-none italic group-hover:text-sira-purple/10 transition-colors">S</span>
            
            {/* Quick Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
               <span className="bg-slate-900 text-white px-4 py-2 rounded-sm text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl">
                 Select
               </span>
            </div>
          </div>

          {/* Metadata Section with Tighter Spacing */}
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