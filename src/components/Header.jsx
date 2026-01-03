export default function Header({ onHome }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center p-4 md:p-6">
      <div className="w-full max-w-7xl bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-lg shadow-slate-200/40 rounded-2xl h-16 flex items-center justify-between px-6 md:px-8">
        {/* Logo Section */}
        <div className="cursor-pointer flex items-baseline gap-2 group" onClick={onHome}>
          <span className="text-xl font-heading text-sira-purple font-bold tracking-tight">Sira</span>
          <span className="text-lg font-arabic text-sira-purple/40">سيرة</span>
        </div>
        
        {/* Navigation & Action */}
        <div className="flex items-center gap-4 md:gap-8">
          <nav className="hidden sm:flex gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
            <a href="#" className="hover:text-sira-purple transition-colors">Templates</a>
            <a href="#" className="hover:text-sira-purple transition-colors">Pricing</a>
          </nav>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all active:scale-95 shadow-sm">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}