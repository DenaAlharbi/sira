import React from 'react';

export default function TemplateMiniature({ templateId }) {
  
  // THE FIX:
  // 1. absolute inset-0: Pins it to the corners of the gallery card
  // 2. w-[250%] h-[250%]: Creates a canvas 2.5x larger than the card
  // 3. scale-[0.4]: Shrinks it back to fit perfectly (2.5 * 0.4 = 1)
  const scaleWrapperClass = "absolute inset-0 w-[250%] h-[250%] origin-top-left transform scale-[0.4] bg-white overflow-hidden pointer-events-none select-none";

 // RENDER: THE STANDARD (BasicFree)
  if (templateId === 'BasicFree') {
    return (
      <div className="w-full h-full relative bg-white">
        <div className={scaleWrapperClass}>
          {/* Main Canvas Padding */}
          <div className="p-16 flex flex-col h-full text-black font-sans text-left">
            
            {/* Header: Left Aligned + Full Width Line */}
            <div className="mb-12">
              <h1 className="text-7xl font-bold tracking-tight mb-4 text-black">Sara Al-Amri</h1>
              <p className="text-3xl text-gray-500 font-medium">Digital Marketing Specialist</p>
              {/* The New Black Line */}
              <div className="w-full h-2 bg-black mt-8"></div>
            </div>

            <div className="space-y-12">
              {/* About */}
              <div>
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">About</h2>
                <p className="text-2xl text-gray-700 leading-relaxed max-w-5xl">
                  Strategic marketer with 5+ years of experience driving growth for Saudi startups. Specialized in social media strategy.
                </p>
              </div>

              {/* Experience: Timeline Style */}
              <div>
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Experience</h2>
                <div className="border-l-4 border-gray-100 pl-8 space-y-10 ml-2">
                  
                  {/* Job 1 */}
                  <div className="relative">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[42px] top-3 w-5 h-5 rounded-full bg-gray-200 border-4 border-white"></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-3xl font-bold">Miswog Agency</h3>
                      <span className="text-lg text-gray-400 font-mono">2021-Present</span>
                    </div>
                    <p className="text-xl text-gray-600 font-medium uppercase tracking-wide">Senior Manager</p>
                  </div>

                  {/* Job 2 */}
                  <div className="relative">
                    <div className="absolute -left-[42px] top-3 w-5 h-5 rounded-full bg-gray-200 border-4 border-white"></div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h3 className="text-3xl font-bold">Tamara</h3>
                      <span className="text-lg text-gray-400 font-mono">2019-2021</span>
                    </div>
                    <p className="text-xl text-gray-600 font-medium uppercase tracking-wide">Strategist</p>
                  </div>

                </div>
              </div>

              {/* Contact: Grid Style (No more black footer) */}
              <div className="pt-4">
                 <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Connect</h2>
                 
                 {/* Removed 'grid grid-cols-2' so this div takes full width */}
                 <div className="border-2 border-gray-200 p-6 rounded-xl w-full">
                   <span className="text-sm uppercase tracking-widest text-gray-400 block mb-2">Email</span>
                   <span className="text-xl font-bold truncate block">sara@example.com</span>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
  // RENDER: HERITAGE (Al-Majlis)
  if (templateId === 'Heritage') {
    return (
      <div className="w-full h-full relative bg-[#F9F7F2]">
        <div className={`${scaleWrapperClass} bg-[#F9F7F2] flex flex-col items-center text-center border-[12px] border-double border-[#1B3022]/20 p-12`}>
          
          <div className="w-32 h-32 rounded-full border-2 border-[#D4AF37] mb-8 flex items-center justify-center text-[#1B3022] font-serif font-bold text-5xl bg-[#1B3022]/5">
            KA
          </div>

          <h1 className="text-6xl font-serif font-bold text-[#1B3022] mb-4">Khalid Al-Saud</h1>
          <p className="text-3xl text-[#D4AF37] mb-12 font-serif italic">Executive Director</p>

          <div className="w-40 h-[2px] bg-[#1B3022]/30 mb-12"></div>

          <p className="text-2xl font-serif text-[#1B3022]/80 leading-loose max-w-2xl mx-auto mb-16">
            "Leadership is not about being in charge. It is about taking care of those in your charge. Building a legacy for Vision 2030."
          </p>

          <div className="grid grid-cols-2 gap-6 w-full mt-auto">
            <div className="bg-[#1B3022] text-white py-8 px-4 rounded-md">
              <span className="block text-5xl font-bold mb-2">15+</span>
              <span className="text-sm uppercase tracking-widest text-[#D4AF37]">Years Exp</span>
            </div>
            <div className="bg-white border border-[#1B3022]/10 py-8 px-4 rounded-md">
              <span className="block text-5xl font-bold mb-2 text-[#1B3022]">MBA</span>
              <span className="text-sm uppercase tracking-widest text-[#1B3022]/60">Harvard</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  
  

  // Fallback for others (Like Tech, etc)
  return (
    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
      <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Preview</span>
    </div>
  );
}