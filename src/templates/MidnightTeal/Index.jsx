import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Smartphone, Database, Globe, Camera, User, 
  Code, Layers, Layout, Terminal, Server, Cpu, Play, Download,
  ExternalLink, Briefcase
} from 'lucide-react';

const Icon = ({ name, size = 24, className }) => {
  const icons = {
    Github, Smartphone, Database, Globe, Camera, User, 
    Code, Layers, Layout, Terminal, Server, Cpu, Play, Download,
    ExternalLink, Briefcase
  };
  const IconComponent = icons[name] || icons.Code;
  return <IconComponent size={size} className={className} />;
};

export default function MidnightTeal({ data, isMobilePreview = false }) {
  const {
    fullName = "AlexDev",
    role = "Full Stack Engineer",
    about = "Building scalable applications with modern technologies and clean architecture.",
    resume = "#",
    skills = [
      { icon: 'Code', title: 'Frontend', desc: 'React, Vue, Tailwind CSS' },
      { icon: 'Server', title: 'Backend', desc: 'Node.js, Python, Go' },
      { icon: 'Database', title: 'Database', desc: 'PostgreSQL, MongoDB, Redis' },
    ],
    projects = [
      { title: 'Project Alpha', desc: 'A cutting edge dashboard.', link: '#' },
      { title: 'Project Beta', desc: 'Mobile application for fitness.', link: '#' }
    ],
    email = "hello@example.com",
  } = data || {};

  // --- NEW PALETTE: Midnight & Teal ---
  const colors = {
    bg: '#0F172A',      // Slate 900
    cardBg: '#1E293B',  // Slate 800
    accent: '#2DD4BF',  // Teal 400
    text: '#F8FAFC',    // Slate 50
    textMuted: '#94A3B8' // Slate 400
  };

  const navLinks = ['Home', 'Skills', 'Projects', 'Contact'];
  const containerPadding = isMobilePreview ? 'px-6' : 'px-8 md:px-16';

  // --- SCROLL SPY ---
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  useEffect(() => {
    if (isMobilePreview) return;

    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    ['home', 'skills', 'projects', 'contact'].forEach(id => {
      if (sectionRefs.current[id]) observer.observe(sectionRefs.current[id]);
    });

    return () => observer.disconnect();
  }, [isMobilePreview]);

  const renderTimelineDot = (sectionName) => {
    const isActive = activeSection === sectionName;
    return (
      <a 
        href={`#${sectionName}`}
        className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer block z-10 relative ${isActive ? 'scale-150' : 'scale-100 hover:scale-125'}`}
        style={{ 
          backgroundColor: isActive ? colors.accent : colors.bg,
          border: `2px solid ${isActive ? colors.accent : '#475569'}`,
          boxShadow: isActive ? `0 0 15px ${colors.accent}60` : 'none'
        }}
        aria-label={`Scroll to ${sectionName}`}
      />
    );
  };

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-[#2DD4BF] selection:text-[#0F172A] relative w-full`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      
      {/* --- TIMELINE SIDEBAR (4 Dots) --- */}
      {!isMobilePreview && (
        <div className="hidden md:block absolute right-12 top-0 h-full pointer-events-none z-50">
          <div className="sticky top-[50vh] -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-auto">
             
             {/* Home */}
             {renderTimelineDot('home')}
             <div className="w-0.5 h-12 bg-slate-700 transition-colors duration-500 my-1 relative overflow-hidden rounded-full">
                <div className={`absolute top-0 left-0 w-full bg-[#2DD4BF] transition-all duration-500 ease-in-out ${activeSection !== 'home' ? 'h-full' : 'h-0'}`}></div>
             </div>
             
             {/* Skills */}
             {renderTimelineDot('skills')}
             <div className="w-0.5 h-12 bg-slate-700 transition-colors duration-500 my-1 relative overflow-hidden rounded-full">
                <div className={`absolute top-0 left-0 w-full bg-[#2DD4BF] transition-all duration-500 ease-in-out ${activeSection === 'projects' || activeSection === 'contact' ? 'h-full' : 'h-0'}`}></div>
             </div>

             {/* Projects */}
             {renderTimelineDot('projects')}
             <div className="w-0.5 h-12 bg-slate-700 transition-colors duration-500 my-1 relative overflow-hidden rounded-full">
                <div className={`absolute top-0 left-0 w-full bg-[#2DD4BF] transition-all duration-500 ease-in-out ${activeSection === 'contact' ? 'h-full' : 'h-0'}`}></div>
             </div>
             
             {/* Contact */}
             {renderTimelineDot('contact')}
          </div>
        </div>
      )}


      {/* --- NAVBAR --- */}
      <nav className={`py-6 md:py-8 ${containerPadding} flex justify-between items-center max-w-7xl mx-auto relative z-40`}>
        <div className="font-bold text-xl tracking-tight text-[#2DD4BF]">{fullName}</div>
        {!isMobilePreview && (
          <div className="hidden md:flex gap-8 text-sm text-slate-400">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className={`hover:text-[#2DD4BF] transition-colors duration-300 ${activeSection === link.toLowerCase() ? 'text-[#2DD4BF] font-bold' : ''}`}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* --- HERO --- */}
      <section 
        id="home" 
        ref={el => sectionRefs.current['home'] = el}
        className={`${containerPadding} pt-8 pb-16 md:pt-24 md:pb-32 max-w-7xl mx-auto relative min-h-[90vh] flex flex-col justify-center scroll-mt-20`}
      >
        <div className="md:w-2/3 relative z-10">
          <h2 className={`font-light mb-2 text-slate-300 ${isMobilePreview ? 'text-2xl' : 'text-3xl md:text-5xl'}`}>
            Hello, I'm
          </h2>
          <h1 className={`font-bold mb-6 text-white ${isMobilePreview ? 'text-3xl' : 'text-4xl md:text-6xl'}`}>
            {role}
          </h1>
          <p className={`text-slate-400 max-w-lg mb-10 leading-relaxed ${isMobilePreview ? 'text-sm' : 'text-base'}`}>
            {about}
          </p>
          
          {resume && (
            <a 
              href={resume} 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#0F172A] transition-transform hover:-translate-y-1 shadow-lg cursor-pointer rounded-sm"
              style={{ backgroundColor: colors.accent }}
            >
              Download Resume <Download size={16} />
            </a>
          )}
        </div>
      </section>

      {/* --- SKILLS --- */}
      <section 
        id="skills" 
        ref={el => sectionRefs.current['skills'] = el}
        className={`${containerPadding} py-16 md:py-32 max-w-7xl mx-auto relative min-h-[90vh] scroll-mt-20`}
      >
        <div className="mb-12 relative z-10">
           <span className="text-slate-400 text-xs md:text-sm uppercase tracking-wider mb-2 block">Stack</span>
           <h2 className="text-3xl md:text-4xl font-bold inline-block relative pb-2">
             My Skills
             <span className="absolute bottom-0 left-0 w-12 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></span>
           </h2>
        </div>

        <div className={`grid gap-6 ${isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-lg hover:shadow-2xl hover:shadow-teal-900/20 transition-all duration-300 group border border-slate-800 hover:border-teal-500/30"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="mb-6" style={{ color: colors.accent }}>
                <Icon name={skill.icon} size={28} />
              </div>
              <h3 className="text-lg font-bold mb-4 group-hover:text-[#2DD4BF] transition-colors">{skill.title}</h3>
              <p className="text-slate-400 text-xs leading-loose">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS (NEW) --- */}
      <section 
        id="projects" 
        ref={el => sectionRefs.current['projects'] = el}
        className={`${containerPadding} py-16 md:py-32 max-w-7xl mx-auto relative min-h-[90vh] scroll-mt-20`}
      >
        <div className="mb-12 relative z-10">
           <span className="text-slate-400 text-xs md:text-sm uppercase tracking-wider mb-2 block">Portfolio</span>
           <h2 className="text-3xl md:text-4xl font-bold inline-block relative pb-2">
             Featured Work
             <span className="absolute bottom-0 left-0 w-12 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></span>
           </h2>
        </div>

        <div className={`grid gap-8 ${isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="group rounded-xl overflow-hidden border border-slate-800 hover:border-teal-500/50 transition-all duration-500"
              style={{ backgroundColor: colors.cardBg }}
            >
              {/* Image Area */}
              <div className="h-48 md:h-64 bg-slate-900 overflow-hidden relative">
                {project.image ? (
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-slate-700">
                     <Layers size={48} />
                   </div>
                )}
                {/* Overlay Link */}
                <a href={project.link} target="_blank" rel="noreferrer" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                   <div className="bg-[#2DD4BF] text-slate-900 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ExternalLink size={24} />
                   </div>
                </a>
              </div>

              {/* Text Area */}
              <div className="p-6 md:p-8">
                 <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#2DD4BF] transition-colors">{project.title}</h3>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">
                   {project.desc}
                 </p>
                 <a href={project.link} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest text-[#2DD4BF] flex items-center gap-2 hover:gap-3 transition-all">
                    View Project <ExternalLink size={14} />
                 </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section 
        id="contact" 
        ref={el => sectionRefs.current['contact'] = el}
        className={`${containerPadding} py-16 md:py-32 max-w-7xl mx-auto relative min-h-[70vh] scroll-mt-20`}
      >
         <div className="mb-12">
           <h2 className="text-3xl font-bold" style={{ color: colors.accent }}>
             Get In Touch
           </h2>
        </div>

        <div className={`space-y-6 ${isMobilePreview ? 'w-full' : 'md:w-1/2'}`}>
           <form action={`mailto:${email}`} method="post" encType="text/plain">
             <div className="space-y-6">
                <input 
                    type="text" 
                    placeholder="Your Email" 
                    className="w-full p-4 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#2DD4BF] transition-all border border-slate-800"
                    style={{ backgroundColor: colors.cardBg, color: 'white' }}
                />
                <textarea 
                    rows={4}
                    placeholder="Message" 
                    className="w-full p-4 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#2DD4BF] transition-all resize-none border border-slate-800"
                    style={{ backgroundColor: colors.cardBg, color: 'white' }}
                />
                
                <button 
                  type="submit"
                  className="px-8 py-3 text-sm font-semibold text-slate-900 transition-transform hover:-translate-y-1 shadow-lg flex items-center gap-2 rounded-sm"
                  style={{ backgroundColor: colors.accent }}
                >
                  Send Message <Play size={10} fill="#0F172A" />
                </button>
             </div>
           </form>
           
           <p className="text-xs text-slate-500 mt-4">
             Direct Email: <span className="text-white">{email}</span>
           </p>
        </div>
      </section>

    </div>
  );
}