import React, { useEffect, useState, useRef } from 'react';
import Particles from './components/react-bits/Particles';
import AltitudeHUD from './components/game-ui/AltitudeHUD';
import GliderIndicator from './components/game-ui/GliderIndicator';
import HeroBus from './components/sections/HeroBus';
import AboutDrop from './components/sections/AboutDrop';
import InventorySkills from './components/sections/InventorySkills';
import SupplyProjects from './components/sections/SupplyProjects';
import VictoryContact from './components/sections/VictoryContact';

export default function App() {
  const [altitude, setAltitude] = useState(5000);
  const [speed, setSpeed] = useState(50);
  
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScrollY = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScrollY <= 0) return;

      // Calculate altitude (5000m to 0m)
      const calculatedAltitude = Math.max(0, 5000 - Math.round((scrollY / maxScrollY) * 5000));
      setAltitude(calculatedAltitude);

      // Speed physics calculation
      const time = Date.now();
      const diffY = Math.abs(scrollY - lastScrollY.current);
      const diffT = time - lastTime.current;

      if (diffT > 80) {
        const scrollSpeed = (diffY / diffT) * 1000; // px/sec
        let currentSpeed = 50; // base speed
        
        if (calculatedAltitude > 2500) {
          // Free falling - faster speed bounds
          currentSpeed = Math.min(220, 110 + Math.round(scrollSpeed / 8));
        } else if (calculatedAltitude > 200) {
          // Gliding - slower speed bounds
          currentSpeed = Math.min(90, 45 + Math.round(scrollSpeed / 12));
        } else {
          // Landing
          currentSpeed = Math.max(0, 30 - Math.round(calculatedAltitude / 10));
        }
        
        setSpeed(currentSpeed);
        lastScrollY.current = scrollY;
        lastTime.current = time;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerJump = () => {
    // Scroll down to initiate jump
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  const resetDescent = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Background Particles Canvas */}
      <Particles altitude={altitude} />

      {/* Persistent Gameplay HUD */}
      <AltitudeHUD altitude={altitude} speed={speed} />
      <GliderIndicator altitude={altitude} />

      {/* Nav header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
          background: 'linear-gradient(180deg, rgba(10,12,16,0.6) 0%, rgba(0,0,0,0) 100%)',
          backdropFilter: 'blur(2px)'
        }}
      >
        <span style={{ fontSize: '24px', color: '#fff', cursor: 'pointer' }} onClick={resetDescent} className="fortnite-font">
          DROP ZONE
        </span>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', fontWeight: 600 }}>
          <span style={{ color: '#aaa', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>PROFILE</span>
          <span style={{ color: '#aaa', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' })}>SKILLS</span>
          <span style={{ color: '#aaa', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })}>DROPS</span>
          <span style={{ color: '#aaa', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })}>VICTORY</span>
        </div>
      </header>

      {/* Game Sections */}
      <HeroBus onJump={triggerJump} />
      <AboutDrop />
      <InventorySkills />
      <SupplyProjects />
      <VictoryContact onReset={resetDescent} />
    </div>
  );
}