import React from 'react';
import { 
  Github, Twitter, Linkedin, Instagram, Mail, Globe, 
  ExternalLink, ArrowRight, Folder
} from 'lucide-react';

// Icon Helper
const Icon = ({ name, size = 20, className }) => {
  const icons = { Github, Twitter, Linkedin, Instagram, Mail, Globe, ExternalLink, ArrowRight, Folder };
  const IconComponent = icons[name] || icons.Globe;
  return <IconComponent size={size} className={className} />;
};

// Color mapping
const colorMap = {
  yellow: { 
    bg: 'bg-[#F2C94C]', 
    border: 'border-[#F2C94C]', 
    text: 'text-black',
    shadow: 'hover:shadow-[#F2C94C]/40',
    glow: 'group-hover:shadow-[0_0_15px_#F2C94C]'
  }, 
  gray: { 
    bg: 'bg-[#333333]', 
    border: 'border-[#333333]', 
    text: 'text-white',
    shadow: 'hover:shadow-[#333333]/40',
    glow: 'group-hover:shadow-[0_0_15px_#333333]'
  },   
  red: { 
    bg: 'bg-[#EB5757]', 
    border: 'border-[#EB5757]', 
    text: 'text-white',
    shadow: 'hover:shadow-[#EB5757]/40',
    glow: 'group-hover:shadow-[0_0_15px_#EB5757]'
  },    
  green: { 
    bg: 'bg-[#27AE60]', 
    border: 'border-[#27AE60]', 
    text: 'text-white',
    shadow: 'hover:shadow-[#27AE60]/40',
    glow: 'group-hover:shadow-[0_0_15px_#27AE60]'
  },  
  blue: { 
    bg: 'bg-[#2F80ED]', 
    border: 'border-[#2F80ED]', 
    text: 'text-white',
    shadow: 'hover:shadow-[#2F80ED]/40',
    glow: 'group-hover:shadow-[0_0_15px_#2F80ED]'
  },   
  default: { 
    bg: 'bg-[#333333]', 
    border: 'border-[#333333]', 
    text: 'text-white',
    shadow: 'hover:shadow-gray-500/40',
    glow: 'group-hover:shadow-[0_0_15px_gray]'
  } 
};

export default function TimelineFolio({ data, isMobilePreview = false }) {
  const {
    fullName = "Abdulrahman",
    about = "I am a UI Developer passionate about creating intuitive and engaging user experiences.",
    sectionTitle = "Education And Experience",
    timelineItems = [
      { date: '2006 - 2008', title: 'Master Degree', description: 'Lorem ipsum dolor sit amet.', color: 'yellow' },
      { date: '2000 - 2002', title: 'University Studies', description: 'Lorem ipsum dolor sit amet.', color: 'red' },
    ],
    projectTitle = "Selected Works",
    projects = [
      { title: 'Project One', desc: 'A cool web app.', link: '#', color: 'blue' },
      { title: 'Project Two', desc: 'A mobile design.', link: '#', color: 'green' },
    ],
    email = "hello@example.com",
    socials = [
      { platform: 'Twitter', url: '#' },
      { platform: 'Linkedin', url: '#' }
    ]
  } = data || {};

  // --- SIZING HELPERS ---
  const containerPadding = isMobilePreview ? 'px-4 py-8' : 'px-8 md:px-0 py-20';
  const headerSize = isMobilePreview ? 'text-2xl' : 'text-5xl';
  const subHeaderSize = isMobilePreview ? 'text-xl' : 'text-4xl';
  
  // NARROWER BOXES: Changed from 40% to 35% and added max-w-sm
  const boxWidthDesktop = 'md:w-[35%] max-w-sm'; 
  
  const linePositionClass = isMobilePreview 
    ? 'left-[19px]' 
    : 'left-[19px] md:left-1/2 md:-translate-x-1/2';

  return (
    <div className={`min-h-screen bg-[#111111] font-sans text-white overflow-x-hidden ${containerPadding}`}>
      <div className="max-w-6xl mx-auto h-full flex flex-col gap-20">
        
        {/* --- 1. HEADER (Identity) --- */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
           <h1 className={`${headerSize} font-bold tracking-tight`}>{fullName}</h1>
           <div className="w-20 h-1.5 bg-gray-700 mx-auto rounded-full"></div>
           <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
             {about}
           </p>
        </div>

        {/* --- 2. TIMELINE SECTION --- */}
        <div>
          <h2 className={`font-bold text-center text-gray-200 tracking-tight mb-16 ${subHeaderSize}`}>
            {sectionTitle}
          </h2>

          <div className="relative">
            {/* CENTRAL LINE */}
            <div className={`absolute top-0 bottom-0 w-1.5 bg-[#333] rounded-full ${linePositionClass}`}></div>

            <div className="space-y-10 md:space-y-0 relative">
              {timelineItems.map((item, index) => {
                const colors = colorMap[item.color] || colorMap.default;
                const isEven = index % 2 === 0;
                
                // Layout Logic
                const desktopWrapperClass = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
                const wrapperClass = isMobilePreview 
                  ? 'flex-row pl-12 pr-2' 
                  : `flex-col ${desktopWrapperClass} md:mb-12 md:pl-0`; 

                // Box Styling
                const boxWidth = isMobilePreview ? 'w-full' : `w-full ${boxWidthDesktop}`; 
                const desktopBoxRadius = isEven ? 'md:rounded-r-2xl md:rounded-l-sm' : 'md:rounded-l-2xl md:rounded-r-sm';
                const boxRadius = isMobilePreview ? 'rounded-xl' : desktopBoxRadius;

                return (
                  <div key={index} className={`flex ${wrapperClass} items-center relative group`}>
                    
                    {/* Mobile Dot */}
                    <div className={`
                      absolute left-[13px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#111] border-[3px] z-20 transition-all duration-300
                      ${colors.border} ${colors.glow} group-hover:scale-125
                      ${isMobilePreview ? 'block' : 'block md:hidden'}
                    `}></div>

                    {/* Content Card */}
                    <div className={`
                      ${boxWidth} p-6 shadow-lg relative z-10 cursor-default
                      ${colors.bg} ${colors.text} ${boxRadius} ${colors.shadow}
                      transform transition-all duration-300 ease-out
                      hover:-translate-y-1 hover:shadow-2xl
                    `}>
                       <h3 className="text-xl font-bold mb-2 opacity-100 tracking-wide">{item.date}</h3>
                       {item.title && <h4 className="text-base font-bold mb-2 opacity-80 uppercase tracking-wider">{item.title}</h4>}
                       <p className="text-sm opacity-80 leading-relaxed font-medium">
                          {item.description}
                       </p>
                    </div>

                    {/* Desktop Connector */}
                    {!isMobilePreview && (
                      <div className={`
                        hidden md:flex w-[30%] items-center justify-center
                        ${isEven ? 'mr-auto ml-0' : 'ml-auto mr-0'}
                      `}>
                          <div className={`h-1.5 w-full bg-[#333] group-hover:bg-gray-600 transition-colors duration-300 ${isEven ? '' : 'order-2'}`}></div>
                          <div className={`
                            w-6 h-6 rounded-full bg-[#111] border-[4px] z-20 flex-shrink-0 transition-all duration-300
                            ${colors.border} ${colors.glow} group-hover:scale-125
                            ${isEven ? 'order-2 -ml-3' : 'order-1 -mr-3'}
                          `}></div>
                      </div>
                    )}
                    
                    {/* Spacer */}
                    {!isMobilePreview && <div className={`hidden md:block ${boxWidthDesktop}`}></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* --- 3. PROJECTS SECTION --- */}
        <div>
           <h2 className={`font-bold text-center text-gray-200 tracking-tight mb-16 ${subHeaderSize}`}>
            {projectTitle}
          </h2>
          
          <div className={`grid gap-6 ${isMobilePreview ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
             {projects.map((proj, idx) => {
                const pColor = colorMap[proj.color || 'gray'];
                return (
                   <div key={idx} className={`p-6 rounded-2xl bg-[#1E1E1E] border border-[#333] hover:border-gray-500 transition-all duration-300 group flex flex-col`}>
                      <div className="flex justify-between items-start mb-4">
                         <div className={`p-3 rounded-lg ${pColor.bg} bg-opacity-20`}>
                            <Folder size={24} className={pColor.text === 'text-black' ? 'text-black' : 'text-white'} />
                         </div>
                         <a href={proj.link} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                            <ExternalLink size={20} />
                         </a>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                         {proj.desc}
                      </p>
                      {proj.link && (
                         <a href={proj.link} className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-white flex items-center gap-2 mt-auto">
                            View Project <ArrowRight size={14} />
                         </a>
                      )}
                   </div>
                )
             })}
          </div>
        </div>

        {/* --- 4. CONTACT SECTION (New Layout) --- */}
        <div className="border-t border-[#333] pt-12 pb-12 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 bg-[#1E1E1E] px-8 py-4 rounded-full border border-[#333]">
               
               {/* Email Text */}
               <a href={`mailto:${email}`} className="text-lg md:text-xl font-medium hover:text-blue-400 transition-colors">
                  {email}
               </a>

               {/* Divider (Hidden on mobile) */}
               <div className="hidden md:block w-px h-6 bg-gray-600"></div>

               {/* Social Icons Row */}
               <div className="flex gap-4">
                  {socials.map((social, idx) => (
                     <a 
                       key={idx} 
                       href={social.url} 
                       target="_blank" 
                       rel="noreferrer"
                       className="p-2 bg-[#333] rounded-full text-white hover:bg-white hover:text-black transition-all duration-300"
                       title={social.platform}
                     >
                        <Icon name={social.platform} size={18} />
                     </a>
                  ))}
               </div>
            </div>
            
            <div className="mt-12 text-gray-600 text-sm">
               © {new Date().getFullYear()} {fullName}. All rights reserved.
            </div>
        </div>

      </div>
    </div>
  );
}