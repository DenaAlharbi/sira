import React from 'react';

// 1. Accept the isMobilePreview prop
export default function Vanguard({ data, isMobilePreview = false }) {
  const {
    fullName = "Ghost Operator",
    title = "Specialist",
    bio = "",
    projects = [],
    contact = []
  } = data || {};

  // 2. DYNAMIC GRID LOGIC
  const gridClasses = isMobilePreview 
    ? "grid-cols-1 gap-8" 
    : "grid-cols-1 md:grid-cols-2 gap-8 md:gap-12";

  // --- CSS INJECTION FOR GLITCH & SCANLINES ---
  const styles = `
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100%); }
    }
    .bg-scanlines {
      background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
      background-size: 100% 4px;
    }
    .animate-scan {
      animation: scanline 8s linear infinite;
    }
    .text-glow {
      text-shadow: 0 0 10px rgba(34, 211, 238, 0.5);
    }
  `;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <style>{styles}</style>
      
      {/* BACKGROUND FX */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none z-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 z-10"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] mix-blend-screen opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] mix-blend-screen opacity-50 animate-pulse delay-1000"></div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-20">
        
        {/* 1. HEADER */}
        <header className="mb-24 border-l-2 border-cyan-500/50 pl-8 md:pl-12 py-4 relative group">
          <div className="absolute top-0 left-[-5px] w-[8px] h-[8px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
          
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4 uppercase break-words group-hover:text-glow transition-all duration-300">
            {fullName}
          </h1>
          <div className="flex items-center gap-4 text-cyan-400 font-mono text-sm md:text-lg tracking-widest uppercase">
             <span>/// {title}</span>
             <div className="h-px flex-1 bg-slate-800 group-hover:bg-cyan-900/50 transition-colors"></div>
             <span className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
               ONLINE
             </span>
          </div>
          
          {bio && (
            <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-t border-slate-800/50 pt-8">
              {bio}
            </p>
          )}
        </header>

        {/* 2. PROJECTS */}
        <section className="mb-32">
          <div className="flex items-end justify-between mb-12 border-b border-slate-800 pb-4">
             <h2 className="text-2xl font-bold text-white flex items-center gap-3">
               <span className="text-violet-400 text-sm font-mono">01.</span> <span className="tracking-[0.2em]">PROJECTS</span>
             </h2>
          </div>

          <div className={`grid ${gridClasses}`}>
            {projects && projects.length > 0 ? (
              projects.map((project, index) => {
                const hasLink = project.link && project.link.trim() !== '';
                const bgImage = project.image || null;

                return (
                  <div key={index} className="group relative bg-slate-900/80 border border-slate-800 hover:border-cyan-500 transition-all duration-500 rounded-none overflow-hidden hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                    
                    {/* IMAGE AREA */}
                    <div className="h-64 md:h-80 w-full overflow-hidden relative bg-slate-950 border-b border-slate-800 group-hover:border-cyan-500/50 transition-colors">
                        {/* Scanline on Hover */}
                        <div className="absolute inset-0 bg-scanlines opacity-0 group-hover:opacity-30 z-20 pointer-events-none transition-opacity duration-500"></div>
                        
                        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors z-10"></div>
                        
                        {bgImage ? (
                          <img 
                            src={bgImage} 
                            alt={project.title} 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-700 font-mono text-xs uppercase tracking-widest bg-[url('https://grainy-gradients.vercel.app/noise.svg')]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="mb-4 opacity-50"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            <span>No Visual Data</span>
                          </div>
                        )}
                        
                        {/* Corner Decoration */}
                        <div className="absolute bottom-0 right-0 p-2 bg-slate-950 border-t border-l border-slate-800 z-20">
                           <div className="w-2 h-2 bg-slate-700 group-hover:bg-cyan-400 transition-colors"></div>
                        </div>
                    </div>

                    {/* CONTENT AREA */}
                    <div className="p-8 relative">
                        {/* Decorative Line */}
                        <div className="absolute top-0 left-0 w-1 h-0 bg-cyan-500 group-hover:h-full transition-all duration-500 ease-in-out"></div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors font-mono uppercase tracking-tight">
                          {project.title || "Untitled Node"}
                        </h3>
                        
                        <p className="text-slate-400 leading-relaxed mb-8 text-sm md:text-base pl-1 min-h-[3rem] line-clamp-3">
                          {project.description || "No system specifications provided."}
                        </p>

                        {/* BUTTON */}
                        {hasLink && (
                          <a 
                            href={project.link}
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 text-xs font-bold font-mono uppercase tracking-[0.2em] text-white hover:text-cyan-300 transition-colors group/btn border border-slate-700 hover:border-cyan-500 px-6 py-3 bg-slate-950 hover:bg-cyan-950/30"
                          >
                            <span>Initialize</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                          </a>
                        )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full border border-dashed border-slate-800 p-12 text-center rounded-lg">
                <p className="text-slate-600 italic font-mono text-sm">
                   // System Status: No projects deployed yet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. CONTACT FOOTER */}
        <footer className="border-t border-slate-800 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <div>
               <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                 <span className="text-violet-400 text-sm font-mono">02.</span> <span className="tracking-[0.2em]">UPLINK</span>
               </h2>
               <p className="text-slate-500 max-w-sm">
                 Encrypted channels are open. Transmit your data packets via the protocols listed below. Zero-trust verification enabled.
               </p>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {contact && contact.length > 0 ? (
                 contact.map((item, index) => (
                   <a 
                     key={index} 
                     href={item.value?.includes('@') ? `mailto:${item.value}` : item.value}
                     target="_blank"
                     rel="noreferrer"
                     className="group flex flex-col p-4 bg-slate-900/40 border border-slate-800 hover:border-violet-500 transition-colors hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] cursor-pointer"
                   >
                      <span className="text-[10px] font-mono uppercase text-violet-400 mb-2 group-hover:text-white transition-colors">
                        {item.platform}
                      </span>
                      <span className="text-slate-300 font-medium truncate text-sm group-hover:text-cyan-200 transition-colors">
                        {item.value}
                      </span>
                   </a>
                 ))
               ) : (
                 <div className="text-slate-600 italic font-mono text-sm p-4 col-span-full">
                   // Connection Lost: No contact data found.
                 </div>
               )}
             </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 mt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-400 font-light">
                <p>© {new Date().getFullYear()} {fullName}</p>
                <p className="flex items-center gap-2">
                   Designed with 
                   <span className="font-bold text-white tracking-widest uppercase text-[10px] bg-white/10 px-2 py-1 rounded">
                     Portfiller
                   </span>
                </p>
          </div>
        </footer>

      </div>
    </div>
  );
}