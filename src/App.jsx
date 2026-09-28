import React, { useState, useEffect, useCallback } from 'react';
import {
  ComputerIcon, FolderIcon, RecycleBinIcon,
  InfoIcon, ContactIcon, PdfIcon, StartIcon,
} from './components/Icons';
import { Window } from './components/Window';
import { BootSequence } from './components/BootSequence';

// ── App registry ──────────────────────────────────────────────────────────────
const APPS = [
  { id: 'my-computer',    title: 'My Computer',  Icon: ComputerIcon,  desktopLabel: 'My Computer' },
  { id: 'projects',       title: 'Projects',     Icon: FolderIcon,    desktopLabel: 'Projects' },
  { id: 'resume',         title: 'Resume.pdf',   Icon: PdfIcon,       desktopLabel: 'Resume.pdf' },
  { id: 'about',          title: 'About AU',     Icon: InfoIcon,      desktopLabel: 'About AU' },
  { id: 'contact',        title: 'Contact.exe',  Icon: ContactIcon,   desktopLabel: 'Contact.exe' },
  { id: 'recycle-bin',    title: 'Recycle Bin',  Icon: RecycleBinIcon, desktopLabel: 'Recycle Bin' },
  // Project apps — launched from within Projects folder, not shown as desktop icons
  { id: 'screenly',       title: 'Screenly.exe',        Icon: FolderIcon, hidden: true },
  { id: 'buildback',      title: 'BuildBack',            Icon: FolderIcon, hidden: true },
  { id: 'decode2deploy',  title: 'Decode2Deploy',        Icon: FolderIcon, hidden: true },
  { id: 'campify',        title: 'Campify',              Icon: FolderIcon, hidden: true },
];

// Default window sizes/positions for each app
const WINDOW_DEFAULTS = {
  'my-computer':   { w: 480, h: 320,  x: 120, y: 80  },
  'projects':      { w: 460, h: 300,  x: 140, y: 100 },
  'resume':        { w: 640, h: 520,  x: 160, y: 60  },
  'about':         { w: 380, h: 240,  x: 200, y: 120 },
  'contact':       { w: 360, h: 240,  x: 220, y: 140 },
  'recycle-bin':   { w: 380, h: 240,  x: 180, y: 130 },
  'screenly':      { w: 520, h: 380,  x: 180, y: 80  },
  'buildback':     { w: 520, h: 380,  x: 200, y: 90  },
  'decode2deploy': { w: 520, h: 380,  x: 220, y: 100 },
  'campify':       { w: 520, h: 380,  x: 240, y: 110 },
};

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  // Boot state
  const [booted, setBooted] = useState(() => {
    try { return !!sessionStorage.getItem('xp-booted'); } catch { return false; }
  });
  const [showBoot, setShowBoot] = useState(!booted);

  // Desktop state
  const [openWindows, setOpenWindows] = useState([]);   // [{id, zIndex}]
  const [minimized,   setMinimized]   = useState([]);   // [id]
  const [activeId,    setActiveId]    = useState(null);
  const [maxZIndex,   setMaxZIndex]   = useState(100);
  const [startOpen,   setStartOpen]   = useState(false);
  const [selected,    setSelected]    = useState(null);
  const [time,        setTime]        = useState('');

  // Clock
  useEffect(() => {
    const tick = () => {
      const n = new Date();
      setTime(n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 10000);
    return () => clearInterval(id);
  }, []);

  const handleBootComplete = useCallback(() => {
    try { sessionStorage.setItem('xp-booted', '1'); } catch { /* ignore */ }
    setBooted(true);
    setShowBoot(false);
  }, []);

  const replayBoot = () => {
    try { sessionStorage.removeItem('xp-booted'); } catch { /* ignore */ }
    setBooted(false);
    setShowBoot(true);
    setStartOpen(false);
  };

  // ── Window management ───────────────────────────────────────────────────────
  const bringToFront = useCallback((id) => {
    setMaxZIndex(z => {
      const next = z + 1;
      setOpenWindows(ws => ws.map(w => w.id === id ? { ...w, zIndex: next } : w));
      return next;
    });
    setActiveId(id);
  }, []);

  const openApp = useCallback((id) => {
    const exists = openWindows.find(w => w.id === id);
    if (!exists) {
      const def = WINDOW_DEFAULTS[id] || { w: 500, h: 360, x: 100, y: 80 };
      const z = maxZIndex + 1;
      setOpenWindows(ws => [...ws, { id, zIndex: z, ...def }]);
      setMaxZIndex(z);
    }
    if (minimized.includes(id)) {
      setMinimized(m => m.filter(x => x !== id));
    }
    setActiveId(id);
    setStartOpen(false);
  }, [openWindows, minimized, maxZIndex]);

  const closeWindow = useCallback((id) => {
    setOpenWindows(ws => ws.filter(w => w.id !== id));
    setMinimized(m => m.filter(x => x !== id));
    setActiveId(prev => {
      if (prev !== id) return prev;
      const remaining = openWindows.filter(w => w.id !== id && !minimized.includes(w.id));
      if (remaining.length === 0) return null;
      return remaining.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id;
    });
  }, [openWindows, minimized]);

  const minimizeWindow = useCallback((id) => {
    setMinimized(m => m.includes(id) ? m : [...m, id]);
    setActiveId(prev => {
      if (prev !== id) return prev;
      const remaining = openWindows.filter(w => w.id !== id && !minimized.includes(w.id));
      if (remaining.length === 0) return null;
      return remaining.reduce((a, b) => a.zIndex > b.zIndex ? a : b).id;
    });
  }, [openWindows, minimized]);

  const toggleTaskbar = useCallback((id) => {
    if (minimized.includes(id)) {
      setMinimized(m => m.filter(x => x !== id));
      bringToFront(id);
    } else if (activeId === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  }, [minimized, activeId, bringToFront, minimizeWindow]);

  // ── App content renderer ────────────────────────────────────────────────────
  const renderContent = (id) => {
    switch (id) {
      case 'my-computer':
        return (
          <div style={{ padding: '16px 20px', fontSize: 12 }}>
            <div style={{ marginBottom: 12, borderBottom: '1px solid #c8c8c8', paddingBottom: 8, fontWeight: 'bold' }}>
              My Computer
            </div>
            <div style={{ color: '#444', lineHeight: 1.6, fontSize: 11 }}>
              <div><strong>Owner:</strong> Ahmed Umar Z</div>
              <div><strong>Handle:</strong> AU</div>
              <div><strong>Site:</strong> aumarz.me</div>
              <div style={{ marginTop: 12 }}>
                <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Drives</div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Projects (C:)',  sub: '4 items' },
                    { label: 'Resume (D:)',    sub: 'Ahmed_Umar_Z_Resume.pdf' },
                  ].map(d => (
                    <div
                      key={d.label}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}
                    >
                      <FolderIcon size={32} />
                      <span style={{ fontSize: 10, textAlign: 'center' }}>{d.label}</span>
                      <span style={{ fontSize: 9, color: '#888' }}>{d.sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 12, fontSize: 11, color: '#555', borderBottom: '1px solid #c8c8c8', paddingBottom: 6 }}>
              4 objects
            </div>
            <div className="folder-icon-grid">
              {[
                { id: 'screenly',      label: 'Screenly.exe' },
                { id: 'buildback',     label: 'BuildBack' },
                { id: 'decode2deploy', label: 'Decode2Deploy' },
                { id: 'campify',       label: 'Campify' },
              ].map(p => (
                <div
                  key={p.id}
                  className="desktop-icon"
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${p.label}`}
                  onClick={() => openApp(p.id)}
                  onDoubleClick={() => openApp(p.id)}
                  onKeyDown={e => e.key === 'Enter' && openApp(p.id)}
                >
                  <FolderIcon size={40} />
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'resume':
        return (
          <div className="pdf-viewer">
            <div className="pdf-toolbar">
              <span>Ahmed_Umar_Z_Resume.pdf</span>
              <a
                href="/Ahmed_Umar_Z_Resume.pdf"
                download="Ahmed_Umar_Z_Resume.pdf"
                className="project-link-btn"
                aria-label="Download resume PDF"
              >
                Save / Download
              </a>
            </div>
            <div className="pdf-iframe-wrap">
              <iframe
                src="/Ahmed_Umar_Z_Resume.pdf"
                title="Ahmed Umar Z — Resume"
                aria-label="Resume PDF viewer"
              />
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="about-window">
            <h2>About AU</h2>
            <p>I build software and interfaces.</p>
            <p>I care about engineering, interaction, and visual craft — and how they combine to make something feel right.</p>
            <p>This desktop is what I&rsquo;ve been building. Open a project to see the work.</p>
          </div>
        );

      case 'contact':
        return (
          <div className="contact-window">
            <h2>Contact.exe</h2>
            <div className="contact-row">
              <span className="label">Email</span>
              <a href="mailto:aumarz2005@gmail.com">aumarz2005@gmail.com</a>
            </div>
            <div className="contact-row">
              <span className="label">GitHub</span>
              <a href="https://github.com/U-m-4r" target="_blank" rel="noreferrer">github.com/U-m-4r</a>
            </div>
            <div className="contact-row">
              <span className="label">LinkedIn</span>
              <a href="https://linkedin.com/in/ahmed-umar-z" target="_blank" rel="noreferrer">ahmed-umar-z</a>
            </div>
          </div>
        );

      case 'recycle-bin':
        return (
          <div style={{ padding: 20, fontSize: 12, color: '#555', textAlign: 'center', paddingTop: 40 }}>
            <RecycleBinIcon size={48} />
            <div style={{ marginTop: 12 }}>Recycle Bin is empty.</div>
          </div>
        );

      // ── Projects ─────────────────────────────────────────────────────────────
      case 'screenly':
        return (
          <div className="project-window">
            <h1>Screenly</h1>
            <p className="project-brief">
              AI-assisted technical interview application. Candidates submit their GitHub and
              LinkedIn profiles to create an interview session, with Deepgram-powered audio,
              transcript persistence, and post-interview evaluation.
            </p>
            <hr className="project-divider" />
            <div className="section-label">Stack</div>
            <div className="stack-list">
              React 19 · Bun · Tailwind CSS · Radix UI · Express · TypeScript · Zod ·
              PostgreSQL · Prisma · GitHub API · Deepgram · Groq · Turborepo
            </div>
            <hr className="project-divider" />
            <div className="section-label">Links</div>
            <div className="links-row">
              <a className="project-link-btn" href="https://github.com/U-m-4r/Screenly" target="_blank" rel="noreferrer" aria-label="Screenly on GitHub">
                GitHub
              </a>
            </div>
          </div>
        );

      case 'buildback':
        return (
          <div className="project-window">
            <h1>BuildBack</h1>
            <p className="project-brief">
              A time-travel debugger for GitHub repositories. Clone a public repository, step
              through its commit history, build a specific snapshot, stream build logs in real
              time, and preview the resulting application.
            </p>
            <hr className="project-divider" />
            <div className="section-label">Stack</div>
            <div className="stack-list">
              Node.js 18 · Express 4 · simple-git · Server-Sent Events ·
              HTML5 · Vanilla CSS · Vanilla JS · Docker · Jenkins
            </div>
            <hr className="project-divider" />
            <div className="section-label">Links</div>
            <div className="links-row">
              <a className="project-link-btn" href="https://github.com/U-m-4r/Build_Back" target="_blank" rel="noreferrer" aria-label="BuildBack on GitHub">
                GitHub
              </a>
            </div>
          </div>
        );

      case 'decode2deploy':
        return (
          <div className="project-window">
            <h1>Decode2Deploy</h1>
            <p className="project-brief">
              A developer-investigation ARG platform for team authentication, puzzle progression,
              clue validation, and a live leaderboard.
            </p>
            <hr className="project-divider" />
            <div className="section-label">Stack</div>
            <div className="stack-list">
              Next.js 16 · React · Tailwind CSS · Framer Motion · MongoDB Atlas · Mongoose · JWT
            </div>
            <hr className="project-divider" />
            <div className="section-label">Links</div>
            <div className="links-row">
              <a className="project-link-btn" href="https://d2dround1.vercel.app/" target="_blank" rel="noreferrer" aria-label="Decode2Deploy live demo">
                Live Demo
              </a>
              <a className="project-link-btn" href="https://github.com/U-m-4r/d2dround1" target="_blank" rel="noreferrer" aria-label="Decode2Deploy on GitHub">
                GitHub
              </a>
            </div>
          </div>
        );

      case 'campify':
        return (
          <div className="project-window">
            <h1>Campify</h1>
            <p className="project-brief">
              A campus management platform connecting students, faculty, and clubs through events,
              venue booking, campus feedback, notifications, and a student marketplace.
            </p>
            <hr className="project-divider" />
            <div className="section-label">Stack</div>
            <div className="stack-list">
              React 18 · TypeScript · Vite · React Router · TanStack Query · React Hook Form ·
              Zod · shadcn/ui · Tailwind CSS · Supabase · PostgreSQL · Recharts · Sonner
            </div>
            <hr className="project-divider" />
            <div className="section-label">Links</div>
            <div className="links-row">
              <a className="project-link-btn" href="https://github.com/U-m-4r/Campify" target="_blank" rel="noreferrer" aria-label="Campify on GitHub">
                GitHub
              </a>
            </div>
          </div>
        );

      default:
        return <div style={{ padding: 20, fontSize: 12 }}>No content for {id}.</div>;
    }
  };

  // ── Window size for a given app ─────────────────────────────────────────────
  const windowSize = (id) => {
    const d = WINDOW_DEFAULTS[id] || { w: 500, h: 360 };
    return { width: d.w, height: d.h };
  };

  const windowPos = (id) => {
    const d = WINDOW_DEFAULTS[id] || { x: 100, y: 80 };
    return { x: d.x, y: d.y };
  };

  // ── Icon helper ──────────────────────────────────────────────────────────────
  const appIcon = (id, size = 16) => {
    const app = APPS.find(a => a.id === id);
    if (!app) return null;
    return <app.Icon size={size} />;
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}

      {booted && (
        <div
          className="desktop"
          onClick={() => { setStartOpen(false); setSelected(null); }}
          role="main"
          aria-label="Windows XP Desktop — Ahmed Umar Z Portfolio"
        >
          {/* Desktop icons */}
          <div className="desktop-icons" aria-label="Desktop icons">
            {APPS.filter(a => !a.hidden).map((app) => (
              <div
                key={app.id}
                className={`desktop-icon${selected === app.id ? ' selected' : ''}`}
                role="button"
                tabIndex={0}
                aria-label={`Open ${app.desktopLabel}`}
                onClick={(e) => { e.stopPropagation(); setSelected(app.id); }}
                onDoubleClick={(e) => { e.stopPropagation(); openApp(app.id); }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') openApp(app.id);
                  if (e.key === ' ') { e.preventDefault(); setSelected(app.id); }
                }}
              >
                <app.Icon size={48} />
                <span>{app.desktopLabel}</span>
              </div>
            ))}
          </div>

          {/* Open windows */}
          {openWindows.map((win) => {
            const isVisible = !minimized.includes(win.id);
            return (
              <Window
                key={win.id}
                title={APPS.find(a => a.id === win.id)?.title ?? win.id}
                icon={appIcon(win.id, 16)}
                isActive={activeId === win.id}
                isVisible={isVisible}
                zIndex={win.zIndex}
                initialPosition={windowPos(win.id)}
                initialSize={windowSize(win.id)}
                onClose={() => closeWindow(win.id)}
                onMinimize={() => minimizeWindow(win.id)}
                bringToFront={() => bringToFront(win.id)}
                noContentPadding={win.id === 'resume' || win.id === 'projects'}
              >
                {renderContent(win.id)}
              </Window>
            );
          })}

          {/* Start menu */}
          {startOpen && (
            <div
              className="start-menu"
              role="dialog"
              aria-label="Start Menu"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="start-menu-header">
                <div className="start-menu-avatar" aria-hidden="true">AU</div>
                <div className="start-menu-name">Ahmed Umar Z</div>
              </div>
              <div className="start-menu-body">
                <div className="start-menu-left">
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={() => openApp('projects')} onKeyDown={e => e.key === 'Enter' && openApp('projects')}>
                    <FolderIcon size={24} /> <span>Projects</span>
                  </div>
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={() => openApp('resume')} onKeyDown={e => e.key === 'Enter' && openApp('resume')}>
                    <PdfIcon size={24} /> <span>Resume.pdf</span>
                  </div>
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={() => openApp('about')} onKeyDown={e => e.key === 'Enter' && openApp('about')}>
                    <InfoIcon size={24} /> <span>About AU</span>
                  </div>
                  <div className="start-menu-divider" />
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={() => openApp('contact')} onKeyDown={e => e.key === 'Enter' && openApp('contact')}>
                    <ContactIcon size={24} /> <span>Contact.exe</span>
                  </div>
                </div>
                <div className="start-menu-right">
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={() => { window.open('https://github.com/U-m-4r', '_blank'); setStartOpen(false); }}>
                    <span>GitHub</span>
                  </div>
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={() => { window.open('https://linkedin.com/in/ahmed-umar-z', '_blank'); setStartOpen(false); }}>
                    <span>LinkedIn</span>
                  </div>
                  <div className="start-menu-divider" />
                  <div className="start-menu-item" role="button" tabIndex={0} onClick={replayBoot}>
                    <span>Restart…</span>
                  </div>
                </div>
              </div>
              <div className="start-menu-footer">
                <div className="footer-btn" role="button" tabIndex={0} onClick={replayBoot}>
                  Restart
                </div>
              </div>
            </div>
          )}

          {/* Taskbar */}
          <div className="taskbar" role="toolbar" aria-label="Taskbar">
            <button
              className="start-button"
              aria-label="Start Menu"
              aria-expanded={startOpen}
              onClick={(e) => { e.stopPropagation(); setStartOpen(o => !o); }}
            >
              <StartIcon size={18} />
              start
            </button>

            <div className="taskbar-items">
              {openWindows.map((win) => {
                const app = APPS.find(a => a.id === win.id);
                const label = app?.title ?? win.id;
                const isActive = activeId === win.id && !minimized.includes(win.id);
                return (
                  <div
                    key={win.id}
                    className={`taskbar-item${isActive ? ' active' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-label={label}
                    onClick={() => toggleTaskbar(win.id)}
                    onKeyDown={e => e.key === 'Enter' && toggleTaskbar(win.id)}
                  >
                    {appIcon(win.id, 14)}
                    <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="taskbar-tray" aria-label="System tray">
              <span style={{ fontWeight: 'bold', letterSpacing: '0.02em' }}>AU</span>
              <span aria-label={`Current time: ${time}`}>{time}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
