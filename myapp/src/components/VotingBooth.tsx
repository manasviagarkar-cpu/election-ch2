'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCheck, Fingerprint, MousePointer2, FileText, CheckCircle } from 'lucide-react';

/**
 * VotingBooth simulates the step-by-step physical voting process.
 */
export default function VotingBooth() {
  const [step, setStep] = useState(1);
  const [isVoted, setIsVoted] = useState(false);
  const [isTutorial, setIsTutorial] = useState(true);

  const steps = [
    { 
      id: 1, 
      title: "Step 1: Identity Check", 
      icon: UserCheck, 
      desc: "Present your Voter ID (EPIC) to the polling officer. They will verify your name in the electoral roll.",
      tutorial: "Keeping your ID ready saves time for everyone in the queue.",
      image: "/assets/voter_id_card.png"
    },
    { 
      id: 2, 
      title: "Step 2: The Inking", 
      icon: Fingerprint, 
      desc: "A drop of indelible ink is applied to your left forefinger. This mark proves you have participated in the democratic process.",
      tutorial: "The ink is designed to be permanent and is a mark of pride.",
      image: "/assets/ink_finger.png"
    },
    { 
      id: 3, 
      title: "Step 3: The EVM", 
      icon: MousePointer2, 
      desc: "Enter the voting compartment. Press the blue button next to the candidate of your choice on the Balloting Unit.",
      tutorial: "Your vote is secret. Only you will know who you have chosen.",
      image: "/assets/evm_machine.png"
    },
    { 
      id: 4, 
      title: "Step 4: The VVPAT", 
      icon: FileText, 
      desc: "Wait for the beep. A paper slip will be visible in the VVPAT window for 7 seconds, confirming your choice.",
      tutorial: "Verify your choice on the screen before the slip drops into the sealed box.",
      image: "https://images.unsplash.com/photo-1590632823126-df83988f0101?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setIsVoted(true);
  };

  const resetBooth = () => {
    setStep(1);
    setIsVoted(false);
  };

  return (
    <section style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'radial-gradient(circle at center, rgba(26, 35, 126, 0.1) 0%, transparent 70%)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1A237E', textShadow: '0 0 15px rgba(26, 35, 126, 0.5)' }}>
        Virtual Voting Booth
      </h2>
      <p style={{ color: '#aaa', marginBottom: '3rem' }}>Experience the step-by-step process of casting your vote.</p>

      {!isVoted ? (
        <div style={{ width: '90%', maxWidth: '1000px', position: 'relative' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '3rem' }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ 
                flex: 1, 
                height: '6px', 
                background: i <= step ? '#1A237E' : 'rgba(255,255,255,0.1)',
                borderRadius: '3px',
                transition: 'all 0.5s ease'
              }} />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              style={{ width: '100%', height: '100%' }}
            >
              <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', padding: '4rem', border: '1px solid rgba(26, 35, 126, 0.2)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '2rem' }}>
                    <div style={{ padding: '20px', background: 'rgba(26, 35, 126, 0.1)', borderRadius: '20px' }}>
                      {React.createElement(steps[step-1].icon, { size: 40, color: '#1A237E' })}
                    </div>
                    <h3 style={{ fontSize: '2.2rem' }}>{steps[step-1].title}</h3>
                  </div>

                  <p style={{ fontSize: '1.25rem', color: '#ccc', lineHeight: '1.7', marginBottom: '3rem' }}>
                    {steps[step-1].desc}
                  </p>

                  {isTutorial && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      style={{ padding: '2rem', background: 'rgba(26, 35, 126, 0.05)', borderLeft: '6px solid #1A237E', borderRadius: '15px', marginBottom: '3rem' }}
                    >
                      <h4 style={{ color: '#1A237E', marginBottom: '12px', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '1px' }}>CIVIC MENTOR INSIGHT</h4>
                      <p style={{ color: '#aaa', fontSize: '1rem', lineHeight: '1.6' }}>{steps[step-1].tutorial}</p>
                    </motion.div>
                  )}

                  <button 
                    className="neon-btn" 
                    onClick={handleNext}
                    style={{ width: '100%', padding: '1.3rem', background: '#1A237E', borderColor: '#1A237E', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    {step === steps.length ? 'Reset Protocol' : 'Proceed to Next Step'}
                  </button>
                </div>

                <div style={{ width: '100%', height: '450px', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <img src={steps[step-1].image} alt={`Visual guide for ${steps[step-1].title}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel" style={{ textAlign: 'center', padding: '4rem', maxWidth: '600px' }}>
          <CheckCircle size={80} color="#1A237E" style={{ margin: '0 auto 2rem' }} />
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Vote Cast Successfully</h3>
          <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '3rem' }}>
            You have successfully completed the voting process. Remember, in a real election, your vote is your power.
          </p>
          <button 
            className="neon-btn" 
            onClick={resetBooth}
            style={{ padding: '15px 40px', background: '#1A237E', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
          >
            Restart Simulation
          </button>
        </motion.div>
      )}
    </section>
  );
}
