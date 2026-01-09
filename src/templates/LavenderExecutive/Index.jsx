import React from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

export default function LuxGalleria({ data, isMobilePreview = false }) {
  const {
    heroImage,
    photographerName = "ELARA VOSS",
    tagline = "Capturing timeless elegance in natural light.",
    bioImage,
    bioTitle = "The Artist",
    bioText = "Photography is not merely about capturing a moment; it is about preserving a feeling. With over a decade of experience in high-fashion and editorial portraiture, I approach every commission with an artist's eye and a storyteller's heart.",
    gallery = [],
    servicesIntro = "I offer bespoke photography collections tailored to discerning clients seeking timeless imagery.",
    services = [],
    processSteps = [],
    email = "info@elaravoss.com",
    socials = []
  } = data || {};

  // --- LUXURY COLOR PALETTE ---
  const COLORS = {
    bgDark: '#1B2E25',    
    bgCream: '#F3F0EB',   
    textCream: '#F3F0EB', 
    textDark: '#1B2E25',  
  };

  // --- RESPONSIVE HELPERS ---
  // If in mobile preview, use tighter padding and smaller fonts
  const PADDING_Y = isMobilePreview ? "py-16" : "py-24 md:py-40";
  const PADDING_X = isMobilePreview ? "px-5" : "px-6 md:px-12";
  
  // Dynamic Typography
  const headerFont = "font-serif tracking-tight"; 
  const bodyFont = "font-sans tracking-wide";
  const kickerFont = "font-sans text-[10px] uppercase tracking-[0.3em]";
  
  // Massive Headers: drastically smaller on mobile to prevent overflow
  const heroTextSize = isMobilePreview ? "text-5xl" : "text-5xl md:text-8xl lg:text-[9rem]";
  const sectionHeaderSize = isMobilePreview ? "text-4xl" : "text-5xl md:text-7xl";
  const subTextSize = isMobilePreview ? "text-sm" : "text-lg md:text-xl";

  return (
    <div className={`min-h-screen ${bodyFont} overflow-x-hidden w-full max-w-full`}>
      
      {/* --- 1. HERO SECTION --- */}
      <header 
        className={`relative flex flex-col items-center justify-end ${PADDING_X}`}
        style={{ 
          backgroundColor: COLORS.bgDark, 
          color: COLORS.textCream,
          minHeight: isMobilePreview ? '600px' : '90vh',
          paddingBottom: isMobilePreview ? '4rem' : '5rem'
        }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-t from-[#1B2E25] via-[#1B2E25]/40 to-transparent z-10"></div>
           {heroImage ? (
             <img src={heroImage} alt="Hero" className="w-full h-full object-cover" />
           ) : (
             <div className="w-full h-full bg-[#23382F] flex items-center justify-center border border-[#F3F0EB]/5">
                <span className={`${kickerFont} opacity-30`}>Hero Image</span>
             </div>
           )}
        </div>

        {/* Text Content */}
        <div className="relative z-20 text-center space-y-6 w-full max-w-5xl">
           <p className={`${kickerFont} mb-2 opacity-80`}>Fine Art Photography</p>
           
           {/* Name - With break-words to prevent horizontal scroll */}
           <h1 className={`${headerFont} ${heroTextSize} leading-[0.9] uppercase break-words w-full`}>
             {photographerName.split(' ').map((word, i) => (
               <span key={i} className="block">{word}</span>
             ))}
           </h1>
           
           <p className={`${subTextSize} opacity-70 italic ${headerFont} max-w-md mx-auto pt-2 px-4`}>
             {tagline}
           </p>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-pulse opacity-60">
           <ArrowDown size={isMobilePreview ? 20 : 24} />
        </div>
      </header>


      {/* --- 2. THE ARTIST --- */}
      <section 
        className={`${PADDING_Y} ${PADDING_X} relative`}
        style={{ backgroundColor: COLORS.bgCream, color: COLORS.textDark }}
      >
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            
            {/* Image Block */}
            <div className={`md:col-span-5 relative ${isMobilePreview ? 'h-[400px]' : 'h-[500px] md:h-[700px]'}`}>
               <div className="absolute inset-0 border border-[#1B2E25]/20 transform translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4"></div>
               {bioImage ? (
                  <img src={bioImage} alt="The Artist" className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-1000" />
               ) : (
                  <div className="w-full h-full bg-[#E8E5DF] relative z-10"></div>
               )}
            </div>

            {/* Text Block */}
            <div className="md:col-span-6 md:col-start-7">
               <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <div className="h-px w-8 md:w-12 bg-[#1B2E25]"></div>
                  <p className={kickerFont}>{bioTitle}</p>
               </div>
               
               <h2 className={`${headerFont} text-3xl md:text-5xl lg:text-6xl mb-8 leading-tight`}>
                  A Study in<br/>Light & Form.
               </h2>
               
               <div className={`space-y-6 ${subTextSize} leading-relaxed opacity-80 font-light`}>
                  <p>{bioText}</p>
               </div>

               <div className={`mt-8 md:mt-12 flex items-center gap-2 font-serif italic ${isMobilePreview ? 'text-lg' : 'text-xl'} border-b border-[#1B2E25] inline-block pb-1`}>
                  Read Full Bio
               </div>
            </div>
         </div>
      </section>


      {/* --- 3. THE SHOWCASE --- */}
      <section 
        className={`${PADDING_Y} ${PADDING_X}`}
        style={{ backgroundColor: COLORS.bgDark, color: COLORS.textCream }}
      >
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
             <div>
               <p className={`${kickerFont} mb-4 opacity-60`}>Selected Works</p>
               <h2 className={`${headerFont} ${sectionHeaderSize}`}>The Portfolio</h2>
             </div>
             <p className={`max-w-sm text-sm opacity-60 leading-relaxed ${isMobilePreview ? 'hidden' : 'block'}`}>
               A curated selection of my most recent commissions, featuring weddings, editorials, and private portraits from around the globe.
             </p>
         </div>

         {/* Editorial Grid - Forces 1 column on mobile to prevent squishing */}
         <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-x-12 md:gap-y-32">
            {gallery.map((item, index) => {
               const isWide = index % 3 === 0;
               const colSpan = isWide ? "lg:col-span-8" : "lg:col-span-4";
               const aspectRatio = isWide ? "aspect-[16/9]" : "aspect-[3/4]";
               const offset = (!isMobilePreview && index % 2 !== 0) ? "lg:mt-24" : "";

               return (
                  <div key={index} className={`group relative ${colSpan} ${offset}`}>
                     <div className={`w-full ${aspectRatio} overflow-hidden relative bg-[#23382F]`}>
                        {item.image ? (
                           <img src={item.image} alt={item.caption} className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center opacity-20">Image {index+1}</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
                     </div>
                     
                     <div className="mt-4 md:mt-6 flex justify-between items-baseline border-b border-[#F3F0EB]/20 pb-3 md:pb-4">
                        <span className={`${headerFont} text-xl md:text-2xl italic`}>{item.caption || "Untitled"}</span>
                        <span className={`${kickerFont} opacity-50`}>0{index+1}</span>
                     </div>
                  </div>
               );
            })}
         </div>
      </section>


      {/* --- 4. INVESTMENT & SERVICES --- */}
      <section 
        className={`${PADDING_Y} ${PADDING_X}`}
        style={{ backgroundColor: COLORS.bgCream, color: COLORS.textDark }}
      >
         <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
               <p className={`${kickerFont} mb-4 md:mb-6`}>Investment</p>
               <h2 className={`${headerFont} ${sectionHeaderSize} mb-6 md:mb-8`}>Commissions</h2>
               <p className={`${subTextSize} opacity-70 leading-relaxed px-4`}>
                  {servicesIntro}
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
               {services.map((service, idx) => (
                  <div 
                    key={idx} 
                    className="flex flex-col p-8 border border-[#1B2E25]/10 hover:border-[#1B2E25] transition-colors duration-500 bg-white shadow-sm"
                  >
                     <div className="flex justify-between items-start mb-8">
                        <span className={`${kickerFont} opacity-40`}>Collection 0{idx+1}</span>
                        <ArrowUpRight size={18} className="opacity-40" />
                     </div>
                     
                     <h3 className={`${headerFont} text-2xl md:text-3xl mb-4 md:mb-6`}>{service.title}</h3>
                     <p className="opacity-70 leading-loose text-sm mb-8 flex-1">
                        {service.description}
                     </p>
                     
                     <div className="pt-6 border-t border-[#1B2E25]/10">
                        <p className={`${headerFont} text-lg md:text-xl italic`}>{service.price}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>


      {/* --- 5. THE PROCESS --- */}
      <section 
        className={`${PADDING_Y} ${PADDING_X} border-t border-[#F3F0EB]/5`}
        style={{ backgroundColor: COLORS.bgDark, color: COLORS.textCream }}
      >
         <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
            <div>
               <h2 className={`${headerFont} ${sectionHeaderSize} leading-tight md:sticky md:top-10`}>
                  The Artistic<br/><span className="italic opacity-60">Process.</span>
               </h2>
            </div>
            <div className="space-y-12 md:space-y-20">
               {processSteps.map((step, idx) => (
                  <div key={idx} className="group">
                     <span className={`${headerFont} text-5xl md:text-6xl opacity-10 group-hover:opacity-40 transition-opacity block mb-4 md:mb-6`}>
                        0{idx + 1}
                     </span>
                     <h3 className={`text-xl md:text-2xl font-serif mb-3 md:mb-4`}>{step.title}</h3>
                     <p className="opacity-60 leading-relaxed text-base md:text-lg font-light">{step.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>


      {/* --- 6. CONTACT --- */}
      <footer 
        className={`${PADDING_Y} ${PADDING_X} text-center`}
        style={{ backgroundColor: COLORS.bgCream, color: COLORS.textDark }}
      >
         <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
            <p className={kickerFont}>Inquiries</p>
            
            {/* Massive Footer Link - Scaled down for mobile */}
            <h2 className={`${headerFont} text-4xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight hover:italic transition-all cursor-pointer break-words`}>
               <a href={`mailto:${email}`}>Let's Create.</a>
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 pt-8 md:pt-12 items-center">
               <a href={`mailto:${email}`} className="text-lg md:text-xl border-b border-[#1B2E25] pb-1 break-all">
                  {email}
               </a>
               <div className="flex flex-wrap justify-center gap-6 md:gap-8">
                  {socials.map((social, idx) => (
                     <a key={idx} href={social.url} target="_blank" rel="noreferrer" className={`${kickerFont} hover:opacity-50 transition-opacity flex items-center gap-1`}>
                        {social.label} <ArrowRight size={10} />
                     </a>
                  ))}
               </div>
            </div>

            <div className={`pt-16 md:pt-24 opacity-30 ${kickerFont}`}>
               © {new Date().getFullYear()} {photographerName}.
            </div>
         </div>
      </footer>

    </div>
  );
}