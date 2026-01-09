import React from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';

export default function LuxGalleria({ data, isMobilePreview = false }) {
  const {
    heroImage,
    photographerName = "ELARA VOSS",
    tagline = "Capturing timeless elegance in natural light.",
    bioImage,
    bioTitle = "The Artist",
    bioText = "Photography is not merely about capturing a moment; it is about preserving a feeling. With over a decade of experience in high-fashion and editorial portraiture, I approach every commission with an artist's eye and a storyteller's heart. My work is dedicated to those who appreciate the subtle nuances of light, texture, and genuine emotion.",
    gallery = [],
    servicesIntro = "I offer bespoke photography collections tailored to discerning clients seeking timeless imagery. Every commission is approached with the utmost care and attention to detail.",
    services = [],
    processSteps = [],
    email = "info@elaravoss.com",
    socials = []
  } = data || {};

  // --- LUXURY COLOR PALETTE ---
  const COLORS = {
    bgMain: '#0A1A12',   // Deep Forest Green/Black
    bgAccent: '#14261B', // Slightly lighter green for cards
    textCream: '#F2EFE9', // Creamy off-white
    textMuted: '#C4BDB3', // Muted beige/taupe
    border: 'rgba(242, 239, 233, 0.1)', // Subtle cream border
  };

  // Typography styles for consistency
  const headerFont = "font-serif tracking-tight"; // Needs a good serif font configured
  const bodyFont = "font-sans tracking-wide";
  const kickerFont = "font-sans text-xs uppercase tracking-[0.3em] text-[#C4BDB3]";

  return (
    <div 
      className={`min-h-screen ${bodyFont} selection:bg-[#C4BDB3] selection:text-[#0A1A12] overflow-x-hidden`}
      style={{ backgroundColor: COLORS.bgMain, color: COLORS.textCream }}
    >
      
      {/* --- 1. HERO SECTION (Editorial Cover Style) --- */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-end pb-20 px-6">
        {/* Background Image with sophisticated overlay */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] via-[#0A1A12]/60 to-transparent z-10"></div>
           {heroImage ? (
             <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-[#14261B] flex items-center justify-center">
                <span className={kickerFont}>Insert Hero Image</span>
             </div>
           )}
        </div>

        {/* Text Content */}
        <div className="relative z-20 text-center space-y-6 max-w-4xl">
           <p className={`${kickerFont} mb-4`}>Fine Art Photography</p>
           {/* Massive, elegant name display */}
           <h1 className={`${headerFont} text-5xl md:text-8xl lg:text-[9rem] leading-none uppercase`}>
             {photographerName.split(' ').map((word, i) => (
               <span key={i} className="block">{word}</span>
             ))}
           </h1>
           <p className={`text-lg md:text-2xl text-[#C4BDB3] italic ${headerFont} max-w-xl mx-auto`}>
             {tagline}
           </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-50">
           <ArrowDown size={24} color={COLORS.textCream} />
        </div>
      </header>


      {/* --- 2. THE ARTIST (Asymmetrical Bio) --- */}
      <section className="py-24 md:py-40 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Text Block (Overlaps image on desktop) */}
            <div className="md:col-span-6 md:col-start-7 md:-ml-20 z-20 relative">
               <div className="bg-[#14261B] p-10 md:p-16 shadow-2xl border border-[#F2EFE9]/5" style={{ backdropFilter: 'blur(10px)' }}>
                  <p className={kickerFont}>{bioTitle}</p>
                  <h2 className={`${headerFont} text-4xl md:text-5xl mt-4 mb-8`}>
                     A Study in<br/>Light & Form.
                  </h2>
                  <p className="text-[#C4BDB3] text-lg leading-relaxed leading-loose">
                     {bioText}
                  </p>
                  <div className="mt-12 h-px w-32 bg-[#C4BDB3]/30"></div>
               </div>
            </div>

            {/* Image Block */}
            <div className="md:col-span-6 md:col-start-1 md:row-start-1 h-[600px] relative">
               {bioImage ? (
                  <img src={bioImage} alt="The Artist" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
               ) : (
                  <div className="w-full h-full bg-[#14261B] border border-[#F2EFE9]/10"></div>
               )}
               {/* Decorative Border */}
               <div className="absolute -top-8 -left-8 w-full h-full border border-[#C4BDB3]/20 -z-10"></div>
            </div>
         </div>
      </section>


      {/* --- 3. THE SHOWCASE (Staggered Editorial Grid) --- */}
      <section className="py-24 px-6 bg-[#14261B]/50">
         <div className="max-w-7xl mx-auto text-center mb-20">
             <p className={kickerFont}>Portfolio</p>
             <h2 className={`${headerFont} text-5xl md:text-6xl mt-4`}>Selected Works</h2>
         </div>

         {/* Staggered Grid */}
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-y-24 align-top">
            {gallery.map((item, index) => {
               // Logic to create a staggered, varied layout
               const isLarge = index % 3 === 0; // Every 3rd image is huge
               const isOffset = index % 2 !== 0; // Odd images pushed down
               
               let gridClass = isLarge 
                  ? "md:col-span-8 md:aspect-[4/5]" 
                  : "md:col-span-4 md:aspect-[3/4]";
               
               // Shift large images left/right
               if (isLarge && index % 2 !== 0) gridClass += " md:col-start-5";

               const offsetClass = isOffset ? "md:translate-y-24" : "";

               return (
                  <div key={index} className={`relative group ${gridClass} ${offsetClass}`}>
                     <div className="w-full h-full overflow-hidden relative">
                        {item.image ? (
                           <img src={item.image} alt={item.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        ) : (
                           <div className="w-full h-full bg-[#0A1A12] flex items-center justify-center border border-[#F2EFE9]/10">
                              <span className="text-xs uppercase opacity-30">Image {index+1}</span>
                           </div>
                        )}
                        {/* Overlay & Caption */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <div className="absolute bottom-0 left-0 p-6 md:p-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                           <p className={`${kickerFont} text-white mb-2`}>Collection No. {index + 1}</p>
                           <h3 className={`${headerFont} text-2xl md:text-3xl text-white`}>{item.caption}</h3>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
          {/* Spacing fix for the staggered items at bottom */}
         <div className="hidden md:block h-24"></div> 
      </section>


      {/* --- 4. INVESTMENT & SERVICES (Minimalist Cards) --- */}
      <section className="py-32 px-6 relative">
         <div className="max-w-5xl mx-auto">
            <div className="mb-20 md:w-1/2">
               <p className={kickerFont}>Investment</p>
               <h2 className={`${headerFont} text-4xl md:text-5xl mt-4 mb-6`}>Commissions &<br/>Collections</h2>
               <p className="text-[#C4BDB3] text-lg leading-relaxed">
                  {servicesIntro}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-[#C4BDB3]/20 pt-12">
               {services.map((service, idx) => (
                  <div key={idx} className="flex flex-col justify-between min-h-[300px] group">
                     <div>
                        <span className={`${kickerFont} opacity-50 block mb-4`}>0{idx+1}</span>
                        <h3 className={`${headerFont} text-2xl mb-6`}>{service.title}</h3>
                        <p className="text-[#C4BDB3] leading-loose text-sm mb-8">
                           {service.description}
                        </p>
                     </div>
                     <div>
                        <div className="h-px w-full bg-[#C4BDB3]/20 group-hover:bg-[#C4BDB3] transition-colors mb-4"></div>
                        <p className={`${headerFont} text-xl italic`}>{service.price}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>


      {/* --- 5. THE PROCESS (Elegant Steps) --- */}
      <section className="py-32 px-6 bg-[#14261B]">
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
               <p className={kickerFont}>The Experience</p>
               <h2 className={`${headerFont} text-4xl md:text-5xl mt-4`}>Our Journey<br/>Together.</h2>
            </div>
            <div>
               <ul className="space-y-12">
                  {processSteps.map((step, idx) => (
                     <li key={idx} className="flex gap-6 items-start group">
                        <span className={`${headerFont} text-5xl text-[#C4BDB3]/30 group-hover:text-[#C4BDB3] transition-colors`}>
                           {idx + 1}.
                        </span>
                        <div>
                           <h3 className={`text-xl font-bold mb-2 ${headerFont}`}>{step.title}</h3>
                           <p className="text-[#C4BDB3] leading-relaxed">{step.description}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>


      {/* --- 6. CONTACT (Minimalist Footer) --- */}
      <footer className="py-32 px-6 text-center">
         <div className="max-w-3xl mx-auto space-y-12">
            <h2 className={`${headerFont} text-5xl md:text-7xl leading-tight`}>
               Start A<br/>Conversation.
            </h2>
            <a href={`mailto:${email}`} className="text-xl md:text-2xl border-b border-[#C4BDB3]/30 pb-2 hover:text-[#C4BDB3] hover:border-[#C4BDB3] transition-all inline-block">
               {email}
            </a>
            
            <div className="flex justify-center gap-8 pt-12">
               {socials.map((social, idx) => (
                  <a key={idx} href={social.url} target="_blank" rel="noreferrer" className={`${kickerFont} flex items-center gap-2 hover:text-white transition-colors`}>
                     {social.label} <ArrowRight size={14} />
                  </a>
               ))}
            </div>

            <div className={`pt-20 opacity-30 ${kickerFont}`}>
               © {new Date().getFullYear()} {photographerName}. All rights reserved.
            </div>
         </div>
      </footer>

    </div>
  );
}