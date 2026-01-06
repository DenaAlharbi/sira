import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 md:mt-20 border-t border-slate-100 pt-12 md:pt-16 pb-8 md:pb-12 px-6">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="space-y-3 md:space-y-4 text-center md:text-left">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="text-xl font-heading text-slate-900 font-bold tracking-tight">Portfiller</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0 uppercase tracking-widest">
            Architecting professional digital identities for the Kingdom's next generation of leaders.
          </p>
        </div>

        <div className="space-y-3 md:space-y-4 text-center md:text-left">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Support</h4>
          <div className="flex flex-col gap-2">
            <a href="mailto:support@sira.app" className="text-sm text-slate-500 hover:text-sira-purple transition-colors">support@portfiller.sa</a>
            <p className="text-sm text-slate-500">Dhahran, KSA</p>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4 text-center md:text-left">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Credits</h4>
          <p className="text-sm text-slate-500 leading-relaxed">
            Designed & Developed by <span className="text-slate-900 font-medium">Dena Alharbi</span>
          </p>
          <div className=" md:justify-end gap-4 text-[10px] text-left font-bold uppercase tracking-widest text-slate-300 ">
            <a href="#" className="hover:text-slate-900 md:text-left">Privacy Policies</a><br/>
            <a href="#" className="hover:text-slate-900 md:text-left">Terms and Conditions</a>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <span className="font-heading italic text-xs md:text-sm tracking-[0.3em] text-slate-200 uppercase">
          © 2026 Portfiller Premium Systems
        </span>
      </div>
    </footer>
  );
}