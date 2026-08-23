import React, { useRef, useState } from 'react';

export default function TiltedCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 12;
    const angleY = (x - xc) / 12;
    setTransform(`perspective(800px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        transform: transform,
        transition: 'transform 0.15s ease-out',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
}