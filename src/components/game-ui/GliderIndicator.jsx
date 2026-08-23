import React from 'react';

const GliderSvg = () => (
  <svg viewBox="0 0 100 100" style={{ width: '28px', height: '28px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50 C20 28, 80 28, 90 50 C75 58, 25 58, 10 50Z" fill="url(#gliderCanopy)" stroke="#ffa726" strokeWidth="1.5" />
    <path d="M50 32 L50 65" stroke="#ffa726" strokeWidth="2" />
    <path d="M30 35 C38 43, 38 52, 30 55" stroke="#ffd54f" strokeWidth="1" />
    <path d="M70 35 C62 43, 62 52, 70 55" stroke="#ffd54f" strokeWidth="1" />
    <line x1="50" y1="65" x2="50" y2="88" stroke="#e0e0e0" strokeWidth="2" />
    <path d="M47 88 C47 90, 53 90, 53 88" stroke="#e0e0e0" strokeWidth="2" fill="none" />
    <path d="M15 50 L5 53 L15 55 Z" fill="#9e9e9e" stroke="#424242" />
    <path d="M85 50 L95 53 L85 55 Z" fill="#9e9e9e" stroke="#424242" />
    <defs>
      <linearGradient id="gliderCanopy" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffd54f" />
        <stop offset="100%" stopColor="#f57c00" />
      </linearGradient>
    </defs>
  </svg>
);

export default function GliderIndicator({ altitude }) {
  if (altitude > 2500 || altitude <= 200) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: '50%',
        bottom: '80px',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        animation: 'float 2s infinite ease-in-out',
      }}
    >
      <div
        className="glass-panel"
        style={{
          padding: '8px 20px',
          borderRadius: '24px',
          border: '1px solid var(--legendary)',
          background: 'rgba(255, 167, 38, 0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 0 20px rgba(255, 167, 38, 0.35)',
        }}
      >
        <GliderSvg />
        <span
          style={{
            fontFamily: 'Luckiest Guy',
            color: 'var(--legendary)',
            letterSpacing: '1px',
            fontSize: '14px',
          }}
        >
          GLIDER DEPLOYED
        </span>
      </div>
    </div>
  );
}