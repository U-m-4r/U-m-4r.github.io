import React from 'react';
import TiltedCard from '../react-bits/TiltedCard';

const ProfileSkinSvg = () => (
  <svg viewBox="0 0 80 120" style={{ width: '100%', height: '100%' }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="76" height="116" rx="8" fill="url(#avatarBg)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    
    {/* Tall Slender Head */}
    <path d="M40 12 C28 12, 26 28, 26 48 C26 62, 30 70, 40 70 C50 70, 54 62, 54 48 C54 28, 52 12, 40 12Z" fill="#15171e" stroke="#8e2de2" strokeWidth="2" />
    
    {/* Cyber Face Contour */}
    <path d="M30 35 C30 25, 50 25, 50 35 C50 52, 30 52, 30 35Z" fill="#0b0c10" stroke="#00e5ff" strokeWidth="1.5" />
    
    {/* Stylish Cyber Spectacles / Glasses */}
    <rect x="31" y="36" width="8" height="6" rx="1.5" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" strokeWidth="1.5" />
    <rect x="41" y="36" width="8" height="6" rx="1.5" fill="rgba(0,229,255,0.2)" stroke="#00e5ff" strokeWidth="1.5" />
    <line x1="39" y1="38" x2="41" y2="38" stroke="#00e5ff" strokeWidth="1.5" />
    <line x1="27" y1="38" x2="31" y2="38" stroke="#00e5ff" strokeWidth="1.5" />
    <line x1="49" y1="38" x2="53" y2="38" stroke="#00e5ff" strokeWidth="1.5" />
    <line x1="32" y1="37" x2="35" y2="40" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    <line x1="42" y1="37" x2="45" y2="40" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    
    {/* Cyber mouth detail */}
    <path d="M36 54 L44 54" stroke="#8e2de2" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Tall Neck */}
    <rect x="36" y="70" width="8" height="18" fill="#212121" stroke="#8e2de2" strokeWidth="1.5" />
    <line x1="36" y1="76" x2="44" y2="76" stroke="#00e5ff" strokeWidth="1" />
    <line x1="36" y1="82" x2="44" y2="82" stroke="#00e5ff" strokeWidth="1" />
    
    {/* Slender Shoulders */}
    <path d="M15 96 C22 90, 28 88, 35 88 L45 88 C52 88, 58 90, 65 96 L68 116 L12 116 Z" fill="#263238" stroke="#cfd8dc" strokeWidth="1.5" />
    <path d="M30 92 L40 102 L50 92" stroke="#8e2de2" strokeWidth="2" strokeLinecap="round" />
    <circle cx="40" cy="94" r="2" fill="#00e5ff" />
    
    <defs>
      <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#250a43" />
        <stop offset="100%" stopColor="#051937" />
      </linearGradient>
    </defs>
  </svg>
);

export default function AboutDrop() {
  const stats = [
    { label: 'LEVEL', value: '5', description: 'Years of professional coding XP' },
    { label: 'WINS', value: '45+', description: 'Successful client deploys' },
    { label: 'ELIMS', value: '180K+', description: 'Bugs smashed out of existence' },
    { label: 'K/D RATIO', value: '99.9%', description: 'Uptime of production applications' }
  ];

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px 20px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px' }}>SKYDIVER PROFILE</h2>
          <p style={{ color: '#aaa', fontSize: '16px' }}>Falling down at 220 km/h. Checking profile inventory statistics.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Left: Bio card */}
          <TiltedCard className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div
                style={{
                  width: '80px',
                  height: '120px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '2px solid var(--storm-purple)',
                  boxShadow: '0 0 10px var(--storm-purple-glow)',
                  background: 'rgba(255,255,255,0.03)'
                }}
              >
                <ProfileSkinSvg />
              </div>
              <div>
                <h3 style={{ fontSize: '24px', color: '#fff' }}>LoopCoder</h3>
                <span style={{ fontSize: '13px', color: 'var(--storm-purple)', fontWeight: 800 }}>LEGENDARY DEVELOPER</span>
              </div>
            </div>

            <p style={{ color: '#ccc', lineHeight: '1.7', fontSize: '15px' }}>
              Hey, I'm a fullstack engineer who designs highly creative, gamified digital products. I specialize in backend efficiency, modern styling, and interactive layouts that keep users engaged from start to landing.
            </p>
            <p style={{ color: '#ccc', lineHeight: '1.7', fontSize: '15px' }}>
              When I'm not in the code trenches, I'm tracking web performance, experimenting with fluid mechanics in canvas, or loading up local servers.
            </p>
          </TiltedCard>

          {/* Right: Fortnite Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
              >
                <span style={{ color: 'var(--storm-purple)', fontWeight: 800, fontSize: '12px', letterSpacing: '1px' }}>{stat.label}</span>
                <span style={{ fontSize: '40px', fontFamily: 'Luckiest Guy', color: '#fff', margin: '5px 0' }}>{stat.value}</span>
                <span style={{ color: '#888', fontSize: '11px', lineHeight: '1.4' }}>{stat.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}