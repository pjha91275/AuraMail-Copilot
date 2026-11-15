import React, { useState, useEffect } from 'react';

// 4 Distinct Curated Patterns that smoothly transition every 5 seconds
const PATTERNS = [
  // Pattern 0: Diagonal Constellation Flow
  [
    { top: '6%', left: '80%', rotate: '8deg', scale: 1, glow: 'rgba(6,182,212,0.58)', size: 330 },
    { top: '32%', left: '2%', rotate: '-6deg', scale: 0.94, glow: 'rgba(99,102,241,0.52)', size: 280 },
    { top: '56%', left: '76%', rotate: '4deg', scale: 0.88, glow: 'rgba(168,85,247,0.52)', size: 250 },
    { top: '80%', left: '5%', rotate: '-4deg', scale: 0.98, glow: 'rgba(56,189,248,0.58)', size: 290 }
  ],
  // Pattern 1: Celestial Diamond Harmony
  [
    { top: '8%', left: '46%', rotate: '-4deg', scale: 0.96, glow: 'rgba(6,182,212,0.58)', size: 300 },
    { top: '44%', left: '1%', rotate: '10deg', scale: 1.02, glow: 'rgba(99,102,241,0.52)', size: 320 },
    { top: '40%', left: '83%', rotate: '-8deg', scale: 0.92, glow: 'rgba(168,85,247,0.52)', size: 270 },
    { top: '82%', left: '44%', rotate: '6deg', scale: 1.04, glow: 'rgba(56,189,248,0.58)', size: 310 }
  ],
  // Pattern 2: Quad Orbit Depth
  [
    { top: '10%', left: '7%', rotate: '-8deg', scale: 1, glow: 'rgba(99,102,241,0.52)', size: 300 },
    { top: '12%', left: '82%', rotate: '10deg', scale: 0.95, glow: 'rgba(6,182,212,0.58)', size: 290 },
    { top: '76%', left: '8%', rotate: '6deg', scale: 0.9, glow: 'rgba(56,189,248,0.58)', size: 270 },
    { top: '70%', left: '78%', rotate: '-7deg', scale: 1.06, glow: 'rgba(168,85,247,0.52)', size: 330 }
  ],
  // Pattern 3: Asymmetric Cyber Drift
  [
    { top: '18%', left: '72%', rotate: '-5deg', scale: 0.9, glow: 'rgba(6,182,212,0.58)', size: 270 },
    { top: '58%', left: '4%', rotate: '8deg', scale: 1.04, glow: 'rgba(168,85,247,0.52)', size: 320 },
    { top: '5%', left: '12%', rotate: '5deg', scale: 0.92, glow: 'rgba(99,102,241,0.52)', size: 280 },
    { top: '82%', left: '82%', rotate: '-6deg', scale: 0.98, glow: 'rgba(56,189,248,0.58)', size: 300 }
  ]
];

// 5 Radiant Color Smudges positioned in the hollow areas between and around logos
const RADIANT_SMUDGES = [
  // 1. Upper-Center Cyan Nebula
  {
    name: 'Upper-Center Cyan Nebula',
    style: {
      top: '-6%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '680px',
      height: '380px',
      maxWidth: '65vw',
      maxHeight: '35vh',
      background: 'radial-gradient(ellipse at 50% 30%, rgba(6, 182, 212, 0.40) 0%, rgba(56, 189, 248, 0.22) 45%, rgba(14, 165, 233, 0.08) 68%, transparent 80%)',
      filter: 'blur(75px)'
    }
  },
  // 2. Mid-Center Violet Aurora
  {
    name: 'Mid-Center Violet Aurora',
    style: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '620px',
      height: '520px',
      maxWidth: '60vw',
      maxHeight: '50vh',
      background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.38) 0%, rgba(139, 92, 246, 0.20) 45%, rgba(99, 102, 241, 0.06) 68%, transparent 80%)',
      filter: 'blur(85px)'
    }
  },
  // 3. Left-Center Golden Amber
  {
    name: 'Left-Center Golden Amber',
    style: {
      top: '50%',
      left: '-8%',
      transform: 'translateY(-50%)',
      width: '540px',
      height: '540px',
      maxWidth: '45vw',
      maxHeight: '55vh',
      background: 'radial-gradient(circle at 35% 50%, rgba(245, 158, 11, 0.36) 0%, rgba(251, 146, 60, 0.20) 45%, rgba(217, 119, 6, 0.05) 68%, transparent 80%)',
      filter: 'blur(80px)'
    }
  },
  // 4. Right-Center Emerald Teal
  {
    name: 'Right-Center Emerald Teal',
    style: {
      top: '50%',
      right: '-8%',
      transform: 'translateY(-50%)',
      width: '540px',
      height: '540px',
      maxWidth: '45vw',
      maxHeight: '55vh',
      background: 'radial-gradient(circle at 65% 50%, rgba(16, 185, 129, 0.35) 0%, rgba(20, 184, 166, 0.20) 45%, rgba(6, 182, 212, 0.06) 68%, transparent 80%)',
      filter: 'blur(80px)'
    }
  },
  // 5. Bottom-Center Deep Indigo
  {
    name: 'Bottom-Center Deep Indigo',
    style: {
      bottom: '-8%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '700px',
      height: '420px',
      maxWidth: '70vw',
      maxHeight: '38vh',
      background: 'radial-gradient(ellipse at 50% 70%, rgba(99, 102, 241, 0.42) 0%, rgba(79, 70, 229, 0.24) 45%, rgba(49, 46, 129, 0.08) 68%, transparent 80%)',
      filter: 'blur(85px)'
    }
  }
];

export default function DynamicBackgroundLogos() {
  const [patternIndex, setPatternIndex] = useState(0);

  // Smoothly transition to the next constellation pattern every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPatternIndex(prev => (prev + 1) % PATTERNS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentPattern = PATTERNS[patternIndex];

  return (
    <div className="fixed inset-0 pointer-events-none select-none overflow-hidden z-0">
      {/* 5 Radiant Color Smudges in the Hollow Areas Between & Around Logos */}
      <div className="absolute inset-0 pointer-events-none">
        {RADIANT_SMUDGES.map((smudge, idx) => (
          <div
            key={idx}
            className="absolute rounded-full pointer-events-none will-change-transform opacity-80"
            style={smudge.style}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* 4 Dynamic Floating Logos Transitioning smoothly */}
      {currentPattern.map((pos, index) => (
        <div
          key={index}
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: pos.top,
            left: pos.left,
            width: `${pos.size}px`,
            height: `${pos.size}px`,
            maxWidth: '35vw',
            maxHeight: '35vw',
            transform: `translate3d(0, 0, 0) rotate(${pos.rotate}) scale(${pos.scale})`,
            transition: 'top 2200ms cubic-bezier(0.4, 0, 0.2, 1), left 2200ms cubic-bezier(0.4, 0, 0.2, 1), transform 2200ms cubic-bezier(0.4, 0, 0.2, 1), filter 2200ms ease',
            opacity: index % 2 === 0 ? 0.30 : 0.25
          }}
        >
          <img
            src="/logo-emblem.svg"
            alt={`AuraMail Floating Emblem ${index + 1}`}
            className="w-full h-full object-contain"
            style={{
              filter: `brightness(0.9) drop-shadow(0 0 18px ${pos.glow}) drop-shadow(0 0 3px rgba(255, 255, 255, 0.45)) drop-shadow(0 0 1px rgba(255, 255, 255, 0.6))`
            }}
          />
        </div>
      ))}
    </div>
  );
}
