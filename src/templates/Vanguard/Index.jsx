import React from 'react';

export default function Vanguard({ data }) {
  // --- 1. SAFETY CHECK (Prevents White Screen) ---
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-red-500 font-mono p-10">
        Error: Profile data is missing. Please edit and re-deploy.
      </div>
    );
  }

  // --- 2. SAFE DEFAULTS (Prevents Crash on missing fields) ---
  // If the user didn't fill these out, we use empty defaults so the page loads
  const safeProjects = data.projects || [];
  const safeContact = data.contact || [];
  const safeName = data.fullName || "User Name";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      
      {/* 0. BACKGROUND FX */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-[10000ms]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen"></div>
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20">
        
        {/* 1. HEADER */}
        <header className="mb-24 border-l-2 border-cyan-500/50 pl-8 md:pl-12 py-4 relative">
          <div className="absolute top-0 left-[-5px] w-[8px] h-[8px] bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"></div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4 uppercase">
            {safeName}
          </h1>
          <div className="flex items-center gap-4 text-cyan-400 font-mono text-sm md:text-lg tracking-widest uppercase">
             <span>/// {data.title || "Developer"}</span>
             <div className="h-px flex-1 bg-slate-800"></div>
             <span className="animate-pulse">ONLINE</span>
          </div>
          
          {data.bio && (
            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-t border-slate-800/50 pt-8">
              {data.bio}
            </p>
          )}
        </header>

        {/* 2. PROJECTS */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12 border-b border-slate-800 pb-4">
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               <span className="text-violet-400 text-sm font-mono">01.</span> PROJECTS
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {safeProjects.map((project, index) => {
              const hasLink = project.link && project.link.trim() !== '';
              const bgImage = project.image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2670';

              return (
                <div key={index} className="group relative bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-all duration-500 rounded-xl overflow-hidden">
                  
                  {/* IMAGE AREA */}
                  <div className="h-64 md:h-80 w-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                     <img 
                       src={bgImage} 
                       alt={project.name} 
                       className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                     />
                     {/* Tech Overlay */}
                     <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-slate-950 to-transparent z-20 flex justify-between items-end">
                       {/* REMOVED ID TAG AS REQUESTED */}
                     </div>
                  </div>

                  {/* CONTENT AREA */}
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                       {project.name}
                     </h3>
                     <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base border-l border-slate-800 pl-4">
                       {project.desc}
                     </p>

                     {/* BUTTON */}
                     {hasLink && (
                       <a 
                         href={project.link}
                         target="_blank"
                         rel="noreferrer"
                         className="inline-flex items-center gap-3 text-xs font-bold font-mono uppercase tracking-[0.2em] text-white hover:text-cyan-300 transition-colors group/btn"
                       >
                         Initialize Sequence
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                         </svg>
                       </a>
                     )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. CONTACT FOOTER */}
        <footer className="border-t border-slate-800 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                 <span className="text-violet-400 text-sm font-mono">02.</span> COMMUNICATION
               </h2>
               <p className="text-slate-500 max-w-sm">
                 Encrypted channels are open. Transmit your data packets via the protocols listed.
               </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {safeContact.map((item, index) => (
                 <div key={index} className="flex flex-col p-4 bg-slate-900/40 border border-slate-800/60 hover:border-violet-500/50 transition-colors rounded">
                    <span className="text-[10px] font-mono uppercase text-violet-400 mb-1">
                      {item.type}
                    </span>
                    <span className="text-white font-medium truncate">
                      {item.value}
                    </span>
                 </div>
               ))}
             </div>
          </div>
          
          <div className="mt-20 flex justify-between items-end text-[10px] font-mono text-slate-600 uppercase tracking-widest">
             <div>Sys.Ver. 2.4.0</div>
             <div>© {new Date().getFullYear()} {safeName}</div>
          </div>
        </footer>

      </div>
    </div>
  );
}