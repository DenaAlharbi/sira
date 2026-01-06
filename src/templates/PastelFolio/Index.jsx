import React from 'react';
import { ArrowDownRight, Linkedin, Mail, Phone, Globe, Dribbble, Twitter, Github } from 'lucide-react';

export default function PastelFolio({ data }) {
  const {
    fullName = "UI/UX Designer",
    skills = [], 
    projects = [],
    contact = [],
  } = data || {};

  // --- 1. DATA FIX: Handle "Repeater" Objects ---
  // Extract just the string from the object wrapper
  const skillList = skills.map(item => item.skillName || item); 

  const midpoint = Math.ceil(skillList.length / 2);
  const col1Skills = skillList.slice(0, midpoint);
  const col2Skills = skillList.slice(midpoint);

  // Helper for icons
  const getIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('linkedin')) return <Linkedin size={20} />;
    if (t.includes('email')) return <Mail size={20} />;
    if (t.includes('phone')) return <Phone size={20} />;
    if (t.includes('github')) return <Github size={20} />;
    if (t.includes('twitter') || t.includes('x')) return <Twitter size={20} />;
    if (t.includes('dribbble') || t.includes('behance')) return <Dribbble size={20} />;
    return <Globe size={20} />;
  };

  return (
    // --- 2. BACKGROUND FIX: True Mesh Gradient ---
    // This creates that specific "grainy pastel" look from your image
    <div 
      className="min-h-screen font-sans text-gray-900 selection:bg-black selection:text-white overflow-x-hidden"
      style={{
        backgroundColor: '#fdfbf7', // Base cream color
        backgroundImage: `
          radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
          radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
          radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)
        `,
        // We override the above with the PASTEL version:
        background: `
          radial-gradient(circle at 10% 20%, rgb(253, 235, 247) 0%, transparent 40%),
          radial-gradient(circle at 90% 10%, rgb(254, 249, 195) 0%, transparent 40%),
          radial-gradient(circle at 80% 80%, rgb(237, 233, 254) 0%, transparent 40%),
          radial-gradient(circle at 10% 90%, rgb(254, 226, 226) 0%, transparent 40%),
          #fffbf0
        `
      }}
    >
      
      {/* Texture Overlay (Optional noise effect) */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-20">

        {/* NAV */}
        <nav className="flex flex-wrap justify-center md:justify-between items-center mb-20 md:mb-32 gap-6 text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 border-b border-gray-900/10 pb-6">
          <div className="hidden md:block text-gray-900">Portfolio</div>
          <div className="flex gap-8">
            <a href="#skills" className="hover:text-black transition-colors">Skills</a>
            <a href="#projects" className="hover:text-black transition-colors">Projects</a>
            <a href="#contact" className="hover:text-black transition-colors">Contacts</a>
          </div>
        </nav>

        {/* HERO TITLE */}
        <header className="mb-24 md:mb-36 text-center md:text-left">
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black uppercase leading-[0.9] tracking-tighter text-gray-900 break-words">
            {fullName}
          </h1>
        </header>

        {/* SKILLS SECTION */}
        <section id="skills" className="mb-24 md:mb-36">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            {/* Column 1 */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 border-b border-gray-900 pb-4">
                Hard Skills
              </h2>
              <ul className="space-y-3 text-base md:text-lg font-bold uppercase tracking-wide text-gray-800">
                {col1Skills.length > 0 ? col1Skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) : <li>No skills added.</li>}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-8 border-b border-gray-900 pb-4">
                Soft Skills
              </h2>
               <ul className="space-y-3 text-base md:text-lg font-bold uppercase tracking-wide text-gray-800">
                {col2Skills.length > 0 ? col2Skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                )) : <li>—</li>}
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="mb-32">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] mb-12 border-b border-gray-900 pb-4">
            Selected Works
          </h2>

          {/* --- 3. LAYOUT FIX: Mobile Stack vs Desktop Grid --- */}
          {/* 'grid-cols-1' ensures one-by-one on mobile. */}
          {/* 'md:grid-cols-2' ensures side-by-side ONLY on tablet/desktop. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-12 md:gap-y-20">
            {projects.map((project, index) => {
               const imgUrl = project.image || "https://placehold.co/1600x900/F3F4F6/A1A1AA?text=No+Image";
               const hasLink = project.link && project.link.trim() !== '';

               return (
                 <div key={index} className="group flex flex-col w-full">
                   {/* THE FRAME: White background with border */}
                   <div className="bg-white p-3 border border-gray-900/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-shadow duration-500 w-full">
                     <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100 relative">
                        <img 
                          src={imgUrl} 
                          alt={project.name} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                     </div>
                   </div>

                   {/* Project Meta */}
                   <div className="mt-6 flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold uppercase leading-none mb-2">{project.name}</h3>
                        {/* Only show description if it's short, or on desktop to keep mobile clean */}
                        {project.desc && <p className="text-sm text-gray-500 max-w-xs">{project.desc}</p>}
                      </div>

                      {hasLink && (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-bold uppercase tracking-widest border-b border-gray-300 hover:border-black pb-1 transition-colors"
                        >
                          View Project ↗
                        </a>
                      )}
                   </div>
                 </div>
               );
            })}
          </div>
        </section>

        {/* CONTACT FOOTER */}
        <footer id="contact" className="border-t border-gray-900 pt-16 pb-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-gray-900">
              Let's Talk
            </h2>
            <div className="space-y-2">
              {contact.filter(c => ['email', 'phone'].includes((c.type || '').toLowerCase())).map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-800">
                   {getIcon(item.type)}
                   {(item.type || '').toLowerCase() === 'email' ? (
                     <a href={`mailto:${item.value}`} className="hover:text-purple-600 transition-colors">{item.value}</a>
                   ) : (
                     <span>{item.value}</span>
                   )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
             {contact.filter(c => !['email', 'phone'].includes((c.type || '').toLowerCase())).map((item, idx) => (
                <a 
                  key={idx} 
                  href={item.value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 shadow-sm hover:scale-110 hover:shadow-md transition-all rounded-full text-gray-900"
                  title={item.type}
                >
                  {getIcon(item.type)}
                </a>
             ))}
          </div>
        </footer>

      </div>
    </div>
  );
}