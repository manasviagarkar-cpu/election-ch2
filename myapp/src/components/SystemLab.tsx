'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Building2, Crown, X, Info, HelpCircle, UserCheck, ShieldCheck, ChevronRight, User } from 'lucide-react';

/**
 * SystemLab component visualizes the parliamentary architecture and flow of power.
 * Allows users to explore Lok Sabha and Rajya Sabha members.
 */
export default function SystemLab() {
  const [activeTab, setActiveTab] = useState<'houses' | 'hierarchy'>('houses');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [insight, setInsight] = useState<string | null>(null);

  const lokSabhaMembers = [
    { name: "Mani A", party: "DMK", state: "Tamil Nadu", position: "Sitting Member, 18th Lok Sabha", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" },
    { name: "Brijmohan Agrawal", party: "BJP", state: "Chhattisgarh", position: "Sitting Member, 18th Lok Sabha", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" }
  ];

  const rajyaSabhaMembers = [
    { name: "Jaya Bachchan", party: "SP", state: "Uttar Pradesh", position: "Member of Parliament (RS)", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" },
    { name: "Ramdas Athawale", party: "RPI", state: "Maharashtra", position: "Member of Parliament (RS)", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200" }
  ];

  const hierarchy = [
    { id: 4, label: 'President Appoints PM', detail: 'Formal appointment of the majority leader.', icon: ShieldCheck, color: 'var(--accent-green)' },
    { id: 3, label: 'Majority Party (272+)', detail: 'Control of the Lower House.', icon: Crown, color: '#9C27B0' },
    { id: 2, label: 'MP Elected to Lok Sabha', detail: 'Representative of the People.', icon: Building2, color: '#2196F3' },
    { id: 1, label: 'Citizen Votes', detail: 'The sovereign foundation.', icon: Users, color: '#1A237E' }
  ];

  const aiInsights: Record<string, string> = {
    'Citizen Votes': "AI Insight: Your vote is the starting point of the entire government structure. It determines the composition of the Lok Sabha.",
    'MP Elected to Lok Sabha': "AI Insight: Each MP represents around 15-20 lakh citizens in their constituency.",
    'Majority Party (272+)': "AI Insight: If no party gets 272, it leads to a 'Hung Parliament', often resulting in coalition governments.",
    'President Appoints PM': "AI Insight: While the President appoints the PM, they must follow the constitutional mandate of the majority leader."
  };

  return (
    <section style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '120px' }}>
      <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#fff' }}>Parliamentary Architecture</h2>
      <p style={{ color: '#888', marginBottom: '3.5rem', fontSize: '1.2rem' }}>Direct visualization of legislative members and the flow of power.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '4rem' }}>
        <button onClick={() => setActiveTab('houses')} className="neon-btn" style={{ background: activeTab === 'houses' ? 'rgba(26, 35, 126, 0.2)' : 'transparent', borderColor: '#1A237E' }}>Members of Parliament</button>
        <button onClick={() => setActiveTab('hierarchy')} className="neon-btn" style={{ background: activeTab === 'hierarchy' ? 'rgba(26, 35, 126, 0.2)' : 'transparent', borderColor: '#1A237E' }}>The Power Flow</button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'houses' ? (
          <motion.div key="houses" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{ width: '90%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Lok Sabha */}
            <div className="glass-panel" style={{ padding: '2.5rem', borderTop: '6px solid #2196F3' }}>
              <h3 style={{ fontSize: '1.8rem', color: '#2196F3', marginBottom: '2rem' }}>Lok Sabha (18th)</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {lokSabhaMembers.map((m, i) => (
                  <div key={i} onClick={() => setSelectedMember(m)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={m.image} alt={`${m.name} - ${m.party} member from ${m.state}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem' }}>{m.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: '#2196F3', fontWeight: 800 }}>{m.party} | {m.state}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rajya Sabha */}
            <div className="glass-panel" style={{ padding: '2.5rem', borderTop: '6px solid var(--accent-green)' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--accent-green)', marginBottom: '2rem' }}>Rajya Sabha</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {rajyaSabhaMembers.map((m, i) => (
                  <div key={i} onClick={() => setSelectedMember(m)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden' }}>
                      <img src={m.image} alt={`${m.name} - ${m.party} member from ${m.state}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.1rem' }}>{m.name}</h4>
                      <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 800 }}>{m.party} | {m.state}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="hierarchy" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column-reverse', gap: '2rem', position: 'relative' }}>
            {hierarchy.map((step) => (
              <motion.div
                key={step.id}
                onHoverStart={() => setInsight(aiInsights[step.label])}
                onHoverEnd={() => setInsight(null)}
                whileHover={{ scale: 1.02, background: 'rgba(26, 35, 126, 0.1)' }}
                style={{ padding: '1.8rem 2.5rem', background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', border: `1px solid rgba(255,255,255,0.1)`, borderRadius: '18px', display: 'flex', alignItems: 'center', gap: '25px', cursor: 'help' }}
              >
                <div style={{ padding: '12px', background: `${step.color}11`, borderRadius: '12px' }}>
                  <step.icon color={step.color} size={28} />
                </div>
                <div>
                   <h4 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '4px' }}>{step.label}</h4>
                   <p style={{ color: '#666', fontSize: '0.9rem' }}>{step.detail}</p>
                </div>
              </motion.div>
            ))}
            <div style={{ position: 'absolute', left: '44px', top: '50px', bottom: '50px', width: '2px', background: 'linear-gradient(to top, #1A237E, #2196F3, #9C27B0, var(--accent-green))', zIndex: -1 }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative', textAlign: 'center' }}>
              <button onClick={() => setSelectedMember(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={24} /></button>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 2rem', border: '4px solid #1A237E' }}>
                <img src={selectedMember.image} alt={`Detailed portrait of ${selectedMember.name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{selectedMember.name}</h3>
              <p style={{ color: '#1A237E', fontWeight: 800, fontSize: '1.1rem', marginBottom: '1.5rem' }}>{selectedMember.party} | {selectedMember.state}</p>
              <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', color: '#aaa', fontSize: '1rem' }}>
                {selectedMember.position}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Insight Box */}
      <AnimatePresence>
        {insight && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ position: 'fixed', bottom: '150px', right: '40px', width: '320px', background: 'rgba(26, 35, 126, 0.95)', padding: '1.5rem', borderRadius: '18px', border: '1px solid #1A237E', color: '#fff', fontSize: '1rem', zIndex: 100, boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
            {insight}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
