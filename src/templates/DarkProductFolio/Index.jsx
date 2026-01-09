import React from 'react';
import { Dribbble, Twitter, Instagram, Mail, Linkedin, ArrowRight, Layers, Layout, Briefcase, Globe } from 'lucide-react';

export default function DarkProductFolio({ data, isMobilePreview = false }) {
  const {
    profileImage,
    fullName = "MARK SMITH",
    cardBio = "A Product Designer who has crafted countless user experiences.",
    roleTitle = "PRODUCT DESIGNER",
    mainBio = "Passionate about creating intuitive and engaging user experiences. Specialize in transforming ideas into beautifully crafted products.",
    stats = [
      { number: '+12', label: 'YEARS OF EXPERIENCE' },
      { number: '+46', label: 'PROJECTS COMPLETED' },
      { number: '+20', label: 'WORLDWIDE CLIENTS' }
    ],
    skillCards = [
      { title: 'DYNAMIC ANIMATION, MOTION DESIGN', desc: 'After Effects, Rive' },
      { title: 'FRAMER, FIGMA, WORDPRESS, REACTJS', desc: 'UI/UX & Development' }
    ],
    experience = [],
    contact = []
  } = data || {};

  // --- COLORS & STYLES ---
  const COLORS = {
    bg: '#0F0F0F',       // Matte Black
    cardWhite: '#FFFFFF',
    textWhite: '#F2F2F2',
    textGrey: '#A1A1A1',
    accentOrange: '#E85D35', // Vibrant Rust
    accentLime: '#D9F856',   // High-vis Lime
  };

  const getSocialIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('dribbble')) return <Dribbble size={18} />;
    if (t.includes('twitter')) return <Twitter size={18} />;
    if (t.includes('instagram')) return <Instagram size={18} />;
    if (t.includes('linkedin')) return <Linkedin size={18} />;
    return <Mail size={18} />;
  };

  const roleParts = roleTitle.split(' ');
  const roleFirst = roleParts[0] || 'PRODUCT';
  const roleRest = roleParts.slice(1).join(' ') || 'DESIGNER';

  // --- LAYOUT LOGIC ---
  // If isMobilePreview is true, we force the mobile CSS classes
  const isMobile = isMobilePreview; 
  
  return (
    <div 
      className={`min-h-screen font-sans antialiased overflow-x-hidden selection:bg-[#E85D35] selection:text-white`}
      style={{ backgroundColor: COLORS.bg, color: COLORS.textWhite }}
    >
      <div className={`mx-auto max-w-7xl ${isMobile ? 'p-5' : 'p-8 md:p-12 lg:p-20'}`}>
        
        {/* --- GRID CONTAINER --- */}
        <div className={`grid ${isMobile ? 'grid-cols-1 gap-12' : 'grid-cols-1 lg:grid-cols-12 lg:gap-24'} items-start`}>

          {/* --- LEFT COLUMN: STICKY ID CARD --- */}
          <div className={`lg:col-span-4 ${isMobile ? '' : 'sticky top-12'} z-20`}>
            
            <div className="bg-white text-black rounded-[2rem] p-5 pb-8 text-center shadow-2xl relative overflow-hidden ring-1 ring-white/10">
               
               {/* Orange Header Shape */}
               <div className="bg-[#E85D35] h-32 rounded-[1.5rem] w-full absolute top-4 left-4 right-4 width-auto" style={{ width: 'calc(100% - 32px)' }}></div>
               
               {/* Profile Image */}
               <div className="relative z-10 mt-8 mb-6 mx-auto w-48 h-56 rounded-2xl overflow-hidden bg-[#c44d2b] border-4 border-white shadow-lg">
                  {profileImage ? (
                    <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50 text-xs uppercase font-bold tracking-widest">
                       Upload Photo
                    </div>
                  )}
               </div>

               {/* Name */}
               <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#111]">{fullName}</h2>

               {/* Dashed Line */}
               <div className="flex justify-center mb-6 opacity-30">
                 <div className="w-12 border-t-2 border-dashed border-black relative">
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
                 </div>
               </div>

               {/* Bio */}
               <p className="text-sm font-medium text-gray-600 px-4 mb-8 leading-relaxed">
                 {cardBio}
               </p>

               {/* Socials */}
               <div className="flex justify-center gap-3">
                  {contact.map((item, idx) => (
                    <a key={idx} href={item.value} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#111] hover:text-white hover:border-[#111] transition-all">
                      {getSocialIcon(item.type)}
                    </a>
                  ))}
               </div>
            </div>
          </div>


          {/* --- RIGHT COLUMN: SCROLLABLE CONTENT --- */}
          <div className="lg:col-span-8 flex flex-col gap-20 pt-4">
            
            {/* 1. HEADER HERO */}
            <div>
               {/* Toolbar Icons */}
              <div className="flex gap-4 mb-10 opacity-20">
                 <div className="p-2.5 bg-white/10 rounded-lg"><Layout size={20}/></div>
                 <div className="p-2.5 bg-white/10 rounded-lg"><Layers size={20}/></div>
                 <div className="p-2.5 bg-white/10 rounded-lg"><Briefcase size={20}/></div>
              </div>

              {/* Headline */}
              <h1 className={`font-black uppercase leading-[0.9] tracking-tight mb-8 ${isMobile ? 'text-5xl' : 'text-7xl lg:text-8xl'}`}>
                <span className="block text-white mb-2">{roleFirst}</span>
                {/* Outlined Text Effect */}
                <span 
                  className="block text-transparent" 
                  style={{ WebkitTextStroke: '1px #555' }}
                >
                  {roleRest}
                </span>
              </h1>

              <p className="text-[#A1A1A1] text-lg lg:text-xl max-w-2xl leading-relaxed border-l-2 border-[#333] pl-6">
                {mainBio}
              </p>
            </div>

            {/* 2. STATS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 border-y border-[#222] py-12">
              {stats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl lg:text-5xl font-bold mb-2 text-white">{stat.number}</div>
                  <div className="text-[10px] font-bold text-[#666] uppercase tracking-[0.2em] leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. SKILL CARDS */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 gap-6'}`}>
              
              {/* Card 1: Orange */}
              {skillCards[0] && (
                <div className="bg-[#E85D35] rounded-3xl p-8 min-h-[240px] flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500">
                   {/* Blur Blob */}
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                   
                   <Layers size={32} className="text-white mb-6" />
                   
                   <div>
                     <h3 className="text-2xl font-black uppercase leading-none mb-3 text-white">{skillCards[0].title}</h3>
                     <p className="text-sm font-semibold text-white/70">{skillCards[0].desc}</p>
                   </div>
                   
                   <div className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm">
                      <ArrowRight size={18} />
                   </div>
                </div>
              )}
              
              {/* Card 2: Lime */}
              {skillCards[1] && (
                <div className="bg-[#D9F856] rounded-3xl p-8 min-h-[240px] flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-500 text-[#0F0F0F]">
                   {/* Pattern */}
                   <svg className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 100 100">
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                         <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5"/>
                      </pattern>
                      <rect width="100" height="100" fill="url(#grid)" />
                   </svg>
                   
                   <Layout size={32} className="mb-6" />
                   
                   <div>
                     <h3 className="text-2xl font-black uppercase leading-none mb-3">{skillCards[1].title}</h3>
                     <p className="text-sm font-bold opacity-60">{skillCards[1].desc}</p>
                   </div>
                   
                   <div className="absolute bottom-6 right-6 w-10 h-10 bg-black/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <ArrowRight size={18} />
                   </div>
                </div>
              )}
            </div>

            {/* 4. EXPERIENCE SECTION */}
            <div className="pt-8">
               <h2 className={`font-black uppercase leading-none mb-12 text-[#333] ${isMobile ? 'text-5xl' : 'text-7xl'}`}>
                 Timeline
               </h2>

               <div className="border-l border-[#222] pl-8 space-y-16">
                 {experience.map((job, idx) => (
                   <div key={idx} className="relative group">
                     {/* Timeline Dot */}
                     <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-[#222] border-2 border-[#0F0F0F] group-hover:bg-[#E85D35] transition-colors duration-300"></div>
                     
                     <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                        <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-[#E85D35] transition-colors">
                          {job.company}
                        </h3>
                        <span className="text-xs font-bold text-[#666] uppercase tracking-widest bg-[#1a1a1a] px-3 py-1 rounded">
                          {job.date}
                        </span>
                     </div>
                     <p className="text-[#888] text-base leading-relaxed max-w-xl">
                       {job.role}
                     </p>
                   </div>
                 ))}
               </div>
            </div>

            {/* 5. FOOTER */}
            <div className="border-t border-[#222] pt-12 pb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="text-[#444] text-xs font-bold uppercase tracking-widest">
                  © {new Date().getFullYear()} {fullName}
                </div>
                <div className="flex gap-6">
                   <div className="flex items-center gap-2 text-[#666] text-xs font-bold uppercase tracking-widest">
                      <Globe size={14} /> Available for work
                   </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}