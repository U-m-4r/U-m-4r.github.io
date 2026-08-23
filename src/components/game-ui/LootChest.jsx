import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import ShinyText from '../react-bits/ShinyText';

const ClosedChestSvg = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="40" fill="url(#chestGlow)" opacity="0.3" />
    <rect x="20" y="45" width="60" height="35" rx="3" fill="#8d6e63" stroke="#ffa726" strokeWidth="2.5" />
    <path d="M20 45 C20 30, 80 30, 80 45 Z" fill="#a1887f" stroke="#ffa726" strokeWidth="2.5" />
    <rect x="30" y="34" width="8" height="46" fill="#ffa726" />
    <rect x="62" y="34" width="8" height="46" fill="#ffa726" />
    <rect x="44" y="40" width="12" height="14" rx="2" fill="#ffd54f" stroke="#ff8f00" strokeWidth="1.5" />
    <circle cx="50" cy="45" r="2.5" fill="#3e2723" />
    <line x1="50" y1="47.5" x2="50" y2="52" stroke="#3e2723" strokeWidth="1.5" />
    <defs>
      <radialGradient id="chestGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffa726" />
        <stop offset="100%" stopColor="#ffa726" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

const OpenChestSvg = () => (
  <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 50 L10 10 M50 50 L90 10 M50 50 L30 5 M50 50 L70 5 M50 50 L5 40 M50 50 L95 40" stroke="#ffd54f" strokeWidth="2.5" opacity="0.6" strokeLinecap="round" />
    <path d="M20 30 C20 18, 80 18, 80 30 Z" fill="#8d6e63" stroke="#ffa726" strokeWidth="2" />
    <rect x="20" y="45" width="60" height="35" rx="3" fill="#8d6e63" stroke="#ffa726" strokeWidth="2.5" />
    <rect x="23" y="42" width="54" height="6" fill="#ffd54f" />
    <rect x="30" y="45" width="8" height="35" fill="#ffa726" />
    <rect x="62" y="45" width="8" height="35" fill="#ffa726" />
    <rect x="44" y="48" width="12" height="12" rx="2" fill="#ffd54f" stroke="#ff8f00" strokeWidth="1.5" />
  </svg>
);

export default function LootChest() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleOpen = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', width: '100%', maxWidth: '500px' }}>
      {!isOpen ? (
        <div
          onClick={handleOpen}
          style={{
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            transform: 'scale(1)',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div
            style={{
              width: '180px',
              height: '150px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <div style={{ animation: 'float 3s infinite ease-in-out', width: '100%', height: '100%' }}>
              <ClosedChestSvg />
            </div>
          </div>
          <button
            className="fortnite-font"
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, var(--legendary) 0%, #ff8f00 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255,167,38,0.4)',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            OPEN MYSTERY CHEST
          </button>
        </div>
      ) : (
        <div
          className="glass-panel"
          style={{
            width: '100%',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            border: '2px solid var(--legendary)',
            boxShadow: '0 0 25px rgba(255,167,38,0.2)',
            animation: 'float 5s infinite ease-in-out'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '60px', height: '60px' }}>
              <OpenChestSvg />
            </div>
            <div>
              <h3 style={{ color: 'var(--legendary)', fontSize: '20px' }}>
                <ShinyText text="YOU FOUND LEGENDARY LOOT!" />
              </h3>
              <p style={{ color: '#aaa', fontSize: '13px' }}>Send a message to contact me directly.</p>
            </div>
          </div>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '30px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
              <CheckCircle2 size={48} color="var(--uncommon)" />
              <h4 style={{ fontSize: '20px', color: '#fff' }}>MESSAGE TRANSMITTED!</h4>
              <p style={{ color: '#aaa', fontSize: '13px' }}>I received your connection loot. I will respond to your squad coordinates shortly!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#aaa' }}>CODENAME / NAME</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Wick"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    padding: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#aaa' }}>COORDINATES / EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. loop@fortnite.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    padding: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#aaa' }}>TRANSMISSION DATA / MESSAGE</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Drop details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    padding: '10px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    color: '#fff',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              <button
                type="submit"
                className="fortnite-font"
                style={{
                  padding: '12px',
                  background: 'linear-gradient(135deg, var(--storm-purple) 0%, #6a11cb 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(142,45,226,0.3)',
                }}
              >
                SEND TRANSMISSION
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}