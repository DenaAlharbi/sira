import React from 'react';
import { ChevronRight, Linkedin, Twitter, Github, Dribbble, Instagram, Globe, Mail } from 'lucide-react';

export default function AppleStyleFolio({ data, isMobilePreview = false }) {
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

  // --- DYNAMIC STYLING LOGIC ---
  
  // 1. Layout: On mobile, stack vertically (Image on top, Text below). On Desktop, side-by-side.
  const headerLayout = isMobilePreview 
    ? "flex-col-reverse gap-6 text-center items-center" 
    : "flex-col-reverse gap-6 text-center md:flex-row md:justify-between md:text-left md:items-center";

  // 2. Image Size: Smaller on mobile to save vertical space.
  const profileImageClass = isMobilePreview 
    ? "w-32 h-32" 
    : "w-32 h-32 md:w-40 md:h-40";

  // 3. Outer Container Padding:
  // Mobile Preview: 'p-3' (Tiny padding so the card fills the phone screen).
  // Real Desktop: 'p-6 md:p-12' (Spacious luxury look).
  const containerPadding = isMobilePreview 
    ? "p-3" 
    : "p-6 md:p-12";

  // 4. Inner Card Padding:
  // Mobile Preview: 'p-5' (Enough room for text, but maximizes width).
  // Real Desktop: 'p-12' (Big whitespace).
  const cardPadding = isMobilePreview 
    ? "p-5 space-y-8 rounded-2xl" 
    : "p-8 md:p-12 space-y-12 rounded-3xl";

  return (
    <div className={`min-h-screen bg-[#F5F5F7] font-sans text-[#1D1D1F] flex justify-center ${containerPadding}`}>
      
      {/* CARD CONTAINER */}
      <div className={`w-full max-w-3xl bg-white shadow-sm flex flex-col ${cardPadding}`}>

        {/* --- HEADER SECTION --- */}
        <header className={`flex ${headerLayout}`}>
          <div className="flex-1 space-y-2">
            <h1 className={`${isMobilePreview ? "text-3xl" : "text-4xl md:text-5xl"} font-semibold tracking-tight`}>
              {fullName}
            </h1>
            <p className={`${isMobilePreview ? "text-base" : "text-lg md:text-xl"} text-[#86868B] leading-relaxed max-w-md mx-auto md:mx-0 break-words`}>
              {aboutMe}
            </p>
          </div>
          
          <div className={`${profileImageClass} rounded-full overflow-hidden bg-gray-100 flex-shrink-0 border-4 border-white shadow-sm`}>
            {profileImage ? (
              <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 animate-pulse"></div>
            )}
          </div>
        </header>

        {/* --- PROJECTS SECTION --- */}
        <section>
          <div className="flex items-center mb-4 md:mb-6">
            <span className="w-2 h-2 bg-[#D1D1D6] rounded-full mr-3"></span>
            <h2 className="text-xl font-medium text-[#1D1D1F]">Projects</h2>
          </div>
          
          <div className="space-y-3 md:space-y-4">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.projectLink || '#'}
                target={project.projectLink ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="block bg-[#FBFBFD] p-4 rounded-2xl hover:bg-[#F5F5F7] transition-colors group"
              >
                <div className="flex items-center justify-between gap-4">
                  
                  {/* Left Side: Icon + Text */}
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm p-1 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-100">
                      {project.projectImage ? (
                          <img src={project.projectImage} alt={project.projectName} className="w-full h-full object-cover rounded-full" />
                      ) : (
                          <div className="w-full h-full bg-gray-200 rounded-full animate-pulse"></div>
                      )}
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-base md:text-lg truncate">{project.projectName}</h3>
                      <p className="text-[#86868B] text-xs md:text-sm truncate">{project.projectDescription}</p>
                    </div>
                  </div>

                  {/* Right Side: Arrow */}
                  <ChevronRight size={20} className="text-[#D1D1D6] flex-shrink-0" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* --- CONTACT SECTION --- */}
        <footer className={`bg-[#FBFBFD] rounded-2xl flex flex-wrap items-center justify-between gap-4 ${isMobilePreview ? 'p-4' : 'p-4'}`}>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-[#D1D1D6] rounded-full mr-3"></span>
            <h2 className="text-xl font-medium text-[#1D1D1F]">Contact Me</h2>
          </div>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {contact.map((item, index) => (
              <a
                key={index}
                href={item.value}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors border border-gray-100"
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