'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, User, Layers, Gamepad2, Mic, Vote, Settings, LogOut, LogIn } from 'lucide-react';
import dynamic from 'next/dynamic';
import HeroHub from '@/components/HeroHub';
import VoterJourney from '@/components/VoterJourney';
import Profile from '@/components/Profile';

const SystemLab = dynamic(() => import('@/components/SystemLab'), { ssr: false });
const PlayZone = dynamic(() => import('@/components/PlayZone'), { ssr: false });
const VotingBooth = dynamic(() => import('@/components/VotingBooth'), { ssr: false });

// Mock types
type FirebaseUser = {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
} | null;

// Firebase imports (from mock lib)
import { auth, googleProvider, signInWithPopup, signOut, onAuthStateChanged } from '@/lib/firebase';

export default function GlobalCivicPlatform() {
  const [activeSection, setActiveSection] = useState('home');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profileData, setProfileData] = useState({
    age: 20,
    voterIdStatus: true,
    displayName: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setProfileData(prev => ({ ...prev, displayName: u.displayName || '' }));
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup();
      if (result && result.user) {
        setUser(result.user as any);
        setProfileData(prev => ({ ...prev, displayName: result.user.displayName || '' }));
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setUser(null);
  };

  const navItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'voter', label: 'Voter Journey', icon: User },
    { id: 'system', label: 'System Lab', icon: Layers },
    { id: 'play', label: 'Quiz', icon: Gamepad2 },
    { id: 'profile', label: 'Profile', icon: Settings }
  ];

  const handleSpeakClick = () => {
    setIsSpeaking(true);
    setTimeout(() => setIsSpeaking(false), 3000);
  };

  return (
    <main style={{ position: 'relative', width: '100%', minHeight: '100vh', overflowX: 'hidden', background: '#0b0e14' }}>
      <title>Global Civic Intelligence</title>
      
      {/* Sidebar Navigation */}
      <nav className="magnetic-sidebar glass-panel" style={{ zIndex: 1000 }}>
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className="sidebar-item"
            style={{ 
              borderRight: activeSection === item.id ? '4px solid #1A237E' : 'none',
              background: activeSection === item.id ? 'rgba(26, 35, 126, 0.1)' : 'transparent'
            }}
            onClick={() => setActiveSection(item.id)}
          >
            <item.icon className="sidebar-icon" color="#1A237E" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{item.label}</span>
          </div>
        ))}
        
        <div style={{ marginTop: 'auto', padding: '20px' }}>
          {user ? (
            <div className="sidebar-item" onClick={handleLogout}>
              <LogOut size={20} color="#ff5252" />
              <span style={{ fontSize: '0.8rem', color: '#ff5252' }}>Logout</span>
            </div>
          ) : (
            <div className="sidebar-item" onClick={handleLogin}>
              <LogIn size={20} color="var(--accent-green)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)' }}>Login</span>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ marginLeft: '80px', position: 'relative', minHeight: '100vh' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{ width: '100%', height: '100%' }}
          >
            {activeSection === 'home' && <HeroHub onNavigate={setActiveSection} />}
            {activeSection === 'voter' && <VoterJourney userAge={profileData.age} />}
            {activeSection === 'system' && <SystemLab />}
            {activeSection === 'booth' && <VotingBooth />}
            {activeSection === 'play' && <PlayZone />}
            {activeSection === 'profile' && (
              <Profile 
                user={user} 
                data={profileData} 
                setData={setProfileData} 
                onLogin={handleLogin}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Action Bar */}
      <header style={{ position: 'fixed', top: '20px', right: '20px', display: 'flex', alignItems: 'center', gap: '15px', zIndex: 100 }}>
        {user && user.displayName && (
          <span style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, marginRight: '10px' }}>
            Welcome, {user.displayName.split(' ')[0]}
          </span>
        )}
        <button 
          className="neon-btn" 
          onClick={handleSpeakClick}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', background: isSpeaking ? '#1A237E' : 'rgba(26, 35, 126, 0.2)' }}
        >
          <Mic size={18} />
          {isSpeaking ? 'Listening...' : 'AI Mentor'}
        </button>
      </header>

      {/* Voice Animation */}
      <AnimatePresence>
        {isSpeaking && (
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             style={{ position: 'fixed', top: '70px', right: '20px', zIndex: 99, display: 'flex', gap: '5px' }}
           >
             {[1,2,3,4,5].map((i) => (
               <motion.div
                 key={i}
                 initial={{ height: 5 }}
                 animate={{ height: [5, 20, 5] }}
                 transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                 style={{ width: '4px', background: '#1A237E', borderRadius: '2px' }}
               />
             ))}
           </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --accent-primary: #1A237E;
          --glass-bg: rgba(255, 255, 255, 0.03);
          --glass-border: rgba(255, 255, 255, 0.08);
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(26, 35, 126, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(26, 35, 126, 0); }
          100% { box-shadow: 0 0 0 0 rgba(26, 35, 126, 0); }
        }
      `}} />
    </main>
  );
}
