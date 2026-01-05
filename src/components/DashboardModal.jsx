import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../supabaseClient';

export default function DashboardModal({ isOpen, onClose, onEditPortfolio }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);

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
          
          const cleanData = (data || []).map(p => ({ ...p, status: p.status || 'active' }));
          setPortfolios(cleanData);
        } else {
          // --- TEST DATA ---
          setTimeout(() => {
            setPortfolios([
              {
                id: '1',
                full_name: 'Sara Al-Farsi',
                username: 'sara-design',
                status: 'active', 
                template_id: 'BasicFree',
                data: { fullName: 'Sara Al-Farsi' }
              },
              {
                id: '2',
                full_name: 'Karim Benz',
                username: 'karim-tech',
                status: 'offline', 
                template_id: 'BasicFree',
                data: { fullName: 'Karim Benz' }
              }
            ]);
          }, 600);
        }
        setLoading(false);
      };
      fetchMyPortfolios();
    }
  }, [isOpen]);

  const handleToggleStatus = async (item) => {
    const newStatus = item.status === 'active' ? 'offline' : 'active';
    setPortfolios(prev => prev.map(p => p.id === item.id ? { ...p, status: newStatus } : p));
    setConfirmingId(null); 
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from('profiles').update({ status: newStatus }).eq('id', item.id);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 md:p-12 shadow-2xl relative max-h-[85vh] overflow-hidden flex flex-col"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-heading text-slate-900 italic mb-2 tracking-tight">My Portfolios</h2>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.15em]">Manage your digital presence</p>
          </div>
          <div className="hidden md:block">
            <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-400">
              {portfolios.length} {portfolios.length === 1 ? 'Project' : 'Projects'} Found
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-6 h-6 border-2 border-slate-100 border-t-sira-purple rounded-full animate-spin mx-auto mb-4"></div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Retrieving assets...</span>
            </div>
          ) : (
            portfolios.map((item) => (
              <div 
                key={item.id} 
                className={`group relative border p-6 rounded-[1.5rem] flex items-center justify-between transition-all duration-300 ${
                  item.status === 'active' 
                    ? 'bg-white border-slate-100 hover:border-sira-purple/30 hover:shadow-lg' 
                    : 'bg-slate-50 border-slate-100 opacity-75'
                }`}
              >
                {/* --- LEFT SIDE --- */}
                <div className="flex-1 min-w-0 pr-4">
                   <h3 className={`font-bold uppercase tracking-widest text-[11px] mb-2 transition-colors truncate ${confirmingId === item.id ? 'text-slate-300' : 'text-slate-900'}`}>
                     {item.full_name}
                   </h3>
                   
                   <AnimatePresence mode="wait">
                     {confirmingId === item.id ? (
                        <motion.div 
                          key="warning"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="flex items-center gap-2 text-amber-600"
                        >
                           {/* NEW ICON: LOCK (Solid, Clear) */}
                          
                           <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                             Hides from public. Remains in dashboard.
                           </span>
                        </motion.div>
                     ) : (
                        <motion.div 
                          key="url"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-slate-300'}`}></div>
                          {item.status === 'active' ? (
                            <a 
                              href={`/${item.username}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[11px] text-slate-400 font-mono tracking-tight lowercase hover:text-sira-purple transition-colors truncate"
                            >
                              sira.app/{item.username}
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Offline</span>
                          )}
                        </motion.div>
                     )}
                   </AnimatePresence>
                </div>

                {/* --- RIGHT SIDE: ACTIONS --- */}
                <div className="flex items-center gap-2 shrink-0 h-10">
                  <AnimatePresence mode="wait">
                    {confirmingId === item.id ? (
                      <motion.div 
                        key="confirm-actions"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="flex items-center gap-2 bg-red-50 p-1 rounded-xl h-10"
                      >
                        <button 
                          onClick={() => handleToggleStatus(item)}
                          className="h-8 px-4 bg-red-500 text-white rounded-lg text-[9px] font-bold uppercase tracking-widest hover:bg-red-600 transition-colors shadow-sm flex items-center justify-center"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => setConfirmingId(null)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-white hover:text-slate-600 transition-all"
                        >
                          ✕
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="normal-actions"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 h-10"
                      >
                        {/* 1. VISIT SITE: ARROW OUT (Universal Link Icon) */}
                        {item.status === 'active' && (
                          <a 
                            href={`/${item.username}`}
                            target="_blank"
                            rel="noreferrer"
                            className="h-10 w-10 flex items-center justify-center rounded-full text-slate-300 hover:text-sira-purple hover:bg-slate-50 transition-all"
                            title="Visit Live Site"
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}

                        {/* 2. STATUS: POWER ICON */}
                        <button 
                          onClick={() => item.status === 'active' ? setConfirmingId(item.id) : handleToggleStatus(item)}
                          className={`h-10 w-10 flex items-center justify-center rounded-full transition-all ${
                            item.status === 'active' 
                              ? 'text-slate-300 hover:text-slate-600 hover:bg-slate-50' 
                              : 'text-green-500 hover:text-green-600 bg-green-50 hover:bg-green-100'
                          }`}
                          title={item.status === 'active' ? "Unpublish Site" : "Republish Site"}
                        >
                          {item.status === 'active' ? (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                              <line x1="12" y1="2" x2="12" y2="12"></line>
                            </svg>
                          ) : (
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                              <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                              <line x1="12" y1="2" x2="12" y2="12"></line>
                            </svg>
                          )}
                        </button>

                        {/* 3. EDIT BUTTON */}
                        <button 
                          onClick={() => onEditPortfolio(item)} 
                          className="h-10 px-6 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-all shadow-md active:scale-95 flex items-center justify-center ml-1"
                        >
                          Edit
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))
          )}

          {portfolios.length === 0 && !loading && (
            <div className="text-center py-16 border border-dashed border-slate-200 rounded-3xl">
              <p className="text-slate-400 italic text-sm mb-4">No portfolios found.</p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-slate-300">
          <span>{portfolios.filter(p => p.status === 'active').length} Live Sites</span>
          <span className="flex items-center gap-2 italic">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
            Unpublished sites are hidden from public view
          </span>
        </div>
      </motion.div>
    </div>
  );
}