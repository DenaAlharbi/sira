import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

export default function DashboardModal({ isOpen, onClose, onEditPortfolio }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchMyPortfolios = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('owner_email', user.email)
            .order('created_at', { ascending: false });
          setPortfolios(data || []);
        }
        setLoading(false);
      };
      fetchMyPortfolios();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 md:p-12 shadow-2xl relative max-h-[85vh] overflow-hidden flex flex-col"
      >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-900 transition-colors"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        
        {/* Header */}
        <div className="mb-10">
          <h2 className="text-3xl font-heading text-slate-900 italic mb-2 tracking-tight">My Collection</h2>
          <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.15em]">Manage your digital architecture</p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-6 h-6 border-2 border-slate-100 border-t-sira-purple rounded-full animate-spin mx-auto mb-4"></div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Retrieving...</span>
            </div>
          ) : (
            <div className="space-y-4">
              {portfolios.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-slate-50/50 border border-slate-100 p-6 rounded-[1.5rem] flex items-center justify-between hover:bg-white hover:border-sira-purple/30 hover:shadow-xl hover:shadow-sira-purple/5 transition-all duration-500"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 uppercase tracking-widest text-[11px] mb-1.5">{item.full_name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                      <p className="text-[11px] text-slate-400 font-mono tracking-tight lowercase">
                        sira.app/{item.username}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => window.open(`/${item.username}`, '_blank')}
                      className="p-3 text-slate-400 hover:text-slate-900 transition-colors"
                      title="View Live Site"
                    >
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                    </button>
                    
                    <button 
                      onClick={() => onEditPortfolio(item)} 
                      className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-md active:scale-95"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}

              {portfolios.length === 0 && (
                <div className="text-center py-20 bg-slate-50/50 rounded-[2rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 italic text-sm mb-6">Your gallery is currently empty.</p>
                  <button onClick={() => { onClose(); }} className="text-[10px] font-bold uppercase tracking-widest text-sira-purple hover:underline">
                    Create your first piece →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-300">
          <span>{portfolios.length} Active Sites</span>
          <span className="flex items-center gap-2 italic">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            Updates require re-verification
          </span>
        </div>
      </motion.div>
    </div>
  );
}