'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, MapPin, Info, Gavel, User, Layers, Vote, Gamepad2, Map as MapIcon, Calendar, Clock, Trophy, ChevronRight, LayoutDashboard, Settings } from 'lucide-react';
import ErrorBoundary from '@/components/ErrorBoundary';

/**
 * Interactive 3D Globe Component representing global elections.
 * Uses React Three Fiber for rendering.
 */
function InteractiveGlobe() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#1A237E" />
      <directionalLight position={[-5, -3, -5]} intensity={1.5} color="#2e7d32" />
      <Sphere ref={sphereRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color="#0b0e14"
          attach="material"
          distort={0.2}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

interface HeroHubProps {
  onNavigate: (section: string) => void;
}

/**
 * HeroHub is the main dashboard component of the Global Civic Intelligence platform.
 * It displays an interactive 3D globe, regional election statuses, and a bottom navigation hotbar.
 */
export default function HeroHub({ onNavigate }: HeroHubProps) {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    { id: 'india', name: 'INDIA', flag: '🇮🇳', color: 'var(--accent-saffron)' },
    { id: 'usa', name: 'USA', flag: '🇺🇸', color: '#B71C1C' },
    { id: 'uk', name: 'UK', flag: '🇬🇧', color: '#1A237E' }
  ];

  const countryData: Record<string, any> = {
    india: {
      status: "LIVE: West Bengal Phase 2 Polling Today (April 29, 2026).",
      details: "Total 142 Constituencies. High turnout recorded (91.31%). Next: Result Day May 4.",
      timeline: [
        { date: "Today", event: "Phase 2 Polling", details: "AC 77-202, 259-274", live: true },
        { date: "May 4", event: "Result Day", details: "Counting & Declaration", final: true }
      ]
    },
    usa: {
      status: "Status: Midterm Primary Season (March – Sept 2026).",
      details: "General Election: Nov 3, 2026. Focus: All 435 House seats & 35 Senate seats.",
      timeline: [
        { date: "March-Sept", event: "Primary Elections", details: "Party Nominations", live: true },
        { date: "Nov 3", event: "General Election", details: "House & Senate Control", final: true }
      ]
    },
    uk: {
      status: "Status: Local & Devolved Elections (May 7, 2026).",
      details: "Coverage: 4,800+ Council seats in England, plus Scotland & Wales polls.",
      timeline: [
        { date: "May 7", event: "Local Polls", details: "Scotland & Wales", live: true },
        { date: "2029", event: "Next General", details: "Westminster Election", final: false }
      ]
    }
  };

  return (
    <main className="hero-hub" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingBottom: '120px' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <ErrorBoundary>
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <InteractiveGlobe />
            <OrbitControls enableZoom={false} autoRotate />
          </Canvas>
        </ErrorBoundary>
      </div>

      <motion.div 
        style={{ textAlign: 'center', zIndex: 10, position: 'relative', pointerEvents: 'none', padding: '0 20px' }}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <AnimatePresence mode="wait">
          {selectedCountry ? (
            <motion.div 
              key="status-badge"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              style={{
                background: 'rgba(26, 35, 126, 0.2)',
                border: '1px solid #1A237E',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '1.5rem',
                backdropFilter: 'blur(10px)',
                animation: countryData[selectedCountry].status.includes('LIVE') ? 'blink 1.5s infinite' : 'none'
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: countryData[selectedCountry].status.includes('LIVE') ? '#ff5252' : '#2196F3' }} />
              {countryData[selectedCountry].status}
            </motion.div>
          ) : (
            <div style={{ height: '56px', marginBottom: '1.5rem' }} />
          )}
        </AnimatePresence>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1rem', textShadow: '0 0 30px rgba(26, 35, 126, 0.5)' }}>
          Global Civic Intelligence
        </h1>
        
        {!selectedCountry && (
          <p style={{ fontSize: '1.3rem', color: '#aaa', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: '1.6' }}>
            The definitive digital mentor for democratic engagement. Real-time data from global election cycles.
          </p>
        )}

        {/* Country Selector Grid */}
        {!selectedCountry ? (
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', pointerEvents: 'auto', flexWrap: 'wrap' }}>
            {countries.map((c) => (
              <motion.div
                key={c.id}
                role="button"
                aria-label={`View ${c.name} election timeline`}
                whileHover={{ scale: 1.05, y: -10, border: `2px solid ${c.color}` }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCountry(c.id)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  padding: '35px',
                  width: '200px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '15px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                  transition: 'border 0.3s ease'
                }}
              >
                <span style={{ fontSize: '4.5rem' }}>{c.flag}</span>
                <span style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '3px' }}>{c.name}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ pointerEvents: 'auto', maxWidth: '900px', margin: '0 auto' }}
          >
            <div className="glass-panel" style={{ padding: '2.5rem', marginBottom: '3rem', textAlign: 'left', border: '1px solid rgba(26, 35, 126, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <Calendar color="#1A237E" /> {countries.find(c => c.id === selectedCountry)?.name} Live Timeline
                </h3>
                <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{countryData[selectedCountry].details}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {countryData[selectedCountry].timeline.map((step: any, idx: number) => (
                  <div key={idx} style={{ flex: 1, minWidth: '280px', background: 'rgba(26, 35, 126, 0.05)', padding: '2rem', borderRadius: '18px', borderLeft: `5px solid ${step.live ? '#ff5252' : step.final ? '#1A237E' : '#444'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.2rem' }}>{step.date}</span>
                      {step.live && <span style={{ background: '#ff5252', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 900 }}>ACTIVE</span>}
                    </div>
                    <h4 style={{ fontSize: '1.4rem', marginBottom: '10px' }}>{step.event}</h4>
                    <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.4' }}>{step.details}</p>
                  </div>
                ))}
              </div>
            </div>

            <button 
              className="neon-btn" 
              onClick={() => setSelectedCountry(null)}
              style={{ padding: '12px 40px', fontSize: '1.1rem', background: 'rgba(26, 35, 126, 0.2)', borderColor: '#1A237E' }}
            >
              Change Region
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Navigation Hotbar */}
      <motion.footer 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        style={{
          position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          zIndex: 1000, display: 'flex', gap: '20px', background: 'rgba(26, 35, 126, 0.1)',
          backdropFilter: 'blur(25px)', padding: '15px 30px', borderRadius: '35px',
          border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 60px rgba(0,0,0,0.6)'
        }}
      >
        {[
          { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'voter', label: 'Voter Journey', icon: User },
          { id: 'system', label: 'System Lab', icon: Layers },
          { id: 'play', label: 'Quiz', icon: Gamepad2 },
          { id: 'profile', label: 'Profile', icon: Settings }
        ].map((item) => (
          <motion.div
            key={item.id}
            role="button"
            aria-label={`Navigate to ${item.label}`}
            whileHover={{ scale: 1.15, y: -8, background: 'rgba(26, 35, 126, 0.3)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate(item.id)}
            style={{
              padding: '12px 25px', borderRadius: '25px', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
              minWidth: '110px', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <item.icon size={22} color="#1A237E" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </main>
  );
}
