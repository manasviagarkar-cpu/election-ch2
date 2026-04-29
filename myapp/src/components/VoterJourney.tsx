'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ClipboardList, CheckCircle, ExternalLink, ChevronDown, ChevronUp, GraduationCap, FileText, MapPin } from 'lucide-react';

interface StageCardProps {
  title: string;
  subtitle: string;
  icon: any;
  content: string;
  links: { label: string; url: string }[];
  isExpanded: boolean;
  onToggle: () => void;
  color: string;
}

const StageCard = ({ title, subtitle, icon: Icon, content, links, isExpanded, onToggle, color }: StageCardProps) => (
  <motion.div 
    className="glass-panel" 
    style={{ padding: '2rem', marginBottom: '2rem', borderLeft: `6px solid ${color}`, position: 'relative', overflow: 'hidden' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ padding: '15px', background: `${color}11`, borderRadius: '15px' }}>
          <Icon size={32} color={color} />
        </div>
        <div>
          <h3 style={{ fontSize: '1.6rem', color: '#fff' }}>{title}</h3>
          <p style={{ color: color, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '1px' }}>{subtitle}</p>
        </div>
      </div>
      <button onClick={onToggle} style={{ background: 'transparent', border: 'none', color: '#aaa', cursor: 'pointer' }}>
        {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
      </button>
    </div>

    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{ marginTop: '2rem', overflow: 'hidden' }}
        >
          <p style={{ color: '#ccc', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>{content}</p>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {links.map((link, idx) => (
              <a 
                key={idx} 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', 
                  background: 'rgba(255,255,255,0.05)', borderRadius: '10px', color: '#fff', 
                  textDecoration: 'none', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' 
                }}
              >
                {link.label} <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function VoterJourney({ userAge }: { userAge: number }) {
  const [expandedStage, setExpandedStage] = useState<number | null>(userAge < 18 ? 1 : 2);

  const stages = [
    {
      id: 1,
      title: "Stage 1: Beginner",
      subtitle: "FUTURE VOTER / NEW ENTRY",
      icon: GraduationCap,
      color: "#1A237E",
      content: "Welcome to your civic apprenticeship. Before you turn 18, focus on understanding the mechanisms of power. Learn about your local representatives and how laws are passed. Pre-registration is available in many regions at 17.",
      links: [
        { label: "ECI Education Portal", url: "https://ecisveep.nic.in" },
        { label: "Civic Literacy Guide", url: "#" }
      ]
    },
    {
      id: 2,
      title: "Stage 2: Registration",
      subtitle: "IDENTITY & ENROLLMENT",
      icon: FileText,
      color: "#2196F3",
      content: "The critical path to enfranchisement. Ensure your documents are ready (Aadhaar, Passport, or Birth Cert). The process follows a strict protocol: Document Preparation → Form 6 Filing → Field Verification → EPIC Delivery.",
      links: [
        { label: "Register Online (India)", url: "https://voters.eci.gov.in" },
        { label: "Document Checklist", url: "#" }
      ]
    },
    {
      id: 3,
      title: "Stage 3: Ready to Vote",
      subtitle: "POLLING DAY PROTOCOL",
      icon: CheckCircle,
      color: "var(--accent-green)",
      content: "You are fully registered. Your final steps involve locating your polling booth, verifying your identity on the electoral roll, and understanding the EVM/VVPAT protocol for a secure and valid vote.",
      links: [
        { label: "Locate My Booth", url: "https://electoralsearch.eci.gov.in" },
        { label: "Booth Protocol PDF", url: "#" }
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '120px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '1rem' }}>Voter Journey</h2>
        <p style={{ color: '#888', fontSize: '1.2rem' }}>A vertical scroll-process to master your democratic rights.</p>
        {userAge < 18 && (
          <div style={{ marginTop: '1.5rem', padding: '10px 20px', background: 'rgba(26, 35, 126, 0.2)', border: '1px solid #1A237E', borderRadius: '30px', color: '#fff', fontSize: '0.9rem', fontWeight: 700, display: 'inline-block' }}>
            AUTO-DETECT: FUTURE VOTER PATH ACTIVE
          </div>
        )}
      </div>

      <div style={{ width: '90%', maxWidth: '800px', position: 'relative' }}>
        {/* Scroll Path Line */}
        <div style={{ position: 'absolute', left: '42px', top: '40px', bottom: '40px', width: '2px', background: 'linear-gradient(to bottom, #1A237E, #2196F3, var(--accent-green))', opacity: 0.3, zIndex: -1 }} />

        {stages.map((stage) => (
          <StageCard 
            key={stage.id}
            {...stage}
            isExpanded={expandedStage === stage.id}
            onToggle={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
          />
        ))}
      </div>
    </div>
  );
}
