import React from 'react';

export default function BasicFree({ data }) {
  // 1. Safe Destructuring with Defaults
  const { 
    fullName = 'Your Name', 
    title = 'Professional Title', 
    bio = 'No biography provided yet.', 
    experience = [], 
    contact = [] 
  } = data || {}; 

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white">
      
      {/* CONTAINER FIX: 
        - max-w-3xl: Limits width so it doesn't stretch too wide on big screens
        - mx-auto: Centers the container itself
        - px-6: Adds side padding for mobile so text doesn't touch edges
      */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
        
        {/* HEADER */}
        <header className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-black leading-tight">
            {fullName}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            {title}
          </p>
          <div className="w-12 h-1 bg-black mt-8"></div>
        </header>

        <main className="space-y-16">
          
          {/* ABOUT SECTION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
              About
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-slate-800 whitespace-pre-wrap max-w-2xl">
              {bio}
            </p>
          </section>

          {/* EXPERIENCE SECTION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
              Experience
            </h2>
            <div className="space-y-10 border-l border-slate-100 pl-6 md:pl-8 -ml-2">
              {experience && experience.length > 0 ? (
                experience.map((job, index) => (
                  <div key={index} className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-3 h-3 rounded-full bg-slate-200 border-2 border-white"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                      <h3 className="text-lg font-bold text-black">
                        {job.company || 'Company Name'}
                      </h3>
                      <span className="text-xs font-mono text-slate-400 mt-1 sm:mt-0">
                        {job.duration || 'Dates'}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 mb-3 uppercase tracking-wide">
                      {job.role || 'Role'}
                    </div>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {job.description || 'No description added.'}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 italic text-sm">No experience added yet.</p>
              )}
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
              Connect
            </h2>
            {contact && contact.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contact.map((item, index) => (
                  <a 
                    key={index}
                    href={item.value && item.value.includes('@') ? `mailto:${item.value}` : item.value}
                    target="_blank" 
                    rel="noreferrer"
                    className="block p-4 rounded-lg border border-slate-200 hover:border-black hover:bg-slate-50 transition-all group"
                  >
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-1 group-hover:text-slate-600">
                      {item.platform || 'Link'}
                    </span>
                    <span className="text-sm font-medium text-black truncate block">
                      {item.value || '...'}
                    </span>
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm">No contact details provided.</p>
            )}
          </section>

        </main>

        <footer className="mt-20 pt-10 border-t border-slate-100">
           <p className="text-xs text-slate-300 uppercase tracking-widest">
             © {new Date().getFullYear()} {fullName}
           </p>
        </footer>

      </div>
    </div>
  );
}