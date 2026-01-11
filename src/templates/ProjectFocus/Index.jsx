import React from "react";

export default function ProjectFocus({ data, isMobilePreview = false }) {
  const {
    fullName = "Your Name",
    title = "Professional Title",
    bio = "Your professional biography goes here...",
    projects = [],
    contact = []
  } = data || {};

  // --- 1. ANIMATION STYLES (Floating Blobs) ---
  // We inject a simple style tag here so you don't need external CSS files
  const animationStyles = `
    @keyframes float-slow {
      0% { transform: translate(0, 0) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes float-medium {
      0% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-40px, 30px) rotate(10deg); }
      100% { transform: translate(0, 0) rotate(0deg); }
    }
    @keyframes float-fast {
      0% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(50px, 50px) scale(1.2); }
      100% { transform: translate(0, 0) scale(1); }
    }
    .animate-float-1 { animation: float-slow 15s infinite ease-in-out; }
    .animate-float-2 { animation: float-medium 12s infinite ease-in-out; }
    .animate-float-3 { animation: float-fast 10s infinite ease-in-out; }
    
    .bg-noise {
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    }
  `;

  const gridClasses = isMobilePreview
    ? "grid-cols-1 gap-6"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden relative">
      <style>{animationStyles}</style>

      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-noise opacity-[0.4] z-10"></div>
        
        {/* Animated Aurora Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-purple-300/30 rounded-full blur-[100px] animate-float-1 mix-blend-multiply"></div>
        <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-[100px] animate-float-2 mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[40vw] h-[40vw] bg-rose-200/30 rounded-full blur-[100px] animate-float-3 mix-blend-multiply"></div>
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className="relative z-10 pb-20 md:pb-32">
        
        {/* 1. HERO SECTION */}
        <header className="px-6 pt-24 md:pt-40 pb-20 max-w-6xl mx-auto">
          <div className="flex flex-col md:items-start text-center md:text-left">
            
            

            {/* Massive Name */}
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 mb-6 leading-[0.9] drop-shadow-sm">
              {fullName}
            </h1>

            {/* Title with Gradient */}
            <p className="text-2xl md:text-4xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-rose-500 mb-12">
              {title}
            </p>

            {/* Glass Bio */}
            {bio && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-rose-200 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/50 shadow-sm max-w-3xl">
                  <p className="text-lg md:text-2xl text-slate-700 leading-relaxed font-light whitespace-pre-wrap break-words">
                    {bio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* 2. PROJECTS SECTION */}
        <section className="px-6 py-12">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="flex items-end justify-between mb-12 border-b border-slate-200/60 pb-6">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                Selected Works
              </h2>
            </div>

            {/* Grid */}
            <div className={`grid ${gridClasses}`}>
              {projects && projects.length > 0 ? (
                projects.map((project, index) => {
                  const hasLink = project.link && project.link.trim() !== "";
                  
                  return (
                    <div 
                      key={index} 
                      className={`group relative flex flex-col h-full ${hasLink ? 'cursor-pointer' : ''}`}
                    >
                      {/* Card Container */}
                      <a 
                        href={hasLink ? project.link : undefined}
                        target={hasLink ? "_blank" : undefined}
                        rel="noreferrer"
                        className="relative flex flex-col h-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 p-8 transition-all duration-500 hover:bg-white/70 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-2"
                      >
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-100/0 via-rose-100/0 to-blue-100/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        {/* Top: Title */}
                        <div className="relative z-10 mb-6">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-tight group-hover:text-purple-900 transition-colors">
                              {project.title || "Untitled"}
                            </h3>
                            {hasLink && (
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                              </div>
                            )}
                          </div>
                          
                          <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-rose-400 rounded-full opacity-50 group-hover:w-24 transition-all duration-500"></div>
                        </div>

                        {/* Middle: Description */}
                        <div className="relative z-10 flex-grow">
                          <p className="text-slate-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words">
                            {project.description}
                          </p>
                        </div>

                        {/* Bottom: Footer */}
                        <div className="relative z-10 mt-8 pt-6 border-t border-slate-200/50 flex justify-between items-center">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-purple-600 transition-colors">
                            {hasLink ? "Live Project" : "Concept"}
                          </span>
                          <span className="text-[10px] font-mono text-slate-300 group-hover:text-slate-500 transition-colors">
                             Explore
                          </span>
                        </div>
                      </a>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-24 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-white/20">
                  <p className="text-slate-400 font-medium">Add projects to see them here.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 3. FOOTER / CONTACT */}
        <footer className="mt-24 px-6 max-w-5xl mx-auto">
          <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            {/* Footer Background Gradients */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">
                Let's create something <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-rose-300">extraordinary.</span>
              </h2>

              {/* Contact Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {contact && contact.length > 0 && contact.map((item, index) => (
                  <a
                    key={index}
                    href={item.value?.includes('@') ? `mailto:${item.value}` : item.value}
                    target="_blank"
                    rel="noreferrer"
                    className="group bg-white/10 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 md:px-8 md:py-4 transition-all duration-300 flex items-center gap-3"
                  >
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-70">
                      {item.platform}
                    </span>
                    <span className="font-medium text-sm">
                      {/* Shorten value if it's a URL for cleaner look */}
                      {item.value.replace(/^https?:\/\/(www\.)?/, '')}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="opacity-50 group-hover:opacity-100 transition-opacity"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg>
                  </a>
                ))}
              </div>

              {/* Branding */}
              <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-slate-400 font-light">
                <p>© {new Date().getFullYear()} {fullName}</p>
                <p className="flex items-center gap-2">
                   Designed with 
                   <span className="font-bold text-white tracking-widest uppercase text-[10px] bg-white/10 px-2 py-1 rounded">
                     Portfiller
                   </span>
                </p>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}