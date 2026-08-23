import React, { useEffect, useRef } from 'react';

export default function Particles({ altitude }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticles = 50;

    class Particle {
      constructor() {
        this.reset();
        this.y = Math.random() * height; // initial scatter
      }

      reset() {
        this.x = Math.random() * width;
        this.y = height + 50;
        this.size = Math.random() * 2 + 1;
        this.speedY = 0;
        this.length = 0;
        this.alpha = Math.random() * 0.4 + 0.15;
      }

      update(mode) {
        if (mode === 'stars') {
          // Slow floating stars
          this.y -= 0.6;
          this.length = 0;
          this.size = Math.random() * 1.5 + 0.8;
          if (this.y < -10) this.reset();
        } else if (mode === 'wind') {
          // High speed vertical falling lines (going upwards relative to camera)
          this.speedY = -(18 + Math.random() * 12);
          this.y += this.speedY;
          this.length = Math.abs(this.speedY) * 2;
          this.size = Math.random() * 1 + 0.6;
          if (this.y < -this.length) {
            this.reset();
          }
        } else {
          // Normal floating clouds dust
          this.y -= 2;
          this.length = 0;
          this.size = Math.random() * 3 + 1;
          if (this.y < -10) this.reset();
        }
      }

      draw(mode) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.lineWidth = this.size;

        if (mode === 'wind') {
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(this.x, this.y + this.length);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      let mode = 'stars';
      if (altitude > 4000) {
        mode = 'stars';
      } else if (altitude > 2500) {
        mode = 'wind';
      } else {
        mode = 'clouds';
      }

      particles.forEach((p) => {
        p.update(mode);
        p.draw(mode);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [altitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}