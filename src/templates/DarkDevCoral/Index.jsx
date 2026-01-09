import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Smartphone, Database, Globe, Camera, User, 
  Code, Layers, Layout, Terminal, Server, Cpu, Play, Download
} from 'lucide-react';

const Icon = ({ name, size = 24, className }) => {
  const icons = {
    Github, Smartphone, Database, Globe, Camera, User, 
    Code, Layers, Layout, Terminal, Server, Cpu, Play, Download
  };
  const IconComponent = icons[name] || icons.Code;
  return <IconComponent size={size} className={className} />;
};

export default function DarkDevCoral({ data, isMobilePreview = false }) {
  const {
    fullName = "Amogoe",
    role = "a Front End Developer",
    about = "Fond of creating web application designs and bringing them to life using code & developing mobile designs.",
    resume = "#",
    skills = [
      { icon: 'Github', title: 'Git Version Control', desc: 'Managing code history and collaboration with precision.' },
      { icon: 'Smartphone', title: 'App Design', desc: 'Creating intuitive interfaces for mobile experiences.' },
      { icon: 'Database', title: 'Back-end Dev', desc: 'Building robust server-side logic and databases.' },
      { icon: 'Globe', title: 'Web Development', desc: 'Crafting responsive and dynamic websites.' },
    ],
    email = "contact@example.com",
  } = data || {};

  const colors = {
    bg: '#161821',      
    cardBg: '#1E212D',  
    accent: '#FF6B6B',  
    text: '#FFFFFF',
    textMuted: '#9CA3AF'
  };

  const navLinks = ['Home', 'Skills', 'Contact'];
  // Responsive padding
  const containerPadding = isMobilePreview ? 'px-6' : 'px-8 md:px-16';

  // --- SCROLL SPY LOGIC ---
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});

  useEffect(() => {
    // Only run on Desktop
    if (isMobilePreview) return;

    const observerOptions = {
      root: null, 
      rootMargin: '-50% 0px -50% 0px', // Active when section is in exact middle of screen
      threshold: 0 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    ['home', 'skills', 'contact'].forEach(id => {
      if (sectionRefs.current[id]) {
        observer.observe(sectionRefs.current[id]);
      }
    });

    return () => observer.disconnect();
  }, [isMobilePreview]);

  // Helper to render a timeline dot
  const renderTimelineDot = (sectionName) => {
    const isActive = activeSection === sectionName;
    return (
      <a 
        href={`#${sectionName}`}
        className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out cursor-pointer block z-10 relative ${isActive ? 'scale-150' : 'scale-100 hover:scale-125'}`}
        style={{ 
          backgroundColor: isActive ? colors.accent : colors.bg,
          border: `2px solid ${isActive ? colors.accent : '#4B5563'}`,
          boxShadow: isActive ? `0 0 15px ${colors.accent}60` : 'none'
        }}
        aria-label={`Scroll to ${sectionName}`}
      />
    );
  };

  return (
    <div 
      className={`min-h-screen font-sans selection:bg-[#FF6B6B] selection:text-white relative w-full`}
      style={{ backgroundColor: colors.bg, color: colors.text }}
    >
      
      {/* --- TIMELINE SIDEBAR (Desktop Only) --- */}
      {/* 1. absolute right-8 top-0 h-full: Spans the ENTIRE page height.
         2. pointer-events-none: Allows clicking through the empty space.
         3. sticky top-[50vh]: Pins the inner content to the vertical center of the VIEWPORT.
      */}
      {!isMobilePreview && (
        <div className="hidden md:block absolute right-12 top-0 h-full pointer-events-none z-50">
          <div className="sticky top-[50vh] -translate-y-1/2 flex flex-col items-center gap-1 pointer-events-auto">
             
             {/* Dot 1: Home */}
             {renderTimelineDot('home')}
             
             {/* Line 1 */}
             <div className="w-0.5 h-16 bg-gray-800 transition-colors duration-500 my-1 relative overflow-hidden rounded-full">
                <div className={`absolute top-0 left-0 w-full bg-[#FF6B6B] transition-all duration-500 ease-in-out ${activeSection === 'skills' || activeSection === 'contact' ? 'h-full' : 'h-0'}`}></div>
             </div>
             
             {/* Dot 2: Skills */}
             {renderTimelineDot('skills')}
             
             {/* Line 2 */}
             <div className="w-0.5 h-16 bg-gray-800 transition-colors duration-500 my-1 relative overflow-hidden rounded-full">
                <div className={`absolute top-0 left-0 w-full bg-[#FF6B6B] transition-all duration-500 ease-in-out ${activeSection === 'contact' ? 'h-full' : 'h-0'}`}></div>
             </div>
             
             {/* Dot 3: Contact */}
             {renderTimelineDot('contact')}
          </div>
        </div>
      )}


      {/* --- NAVBAR --- */}
      <nav className={`py-6 md:py-8 ${containerPadding} flex justify-between items-center max-w-7xl mx-auto relative z-40`}>
        <div className="font-bold text-xl tracking-tight">{fullName}</div>
        {!isMobilePreview && (
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            {navLinks.map((link) => (
              <a 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className={`hover:text-white transition-colors duration-300 ${activeSection === link.toLowerCase() ? 'text-white font-bold' : ''}`}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section 
        id="home" 
        ref={el => sectionRefs.current['home'] = el}
        className={`${containerPadding} pt-8 pb-16 md:pt-24 md:pb-32 max-w-7xl mx-auto relative min-h-[90vh] flex flex-col justify-center scroll-mt-20`}
      >
        <div className="md:w-2/3 relative z-10">
          <h2 className={`font-light mb-2 text-gray-300 ${isMobilePreview ? 'text-2xl' : 'text-3xl md:text-5xl'}`}>
            Hello, I'm
          </h2>
          <h1 className={`font-bold mb-6 text-white ${isMobilePreview ? 'text-3xl' : 'text-4xl md:text-6xl'}`}>
            {role}
          </h1>
          <p className={`text-gray-400 max-w-lg mb-10 leading-relaxed ${isMobilePreview ? 'text-sm' : 'text-base'}`}>
            {about}
          </p>
          
          {resume && (
            <a 
              href={resume} 
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-1 shadow-lg cursor-pointer w-max"
              style={{ backgroundColor: colors.accent }}
            >
              Download Resume <Download size={16} />
            </a>
          )}
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section 
        id="skills" 
        ref={el => sectionRefs.current['skills'] = el}
        className={`${containerPadding} py-16 md:py-32 max-w-7xl mx-auto relative min-h-[90vh] scroll-mt-20`}
      >
        <div className="mb-12 relative z-10">
           <span className="text-gray-400 text-xs md:text-sm uppercase tracking-wider mb-2 block">Expertise</span>
           <h2 className="text-3xl md:text-4xl font-bold inline-block relative pb-2">
             Skill-Set
             <span className="absolute bottom-0 left-0 w-12 h-1 rounded-full" style={{ backgroundColor: colors.accent }}></span>
           </h2>
        </div>

        <div className={`grid gap-6 ${isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="p-8 rounded-sm hover:shadow-xl transition-all duration-300 group"
              style={{ backgroundColor: colors.cardBg }}
            >
              <div className="mb-6" style={{ color: colors.accent }}>
                <Icon name={skill.icon} size={28} />
              </div>
              <h3 className="text-lg font-bold mb-4 group-hover:text-[#FF6B6B] transition-colors">{skill.title}</h3>
              <p className="text-gray-400 text-xs leading-loose">
                {skill.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section 
        id="contact" 
        ref={el => sectionRefs.current['contact'] = el}
        className={`${containerPadding} py-16 md:py-32 max-w-7xl mx-auto relative min-h-[70vh] scroll-mt-20`}
      >
         <div className="mb-12">
           <h2 className="text-3xl font-bold" style={{ color: colors.accent }}>
             Connect with me
           </h2>
        </div>

        <div className={`space-y-6 ${isMobilePreview ? 'w-full' : 'md:w-1/2'}`}>
           <form action={`mailto:${email}`} method="post" encType="text/plain">
             <div className="space-y-6">
                <input 
                    type="text" 
                    placeholder="Your Email" 
                    className="w-full p-4 rounded-sm text-sm outline-none focus:ring-1 focus:ring-[#FF6B6B] transition-all"
                    style={{ backgroundColor: colors.cardBg, color: 'white' }}
                />
                <textarea 
                    rows={4}
                    placeholder="Message" 
                    className="w-full p-4 rounded-sm text-sm outline-none focus:ring-1 focus:ring-[#FF6B6B] transition-all resize-none"
                    style={{ backgroundColor: colors.cardBg, color: 'white' }}
                />
                
                <button 
                  type="submit"
                  className="px-8 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-1 shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: colors.accent }}
                >
                  Submit <Play size={10} fill="white" />
                </button>
             </div>
           </form>
           
           <p className="text-xs text-gray-500 mt-4">
             Direct Email: <span className="text-white">{email}</span>
           </p>
        </div>
      </section>

    </div>
  );
}