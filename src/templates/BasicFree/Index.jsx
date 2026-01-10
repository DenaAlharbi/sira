import React from 'react';

export default function BasicFree({ data }) {
  // 1. Safe Destructuring with Defaults
  // Switched 'experience' to 'projects'
  const { 
    fullName = 'Your Name', 
    title = 'Professional Title', 
    bio = 'No biography provided yet.', 
    projects = [], 
    contact = [] 
  } = data || {}; 

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-black selection:text-white">
      
      {/* CONTAINER FIX */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
        
        {/* HEADER */}
        <header className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-black leading-tight">
            {fullName}
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            {title}
          </p>
          <div className="w-full h-1 bg-black mt-8"></div>
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

          {/* PROJECTS SECTION (Replaced Experience) */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects && projects.length > 0 ? (
                projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="group border border-slate-200 p-6 rounded-lg hover:border-black transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-black mb-2 group-hover:underline decoration-2 underline-offset-4">
                        <a href={project.link || '#'} target="_blank" rel="noreferrer">
                           {project.title || 'Project Name'}
                        </a>
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {project.description || 'No description provided for this project.'}
                      </p>
                    </div>
                    
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-black mt-auto flex items-center gap-1"
                      >
                        View Project <span>&rarr;</span>
                      </a>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-slate-400 italic text-sm">No projects added yet.</p>
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