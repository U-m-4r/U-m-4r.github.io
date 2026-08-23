import React from 'react';
import LootChest from '../game-ui/LootChest';
import ShinyText from '../react-bits/ShinyText';
import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export default function VictoryContact({ onReset }) {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '100px 20px',
        position: 'relative',
        zIndex: 2,
        background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(142,45,226,0.06) 100%)'
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        {/* Victory Ribbon */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1d976c 0%, #93f9b9 100%)',
            padding: '15px 40px',
            borderRadius: '40px',
            boxShadow: '0 8px 30px rgba(29,151,108,0.4)',
            textAlign: 'center',
            border: '2px solid #fff',
            transform: 'rotate(-2deg)',
            animation: 'float 3.5s infinite ease-in-out',
            width: '100%',
            maxWidth: '450px',
          }}
        >
          <span
            style={{
              fontFamily: 'Luckiest Guy',
              color: '#fff',
              fontSize: '28px',
              letterSpacing: '2px',
              textShadow: '2px 2px 4px rgba(0,0,0,0.4)'
            }}
          >
            VICTORY ROYALE #1
          </span>
          <div style={{ color: '#fff', fontSize: '12px', fontWeight: 800, marginTop: '2px' }}>
            PORTFOLIO EXPLORER
          </div>
        </div>

        {/* Contact Chest Form */}
        <LootChest />

        {/* Social Badges */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
          <a
            href="#"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#aaa',
              transition: 'transform 0.15s, color 0.15s, border-color 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#aaa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#aaa',
              transition: 'transform 0.15s, color 0.15s, border-color 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#aaa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <Linkedin size={20} />
          </a>
          <a
            href="#"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#aaa',
              transition: 'transform 0.15s, color 0.15s, border-color 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#aaa';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            }}
          >
            <Twitter size={20} />
          </a>
        </div>

        {/* Back to top / restart */}
        <button
          onClick={onReset}
          className="fortnite-font"
          style={{
            padding: '10px 20px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px',
            color: '#aaa',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            transition: 'color 0.15s, border-color 0.15s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#aaa';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
          }}
        >
          <ArrowUp size={12} />
          BOARD BATTLE BUS AGAIN
        </button>
      </div>
    </section>
  );
}