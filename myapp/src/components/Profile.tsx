'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, CreditCard, LogIn, ShieldCheck } from 'lucide-react';

interface ProfileProps {
  user: any;
  data: {
    age: number;
    voterIdStatus: boolean;
    displayName: string;
  };
  setData: React.Dispatch<React.SetStateAction<{
    age: number;
    voterIdStatus: boolean;
    displayName: string;
  }>>;
  onLogin: () => void;
}

/**
 * Profile component manages the user's digital identity and election readiness status.
 * Integrates with Google Auth.
 */
export default function Profile({ user, data, setData, onLogin }: ProfileProps) {
  return (
    <section style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '100px' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#fff', textShadow: '0 0 15px rgba(255,255,255,0.2)' }}>
        User Profile
      </h2>

      {!user ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel"
          style={{ padding: '4rem', textAlign: 'center', maxWidth: '500px' }}
        >
          <User size={60} color="#1A237E" style={{ marginBottom: '2rem' }} />
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>Access Your Dashboard</h3>
          <p style={{ color: '#aaa', marginBottom: '2.5rem' }}>Login with Google to manage your voter status and personalize your civic journey.</p>
          <button className="neon-btn" onClick={onLogin} style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '0 auto', background: '#1A237E' }}>
            <LogIn size={20} /> Sign in with Google
          </button>
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ width: '90%', maxWidth: '800px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}
        >
          {/* Avatar Card */}
          <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '4px solid #1A237E', marginBottom: '1.5rem', boxShadow: '0 0 20px rgba(26, 35, 126, 0.4)' }}>
              <img src={user.photoURL || ''} alt="User profile picture" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{user.displayName}</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '2rem' }}>{user.email}</p>
            <div style={{ padding: '10px 20px', background: 'rgba(26, 35, 126, 0.2)', borderRadius: '15px', border: '1px solid #1A237E', color: '#fff', fontSize: '0.8rem', fontWeight: 700 }}>
              VERIFIED CITIZEN
            </div>
          </div>

          {/* Details Form */}
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={16} /> YOUR AGE
                </label>
                <input 
                  type="number" 
                  value={data.age} 
                  onChange={(e) => setData({...data, age: parseInt(e.target.value) || 0})}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '12px', borderRadius: '10px', color: '#fff', fontSize: '1.1rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ padding: '10px', background: 'rgba(46, 125, 50, 0.1)', borderRadius: '12px' }}>
                    <ShieldCheck color="var(--accent-green)" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem' }}>Voter ID Status</h4>
                    <p style={{ color: '#888', fontSize: '0.8rem' }}>{data.voterIdStatus ? 'Registered & Active' : 'Not Registered'}</p>
                  </div>
                </div>
                <div 
                  onClick={() => setData({...data, voterIdStatus: !data.voterIdStatus})}
                  style={{ 
                    width: '60px', height: '30px', background: data.voterIdStatus ? 'var(--accent-green)' : '#444', 
                    borderRadius: '15px', position: 'relative', cursor: 'pointer', transition: 'all 0.3s ease' 
                  }}
                >
                  <div style={{ 
                    width: '24px', height: '24px', background: '#fff', borderRadius: '50%', 
                    position: 'absolute', top: '3px', left: data.voterIdStatus ? '33px' : '3px', transition: 'all 0.3s ease' 
                  }} />
                </div>
              </div>

              <div style={{ marginTop: '1rem', padding: '1.5rem', background: 'rgba(26, 35, 126, 0.1)', borderRadius: '15px', border: '1px solid rgba(26, 35, 126, 0.2)' }}>
                <p style={{ color: '#ccc', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  <strong>Digital Identity:</strong> Your profile is synced with the global civic database. Changes to your age will automatically update your suggested voter journey.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
