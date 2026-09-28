// Classic Windows XP-style SVG icons — crisp, pixel-proportioned

export const ComputerIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Monitor body */}
    <rect x="3" y="5" width="42" height="30" rx="3" fill="#d4d0c8" stroke="#6b6b6b" strokeWidth="1.5"/>
    {/* Screen bezel */}
    <rect x="6" y="8" width="36" height="22" fill="#2850a0" stroke="#1a1a6a" strokeWidth="1"/>
    {/* Screen content - blue gradient like XP */}
    <defs>
      <linearGradient id="screen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#245edb"/>
        <stop offset="100%" stopColor="#3a75ea"/>
      </linearGradient>
    </defs>
    <rect x="7" y="9" width="34" height="20" fill="url(#screen)"/>
    {/* Small "window" on screen */}
    <rect x="11" y="12" width="14" height="10" fill="#fff" fillOpacity="0.2" stroke="#fff" strokeWidth="0.5"/>
    <rect x="11" y="12" width="14" height="3" fill="#fff" fillOpacity="0.4"/>
    {/* Stand */}
    <rect x="19" y="35" width="10" height="5" fill="#b0aca0" stroke="#6b6b6b" strokeWidth="1"/>
    {/* Base */}
    <rect x="13" y="40" width="22" height="3" rx="1" fill="#b0aca0" stroke="#6b6b6b" strokeWidth="1"/>
    {/* Power light */}
    <circle cx="38" cy="28" r="1.5" fill="#00cc44"/>
  </svg>
);

export const FolderIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Folder back tab */}
    <path d="M4 20V14h14l3 3h23v3H4z" fill="#e8c04a" stroke="#a07c00" strokeWidth="1"/>
    {/* Folder body */}
    <rect x="4" y="20" width="40" height="22" rx="1" fill="#f3d25a" stroke="#a07c00" strokeWidth="1.5"/>
    {/* Folder highlight */}
    <rect x="4" y="20" width="40" height="5" fill="#f8e07a" opacity="0.6"/>
    {/* Folder shadow bottom */}
    <rect x="4" y="38" width="40" height="4" rx="1" fill="#d4a820" opacity="0.4"/>
  </svg>
);

export const RecycleBinIcon = ({ size = 48, empty = true }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Bin body */}
    <path d="M10 16h28l-3 26H13L10 16z" fill={empty ? '#d4d0c8' : '#aac5e8'} stroke="#6b6b6b" strokeWidth="1.5"/>
    {/* Lid */}
    <rect x="7" y="12" width="34" height="5" rx="1" fill="#b0aca0" stroke="#6b6b6b" strokeWidth="1.5"/>
    {/* Handle */}
    <path d="M18 12V9h12v3" fill="none" stroke="#6b6b6b" strokeWidth="1.5"/>
    {/* Lines on body */}
    <line x1="19" y1="20" x2="17" y2="38" stroke="#888" strokeWidth="1.2"/>
    <line x1="24" y1="20" x2="24" y2="38" stroke="#888" strokeWidth="1.2"/>
    <line x1="29" y1="20" x2="31" y2="38" stroke="#888" strokeWidth="1.2"/>
    {!empty && (
      <>
        <path d="M17 22l3-5 4 3 4-3 3 5" fill="#5588cc" opacity="0.6"/>
      </>
    )}
    {/* Recycle arrows */}
    {empty && (
      <g transform="translate(15, 23) scale(0.37)">
        <path d="M24 4l-6 10h5v12h2V14h5L24 4z" fill="#3a8a3a"/>
        <path d="M10 32l10 6V33h12v-2H20v-5l-10 6z" fill="#3a8a3a"/>
        <path d="M38 32l-10-6v5H16v2h12v5l10-6z" fill="#3a8a3a"/>
      </g>
    )}
  </svg>
);

export const InfoIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document body */}
    <path d="M10 6h20l8 8v30H10V6z" fill="#f0f0f0" stroke="#7f9db9" strokeWidth="1.5"/>
    {/* Folded corner */}
    <path d="M30 6l8 8h-8V6z" fill="#c8d8f0" stroke="#7f9db9" strokeWidth="1"/>
    {/* Text lines */}
    <rect x="14" y="20" width="20" height="2" rx="1" fill="#245edb"/>
    <rect x="14" y="25" width="20" height="1.5" rx="0.75" fill="#888"/>
    <rect x="14" y="29" width="16" height="1.5" rx="0.75" fill="#888"/>
    <rect x="14" y="33" width="18" height="1.5" rx="0.75" fill="#888"/>
    {/* Info circle */}
    <circle cx="17" cy="14" r="5" fill="#245edb"/>
    <rect x="16" y="13" width="2" height="5" rx="1" fill="#fff"/>
    <rect x="16" y="10" width="2" height="2" rx="1" fill="#fff"/>
  </svg>
);

export const ContactIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Envelope body */}
    <rect x="4" y="12" width="40" height="28" rx="2" fill="#f5f5f5" stroke="#7f9db9" strokeWidth="1.5"/>
    {/* Envelope flap closed */}
    <path d="M4 14l20 15L44 14" fill="none" stroke="#7f9db9" strokeWidth="1.5"/>
    {/* Fold lines */}
    <line x1="4" y1="40" x2="19" y2="28" stroke="#bbb" strokeWidth="1"/>
    <line x1="44" y1="40" x2="29" y2="28" stroke="#bbb" strokeWidth="1"/>
    {/* Stamp */}
    <rect x="32" y="16" width="8" height="7" fill="#c0d8f4" stroke="#7f9db9" strokeWidth="1"/>
  </svg>
);

export const PdfIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Document body */}
    <path d="M8 4h24l8 8v38H8V4z" fill="#fff" stroke="#c00" strokeWidth="1.5"/>
    {/* Folded corner */}
    <path d="M32 4l8 8h-8V4z" fill="#ffb3b3" stroke="#c00" strokeWidth="1"/>
    {/* Red PDF badge */}
    <rect x="8" y="18" width="28" height="13" rx="1" fill="#cc0000"/>
    {/* PDF text */}
    <text x="22" y="29" textAnchor="middle" fill="white" fontSize="9" fontFamily="Arial" fontWeight="bold">PDF</text>
    {/* Lines below badge */}
    <rect x="12" y="34" width="24" height="1.5" rx="0.75" fill="#bbb"/>
    <rect x="12" y="37" width="18" height="1.5" rx="0.75" fill="#bbb"/>
    <rect x="12" y="40" width="20" height="1.5" rx="0.75" fill="#bbb"/>
  </svg>
);

export const StartIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 4l12-2v12H2V4z" fill="#f25022"/>
    <path d="M16 2l14-2v14H16V2z" fill="#7fba00"/>
    <path d="M2 16h12v12l-12-2V16z" fill="#00a4ef"/>
    <path d="M16 16h14v14l-14-2V16z" fill="#ffb900"/>
  </svg>
);
