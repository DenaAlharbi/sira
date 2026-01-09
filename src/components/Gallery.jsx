import React from 'react';

// --- SUB-COMPONENT: TEMPLATE MINIATURE (The Preview Image) ---
const TemplateMiniature = ({ templateId }) => {
  
  // THE FIX: PERCENTAGE SCALING (No Hardcoded Pixels)
  // 1. w-[400%] h-[400%]: Creates a canvas exactly 4x the size of the parent card.
  // 2. scale-[0.25]: Shrinks it back down by 4x to fit perfectly.
  // This ensures it adapts to any screen size (Mobile or Desktop).
  const scaleWrapperClass = "absolute top-0 left-0 w-[400%] h-[400%] origin-top-left transform scale-[0.25] bg-white pointer-events-none select-none";

  // 1. THE STANDARD (BasicFree)
  if (templateId === 'BasicFree') {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden text-left">
        <div className={scaleWrapperClass}>
          {/* PADDING: p-16 (Scales down to ~1rem visually) */}
          <div className="p-16 flex flex-col h-full text-slate-900 font-sans">
            
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-8xl font-bold tracking-tight mb-4 text-black">Sara Al-Amri</h1>
              <p className="text-4xl text-gray-400 font-medium">Digital Marketing</p>
              <div className="w-full h-3 bg-black mt-8"></div>
            </div>

            {/* Content Spacing - Tightened to space-y-10 to fit everything */}
            <div className="space-y-10">
              
              {/* About */}
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">About</h2>
                <p className="text-4xl text-gray-800 leading-relaxed max-w-6xl">
                  Strategic marketer with 5+ years of experience driving growth for Saudi startups.
                </p>
              </div>

              {/* Experience */}
              <div>
                <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Experience</h2>
                <div className="border-l-[6px] border-gray-100 pl-10 space-y-10 ml-2">
                  <div className="relative">
                    <div className="absolute -left-[54px] top-4 w-6 h-6 rounded-full bg-gray-200 border-[6px] border-white"></div>
                    <h3 className="text-4xl font-bold">Miswog Agency</h3>
                    <p className="text-3xl text-gray-500 uppercase mt-2">Senior Manager</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[54px] top-4 w-6 h-6 rounded-full bg-gray-200 border-[6px] border-white"></div>
                    <h3 className="text-4xl font-bold">Tamara</h3>
                    <p className="text-3xl text-gray-500 uppercase mt-2">Strategist</p>
                  </div>
                </div>
              </div>

              {/* Connect - Now fully visible */}
              <div className="pt-2">
                 <h2 className="text-2xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Connect</h2>
                 <div className="border-[3px] border-gray-200 p-8 rounded-3xl w-full">
                   <span className="text-2xl uppercase tracking-widest text-gray-400 block mb-3">Email</span>
                   <span className="text-3xl font-bold truncate block">sara@example.com</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
// 4. PROJECT FOCUS (The Maker) - Updated Visuals
  if (templateId === 'ProjectFocus') {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden text-left">
        <div className={scaleWrapperClass}>
          {/* BACKGROUND: Matching the new gradient theme */}
          <div className="p-16 flex flex-col h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative">
             
             {/* DECORATIVE MESH BLOBS */}
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

             {/* HEADER */}
             <div className="relative z-10 mb-16 px-4">
               <h1 className="text-9xl font-bold mb-6 text-slate-900 tracking-tight">Dena</h1>
               <p className="text-5xl text-indigo-600 font-medium mb-12">App Developer</p>
               
               {/* Bio Box Preview */}
               <div className="bg-white/80 backdrop-blur-md p-10 rounded-[2.5rem] border border-indigo-50 shadow-sm w-3/4">
                  <div className="h-5 bg-slate-200 rounded-full w-full mb-5"></div>
                  <div className="h-5 bg-slate-200 rounded-full w-2/3"></div>
               </div>
             </div>
             
             {/* GRID */}
             <div className="relative z-10 grid grid-cols-2 gap-10 px-4">
               
               {/* Card 1 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-md">
                 <div className="flex justify-between items-start mb-8">
                   <h3 className="text-5xl font-bold text-slate-800">Sira App</h3>
                   <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                     <span className="text-3xl">↗</span>
                   </div>
                 </div>
                 <div className="h-4 bg-slate-100 rounded-full w-full mb-8"></div>
                 <div className="w-full h-2 bg-indigo-100 rounded-full"></div>
               </div>

               {/* Card 2 */}
               <div className="bg-white p-10 rounded-[2.5rem] border border-indigo-50 shadow-md">
                 <div className="flex justify-between items-start mb-8">
                   <h3 className="text-5xl font-bold text-slate-800">Portfolio</h3>
                   <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                     <span className="text-3xl">↗</span>
                   </div>
                 </div>
                 <div className="h-4 bg-slate-100 rounded-full w-3/4 mb-8"></div>
                 <div className="w-full h-2 bg-indigo-100 rounded-full"></div>
               </div>

             </div>
          </div>
        </div>
      </div>
    );
  }
    if (templateId === 'Vanguard') {
  return (
    <div className="w-full h-full relative bg-slate-950 overflow-hidden text-left">
      <div className={scaleWrapperClass}>
        <div className="p-12 flex flex-col h-full bg-slate-950 relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-[80px]"></div>
            <div className="border-l-4 border-cyan-500 pl-8 mb-12 relative z-10">
              <h1 className="text-7xl font-bold text-white mb-4">ALEX<br/>MERCER</h1>
              <p className="text-3xl text-cyan-400 font-mono">FULL STACK</p>
            </div>
            <div className="grid grid-cols-1 gap-6 relative z-10">
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                 <div className="h-32 w-full bg-slate-800 mb-4 rounded-lg"></div>
                 <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}// 5. PASTEL FOLIO (The New Template)
  if (templateId === 'PastelFolio') {
    return (
      <div className="w-full h-full relative bg-white overflow-hidden text-left">
        <div className={scaleWrapperClass}>
          {/* BACKGROUND: Soft radial gradient matching the real template */}
          <div className="p-12 flex flex-col h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-pink-100 via-[#FFFBEB] to-purple-100 text-gray-900">
            
            {/* Fake Nav */}
            <div className="flex gap-8 mb-12 border-b border-gray-400/30 pb-4 text-xl font-bold uppercase tracking-widest text-gray-500">
               <span>Home</span>
               <span>Work</span>
               <span>Contact</span>
            </div>

            {/* Big Typography Header */}
            <div className="mb-16">
              <h1 className="text-8xl font-black uppercase leading-[0.85] tracking-tighter text-gray-900">
                UI/UX<br/>DESIGNER
              </h1>
            </div>

            {/* The "Framed" Grid */}
            <div className="grid grid-cols-2 gap-8">
              {/* Card 1 */}
              <div className="bg-white p-3 shadow-sm border border-gray-200">
                <div className="w-full h-32 bg-gray-100 relative overflow-hidden">
                   <div className="absolute inset-0 bg-purple-200/50"></div>
                   <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/50"></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-3 shadow-sm border border-gray-200">
                <div className="w-full h-32 bg-gray-900 relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-2xl">GymFit</div>
                </div>
              </div>
              
              {/* Card 3 */}
              <div className="bg-white p-3 shadow-sm border border-gray-200">
                <div className="w-full h-32 bg-gray-100 relative overflow-hidden">
                   <div className="absolute inset-0 bg-yellow-200/50"></div>
                </div>
              </div>

               {/* Card 4 */}
               <div className="bg-white p-3 shadow-sm border border-gray-200">
                <div className="w-full h-32 bg-gray-800 relative overflow-hidden"></div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
  // 6. IMMERSIVE PORTFOLIO (The New Template)
if (templateId === 'ImmersivePortfolio') {
  return (
    <div className="w-full h-full relative bg-white overflow-hidden text-left">
      <div className={scaleWrapperClass}>
        {/* Background Image Header */}
        <div 
          className="h-full w-full flex flex-col relative"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Content */}
          <div className="relative z-10 p-12 h-full flex flex-col justify-center text-white">
            <p className="text-2xl font-light mb-0 opacity-80">I AM</p>
            <h1 className="text-8xl font-black tracking-tighter uppercase leading-none mb-8">
              MADISON
            </h1>
            <div className="w-full h-1 bg-yellow-400 mb-8"></div>
            <h2 className="text-4xl font-bold uppercase text-right leading-tight opacity-90">
              Digital<br/>Product<br/>Designer
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
// 7. APPLE STYLE FOLIO (The New Template)
  if (templateId === 'AppleStyleFolio') {
    return (
      <div className="w-full h-full relative bg-[#F5F5F7] overflow-hidden text-left font-sans">
        <div className={scaleWrapperClass}>
          {/* Centered Card Layout */}
          <div className="w-full h-full flex justify-center p-12 bg-[#F5F5F7]">
            <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-sm p-12 flex flex-col gap-12">
              
              {/* Header: Name Left, Image Right */}
              <div className="flex justify-between items-center">
                <div className="space-y-4">
                  <h1 className="text-6xl font-semibold tracking-tight text-[#1D1D1F]">Brian Do</h1>
                  <p className="text-2xl text-[#86868B] max-w-lg leading-relaxed">
                    Product designer from Jakarta, ID. Currently designing at Rectangle.
                  </p>
                </div>
                {/* Profile Image Placeholder */}
                <div className="w-40 h-40 rounded-full bg-gray-200 border-4 border-white shadow-sm flex-shrink-0"></div>
              </div>

              {/* Projects Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#D1D1D6]"></div>
                  <h2 className="text-2xl font-medium text-[#1D1D1F]">Projects</h2>
                </div>
                
                {/* Project Item 1 */}
                <div className="bg-[#FBFBFD] p-6 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm"></div>
                    <div>
                      <div className="h-5 w-48 bg-gray-800 rounded mb-2"></div>
                      <div className="h-4 w-32 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  <div className="text-[#D1D1D6] text-4xl">›</div>
                </div>

                {/* Project Item 2 */}
                <div className="bg-[#FBFBFD] p-6 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm"></div>
                    <div>
                      <div className="h-5 w-40 bg-gray-800 rounded mb-2"></div>
                      <div className="h-4 w-24 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  <div className="text-[#D1D1D6] text-4xl">›</div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="mt-auto bg-[#FBFBFD] p-6 rounded-3xl flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#D1D1D6]"></div>
                    <h2 className="text-2xl font-medium text-[#1D1D1F]">Contact Me</h2>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm"></div>
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm"></div>
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm"></div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  // 8. APPLE STYLE DARK (New)
  if (templateId === 'AppleStyleFolioDark') {
    return (
      <div className="w-full h-full relative bg-black overflow-hidden text-left font-sans">
        <div className={scaleWrapperClass}>
          <div className="w-full h-full flex justify-center p-12 bg-black">
            {/* Card: Dark Gray #1C1C1E */}
            <div className="w-full max-w-4xl bg-[#1C1C1E] rounded-[3rem] shadow-2xl p-12 flex flex-col gap-12 border border-white/10">
              
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="space-y-4">
                  <h1 className="text-6xl font-semibold tracking-tight text-white">Brian Do</h1>
                  <p className="text-2xl text-[#98989D] max-w-lg leading-relaxed">
                    Product designer from Jakarta.
                  </p>
                </div>
                <div className="w-40 h-40 rounded-full bg-[#2C2C2E] border-4 border-[#2C2C2E] shadow-sm flex-shrink-0"></div>
              </div>

              {/* Projects */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#0A84FF]"></div>
                  <h2 className="text-2xl font-medium text-white">Projects</h2>
                </div>
                
                <div className="bg-[#2C2C2E] p-6 rounded-3xl flex items-center justify-between border border-white/5">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-[#1C1C1E] border border-white/10"></div>
                    <div>
                      <div className="h-5 w-48 bg-[#3A3A3C] rounded mb-2"></div>
                      <div className="h-4 w-32 bg-[#3A3A3C] rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mt-auto bg-[#2C2C2E] p-6 rounded-3xl flex items-center justify-between border border-white/5">
                 <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#0A84FF]"></div>
                    <h2 className="text-2xl font-medium text-white">Contact</h2>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#3A3A3C]"></div>
                    <div className="w-12 h-12 rounded-full bg-[#3A3A3C]"></div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  // 9. GOLD NOIR
  if (templateId === 'GoldNoir') {
    return (
      <div className="w-full h-full relative bg-[#050505] overflow-hidden text-center font-sans">
        <div className={scaleWrapperClass}>
          {/* Header */}
          <div className="relative h-[60%] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1a1a1a] to-[#050505]">
             <h1 className="text-5xl font-bold uppercase text-[#D4AF37] mb-4">Michael<br/>Soudrin</h1>
             <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]"></div>
                <div className="w-8 h-8 rounded-full border border-[#D4AF37]"></div>
             </div>
             {/* The Belt */}
             <div className="w-[120%] h-8 bg-black border-y border-[#D4AF37]/50 transform -rotate-3 mb-4"></div>
          </div>
          
          {/* Project Grid Preview */}
          <div className="p-8 grid grid-cols-2 gap-4">
             <div className="bg-[#111] border border-[#333] h-32 rounded-lg"></div>
             <div className="bg-[#111] border border-[#333] h-32 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }
  // 10. VELVET GOLD (The New Template)
  if (templateId === 'VelvetGold') {
    return (
      <div className="w-full h-full relative bg-[#FFF9E6] overflow-hidden text-left font-sans">
        <div className={scaleWrapperClass}>
          {/* Header */}
          <div className="pt-20 px-12 pb-32">
             <p className="text-xs font-bold tracking-[0.3em] mb-4 text-black/50">HELLO I'M</p>
             <h1 className="text-7xl font-black uppercase text-black leading-[0.9] mb-4">Nasrullah<br/>Mansur</h1>
             <div className="w-32 h-10 bg-[#0C0C2C] rounded mt-8"></div>
          </div>
          
          {/* The Belt */}
          <div className="h-16 bg-[#050505] w-full" style={{ clipPath: 'ellipse(75% 100% at 50% 100%)' }}></div>
          
          {/* Skills (White) */}
          <div className="bg-white p-8 flex gap-2 flex-wrap justify-center">
             <div className="border border-black/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase">React</div>
             <div className="border border-black/10 px-4 py-2 rounded-lg text-[10px] font-bold uppercase">Node</div>
          </div>

          {/* Projects (Dark) */}
          <div className="bg-[#08080A] p-8 pb-32 grid grid-cols-2 gap-6">
             <div className="bg-white h-48 rounded-2xl"></div>
             <div className="bg-white h-48 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }
  // 11. PLAYFUL CANVAS
  if (templateId === 'PlayfulCanvas') {
    return (
      <div className="w-full h-full bg-[#F3F0E7] p-8 overflow-hidden font-sans flex flex-col items-center">
        <div className={scaleWrapperClass}>
           {/* Green Card */}
           <div className="bg-[#D1F2C6] rounded-[2rem] p-8 mb-6 h-48 flex items-center relative border border-black/5">
              <div className="w-2/3">
                 <div className="h-4 bg-black/10 rounded w-full mb-2"></div>
                 <div className="h-4 bg-black/10 rounded w-3/4 mb-2"></div>
                 <div className="flex gap-2">
                    <div className="h-4 w-12 bg-[#FFD66E] rounded -rotate-2"></div>
                    <div className="h-4 w-16 bg-[#F48B57] rounded rotate-1"></div>
                 </div>
              </div>
              <div className="absolute right-4 top-4 w-24 h-24 bg-white rounded-full opacity-50"></div>
           </div>

           {/* Brand Name */}
           <h1 className="text-6xl font-black text-[#1A1A1A] mb-8">Sinqlo</h1>

           {/* Project Cards */}
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl h-32 border border-black/5"></div>
              <div className="bg-white rounded-2xl h-32 border border-black/5"></div>
           </div>
        </div>
      </div>
    );
  }
  // 12. LAVENDER EXECUTIVE
  if (templateId === 'LavenderExecutive') {
    return (
      <div className="w-full h-full relative bg-[#F3E5F5] overflow-hidden font-sans flex items-center justify-center">
        <div className={scaleWrapperClass}>
          
          {/* The White "Executive" Card */}
          <div className="w-[600px] bg-white rounded-[3rem] shadow-2xl p-12 flex flex-col gap-8">
            
            {/* Header Section */}
            <div className="flex justify-between items-start gap-8">
               <div className="space-y-4 flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400">Strategic Advisor</div>
                  <h1 className="text-5xl font-bold text-[#1A1A1A] leading-tight">Alexandra<br/>Chen</h1>
                  <div className="w-16 h-1.5 bg-[#6A1B9A] rounded-full"></div>
                  <div className="h-2 w-full bg-gray-100 rounded mt-2"></div>
                  <div className="h-2 w-2/3 bg-gray-100 rounded"></div>
               </div>
               
               {/* Profile Photo Placeholder */}
               <div className="w-32 h-32 bg-gray-200 rounded-3xl shrink-0"></div>
            </div>

            <hr className="border-gray-100" />

            {/* Impact Section Preview */}
            <div className="grid grid-cols-2 gap-8">
               <div>
                  <div className="text-2xl font-bold text-[#6A1B9A] mb-1">$15M+</div>
                  <div className="text-xs font-bold text-gray-400 uppercase">Revenue Growth</div>
               </div>
               <div>
                  <div className="text-2xl font-bold text-[#6A1B9A] mb-1">200%</div>
                  <div className="text-xs font-bold text-gray-400 uppercase">Efficiency Scale</div>
               </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
// 13. DARK PRODUCT FOLIO
  if (templateId === 'DarkProductFolio') {
    return (
      <div className="w-full h-full bg-[#111111] p-8 overflow-hidden font-sans flex items-center justify-center">
        <div className={scaleWrapperClass}>
           <div className="w-[800px] grid grid-cols-12 gap-8">
              
              {/* Left ID Card */}
              <div className="col-span-4">
                 <div className="bg-white rounded-[1.5rem] p-4 pb-8 text-center relative">
                    <div className="bg-[#D66A45] h-24 rounded-xl w-full mb-4"></div>
                    <div className="w-24 h-24 bg-[#333] rounded-xl mx-auto -mt-16 relative z-10 border-4 border-white"></div>
                    <div className="h-4 w-32 bg-black/80 mx-auto mt-4 rounded"></div>
                    <div className="h-2 w-20 bg-gray-300 mx-auto mt-2 rounded"></div>
                 </div>
              </div>

              {/* Right Content */}
              <div className="col-span-8 pt-4">
                 <h1 className="text-6xl font-black text-white uppercase leading-[0.8]">Product<br/><span className="text-[#333]" style={{WebkitTextStroke: '1px #555'}}>Designer</span></h1>
                 
                 <div className="flex gap-4 mt-8 mb-8">
                    <div className="text-3xl font-bold text-white">+12</div>
                    <div className="text-3xl font-bold text-white">+46</div>
                 </div>

                 <div className="flex gap-4">
                    <div className="bg-[#D66A45] w-32 h-24 rounded-lg"></div>
                    <div className="bg-[#D1F269] w-32 h-24 rounded-lg"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }}

 
// --- MAIN GALLERY COMPONENT ---
export default function Gallery({ onSelect }) {
  
  const templates = [
    { 
      id: 'BasicFree', 
      name: 'The Standard', 
      cat: 'Essential', 
      color: '#000000', 
      description: 'Clean, monochrome, and effective. The standard for professional clarity. (Free)' 
    },{ 
    id: 'ProjectFocus', 
    name: 'The Maker', 
    cat: 'Creative', 
    color: '#334155', 
    description: 'Grid layout focused entirely on your projects. (Free)' 
  },
    
    { 
  id: 'Vanguard', 
  name: 'Vanguard', 
  cat: 'Technical', 
  color: '#0f172a', // Dark Slate
  description: 'High-contrast dark mode with image support for high-end technical leads.',
  price: '$299' // Premium price
},
{ 
      id: 'PastelFolio', 
      name: 'The Studio', 
      cat: 'Creative', 
      color: '#FDF2F8', // Light Pink
      description: 'Soft gradients and bold typography for designers.',
      price: '$199' // Optional if you want it to be paid
    },
    {
      id:'ImmersivePortfolio',
      name: 'Immersive Portfolio',
      cat: 'Creative',    
      color: '#1E293B', // Slate-800
      description: 'A visually striking portfolio template with full-screen header and project showcases.',
      price: '$249' // Premium price
    },
    {
      id:'AppleStyleFolio',
      name: 'The Minimalist',
      cat: 'Professional',
      color: '#F5F5F7', // Light Gray
      description: 'Sleek and minimalist design, perfect for modern professionals.',
      price: '$299' // Premium price
    }, {
      id:'AppleStyleFolioDark',
      name: 'The Minimalist Dark',
      cat: 'Professional',
      color: '#000000', // Black
      description: 'Sleek and minimalist dark mode design, perfect for modern professionals.',
      price: '$299' // Premium price
    },
    {
      id:'GoldNoir',
      name: 'Gold Noir',
      cat: 'Luxury',  
      color: '#080808', // Deep Black
      description: 'A luxurious dark-themed portfolio with gold accents for high-end professionals.',
      price: '$349' // Premium price  
    },{
      id:'VelvetGold',
      name: 'Velvet Gold',
      cat: 'Luxury',  
      color: '#FFF9E6', // Soft Gold
      description: 'An elegant portfolio template with velvet textures and gold highlights.',
      price: '$349' // Premium price
    },{
      id:'playfulCanvas',
      name: 'Playful Canvas', 
      cat: 'Creative',  
      color: '#FFFBF0', // Light Cream
      description: 'A vibrant and playful design with colorful accents for creative professionals.',
      price: '$199' // Premium price  
      },{
      id:'LavenderExecutive',
      name: 'Lavender Executive', 
      cat: 'Professional',    
      color: '#F3E5F5', // Soft Lavender
      description: 'A sophisticated portfolio with lavender tones for executives and consultants.',
      price: '$299' // Premium price
      },{
id:'DarkProductFolio',
name: 'Dark Product Folio', 
cat: 'Technical',    
color: '#111111', // Dark Gray
description: 'A modern dark-themed portfolio designed for product designers and tech leads.',
price: '$299' // Premium price
      }
    
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 px-4 md:px-0">
      {templates.map(t => (
        <div 
          key={t.id} 
          onClick={() => !t.locked && onSelect(t.id)} 
          className={`group cursor-pointer flex flex-col max-w-[280px] mx-auto sm:max-w-none w-full ${t.locked ? 'opacity-75 grayscale' : ''}`}
        >
          {/* Card Container */}
          <div className="aspect-[4/5] bg-slate-100 rounded-xl mb-4 overflow-hidden border border-slate-200 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 relative">
            
            {/* 1. THE MINIATURE */}
            <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
                <TemplateMiniature templateId={t.id} />
            </div>
            
            {/* 2. Glass Overlay */}
            {!t.locked && (
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-300" />
            )}
            
            {/* 3. Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
               {t.locked ? (
                 <span className="bg-slate-100 text-slate-400 px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase shadow-lg cursor-not-allowed">
                   Locked
                 </span>
               ) : (
                 <span className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-[10px] font-bold tracking-[0.2em] uppercase shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                   Customize
                 </span>
               )}
            </div>

            {/* Locked Badge */}
            {t.locked && (
                <div className="absolute top-3 right-3">
                    <span className="bg-white/80 backdrop-blur-md text-slate-900 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-widest border border-slate-200">
                        Soon
                    </span>
                </div>
            )}
          </div>

          {/* Metadata */}
          <div className="px-1 text-center sm:text-left">
            <p className="text-[9px] uppercase tracking-[0.25em] text-sira-orange font-extrabold mb-1">
              {t.cat}
            </p>
            <h3 className="text-lg font-heading text-slate-900 group-hover:text-sira-purple transition-colors duration-300">
              {t.name}
            </h3>
            <p className="text-[12px] text-slate-400 mt-1 leading-snug line-clamp-2">
              {t.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
