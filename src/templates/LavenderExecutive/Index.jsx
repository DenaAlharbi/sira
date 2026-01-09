// src/templates/LavenderExecutive/Index.jsx
import React from 'react';
import { ArrowUpRight, Quote } from 'lucide-react';

export default function LavenderExecutive({ data, isMobilePreview = false }) {
  const {
    profileImage,
    fullName = "Alexandra Chen",
    roleTitle = "Strategic Advisor & Executive Leader",
    executiveSummary = "A results-driven executive with over 15 years of experience scaling global operations and driving digital transformation. Expert at bridging the gap between high-level strategy and operational excellence to deliver sustainable growth.",
    achievements = [],
    expertiseAreas = [],
    testimonials = [],
    contactLinks = []
  } = data || {};

  // --- Colors from the image ---
  const COLORS = {
    background: '#F3E5F5', // The soft lavender/pink from the image background
    card: '#FFFFFF',       // Pure white card
    textDark: '#1A1A1A',   // Near black for primary text
    textMedium: '#4A4A4A', // Dark gray for secondary text
    textLight: '#7A7A7A',  // Lighter gray for tertiary text
    accent: '#6A1B9A',     // A deep purple for subtle accents/links
  };

  // --- Responsive styling helpers ---
  const containerPadding = isMobilePreview ? 'p-6 py-12' : 'p-8 md:p-16 py-20';
  const cardPadding = isMobilePreview ? 'p-8' : 'p-12 md:p-16';
  const titleSize = isMobilePreview ? 'text-4xl' : 'text-5xl md:text-6xl';
  const sectionTitleSize = isMobilePreview ? 'text-2xl' : 'text-3xl';

  return (
    <div 
      className={`min-h-screen w-full flex justify-center items-center font-sans ${containerPadding}`}
      style={{ backgroundColor: COLORS.background }}
    >
      {/* --- The Main White Card --- */}
      <div 
        className={`w-full max-w-5xl bg-white shadow-2xl ${cardPadding}`}
        style={{ 
          borderRadius: isMobilePreview ? '2rem' : '3rem', // Large rounded corners like the image
          color: COLORS.textDark 
        }}
      >
        
        {/* --- HEADER SECTION (Name, Summary, Photo) --- */}
        <header className={`flex ${isMobilePreview ? 'flex-col-reverse gap-8' : 'flex-row justify-between items-center gap-12'} mb-20`}>
          
          {/* Left: Text Content */}
          <div className="flex-1 space-y-6">
             <div>
                <h2 className="text-lg font-medium tracking-wider uppercase mb-2" style={{ color: COLORS.textLight }}>
                  {roleTitle}
                </h2>
                <h1 className={`font-bold tracking-tight leading-tight ${titleSize}`}>
                  {fullName}
                </h1>
             </div>
             <div className="w-20 h-1.5 rounded-full" style={{ backgroundColor: COLORS.accent }}></div>
             <p className="text-lg leading-relaxed max-w-2xl" style={{ color: COLORS.textMedium }}>
               {executiveSummary}
             </p>
          </div>

          {/* Right: Profile Photo (Integrated into the white card) */}
          <div className={`${isMobilePreview ? 'w-full max-w-[250px] self-center' : 'w-1/3 max-w-[350px]'} aspect-square relative`}>
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt={fullName} 
                  className="w-full h-full object-cover shadow-inner"
                  style={{ borderRadius: '2rem' }} // Matching rounded corners for the image
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center border-2 border-dashed"
                  style={{ borderRadius: '2rem', borderColor: COLORS.textLight }}
                >
                  <span style={{ color: COLORS.textLight }}>No Photo Selected</span>
                </div>
              )}
          </div>
        </header>

        {/* --- DIVIDER --- */}
        <hr className="border-t border-gray-100 mb-20" />


        {/* --- SECTION 2: PROVEN IMPACT --- */}
        {achievements.length > 0 && (
          <section className="mb-24">
            <h3 className={`font-bold mb-12 ${sectionTitleSize}`}>Proven Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {achievements.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-sm font-bold opacity-30">0{idx + 1}</span>
                    <h4 className="text-2xl font-bold">{item.headline}</h4>
                  </div>
                  <p className="text-3xl font-bold mb-4" style={{ color: COLORS.accent }}>
                    {item.metric}
                  </p>
                  <p className="leading-relaxed" style={{ color: COLORS.textMedium }}>
                    {item.context}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECTION 3: STRATEGIC EXPERTISE --- */}
        {expertiseAreas.length > 0 && (
          <section className="mb-24 bg-gray-50 -mx-8 md:-mx-16 px-8 md:px-16 py-16 rounded-[2rem]">
            <h3 className={`font-bold mb-12 ${sectionTitleSize}`}>Strategic Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {expertiseAreas.map((area, idx) => (
                <div key={idx}>
                   <h4 className="text-xl font-bold mb-4 pb-4 border-b border-gray-200">
                      {area.areaTitle}
                   </h4>
                   <p className="leading-loose" style={{ color: COLORS.textMedium }}>
                      {area.skillsList && area.skillsList.split(',').map((skill, sIdx) => (
                        <span key={sIdx} className="block mb-2">
                          • {skill.trim()}
                        </span>
                      ))}
                   </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- SECTION 4: ENDORSEMENTS --- */}
        {testimonials.length > 0 && (
          <section className="mb-24">
            <h3 className={`font-bold mb-12 ${sectionTitleSize}`}>Endorsements</h3>
            <div className="grid grid-cols-1 gap-12">
              {testimonials.map((testi, idx) => (
                <div key={idx} className="relative pl-12">
                   <Quote size={32} className="absolute left-0 top-0 opacity-20" style={{ color: COLORS.accent }} />
                   <blockquote className="text-2xl md:text-3xl font-medium leading-normal mb-6" style={{ color: COLORS.textDark }}>
                      "{testi.quote}"
                   </blockquote>
                   <div>
                      <p className="font-bold text-lg">{testi.author}</p>
                      <p style={{ color: COLORS.textLight }}>{testi.authorTitle}</p>
                   </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* --- FOOTER / CONTACT --- */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-t border-gray-100 pt-12">
           <div>
              <h4 className="font-bold text-xl mb-2">Connect</h4>
              <p style={{ color: COLORS.textLight }}>Based in San Francisco, CA</p>
           </div>
           <div className="flex flex-wrap gap-6">
              {contactLinks.map((link, idx) => (
                 <a 
                   key={idx}
                   href={link.url}
                   target="_blank" 
                   rel="noreferrer"
                   className="group flex items-center gap-2 font-bold text-lg transition-colors hover:opacity-70"
                   style={{ color: COLORS.textDark }}
                 >
                    {link.label}
                    <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                 </a>
              ))}
           </div>
        </footer>

      </div>
    </div>
  );
}