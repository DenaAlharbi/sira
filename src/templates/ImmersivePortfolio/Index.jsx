import React from 'react';
import { ArrowUpRight, Mail, Phone, Linkedin, Github, Twitter, Dribbble, Globe } from 'lucide-react';

export default function ImmersivePortfolio({ data, isMobilePreview = false }) {
  const { 
    headerImage, 
    fullName = "Your Name", 
    title = "Creative Professional", 
    projects = [], 
    skills = [], 
    contact = [] 
  } = data || {};

  const getIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('linkedin')) return <Linkedin size={24} />;
    if (t.includes('github')) return <Github size={24} />;
    if (t.includes('twitter')) return <Twitter size={24} />;
    if (t.includes('dribbble')) return <Dribbble size={24} />;
    if (t.includes('email')) return <Mail size={24} />;
    if (t.includes('phone')) return <Phone size={24} />;
    return <Globe size={24} />;
  };

  // Mobile check for grid layout
  const gridCols = isMobilePreview ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2";

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen">
      
      {/* HERO SECTION */}
      <header 
        // --- HEIGHT FIX ---
        // Changed from h-[85vh] to h-[75vh]
        // This reduces vertical space "just a bit" on all devices.
        className="relative h-[75vh] w-full flex flex-col justify-between overflow-hidden"
        style={{
          backgroundImage: `url(${headerImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>

        {/* Top Navigation */}
        <div className="relative z-10 p-6 md:p-8 flex justify-between items-center text-white/90">
          <span className="font-bold text-lg tracking-widest">{fullName.split(' ')[0]}.</span>
          <a href="#contacts" className="border border-white/30 px-5 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase hover:bg-white hover:text-black transition-all backdrop-blur-sm">
            Contact
          </a>
        </div>

        {/* HERO CONTENT */}
        {/* Layout: Always Row (Name Left / Title Right) for both Mobile & Desktop */}
        <div className="relative z-10 p-6 md:p-16 flex flex-row items-end justify-between gap-4">
          
          {/* LEFT: Name */}
          <div className="text-white flex-1">
            <p className="text-lg md:text-2xl font-light mb-[-2px] md:mb-[-5px] opacity-90">I AM</p>
            <h1 className="text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] break-words">
              {fullName}
            </h1>
          </div>

          {/* RIGHT: Profession */}
          <div className="text-white flex flex-col items-end text-right w-1/2 md:w-auto">
            <h2 className="text-lg md:text-5xl font-bold uppercase leading-tight text-white/90">
              {title}
            </h2>
            <div className="h-1 w-12 md:w-20 bg-yellow-400 mt-3 md:mt-6"></div>
          </div>
        </div>
      </header>

      {/* RECENT PROJECTS */}
      <section className="py-16 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <h3 className="text-3xl md:text-5xl font-black text-center uppercase mb-12 md:mb-24 tracking-tighter">
          Recent Projects
        </h3>

        <div className={`grid ${gridCols} gap-12`}>
          {projects.map((project, index) => (
            <div key={index} className="group relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 relative mb-6 border border-gray-100 shadow-sm">
                <img 
                  src={project.projectImage || "https://placehold.co/800x600/eee/999?text=Project"} 
                  alt={project.projectName} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {project.projectLink && (
                  <a 
                    href={project.projectLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <div className="bg-white text-black px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                      View Case <ArrowUpRight size={16} />
                    </div>
                  </a>
                )}
              </div>
              <div>
                <h4 className="text-xl md:text-3xl font-bold uppercase mb-2">{project.projectName}</h4>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed max-w-md">
                  {project.projectDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="py-16 md:py-20 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
           <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-400">Expertise</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 px-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-5 py-2 md:px-6 md:py-3 border border-white/20 rounded-full text-sm md:text-xl font-medium uppercase hover:bg-white hover:text-black transition-colors cursor-default"
            >
              {skill.skillName || skill}
            </span>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contacts" className="py-16 md:py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-10 md:mb-12">
            Let's Talk
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-12">
            {contact.map((item, index) => (
              <a 
                key={index} 
                href={item.value}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-base md:text-xl font-bold uppercase hover:text-yellow-500 transition-colors group"
              >
                <span className="p-2 md:p-3 bg-gray-100 rounded-full group-hover:bg-yellow-400 group-hover:text-white transition-colors">
                  {getIcon(item.type)}
                </span>
                {item.type === 'Email' ? 'Email Me' : item.type}
              </a>
            ))}
          </div>

          <div className="mt-20 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400">
            © {new Date().getFullYear()} {fullName}
          </div>
        </div>
      </footer>

    </div>
  );
}