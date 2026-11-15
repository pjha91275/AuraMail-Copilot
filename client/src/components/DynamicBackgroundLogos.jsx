import React, { useState, useEffect } from 'react';

// 4 Distinct Curated Patterns that smoothly transition every 5 seconds
const PATTERNS = [
  // Pattern 0: Diagonal Constellation Flow
  [
    { top: '6%', left: '80%', rotate: '8deg', scale: 1, glow: 'rgba(6,182,212,0.5)', size: 320 },
    { top: '32%', left: '2%', rotate: '-6deg', scale: 0.92, glow: 'rgba(99,102,241,0.45)', size: 270 },
    { top: '56%', left: '76%', rotate: '4deg', scale: 0.85, glow: 'rgba(168,85,247,0.4)', size: 240 },
    { top: '80%', left: '5%', rotate: '-4deg', scale: 0.95, glow: 'rgba(56,189,248,0.45)', size: 280 }
  ],
  // Pattern 1: Celestial Diamond Harmony
  [
    { top: '8%', left: '46%', rotate: '-4deg', scale: 0.95, glow: 'rgba(6,182,212,0.45)', size: 290 },
    { top: '44%', left: '1%', rotate: '10deg', scale: 1, glow: 'rgba(99,102,241,0.5)', size: 310 },
    { top: '40%', left: '83%', rotate: '-8deg', scale: 0.9, glow: 'rgba(168,85,247,0.45)', size: 260 },
    { top: '82%', left: '44%', rotate: '6deg', scale: 1.02, glow: 'rgba(56,189,248,0.5)', size: 300 }
  ],
  // Pattern 2: Quad Orbit Depth
  [
    { top: '10%', left: '7%', rotate: '-8deg', scale: 0.98, glow: 'rgba(99,102,241,0.45)', size: 290 },
    { top: '12%', left: '82%', rotate: '10deg', scale: 0.92, glow: 'rgba(6,182,212,0.5)', size: 280 },
    { top: '76%', left: '8%', rotate: '6deg', scale: 0.88, glow: 'rgba(56,189,248,0.42)', size: 260 },
    { top: '70%', left: '78%', rotate: '-7deg', scale: 1.05, glow: 'rgba(168,85,247,0.48)', size: 320 }
  ],
  // Pattern 3: Asymmetric Cyber Drift
  [
    { top: '18%', left: '72%', rotate: '-5deg', scale: 0.88, glow: 'rgba(6,182,212,0.45)', size: 260 },
    { top: '58%', left: '4%', rotate: '8deg', scale: 1.02, glow: 'rgba(168,85,247,0.48)', size: 310 },
    { top: '5%', left: '12%', rotate: '5deg', scale: 0.9, glow: 'rgba(99,102,241,0.42)', size: 270 },
    { top: '82%', left: '82%', rotate: '-6deg', scale: 0.96, glow: 'rgba(56,189,248,0.45)', size: 290 }
  ]
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
            opacity: index % 2 === 0 ? 0.22 : 0.18
          }}
        >
          <img
            src="/logo-emblem.svg"
            alt={`AuraMail Floating Emblem ${index + 1}`}
            className="w-full h-full object-contain"
            style={{
              filter: `drop-shadow(0 0 20px ${pos.glow})`
            }}
          />
        </div>
      ))}
    </div>
  );
}
