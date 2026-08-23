import React, { useState } from 'react';
import TiltedCard from '../react-bits/TiltedCard';

export default function InventorySkills() {
  const [selectedSlot, setSelectedSlot] = useState(0);

  const inventory = [
    {
      name: 'Assault Rifle (React / Next.js)',
      rarity: 'legendary',
      rarityColor: 'var(--legendary)',
      icon: '🔫',
      description: 'Primary deployment tool. Builds highly modular, client-side visual interfaces, server-side layouts, and seamless routing structures.',
      level: 95,
      ammo: '30 / 120',
      stats: { DPS: 280, FireRate: '8.5', ReloadTime: '2.1s' }
    },
    {
      name: 'Shield Potion (Vanilla CSS & UX)',
      rarity: 'rare',
      rarityColor: 'var(--rare)',
      icon: '🧪',
      description: 'Protective core layer. Creates stunning HSL styles, robust grid grids, media adaptation layers, and premium layouts.',
      level: 90,
      ammo: '2 / 2',
      stats: { Shields: '+50', MaxCapacity: 100, SipSpeed: '3.0s' }
    },
    {
      name: 'Chug Splash (State & Backend)',
      rarity: 'epic',
      rarityColor: 'var(--epic)',
      icon: '🥤',
      description: 'Squad support utility. Manages global states (Redux/Zustand), constructs Node REST endpoints, feeds real-time channels, and integrates caches.',
      level: 85,
      ammo: '6 / 6',
      stats: { Healing: '+20', Radius: '5m', SplashTime: '0.5s' }
    },
    {
      name: 'Tactical Shotgun (Python & ML)',
      rarity: 'uncommon',
      rarityColor: 'var(--uncommon)',
      icon: '🪵',
      description: 'Heavy close-combat tools. Automates complex pipelines, handles deep datasets, and deploys local AI/LLM connections.',
      level: 80,
      ammo: '8 / 32',
      stats: { Damage: 85, FireRate: '1.5', ReloadTime: '4.8s' }
    },
    {
      name: 'Launch Pad (Git & Devops)',
      rarity: 'common',
      rarityColor: 'var(--common)',
      icon: '🚀',
      description: 'High deployment launch systems. Manages dockerized setups, schedules automated jobs, and runs builds to remote servers.',
      level: 75,
      ammo: '1 / 1',
      stats: { LaunchHeight: '50m', Cooldown: '30s', MaxDeployments: 3 }
    }
  ];

  const current = inventory[selectedSlot];

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
      <div style={{ maxWidth: '900px', width: '100%', display: 'flex', flexDirection: 'column', gap: '35px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px' }}>LOADOUT INVENTORY</h2>
          <p style={{ color: '#aaa', fontSize: '16px' }}>Deploying glider. Choose a slot below to inspect specific skill weaponry.</p>
        </div>

        {/* Hotbar slots */}
        <div className="inventory-grid">
          {inventory.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedSlot(idx)}
              className="glass-panel"
              style={{
                aspectRatio: '1',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: selectedSlot === idx ? `3px solid ${item.rarityColor}` : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: selectedSlot === idx ? `0 0 15px ${item.rarityColor}40` : 'none',
                background: selectedSlot === idx ? `rgba(255, 255, 255, 0.05)` : 'rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                position: 'relative',
                transition: 'transform 0.15s'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <span style={{ fontSize: '36px', marginBottom: '5px' }}>{item.icon}</span>
              <span style={{ fontSize: '9px', fontWeight: 800, color: item.rarityColor, textTransform: 'uppercase' }}>
                {item.rarity}
              </span>
              <span
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '10px',
                  fontSize: '10px',
                  color: '#fff',
                  fontWeight: 600
                }}
              >
                {item.ammo}
              </span>
            </div>
          ))}
        </div>

        {/* Details Card */}
        <TiltedCard
          className="glass-panel"
          style={{
            padding: '24px',
            borderLeft: `6px solid ${current.rarityColor}`,
            background: 'rgba(10, 12, 16, 0.75)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' }}>
            <div>
              <span
                style={{
                  color: current.rarityColor,
                  fontWeight: 800,
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  border: `1px solid ${current.rarityColor}`,
                  padding: '2px 8px',
                  borderRadius: '4px'
                }}
              >
                {current.rarity} ITEM
              </span>
              <h3 style={{ fontSize: '26px', color: '#fff', margin: '8px 0 4px 0' }}>{current.name}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ color: '#aaa', fontSize: '11px' }}>POWER LEVEL</span>
              <div style={{ fontSize: '28px', fontFamily: 'Luckiest Guy', color: 'var(--hud-green)' }}>
                {current.level}/100
              </div>
            </div>
          </div>

          <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', margin: '15px 0' }}>
            {current.description}
          </p>

          <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '15px 0' }} />

          {/* Weapons stat meters */}
          <div>
            <h4 style={{ fontSize: '11px', color: '#aaa', marginBottom: '10px', fontWeight: 600 }}>WEAPON PERFORMANCE MODIFIERS</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              {Object.entries(current.stats).map(([label, val], idx) => (
                <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ color: '#888', fontSize: '10px', textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>
        </TiltedCard>
      </div>
    </section>
  );
}