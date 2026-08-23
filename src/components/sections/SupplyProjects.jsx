import React from 'react';
import TiltedCard from '../react-bits/TiltedCard';
import { ExternalLink, Github } from 'lucide-react';

const ProjectVisual = ({ type }) => {
  if (type === 'storm') {
    return (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', background: '#12121c' }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="120" fill="url(#bgGrad1)" />
        <path d="M10 90 L40 70 L70 80 L100 40 L130 60 L160 30 L190 50" stroke="#00e5ff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="100" cy="40" r="4" fill="#fff" stroke="#00e5ff" strokeWidth="1.5" />
        <circle cx="160" cy="30" r="4" fill="#fff" stroke="#00e5ff" strokeWidth="1.5" />
        <path d="M100 40 L100 120 M160 30 L160 120" stroke="rgba(0, 229, 255, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <defs>
          <linearGradient id="bgGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a237e" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0b0c10" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (type === 'gateway') {
    return (
      <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', background: '#12121c' }} fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="200" height="120" fill="url(#bgGrad2)" />
        <rect x="75" y="35" width="50" height="50" rx="6" fill="rgba(171, 71, 188, 0.2)" stroke="#ab47bc" strokeWidth="2" />
        <path d="M92 50 C92 45, 108 45, 108 50 L108 60 L92 60 Z" fill="#ab47bc" />
        <rect x="94" y="60" width="12" height="12" fill="#ffd54f" rx="1.5" />
        <circle cx="100" cy="65" r="1.5" fill="#333" />
        <defs>
          <linearGradient id="bgGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4a148c" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0b0c10" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 120" style={{ width: '100%', height: '100%', background: '#12121c' }} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="120" fill="url(#bgGrad3)" />
      <circle cx="100" cy="60" r="30" stroke="#ffa726" strokeWidth="1.5" strokeDasharray="5 3" />
      <rect x="85" y="45" width="30" height="30" rx="4" fill="rgba(255, 167, 38, 0.15)" stroke="#ffa726" strokeWidth="2" />
      <line x1="85" y1="60" x2="115" y2="60" stroke="#ffa726" strokeWidth="1.5" />
      <line x1="100" y1="45" x2="100" y2="75" stroke="#ffa726" strokeWidth="1.5" />
      <defs>
        <linearGradient id="bgGrad3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e65100" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0b0c10" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default function SupplyProjects() {
  const projects = [
    {
      title: 'StormTracker Dashboard',
      rarity: 'legendary',
      rarityColor: 'var(--legendary)',
      visualType: 'storm',
      description: 'A cloud-based real-time network visualization map that scales dynamically to process network telemetry. Includes SVG maps, latency tracking, and server alerts.',
      tags: ['React', 'D3.js', 'Node', 'WebSockets'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Fortress API Gateway',
      rarity: 'epic',
      rarityColor: 'var(--epic)',
      visualType: 'gateway',
      description: 'An secure, custom-built API gateway handling authentication tokens, rate limiting, and packet filtering with extremely fast request throughput.',
      tags: ['Go', 'Redis', 'Docker', 'gRPC'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Victory CSS Component Pack',
      rarity: 'rare',
      rarityColor: 'var(--rare)',
      visualType: 'css',
      description: 'A premium framework-agnostic CSS design system featuring custom grid layout modifiers, glowing glass panels, and interactive elements.',
      tags: ['CSS3', 'HTML5', 'PostCSS', 'ES6'],
      github: '#',
      demo: '#'
    }
  ];

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
      <div style={{ maxWidth: '1000px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '10px' }}>SUPPLY DROPS</h2>
          <p style={{ color: '#aaa', fontSize: '16px' }}>Approaching ground. Inspecting dropped chests containing active portfolio projects.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {projects.map((project, idx) => (
            <TiltedCard
              key={idx}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                borderTop: `4px solid ${project.rarityColor}`,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
            >
              <div
                style={{
                  height: '180px',
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <ProjectVisual type={project.visualType} />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '9px',
                    fontWeight: 800,
                    color: '#fff',
                    backgroundColor: project.rarityColor,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}
                >
                  {project.rarity} DROP
                </span>
              </div>

              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                <h3 style={{ fontSize: '20px', color: '#fff' }}>{project.title}</h3>
                <p style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.5', flexGrow: 1 }}>{project.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '5px 0' }}>
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      style={{
                        fontSize: '10px',
                        color: '#bbb',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

                <div style={{ display: 'flex', gap: '15px' }}>
                  <a
                    href={project.github}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#aaa',
                      fontSize: '13px',
                      textDecoration: 'none',
                      transition: 'color 0.15s'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--storm-purple)')}
                    onMouseLeave={(e) => (e.target.style.color = '#aaa')}
                  >
                    <Github size={14} />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#aaa',
                      fontSize: '13px',
                      textDecoration: 'none',
                      transition: 'color 0.15s'
                    }}
                    onMouseEnter={(e) => (e.target.style.color = 'var(--legendary)')}
                    onMouseLeave={(e) => (e.target.style.color = '#aaa')}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                </div>
              </div>
            </TiltedCard>
          ))}
        </div>
      </div>
    </section>
  );
}