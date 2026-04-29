'use client';

import React, { useRef } from 'react';
import { MapPin, Building2, Landmark, Gavel } from 'lucide-react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingPin({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} wireframe />
    </mesh>
  );
}

export default function PowerMap() {
  const hubs = [
    { id: 1, name: "Collector Office", role: "District Head", color: "#2196F3", top: '30%', left: '20%' },
    { id: 2, name: "Municipality", role: "Local Issues", color: "var(--accent-saffron)", top: '60%', left: '40%' },
    { id: 3, name: "Parliament House", role: "Central Laws", color: "var(--accent-green)", top: '40%', left: '70%' },
  ];

  return (
    <div style={{ paddingTop: '80px', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'radial-gradient(circle at center, rgba(33, 150, 243, 0.05) 0%, transparent 70%)' }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#2196F3' }}>
        Power Map: Government Hubs
      </h2>
      <p style={{ color: '#aaa', marginBottom: '3rem' }}>
        Interactive blueprint of regional and central authority centers.
      </p>
      
      <div className="glass-panel" style={{ 
        width: '90%', 
        maxWidth: '1000px',
        height: '60vh', 
        position: 'relative',
        background: 'rgba(0,0,0,0.3)',
        overflow: 'hidden',
        border: '1px solid rgba(33, 150, 243, 0.2)'
      }}>
        {/* Map Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(33, 150, 243, 0.2) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.3
        }} />

        {hubs.map((hub) => (
          <div
            key={hub.id}
            style={{
              position: 'absolute',
              top: hub.top,
              left: hub.left,
              width: '150px',
              height: '150px',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div style={{ width: '100px', height: '100px' }}>
              <Canvas camera={{ position: [0, 0, 2] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <FloatingPin color={hub.color} />
              </Canvas>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: 'rgba(0,0,0,0.8)',
                padding: '8px 15px',
                borderRadius: '8px',
                border: `1px solid ${hub.color}44`,
                textAlign: 'center',
                backdropFilter: 'blur(5px)',
                marginTop: '-10px'
              }}
            >
              <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>{hub.name}</p>
              <p style={{ color: hub.color, fontSize: '0.7rem', whiteSpace: 'nowrap' }}>({hub.role})</p>
            </motion.div>
          </div>
        ))}

        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          color: '#2196F3',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '2px',
          opacity: 0.6
        }}>
          [ GEO-SPATIAL SYSTEM ACTIVE ]
        </div>
      </div>
    </div>
  );
}
