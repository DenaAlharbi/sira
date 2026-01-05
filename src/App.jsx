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
// Change this line in src/App.jsx
import DeploymentModal from './components/DeploymentModal';
// --- TEMPLATE IMPORTS ---
import BasicFree from './templates/BasicFree/Index'; 

// =======================================================
// 1. PUBLIC PROFILE COMPONENT (The "Live" Website)
// =======================================================
function PublicProfile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (data) setProfile(data);
      setLoading(false);
    }
    fetchProfile();
  }, [username]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans tracking-widest uppercase text-[10px]">Loading Portfolio...</div>;
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

  // Data
  const [selectedTemplate, setSelectedTemplate] = useState('BasicFree'); 
  const [deployedUsername, setDeployedUsername] = useState(''); 
  const [form, setForm] = useState({ 
    fullName: '', 
    title: '', 
    bio: '', 
    image: null,
    experience: [],
    projects: [],
    contact: [],
    skills: [],
    portfolio: [],
    certifications: [],
    publications: []
  });

  // --- 1. SESSION RECOVERY (After Bank Redirect) ---
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
   const paymentStatus = params.get('status');

    if (paymentStatus === 'paid') {
      const savedForm = localStorage.getItem('sira_form_backup');
      const savedTemplate = localStorage.getItem('sira_template_backup');
      
      if (savedForm && savedTemplate) {
        const parsedForm = JSON.parse(savedForm);
        setForm(parsedForm);
        setSelectedTemplate(savedTemplate);

        // Finalize the deployment to Supabase
        const finalizeDeployment = async () => {
          const safeUsername = (parsedForm.fullName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000);
          setDeployedUsername(safeUsername);

          try {
            const { error } = await supabase
              .from('profiles')
              .insert([{ 
                username: safeUsername, 
                full_name: parsedForm.fullName,
                template_id: savedTemplate,
                data: parsedForm 
              }]);
            
            if (error) throw error;
            setIsDeploying(true); // Trigger Success Modal
            
            // Clean UI
            window.history.replaceState({}, document.title, "/");
            localStorage.removeItem('sira_form_backup');
            localStorage.removeItem('sira_template_backup');
          } catch (err) {
            alert("Recovery Error: " + err.message);
          }
        };

        finalizeDeployment();
      }
    }
  }, []);

  // --- ACTIONS ---
  const updateForm = (data) => setForm((prev) => ({ ...prev, ...data }));

  const handleHomeClick = () => {
    setView('gallery');
    setShowOnboarding(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutStart = () => {
    // Backup data before leaving the site for Moyasar
    localStorage.setItem('sira_form_backup', JSON.stringify(form));
    localStorage.setItem('sira_template_backup', selectedTemplate);
    setIsPaymentOpen(true);
  };

  const handlePaymentSuccess = async (paymentResult) => {
    // This handles non-redirecting success (like credit card if iframe stays open)
    setIsPaymentOpen(false);
    const safeUsername = (form.fullName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.floor(Math.random() * 1000);
    setDeployedUsername(safeUsername);

    try {
      const { error } = await supabase
        .from('profiles')
        .insert([{ 
          username: safeUsername, 
          full_name: form.fullName,
          template_id: selectedTemplate,
          data: form 
        }]);
      
      if (error) throw error;
      setIsDeploying(true);
    } catch (err) {
      alert("Deployment Error: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 antialiased selection:bg-sira-lavender selection:text-sira-purple font-sans">
      
      <Header 
        onHome={handleHomeClick} 
        onTemplates={() => setView('gallery')}
        onPricing={() => setView('pricing')}
        onGetStarted={() => setShowOnboarding(true)} 
      />

      <AnimatePresence>
        {showOnboarding && <OnboardingModal isOpen={showOnboarding} onClose={() => setShowOnboarding(false)} />}
      </AnimatePresence>

      <PaymentModal 
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        amount={249} 
        onPaymentSuccess={handlePaymentSuccess}
      />

      <DeploymentModal 
        isOpen={isDeploying}
        username={deployedUsername}
        onClose={() => setIsDeploying(false)} 
      />
      
      <main className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          
          {view === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-heading text-slate-900 mb-4 tracking-tight">Premium Templates</h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                  Select a high-end architectural layout for your professional digital presence.
                </p>
              </div>
              <Gallery onSelect={(id) => { setSelectedTemplate(id); setView('questions'); }} />
            </motion.div>
          )}

          {view === 'pricing' && (
            <motion.div key="pricing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="max-w-5xl mx-auto text-center py-20">
               <h2 className="text-3xl font-heading mb-6 italic">Ownership & Licensing</h2>
               <p className="mb-8 text-slate-500">One-time purchase. Permanent professional impact.</p>
               <button onClick={() => setView('gallery')} className="text-[10px] font-bold uppercase tracking-widest text-sira-purple hover:bg-sira-lavender px-6 py-3 rounded-full transition-all">
                 View Signature Collection
               </button>
            </motion.div>
          )}

          {view === 'questions' && (
            <motion.div key="questions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md" onClick={handleHomeClick}>
              <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white p-8 md:p-12 rounded-3xl max-w-2xl w-full shadow-2xl relative overflow-hidden">
                <button onClick={handleHomeClick} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-900 transition-colors z-10">✕</button>
                <QuestionStep templateId={selectedTemplate} form={form} updateForm={updateForm} onNext={() => setView('preview')} onExit={handleHomeClick} />
              </motion.div>
            </motion.div>
          )}

          {view === 'preview' && (
            <motion.div key="preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-7xl mx-auto">
              <div className="mb-8">
                <button onClick={() => setView('questions')} className="group text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-sira-purple flex items-center gap-2 transition-colors">
                  ← Back to Editor
                </button>
              </div>
              <Preview form={{...form, templateId: selectedTemplate}} onBack={() => setView('questions')} onNext={handleCheckoutStart} />
            </motion.div>
          )}

        </AnimatePresence>
      </main>
      
      <footer className="mt-20 border-t border-slate-100 pt-16 pb-12 px-6 text-center text-[10px] text-slate-300 uppercase tracking-[0.3em] font-bold">
        © 2026 Sira Premium Systems
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