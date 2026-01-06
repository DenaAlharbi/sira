import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from './supabaseClient'; 

// --- COMPONENT IMPORTS ---
import Header from './components/Header';
import Gallery from './components/Gallery';
import QuestionStep from './components/QuestionStep';
import Preview from './components/Preview';
import OnboardingModal from './components/OnboardingModal';
import PaymentModal from './components/PaymentModal';
import DeploymentModal from './components/DeploymentModal';
import AuthModal from './components/AuthModal'; 
import DashboardModal from './components/DashboardModal'; 

// --- TEMPLATE IMPORTS ---
import BasicFree from './templates/BasicFree/Index'; 
import ProjectFocus from './templates/ProjectFocus/Index';

// =======================================================
// CONFIGURATION (THE RULEBOOK)
// =======================================================
// This list is the "Source of Truth".
// If a template ID is here, it skips payment. 
// If it's NOT here, the app forces payment.
const FREE_TEMPLATES = ['BasicFree']; 

// =======================================================
// NEW: CLAIM MODAL (Email Only - No Credit Card)
// =======================================================
function ClaimModal({ isOpen, onClose, onClaim }) {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    await onClaim(email);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white rounded-2xl p-6 md:p-8 max-w-sm w-full shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-300 hover:text-slate-900">✕</button>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-sira-purple/10 rounded-full flex items-center justify-center mx-auto mb-4 text-sira-purple">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </div>
          <h3 className="text-xl font-heading text-slate-900">Link your Portfolio</h3>
          <p className="text-slate-500 text-xs mt-2">Enter your email to claim this site so you can edit it later.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="email" 
            placeholder="name@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-sira-purple focus:ring-1 focus:ring-sira-purple transition-all"
            required
          />
          <button 
            type="submit" 
            disabled={submitting}
            className="w-full py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple transition-colors disabled:opacity-50"
          >
            {submitting ? 'Linking...' : 'Confirm & Deploy'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// =======================================================
// 1. PUBLIC PROFILE COMPONENT (The "Live" Website)
// =======================================================
function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (data) setProfile(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [username]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans tracking-widest uppercase text-[10px]">Architecting...</div>;
  if (!profile) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans tracking-widest uppercase text-[10px]">404 | Portfolio Not Found</div>;

  if (profile.template_id === 'BasicFree') return <BasicFree data={profile.data} />;
  
  return <div>Unknown Template: {profile.template_id}</div>;
}


// =======================================================
// 2. EDITOR APP COMPONENT (The Builder Tool)
// =======================================================
function EditorApp() {
  // --- STATE ---
  const [view, setView] = useState('gallery'); 
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false); 
  const [isAuthOpen, setIsAuthOpen] = useState(false); 
  const [isDashboardOpen, setIsDashboardOpen] = useState(false); 
  const [isClaimOpen, setIsClaimOpen] = useState(false);

  // EDIT MODE STATE
  const [isEditMode, setIsEditMode] = useState(false); 
  const [existingId, setExistingId] = useState(null); 

  // Data
  const [selectedTemplate, setSelectedTemplate] = useState('BasicFree'); 
  const [deployedUsername, setDeployedUsername] = useState(''); 
  const [form, setForm] = useState({ 
    fullName: '', 
    title: '', 
    bio: '', 
    experience: [],
    contact: []
  });

  // --- 1. CLEANUP ON LOAD (THE FIX FOR YOUR FRIEND) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('status');

    // If we are NOT coming back from a payment, WIPE OLD MEMORY.
    // This stops the browser from remembering an old "Paid" selection.
    if (paymentStatus !== 'paid') {
       localStorage.removeItem('sira_form_backup');
       localStorage.removeItem('sira_template_backup');
       localStorage.removeItem('sira_edit_mode');
       localStorage.removeItem('sira_existing_id');
       // Force reset to the Free template by default
       setSelectedTemplate('BasicFree'); 
    }
  }, []);

  // --- 2. SESSION RECOVERY (Only if paid) ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('status');

    if (paymentStatus === 'paid') {
      const savedForm = localStorage.getItem('sira_form_backup');
      const savedTemplate = localStorage.getItem('sira_template_backup');
      const savedEditMode = localStorage.getItem('sira_edit_mode') === 'true'; 
      const savedId = localStorage.getItem('sira_existing_id'); 
      
      if (savedForm && savedTemplate) {
        const parsedForm = JSON.parse(savedForm);
        setForm(parsedForm);
        setSelectedTemplate(savedTemplate);

        const finalizeDeployment = async () => {
          // AUTO-DEPLOY FOR PAID USERS (Unique Username Logic Applied Here Too)
          const baseName = (parsedForm.fullName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '-');
          const safeUsername = `${baseName}-${Date.now()}`;
          setDeployedUsername(safeUsername);

          try {
            let error;
            if (savedEditMode && savedId) {
               // UPDATE
               const result = await supabase
                .from('profiles')
                .update({ 
                  data: parsedForm, 
                  template_id: savedTemplate 
                })
                .eq('id', savedId);
               error = result.error;
            } else {
               // INSERT
               const result = await supabase
                .from('profiles')
                .insert([{ 
                  username: safeUsername, 
                  full_name: parsedForm.fullName,
                  template_id: savedTemplate,
                  data: parsedForm,
                  owner_email: localStorage.getItem('sira_email_backup') 
                }]);
               error = result.error;
            }
            
            if (error) throw error;
            setIsDeploying(true); 
            
            window.history.replaceState({}, document.title, "/");
            localStorage.removeItem('sira_form_backup');
            localStorage.removeItem('sira_template_backup');
            localStorage.removeItem('sira_email_backup');
            localStorage.removeItem('sira_edit_mode');
            localStorage.removeItem('sira_existing_id');
          } catch (err) {
            console.error("Deployment Recovery Error:", err.message);
          }
        };

        finalizeDeployment();
      }
    }
  }, []);

  // --- CORE DEPLOYMENT FUNCTION ---
  const handleDeployToSupabase = async (ownerEmail) => {
    // FIX 2: ROBUST UNIQUE USERNAME
    // Uses Date.now() to ensure no duplicate usernames cause errors
    const baseName = (form.fullName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '-');
    const safeUsername = `${baseName}-${Date.now()}`;
    
    setDeployedUsername(safeUsername);

    try {
      let error;

      if (isEditMode && existingId) {
        // --- UPDATE EXISTING ---
        const result = await supabase
          .from('profiles')
          .update({ 
            data: form,
            template_id: selectedTemplate,
            full_name: form.fullName 
          })
          .eq('id', existingId);
        error = result.error;
      } else {
        // --- CREATE NEW ---
        const result = await supabase
          .from('profiles')
          .insert([{ 
            username: safeUsername, 
            full_name: form.fullName,
            template_id: selectedTemplate,
            data: form,
            owner_email: ownerEmail 
          }]);
        error = result.error;
      }
      
      if (error) throw error;
      
      setIsDeploying(true);
      
    } catch (err) {
      alert("Deployment Error: " + err.message);
    }
  };

  // --- ACTIONS ---
  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  const handleHomeClick = () => {
    setView('gallery');
    setShowOnboarding(false);
    setIsEditMode(false); 
    setExistingId(null); 
    setForm({ fullName: '', title: '', bio: '', experience: [], contact: [] }); 
    
    // RESET TO FREE (Safety Measure)
    setSelectedTemplate('BasicFree');
    
    // CLEAR MEMORY
    localStorage.removeItem('sira_form_backup');
    localStorage.removeItem('sira_template_backup');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutStart = async () => {
    localStorage.setItem('sira_form_backup', JSON.stringify(form));
    localStorage.setItem('sira_template_backup', selectedTemplate);
    if (isEditMode) localStorage.setItem('sira_edit_mode', 'true');
    if (existingId) localStorage.setItem('sira_existing_id', existingId);
    
    // --- FIX 3: USE THE RULEBOOK ---
    // Instead of checking "is it BasicFree?", we check "Is it in the list?"
    const isFree = FREE_TEMPLATES.includes(selectedTemplate);

    if (isFree) {
       // It's Free -> Go to Claim Modal
       const { data: { user } } = await supabase.auth.getUser();
       if (user) {
         await handleDeployToSupabase(user.email);
       } else {
         setIsClaimOpen(true);
       }
    } 
    else {
       // It's Paid -> Go to Payment
       setIsPaymentOpen(true);
    }
  };

  const handleClaimSubmit = async (email) => {
    setIsClaimOpen(false);
    await handleDeployToSupabase(email);
    await supabase.auth.signInWithOtp({ email });
  };

  const handlePaymentSuccess = async (paymentResult) => {
    setIsPaymentOpen(false);
    if (paymentResult.owner_email) {
        localStorage.setItem('sira_email_backup', paymentResult.owner_email);
    }
    await handleDeployToSupabase(paymentResult.owner_email);
  };

  const handleEditPortfolio = (portfolio) => {
    setForm(portfolio.data);
    setSelectedTemplate(portfolio.template_id);
    setIsEditMode(true); 
    setExistingId(portfolio.id); 
    setIsDashboardOpen(false);
    setView('questions'); 
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 antialiased selection:bg-sira-lavender selection:text-sira-purple font-sans">
      
      <Header 
        onHome={handleHomeClick} 
        onTemplates={() => setView('gallery')}
        onPricing={() => setView('pricing')}
        onGetStarted={() => setShowOnboarding(true)} 
        onSignIn={() => setIsAuthOpen(true)}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      <AnimatePresence>
        {showOnboarding && <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />}
        
        {isAuthOpen && (
          <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        )}

        {isDashboardOpen && (
          <DashboardModal 
            isOpen={isDashboardOpen} 
            onClose={() => setIsDashboardOpen(false)} 
            onEditPortfolio={handleEditPortfolio}
          />
        )}

        {isClaimOpen && (
          <ClaimModal 
            isOpen={isClaimOpen} 
            onClose={() => setIsClaimOpen(false)} 
            onClaim={handleClaimSubmit} 
          />
        )}
      </AnimatePresence>

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={isEditMode ? 49 : 249} 
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DeploymentModal 
        isOpen={isDeploying}
        username={deployedUsername}
        onClose={() => setIsDeploying(false)} 
      />
      
      {/* MOBILE FIX: Less top padding on mobile (pt-24) */}
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          
          {view === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              
              {/* MOBILE FIX: Smaller text/spacing for mobile header */}
              <div className="mb-8 md:mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-heading text-slate-900 mb-3 md:mb-4 tracking-tight">
                  Premium Templates
                </h2>
                <p className="text-slate-500 max-w-sm md:max-w-xl mx-auto text-xs md:text-base leading-relaxed">
                  Select a high-end architectural layout for your professional digital presence. 
                  Designed for the Kingdom's next generation of leaders.
                </p>
              </div>
              <Gallery onSelect={(id) => { setSelectedTemplate(id); setView('questions'); }} />
            </motion.div>
          )}

          {view === 'pricing' && (
            <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto text-center py-12 md:py-20">
               <h2 className="text-2xl md:text-3xl font-heading mb-6 italic text-slate-900">Ownership & Licensing</h2>
               <p className="mb-8 text-slate-500 max-w-lg mx-auto leading-relaxed text-sm md:text-base">A singular investment in your digital architecture. Permanent hosting, professional domain, and lifetime updates.</p>
               <button onClick={() => setView('gallery')} className="text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-sira-purple transition-all shadow-xl">
                 Explore the Portfolios
               </button>
            </motion.div>
          )}

          {view === 'questions' && (
            <motion.div 
              key="questions" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              // MOBILE FIX: z-[200] ensures it sits ABOVE the header
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md" 
              onClick={handleHomeClick}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }} 
                animate={{ scale: 1, opacity: 1, y: 0 }} 
                onClick={(e) => e.stopPropagation()} 
                // MOBILE FIXES: 
                // 1. max-h-[85vh]: Prevents overlap with edges vertically
                // 2. overflow-hidden flex flex-col: Scrolling happens INSIDE the box
className="bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl w-full max-w-lg md:max-w-2xl shadow-2xl relative overflow-y-auto flex flex-col max-h-[85vh] md:max-h-[90vh]"              >
                <button onClick={handleHomeClick} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10">✕</button>
                <QuestionStep 
                  templateId={selectedTemplate} 
                  form={form} 
                  updateForm={updateForm} 
                  onNext={() => setView('preview')} 
                  onBack={() => setView('gallery')}
                  onExit={handleHomeClick} 
                />
              </motion.div>
            </motion.div>
          )}

          {view === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-7xl mx-auto">
              <div className="mb-6 md:mb-8">
                <button onClick={() => setView('questions')} className="group text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-sira-purple flex items-center gap-2 transition-colors">
                  ← Back to Editor
                </button>
              </div>
              <Preview 
                form={{...form, templateId: selectedTemplate}} 
                onBack={() => setView('questions')} 
                onNext={handleCheckoutStart} 
                isEditing={isEditMode}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      {/* FOOTER */}
      <footer className="mt-12 md:mt-20 border-t border-slate-100 pt-12 md:pt-16 pb-8 md:pb-12 px-6">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <div className="space-y-3 md:space-y-4 text-center md:text-left">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-xl font-heading text-slate-900 font-bold tracking-tight">Sira</span>
              <span className="text-lg font-arabic text-slate-900/40">سيرة</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0 uppercase tracking-widest">
              Architecting professional digital identities for the Kingdom's next generation of leaders.
            </p>
          </div>

          <div className="space-y-3 md:space-y-4 text-center md:text-left">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Support</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:support@sira.app" className="text-sm text-slate-500 hover:text-sira-purple transition-colors">support@sira.app</a>
              <p className="text-sm text-slate-500">Dhahran, KSA</p>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4 text-center md:text-right">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Credits</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Designed & Developed by <span className="text-slate-900 font-medium">Dena Alharbi</span>
            </p>
            <div className="flex justify-center md:justify-end gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-300">
              <a href="#" className="hover:text-slate-900">Privacy</a>
              <a href="#" className="hover:text-slate-900">Terms</a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <span className="font-heading italic text-xs md:text-sm tracking-[0.3em] text-slate-200 uppercase">
            © 2026 Sira Premium Systems
          </span>
        </div>
      </footer>
    </div>
  );
}

// =======================================================
// 3. MAIN ROUTER
// =======================================================
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EditorApp />} />
        <Route path="/:username" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}