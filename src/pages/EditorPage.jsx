import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { supabase } from '../supabaseClient';
import { FREE_TEMPLATES } from '../templates/templateRegistry';

// --- COMPONENT IMPORTS ---
import Header from '../components/Header';
import Footer from '../components/Footer'; 
import Gallery from '../components/Gallery';
import QuestionStep from '../components/QuestionStep';
import Preview from '../components/Preview';
import OnboardingModal from '../components/OnboardingModal';
import PaymentModal from '../components/PaymentModal';
import DeploymentModal from '../components/DeploymentModal';
import AuthModal from '../components/AuthModal';
import DashboardModal from '../components/DashboardModal';
import ClaimModal from '../components/ClaimModal'; // Imported, so we deleted the local function

export default function EditorPage() {
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

  // --- 1. CLEANUP ON LOAD ---
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get('status');

    if (paymentStatus !== 'paid') {
       localStorage.removeItem('sira_form_backup');
       localStorage.removeItem('sira_template_backup');
       localStorage.removeItem('sira_edit_mode');
       localStorage.removeItem('sira_existing_id');
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
    setSelectedTemplate('BasicFree');
    
    localStorage.removeItem('sira_form_backup');
    localStorage.removeItem('sira_template_backup');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutStart = async () => {
    localStorage.setItem('sira_form_backup', JSON.stringify(form));
    localStorage.setItem('sira_template_backup', selectedTemplate);
    if (isEditMode) localStorage.setItem('sira_edit_mode', 'true');
    if (existingId) localStorage.setItem('sira_existing_id', existingId);
    
    const isFree = FREE_TEMPLATES.includes(selectedTemplate);

    if (isFree) {
       const { data: { user } } = await supabase.auth.getUser();
       if (user) {
         await handleDeployToSupabase(user.email);
       } else {
         setIsClaimOpen(true);
       }
    } else {
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
        {isAuthOpen && <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />}
        {isDashboardOpen && <DashboardModal isOpen={isDashboardOpen} onClose={() => setIsDashboardOpen(false)} onEditPortfolio={handleEditPortfolio} />}
        {isClaimOpen && <ClaimModal isOpen={isClaimOpen} onClose={() => setIsClaimOpen(false)} onClaim={handleClaimSubmit} />}
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
      
      <main className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          
          {view === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="mb-8 md:mb-16 text-center">
                <h2 className="text-3xl md:text-5xl font-heading text-slate-900 mb-3 md:mb-4 tracking-tight">Premium Templates</h2>
                <p className="text-slate-500 max-w-sm md:max-w-xl mx-auto text-xs md:text-base leading-relaxed">
                  Select a high-end architectural layout for your professional digital presence.
                </p>
              </div>
              <Gallery onSelect={(id) => { setSelectedTemplate(id); setView('questions'); }} />
            </motion.div>
          )}

          {view === 'pricing' && (
            <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto text-center py-12 md:py-20">
               <h2 className="text-2xl md:text-3xl font-heading mb-6 italic text-slate-900">Ownership & Licensing</h2>
               <p className="mb-8 text-slate-500 max-w-lg mx-auto leading-relaxed text-sm md:text-base">A singular investment in your digital architecture.</p>
               <button onClick={() => setView('gallery')} className="text-[10px] font-bold uppercase tracking-[0.2em] bg-slate-900 text-white px-8 py-4 rounded-full hover:bg-sira-purple transition-all shadow-xl">Explore the Portfolios</button>
            </motion.div>
          )}

          {view === 'questions' && (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md" onClick={handleHomeClick}>
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white p-6 md:p-12 rounded-2xl md:rounded-3xl w-full max-w-lg md:max-w-2xl shadow-2xl relative overflow-y-auto flex flex-col max-h-[85vh] md:max-h-[90vh]">
                <button onClick={handleHomeClick} className="absolute top-4 right-4 md:top-6 md:right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10">✕</button>
                <QuestionStep templateId={selectedTemplate} form={form} updateForm={updateForm} onNext={() => setView('preview')} onBack={() => setView('gallery')} onExit={handleHomeClick} />
              </motion.div>
            </motion.div>
          )}

          {view === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-7xl mx-auto">
              <div className="mb-6 md:mb-8">
                <button onClick={() => setView('questions')} className="group text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-sira-purple flex items-center gap-2 transition-colors">← Back to Editor</button>
              </div>
              <Preview form={{...form, templateId: selectedTemplate}} onBack={() => setView('questions')} onNext={handleCheckoutStart} isEditing={isEditMode} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
}