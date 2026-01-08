import React from 'react';
import { Linkedin, Twitter, Github, Globe, Mail, ExternalLink, ArrowDown } from 'lucide-react';

export default function VelvetGold({ data, isMobilePreview = false }) {
  const {
    fullName = "NASRULLAH MANSUR",
    title = "Web Developer",
    aboutMe = "Building Dynamic And Scalable Web Applications With Precision. A Passionate Full-Stack Developer Skilled In Laravel, Node.Js, And Next.Js.",
    skills = [],
    projects = [],
    contact = []
  } = data || {};

  const getIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('linkedin')) return <Linkedin size={isMobilePreview ? 18 : 20} />;
    if (t.includes('twitter')) return <Twitter size={isMobilePreview ? 18 : 20} />;
    if (t.includes('github')) return <Github size={isMobilePreview ? 18 : 20} />;
    if (t.includes('email')) return <Mail size={isMobilePreview ? 18 : 20} />;
    return <Globe size={isMobilePreview ? 18 : 20} />;
  };

  // --- CONFIG ---
  const COLOR_BG_CREAM = "#FFF9E6"; 
  const COLOR_DARK = "#0C0C2C";     

  const initials = fullName.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <div className="font-sans w-full overflow-x-hidden bg-white selection:bg-[#0C0C2C] selection:text-white">
      
      {/* --- 1. HEADER --- */}
      <header 
        className={`relative w-full flex flex-col justify-center px-6 pt-12 pb-24 overflow-hidden`}
        style={{ 
          minHeight: isMobilePreview ? 'auto' : '600px', 
          backgroundColor: COLOR_BG_CREAM 
        }}
      >
        {/* Background Watermark */}
        <div className="absolute right-[-5%] bottom-[-10%] select-none pointer-events-none opacity-[0.03]">
          <span className="text-[15rem] md:text-[30rem] font-black leading-none text-[#0C0C2C]">
            {initials}
          </span>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start">
          
          {/* Top Tag */}
          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-[2px] bg-[#0C0C2C]"></div>
             <p className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-[#0C0C2C]">Hello I'm</p>
          </div>

          {/* Name */}
          <h1 className={`font-black uppercase text-[#0C0C2C] leading-[0.9] tracking-tighter mb-4 break-words w-full ${isMobilePreview ? 'text-4xl' : 'text-[6rem] md:text-[8rem]'}`}>
            {fullName.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>
          
          {/* Title */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
             <span className="text-sm md:text-xl font-bold uppercase tracking-[0.4em] text-[#0C0C2C]/70">{title}</span>
          </div>

          {/* --- FIXED LAYOUT --- */}
          {/* Use 'flex-col' for mobile (stack vertical) and 'md:flex-row' (side-by-side) for desktop */}
          <div className="w-full flex flex-col md:flex-row gap-8 items-start border-t border-[#0C0C2C]/10 pt-6">
            
            {/* 1. About Me Text (Takes full width on mobile, 60% on desktop) */}
            <div className="w-full md:w-[60%]">
              <p className={`text-[#0C0C2C]/80 leading-relaxed font-medium break-words w-full ${isMobilePreview ? 'text-sm' : 'text-lg'}`}>
                {aboutMe}
              </p>
            </div>

            {/* 2. Actions (Takes full width on mobile, 40% on desktop) */}
            <div className="w-full md:w-[40%] flex flex-col gap-6 items-start md:items-end">
               <a href="#projects" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0C0C2C] hover:opacity-70 transition-opacity cursor-pointer">
                  See My Work
                  <div className="w-8 h-8 rounded-full border border-[#0C0C2C] flex items-center justify-center group-hover:bg-[#0C0C2C] group-hover:text-white transition-colors">
                     <ArrowDown size={14} />
                  </div>
               </a>
            </div>
          </div>

        </div>
      </header>

      {/* --- 2. THE BELT --- */}
      <div className="relative w-full h-24 -mt-12 z-20 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-16 bg-[#0C0C2C] -rotate-2 border-y-2 border-[#D4AF37]/50 shadow-xl flex items-center justify-center">
            <div className="w-full h-[1px] bg-[#D4AF37]/20"></div>
         </div>
      </div>

      {/* --- 3. SKILLS SECTION --- */}
      <section className={`relative z-10 pb-16 bg-white ${isMobilePreview ? 'px-4 pt-4' : 'px-8 md:px-20 pt-12'}`}>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-[#050505] mb-4 tracking-tight">My Skills</h2>
          <div className="w-16 h-1.5 bg-[#0C0C2C] mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`border border-[#0C0C2C]/20 bg-white text-[#0C0C2C] font-bold uppercase tracking-widest rounded-full hover:bg-[#0C0C2C] hover:text-white hover:border-[#0C0C2C] transition-all cursor-default ${isMobilePreview ? 'px-4 py-2 text-[10px]' : 'px-6 py-2.5 text-xs'}`}
            >
              {skill.skillName || skill}
            </div>
          ))}
        </div>
      </section>

      {/* --- 4. PROJECTS SECTION --- */}
      <section id="projects" className={`py-16 bg-[#0C0C2C] ${isMobilePreview ? 'px-4' : 'px-8 md:px-20'}`}>
         <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-black uppercase text-white mb-4 tracking-tight">Selected Work</h2>
          <div className="w-16 h-1.5 bg-white/20 mx-auto rounded-full"></div>
        </div>

        <div className={`grid ${isMobilePreview ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'} max-w-7xl mx-auto`}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-2xl overflow-hidden flex flex-col shadow-xl hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 relative border-b border-gray-100">
                <img 
                  src={project.projectImage || "https://placehold.co/600x400/eee/999?text=Project"} 
                  alt={project.projectName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#0C0C2C]/0 group-hover:bg-[#0C0C2C]/10 transition-colors"></div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg md:text-xl font-bold text-[#050505] mb-2 leading-tight">{project.projectName}</h3>
                <div className="w-8 h-1 bg-[#D4AF37] mb-4 mt-1 rounded-full"></div>
                <div className="flex-1"></div>
                {project.projectLink && (
                  <a 
                    href={project.projectLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-between w-full py-2.5 px-4 bg-[#0C0C2C] text-white font-bold uppercase text-[10px] tracking-[0.2em] rounded-lg hover:bg-black transition-colors"
                  >
                    <span>View Project</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 5. CONTACT SECTION --- */}
      <section className="bg-[#0C0C2C] pb-16 pt-8 px-6 text-center border-t border-white/5">
        <h2 className="text-white text-sm font-bold uppercase tracking-[0.3em] mb-8 opacity-60">Connect With Me</h2>
        
        <div className="flex justify-center flex-wrap gap-4">
          {contact.map((item, idx) => (
            <a 
              key={idx} 
              href={item.value} 
              target="_blank" 
              rel="noreferrer"
              className="w-12 h-12 flex items-center justify-center border border-white/20 rounded-full text-white hover:bg-white hover:text-[#0C0C2C] transition-all hover:scale-110"
            >
              {getIcon(item.type)}
            </a>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-8 text-center text-white/40 text-[10px] uppercase tracking-[0.2em] bg-[#0C0C2C]">
        © {new Date().getFullYear()} {fullName}. All Rights Reserved.
      </footer>
    </div>
  );
}