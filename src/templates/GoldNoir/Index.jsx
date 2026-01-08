import React from 'react';
import { Linkedin, Twitter, Github, Dribbble, Globe, Mail, ExternalLink } from 'lucide-react';

export default function GoldNoir({ data, isMobilePreview = false }) {
  const {
    headerImage,
    fullName = "MICHAEL SOUDRIN",
    title = "Professional Solu.",
    aboutMe = "A professional solution and easing container. High instant professors of prenonacurial technologies.",
    skills = [],
    projects = [],
    contact = []
  } = data || {};

  const getIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('linkedin')) return <Linkedin size={isMobilePreview ? 16 : 20} />;
    if (t.includes('twitter')) return <Twitter size={isMobilePreview ? 16 : 20} />;
    if (t.includes('github')) return <Github size={isMobilePreview ? 16 : 20} />;
    if (t.includes('email')) return <Mail size={isMobilePreview ? 16 : 20} />;
    return <Globe size={isMobilePreview ? 16 : 20} />;
  };

  // --- RESPONSIVE CONSTANTS ---
  const containerClass = isMobilePreview ? "min-h-screen bg-[#080808] font-sans text-white overflow-x-hidden" : "min-h-screen bg-[#080808] font-sans text-white overflow-x-hidden";
  const headerHeight = isMobilePreview ? "h-[500px]" : "h-[600px] md:h-[700px]";
  const goldColor = "#D4AF37"; // Luxury Gold

  return (
    <div className={containerClass}>
      
      {/* --- HEADER SECTION --- */}
      <header className={`relative ${headerHeight} w-full flex flex-col justify-center items-center text-center px-6`}>
        {/* Background Image + Heavy Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={headerImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564"} 
            alt="Background" 
            className="w-full h-full object-cover opacity-60"
          />
          {/* Gradient Fade to Black at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#080808]"></div>
        </div>

        {/* Header Content */}
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
          
          {/* Name & Title */}
          <div>
            <h1 
              className="font-bold uppercase tracking-tight mb-2 text-[#D4AF37]"
              style={{ fontSize: isMobilePreview ? '2.5rem' : '4.5rem', lineHeight: 1 }}
            >
              {fullName}
            </h1>
            <p className={`uppercase tracking-[0.2em] text-white/80 ${isMobilePreview ? 'text-xs' : 'text-sm md:text-base'}`}>
              {title}
            </p>
          </div>

          {/* About Me */}
          <p className={`text-gray-300 leading-relaxed max-w-xl ${isMobilePreview ? 'text-sm px-4' : 'text-lg'}`}>
            {aboutMe}
          </p>

          {/* Contacts */}
          <div className="flex gap-4 mt-4">
            {contact.map((item, idx) => (
              <a 
                key={idx} 
                href={item.value} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 border border-[#D4AF37] rounded-full text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
              >
                {getIcon(item.type)}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* --- THE BELT (Visual Divider) --- */}
      <div className="relative w-full h-24 overflow-hidden -mt-12 z-20">
        <div className="absolute inset-0 flex items-center justify-center">
            {/* The Belt Lines */}
            <div className="w-[120%] h-12 bg-[#0a0a0a] border-y-2 border-[#D4AF37]/40 transform -rotate-2 shadow-2xl flex items-center justify-center">
               <div className="w-full h-[1px] bg-[#D4AF37]/20"></div>
            </div>
        </div>
      </div>

      {/* --- SKILLS SECTION (Replacing 'My Services') --- */}
      <section className={`relative z-10 py-16 ${isMobilePreview ? 'px-4' : 'px-8 md:px-20'} bg-[#080808]`}>
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-white mb-2">My Skills</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <div 
              key={index}
              className={`border border-[#D4AF37]/50 rounded-full text-[#D4AF37] uppercase tracking-wider font-medium hover:bg-[#D4AF37] hover:text-black transition-colors cursor-default ${isMobilePreview ? 'px-4 py-2 text-xs' : 'px-6 py-2 text-sm'}`}
            >
              {skill.skillName || skill}
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section className={`py-16 md:py-24 bg-[#050505] ${isMobilePreview ? 'px-4' : 'px-8 md:px-20'}`}>
         <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold uppercase text-white mb-2">My Projects</h2>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto"></div>
        </div>

        <div className={`grid ${isMobilePreview ? 'grid-cols-1 gap-8' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'} max-w-7xl mx-auto`}>
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="group bg-[#0F0F0F] border border-white/5 rounded-xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="aspect-video w-full overflow-hidden bg-[#1a1a1a] relative">
                <img 
                  src={project.projectImage || "https://placehold.co/600x400/111/444?text=Project"} 
                  alt={project.projectName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.projectName}</h3>
                
                {/* Spacer to push button down */}
                <div className="flex-1"></div>

                {project.projectLink && (
                  <a 
                    href={project.projectLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center w-full py-3 md:py-4 bg-[#D4AF37] text-black font-bold uppercase text-xs tracking-widest hover:bg-white transition-colors rounded-lg gap-2"
                  >
                    Live Preview <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-white/20 text-xs uppercase tracking-widest bg-[#050505] border-t border-white/5">
        © {new Date().getFullYear()} {fullName}
      </footer>
    </div>
  );
}