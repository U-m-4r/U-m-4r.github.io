import React, { useState, useEffect } from 'react';

const BOOT_LINES = [
  'American Megatrends BIOS v6.00PG',
  'CPU: Intel(R) Pentium(R) 4 CPU 2.80GHz',
  'Memory Test: 524288K OK',
  '',
  'Detecting Primary Master ... Hard Disk',
  'Detecting Primary Slave  ... None',
  '',
  'Press DEL to enter SETUP',
  '',
  'Starting Windows...',
  'Loading user environment...',
  'Initializing desktop...',
  'Ready.',
];

// XP-style loading bar phases
const XP_PHASES = [0, 1, 2, 3, 4, 5];

const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState('bios');
  const [visibleLines, setVisibleLines] = useState([]);
  const [barStep, setBarStep] = useState(0);

  // If reduced motion, skip straight to done
  useEffect(() => {
    if (PREFERS_REDUCED) {
      onComplete();
      return;
    }

    // BIOS phase: reveal lines one-by-one
    let idx = 0;
    const lineTimer = setInterval(() => {
      setVisibleLines(prev => [...prev, BOOT_LINES[idx]]);
      idx++;
      if (idx >= BOOT_LINES.length) {
        clearInterval(lineTimer);
        setTimeout(() => setPhase('xp'), 400);
      }
    }, 120);

    return () => clearInterval(lineTimer);
  }, [onComplete]);

  // XP loading bar animation
  useEffect(() => {
    if (phase !== 'xp') return;

    let step = 0;
    const barTimer = setInterval(() => {
      step++;
      setBarStep(step);
      if (step >= XP_PHASES.length) {
        clearInterval(barTimer);
        setTimeout(onComplete, 300);
      }
    }, 250);

    return () => clearInterval(barTimer);
  }, [phase, onComplete]);

  if (phase === 'bios') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 99999,
          padding: '24px 32px',
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: '13px',
          color: '#c8c8c8',
          lineHeight: '1.6',
        }}
        aria-live="polite"
        aria-label="System boot sequence"
      >
        {visibleLines.map((line, i) => (
          <div key={i}>{line || '\u00A0'}</div>
        ))}
        {visibleLines.length > 0 && (
          <span style={{ color: '#c8c8c8' }}>_</span>
        )}
      </div>
    );
  }

  if (phase === 'xp') {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#000',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
        }}
        aria-label="Windows starting"
      >
        {/* Windows XP wordmark area */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Franklin Gothic Medium", "Arial Narrow Bold", Arial, sans-serif',
            fontSize: '42px',
            color: '#fff',
            letterSpacing: '-1px',
            lineHeight: 1,
          }}>
            <span style={{ color: '#ef5a1d', fontWeight: 300 }}>Windows</span>
            <span style={{
              color: '#fff',
              fontWeight: 700,
              marginLeft: '10px',
              fontStyle: 'italic',
            }}>XP</span>
          </div>
          <div style={{
            color: '#aaa',
            fontSize: '12px',
            marginTop: '4px',
            letterSpacing: '0.05em',
          }}>
            Professional
          </div>
        </div>

        {/* Loading bar — classic XP pill style */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '200px',
            height: '14px',
            background: '#111',
            border: '1px solid #444',
            borderRadius: '7px',
            overflow: 'hidden',
            display: 'flex',
            gap: '3px',
            alignItems: 'center',
            padding: '2px 3px',
          }}>
            {XP_PHASES.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '100%',
                  borderRadius: '4px',
                  background: i < barStep
                    ? 'linear-gradient(to bottom, #6ea8e0 0%, #2c69c5 50%, #1a4fa0 100%)'
                    : 'transparent',
                  transition: 'background 0.15s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
