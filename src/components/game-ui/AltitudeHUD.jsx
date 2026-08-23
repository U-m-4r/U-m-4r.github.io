import React from 'react';
import { Compass, Shield, Zap, CircleAlert } from 'lucide-react';
import CountUp from '../react-bits/CountUp';

export default function AltitudeHUD({ altitude, speed }) {
  // Determine state
  let stateLabel = 'IN BATTLE BUS';
  let stateColor = '#2196f3'; // rare blue
  if (altitude <= 4000 && altitude > 2500) {
    stateLabel = 'FREE FALLING';
    stateColor = '#ab47bc'; // epic purple
  } else if (altitude <= 2500 && altitude > 200) {
    stateLabel = 'GLIDING';
    stateColor = '#ffa726'; // legendary gold
  } else if (altitude <= 200) {
    stateLabel = 'LANDED';
    stateColor = '#4caf50'; // green
  }

  // Calculate percentage of descent
  const percent = Math.min(100, Math.round(((5000 - altitude) / 5000) * 100));

  return (
    <div
      className="glass-panel"
      style={{
        position: 'fixed',
        right: '20px',
        top: '100px',
        width: '240px',
        padding: '16px',
        zIndex: 10,
        borderLeft: `4px solid ${stateColor}`,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        fontSize: '14px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: '#aaa', fontWeight: 600 }}>MATCH STATE</span>
        <span style={{ color: stateColor, fontWeight: 800, fontFamily: 'Luckiest Guy' }}>{stateLabel}</span>
      </div>

      <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

      {/* Altitude stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{ color: '#aaa', fontSize: '11px' }}>ALTITUDE</span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '32px', fontFamily: 'Luckiest Guy', color: '#fff' }}>
            {altitude}
          </span>
          <span style={{ fontSize: '16px', fontWeight: 800, color: stateColor }}>M</span>
        </div>
      </div>

      {/* Speedometer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Zap size={14} color={stateColor} />
          <span style={{ color: '#aaa' }}>VELOCITY</span>
        </div>
        <span style={{ fontWeight: 800, color: '#fff' }}>
          <CountUp to={speed} from={50} duration={0.3} /> km/h
        </span>
      </div>

      {/* Descent progress bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa' }}>
          <span>DESCENT PROGRESS</span>
          <span>{percent}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${percent}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${stateColor}, #fff)`,
              transition: 'width 0.1s ease-out'
            }}
          />
        </div>
      </div>

      {/* Storm warning */}
      {altitude < 1200 && altitude > 200 && (
        <div
          style={{
            background: 'rgba(244, 67, 54, 0.15)',
            border: '1px dashed #f44336',
            borderRadius: '8px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#ff7961',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          <CircleAlert size={14} />
          <span>STORM SHRINKING - PREPARE FOR LANDING!</span>
        </div>
      )}
    </div>
  );
}