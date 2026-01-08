// src/templates/AppleStyleFolioDark/Index.jsx

import React from 'react';
import { ChevronRight, Linkedin, Twitter, Github, Dribbble, Instagram, Globe, Mail } from 'lucide-react';

export default function AppleStyleFolioDark({ data, isMobilePreview = false }) {
  const {
    fullName = "Brian Do",
    aboutMe = "Product designer from Jakarta, ID. Currently designing at Rectangle.",
    profileImage,
    projects = [],
    contact = []
  } = data || {};

  const getSocialIcon = (type) => {
    const t = (type || '').toLowerCase();
    if (t.includes('linkedin')) return <Linkedin size={20} />;
    if (t.includes('twitter')) return <Twitter size={20} />;
    if (t.includes('github')) return <Github size={20} />;
    if (t.includes('dribbble')) return <Dribbble size={20} />;
    if (t.includes('instagram')) return <Instagram size={20} />;
    if (t.includes('email')) return <Mail size={20} />;
    return <Globe size={20} />;
  };

  // --- DYNAMIC STYLING LOGIC (Exactly same as Light Mode) ---
  const headerLayout = isMobilePreview 
    ? "flex-col-reverse gap-6 text-center items-center" 
    : "flex-col-reverse gap-6 text-center md:flex-row md:justify-between md:text-left md:items-center";

  const profileImageClass = isMobilePreview 
    ? "w-32 h-32" 
    : "w-32 h-32 md:w-40 md:h-40";

  const containerPadding = isMobilePreview 
    ? "p-3" 
    : "p-6 md:p-12";

  const cardPadding = isMobilePreview 
    ? "p-5 space-y-8 rounded-2xl" 
    : "p-8 md:p-12 space-y-12 rounded-3xl";

  return (
    // DARK THEME: Main bg is Black
    <div className={`min-h-screen bg-black font-sans text-white flex justify-center ${containerPadding}`}>
      
      {/* DARK THEME: Card bg is #1C1C1E (Apple Dark Gray) */}
      <div className={`w-full max-w-3xl bg-[#1C1C1E] shadow-2xl flex flex-col border border-white/10 ${cardPadding}`}>

        {/* --- HEADER SECTION --- */}
        <header className={`flex ${headerLayout}`}>
          <div className="flex-1 space-y-2">
            <h1 className={`${isMobilePreview ? "text-3xl" : "text-4xl md:text-5xl"} font-semibold tracking-tight text-white`}>
              {fullName}
            </h1>
            {/* Secondary text is light gray #98989D */}
            <p className={`${isMobilePreview ? "text-base" : "text-lg md:text-xl"} text-[#98989D] leading-relaxed max-w-md mx-auto md:mx-0 break-words`}>
              {aboutMe}
            </p>
          </div>
          
          <div className={`${profileImageClass} rounded-full overflow-hidden bg-[#2C2C2E] flex-shrink-0 border-4 border-[#2C2C2E] shadow-sm`}>
            {profileImage ? (
              <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#3A3A3C] animate-pulse"></div>
            )}
          </div>
        </header>

        {/* --- PROJECTS SECTION --- */}
        <section>
          <div className="flex items-center mb-4 md:mb-6">
            <span className="w-2 h-2 bg-[#0A84FF] rounded-full mr-3"></span> {/* Blue Accent for Dark Mode */}
            <h2 className="text-xl font-medium text-white">Projects</h2>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.projectLink || '#'}
                target={project.projectLink ? "_blank" : "_self"}
                rel="noopener noreferrer"
                // Item bg is #2C2C2E (Lighter than card)
                className="block bg-[#2C2C2E] p-4 rounded-2xl hover:bg-[#3A3A3C] transition-colors group border border-white/5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-[#1C1C1E] p-1 flex items-center justify-center overflow-hidden flex-shrink-0 border border-white/10">
                      {project.projectImage ? (
                          <img src={project.projectImage} alt={project.projectName} className="w-full h-full object-cover rounded-full" />
                      ) : (
                          <div className="w-full h-full bg-[#3A3A3C] rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base md:text-lg truncate text-white">{project.projectName}</h3>
                      <p className="text-[#98989D] text-xs md:text-sm truncate">{project.projectDescription}</p>
                    </div>
                  </div>

                  <ChevronRight size={20} className="text-[#636366] flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <footer className={`bg-[#2C2C2E] rounded-2xl flex flex-wrap items-center justify-between gap-4 border border-white/5 ${isMobilePreview ? 'p-4' : 'p-4'}`}>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#0A84FF] rounded-full mr-3"></span>
            <h2 className="text-xl font-medium text-white">Contact Me</h2>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {contact.map((item, index) => (
              <a
                key={index}
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                // Icon buttons are dark gray #3A3A3C
                className="w-10 h-10 bg-[#3A3A3C] rounded-full flex items-center justify-center shadow-sm text-white hover:bg-[#48484A] transition-colors border border-white/5"
                aria-label={item.type}
              >
                {getSocialIcon(item.type)}
              </a>
            ))}
          </div>
        </footer>

      </div>
    </div>
  );
}