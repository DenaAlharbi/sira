import React from 'react';

export default function BasicFree({ data }) {
  const { 
    fullName = 'Alex Vonder', 
    title = 'Creative Developer', 
    bio = 'I build digital products with a focus on motion, interaction, and accessibility.', 
    projects = [], 
    contact = [] 
  } = data || {}; 

  return (
    <div className="min-h-screen bg-white text-slate-950 font-sans selection:bg-slate-900 selection:text-white">
      
      {/* MAIN CONTAINER */}
      <div className="max-w-3xl mx-auto px-6 pt-24 pb-12 md:pt-32 md:pb-20">
        
        {/* === HEADER SECTION === */}
        <header className="mb-20 md:mb-32">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-black mb-6 md:mb-8 break-words">
            {fullName}
          </h1>
          <p className="text-xl md:text-3xl text-slate-500 font-light tracking-wide mb-8 md:mb-12 break-words">
            {title}
          </p>
          
          <div className="w-24 h-0.5 bg-slate-900 mb-8 md:mb-12"></div>
          
          {/* FIX: Added 'w-full', 'break-words', and 'whitespace-pre-wrap' */}
          <p className="text-lg md:text-2xl text-slate-800 leading-relaxed font-normal max-w-2xl w-full break-words whitespace-pre-wrap">
            {bio}
          </p>
        </header>

        {/* === PROJECTS SECTION === */}
        <section className="mb-24 md:mb-32">
          <div className="mb-10 md:mb-16 border-b border-black pb-4">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black">
              Selected Works
            </h2>
          </div>

          <div className="space-y-16 md:space-y-24">
            {projects && projects.length > 0 ? (
              projects.map((project, index) => (
                <div key={index} className="group flex flex-col gap-6 md:gap-8">
                  {/* Title & Arrow */}
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
                      <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 group-hover:text-slate-600 transition-colors break-words">
                        <a href={project.link || '#'} target="_blank" rel="noreferrer">
                          {project.title || 'Untitled Project'}
                        </a>
                      </h3>
                      <span className="hidden md:inline-block opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-3xl text-slate-400">
                        &rarr;
                      </span>
                  </div>

                  {/* Description & Button */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                    <div className="md:col-span-8">
                      {/* FIX: Added break-words/pre-wrap here too for safety */}
                      <p className="text-base md:text-xl text-slate-600 leading-relaxed break-words whitespace-pre-wrap">
                        {project.description || 'A succinct description of the project highlighting the key technologies used and the problem solved.'}
                      </p>
                    </div>
                    
                    <div className="md:col-span-4 md:text-right flex md:block items-center">
                       {project.link && (
                         <a 
                           href={project.link}
                           target="_blank" 
                           rel="noreferrer"
                           className="inline-flex items-center gap-2 px-8 py-4 md:px-6 md:py-3 rounded-full border border-slate-200 hover:bg-black hover:text-white hover:border-black transition-all duration-300 text-xs font-bold uppercase tracking-widest"
                         >
                           View Live
                         </a>
                       )}
                    </div>
                  </div>
                  
                  {/* Subtle Separator */}
                  <div className="h-px bg-slate-100 w-full mt-8 md:hidden group-last:hidden"></div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center border border-dashed border-slate-200 rounded-lg">
                <p className="text-slate-400 italic">No projects added yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* === CONTACT SECTION === */}
        <section className="mb-20 md:mb-32">
          <div className="mb-10 md:mb-16 border-b border-black pb-4">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-black">
              Connect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {contact.map((item, idx) => (
              <a 
                key={idx}
                href={item.value?.includes('@') ? `mailto:${item.value}` : item.value}
                target="_blank"
                rel="noreferrer"
                className="group block p-6 md:p-8 bg-slate-50 border border-slate-100 rounded-xl hover:bg-black hover:text-white hover:border-black transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-widest opacity-60">
                    {item.platform}
                  </span>
                  <span className="text-slate-400 group-hover:text-white transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </span>
                </div>
                {/* FIX: Ensure long emails/urls break properly */}
                <div className="text-lg md:text-2xl font-bold truncate break-all">
                  {item.value}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* === FOOTER === */}
        <footer className="pt-12 md:pt-20 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-300 uppercase tracking-widest">
            ©  {new Date().getFullYear()} {fullName} <br className="md:hidden" /> 
            <span className="hidden md:inline"> — </span>
            Built with <span className="text-slate-900 font-bold">Portfiller</span>
          </p>
        </footer>

      </div>
    </div>
  );
}