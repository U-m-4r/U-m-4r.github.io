import React from 'react';
import DecryptedText from '../react-bits/DecryptedText';
import ShinyText from '../react-bits/ShinyText';

const BattleBusSvg = () => (
  <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="url(#busGlow)" opacity="0.25" />
    <path d="M100 20 C70 20, 60 50, 75 80 C85 100, 115 100, 125 80 C140 50, 130 20, 100 20Z" fill="url(#balloonGradient)" stroke="#fff" strokeWidth="2" />
    <path d="M100 20 C90 35, 90 65, 100 90" stroke="#ffd54f" strokeWidth="2.5" />
    <path d="M100 20 C110 35, 110 65, 100 90" stroke="#ffd54f" strokeWidth="2.5" />
    <path d="M100 20 C78 35, 78 65, 100 90" stroke="#42a5f5" strokeWidth="2.5" />
    <path d="M100 20 C122 35, 122 65, 100 90" stroke="#42a5f5" strokeWidth="2.5" />
    <line x1="75" y1="80" x2="85" y2="120" stroke="#e0e0e0" strokeWidth="2" />
    <line x1="125" y1="80" x2="115" y2="120" stroke="#e0e0e0" strokeWidth="2" />
    <line x1="100" y1="90" x2="100" y2="120" stroke="#e0e0e0" strokeWidth="2" />
    <rect x="72" y="116" width="56" height="26" rx="4" fill="#1e88e5" stroke="#fff" strokeWidth="2" />
    <rect x="72" y="128" width="56" height="3" fill="#0d47a1" />
    <rect x="78" y="120" width="7" height="6" rx="1" fill="#e3f2fd" />
    <rect x="88" y="120" width="7" height="6" rx="1" fill="#e3f2fd" />
    <rect x="98" y="120" width="7" height="6" rx="1" fill="#e3f2fd" />
    <rect x="108" y="120" width="7" height="6" rx="1" fill="#e3f2fd" />
    <circle cx="83" cy="144" r="8" fill="#212121" stroke="#fff" strokeWidth="1.5" />
    <circle cx="83" cy="144" r="2.5" fill="#fff" />
    <circle cx="117" cy="144" r="8" fill="#212121" stroke="#fff" strokeWidth="1.5" />
    <circle cx="117" cy="144" r="2.5" fill="#fff" />
    <path d="M96 142 L88 152 L112 152 L104 142 Z" fill="#9e9e9e" />
    <circle cx="100" cy="147" r="3" fill="#ffb74d" />
    <defs>
      <radialGradient id="busGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00e5ff" />
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="balloonGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ff1744" />
        <stop offset="40%" stopColor="#2979ff" />
        <stop offset="100%" stopColor="#2979ff" />
      </linearGradient>
    </defs>
  </svg>
);

export default function HeroBus({ onJump }) {
  return (
    <section
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        zIndex: 2,
        padding: '20px',
      }}
    >
      <div style={{ position: 'relative', width: '220px', height: '220px', marginBottom: '20px' }}>
        <div style={{ animation: 'float 3.5s infinite ease-in-out' }}>
          <BattleBusSvg />
        </div>
      </div>

      <h1 style={{ fontSize: '4.5rem', color: '#fff', marginBottom: '10px', textShadow: '0 4px 20px rgba(142,45,226,0.6)' }}>
        <DecryptedText text="BATTLE BUS ARRIVED" speed={40} />
      </h1>

      <p style={{ fontSize: '1.25rem', color: '#ccc', maxWidth: '600px', marginBottom: '35px', fontWeight: 300, lineHeight: 1.6 }}>
        Welcome to my creative deployment. Jump out of the bus to initiate skydiving and explore my technical skillset and projects.
      </p>

      <button
        onClick={onJump}
        className="fortnite-font"
        style={{
          padding: '16px 36px',
          background: 'linear-gradient(135deg, var(--storm-purple) 0%, #512da8 100%)',
          border: '2px solid #fff',
          borderRadius: '12px',
          color: '#fff',
          fontSize: '22px',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(142, 45, 226, 0.5)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          letterSpacing: '1px'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 8px 25px rgba(142, 45, 226, 0.7)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 6px 20px rgba(142, 45, 226, 0.5)';
        }}
      >
        <ShinyText text="JUMP OUT" />
      </button>
    </section>
  );
}