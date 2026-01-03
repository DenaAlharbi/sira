import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionStep from './QuestionStep.jsx';
import PreviewMode from './Preview.jsx';
import PaymentStage from './PaymentStage.jsx';

export default function ModalFlow({ template, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: '',
    title: '',
    bio: '',
    image: null
  });
  const [stage, setStage] = useState('question'); // question | preview | payment | success
  const [deploying, setDeploying] = useState(false);

  const updateForm = (patch) => setForm((f) => ({ ...f, ...patch }));

  const goNext = () => {
    if (step < 3) setStep(step + 1);
    else setStep(3);
  };

  const goPreview = () => {
    setStage('preview');
  };

  const startDeployment = () => {
    setStage('payment');
  };

  // Simple transitions
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
        transition={{ duration: 0.25 }}
        aria-label="Template Details Modal"
        role="dialog"
        aria-modal="true"
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-2xl h-[80vh] overflow-hidden relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header inside modal */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-600 to-purple-500" />
              <span className="text-lg font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>
                {template.title}
              </span>
              <span className="text-sm text-gray-500">• {template.category}</span>
            </div>
            <button onClick={onClose} aria-label="Close" className="px-3 py-1 text-sm rounded border border-gray-200 hover:bg-gray-50">Close</button>
          </div>

          <div className="p-4 h-full overflow-auto">
            {stage === 'question' && (
              <QuestionStep form={form} updateForm={updateForm} onNext={goPreview} step={step} setStep={setStep} />
            )}
            {stage === 'preview' && (
              <PreviewMode form={form} onBack={() => setStage('question')} onNext={startDeployment} />
            )}
            {stage === 'payment' && (
              <PaymentStage onComplete={() => setStage('success')} onClose={onClose} />
            )}
            {stage === 'success' && (
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold" style={{ fontFamily: '"Playfair Display", serif' }}>Success</h3>
                <p className="mt-2 text-sm text-gray-600">Site is being deployed. You’ll receive a confirmation shortly.</p>
              </div>
            )}
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Sira Premium • {template.category}</span>
            <div className="flex items-center gap-2">
              {step < 3 && (
                <button className="px-4 py-2 rounded border border-gray-200 text-sm" onClick={() => setStep(step + 1)}>
                  Next
                </button>
              )}
              {step >= 3 && stage !== 'payment' && (
                <button className="px-4 py-2 rounded bg-[#4C1D95] text-white text-sm" onClick={startDeployment}>
                  Start Deployment
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
