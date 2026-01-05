import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; // Optional: npm install canvas-confetti if you want real confetti

export default function DeploymentModal({ isOpen, username, onClose }) {
  const [step, setStep] = useState(0); // 0: Idle, 1: Building, 2: Success

  // The fake deployment steps
  const steps = [
    "Verifying Payment...",
    "Allocating Secure Server...",
    "Uploading Assets to CDN...",
    "Configuring SSL Certificate...",
    "Assigning Domain: sira.app/" + username.toLowerCase(),
    "Live"
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      // Run through the fake steps
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        setStep(currentStep);
        if (currentStep >= steps.length - 1) {
          clearInterval(interval);
          // Trigger confetti when done
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
      }, 800); // Change step every 800ms
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative"
      >
        {/* CLOSE BUTTON (Only show at the end) */}
        {step === steps.length - 1 && (
          <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900">
            ✕
          </button>
        )}

        <div className="p-10 text-center">
          
          {/* PHASE 1: DEPLOYING ANIMATION */}
          {step < steps.length - 1 && (
            <div className="py-10">
              <div className="w-16 h-16 border-4 border-slate-100 border-t-sira-purple rounded-full animate-spin mx-auto mb-8"></div>
              <h2 className="text-2xl font-heading text-slate-900 mb-2">Deploying your Portfolio</h2>
              <p className="text-sira-purple font-mono text-sm animate-pulse">
                {steps[step]}
              </p>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full mt-8 overflow-hidden">
                <motion.div 
                  className="bg-sira-purple h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / (steps.length - 2)) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* PHASE 2: SUCCESS & URL */}
          {step === steps.length - 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                ✓
              </div>
              
              <h2 className="text-3xl font-heading text-slate-900 mb-2">You're Live!</h2>
              <p className="text-slate-500 mb-8">Your professional portfolio is now deployed worldwide.</p>

              {/* THE URL BOX */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 flex items-center justify-between group cursor-pointer hover:border-sira-purple transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="font-mono text-slate-700 text-lg">
                    sira.app/<span className="font-bold text-slate-900">{username.toLowerCase()}</span>
                  </span>
                </div>
                <button className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-sira-purple">
                  Copy
                </button>
              </div>

              <div className="flex gap-3">
                <button 
  onClick={() => window.open(`${window.location.origin}/${username}`, '_blank')}
  className="flex-1 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-sira-purple shadow-xl"
>
  Visit Website
</button>
                <button 
                  onClick={onClose}
                  className="px-6 py-4 border border-slate-200 text-slate-900 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50"
                >
                  Dashboard
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </div>
  );
}