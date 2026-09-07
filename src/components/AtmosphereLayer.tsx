import React from 'react';
import { useCurrentFrame, interpolate, random, AbsoluteFill } from 'remotion';

interface AtmosphereProps {
  glowColor1?: string;
  glowColor2?: string;
  gridOpacity?: number;
}

export const AtmosphereLayer: React.FC<AtmosphereProps> = ({
  glowColor1 = 'rgba(56, 189, 248, 0.15)', // Cyan
  glowColor2 = 'rgba(16, 185, 129, 0.12)', // Emerald
  gridOpacity = 0.35,
}) => {
  const frame = useCurrentFrame();

  // Floating ambient particles with fixed anchors and gentle floating oscillation (zero teleporting/flicker)
  const particles = React.useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => ({
      x: random(`p-x-${i}`) * 1920,
      y: random(`p-y-${i}`) * 1080,
      size: random(`p-s-${i}`) * 3 + 1.5,
      opacity: random(`p-op-${i}`) * 0.35 + 0.15,
      floatSpeed: random(`p-sp-${i}`) * 0.5 + 0.5,
      driftRadius: random(`p-dr-${i}`) * 15 + 8,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Primary Radial Glow 1 (Top Left / Center) - Static, smooth ambient light */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '75vw',
          height: '75vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor1} 0%, transparent 65%)`,
          opacity: 0.85,
        }}
      />

      {/* Secondary Radial Glow 2 (Bottom Right) - Static, smooth ambient light */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '5%',
          width: '65vw',
          height: '65vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor2} 0%, transparent 65%)`,
          opacity: 0.75,
        }}
      />

      {/* Cyber Dot Grid Layer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.12) 1.2px, transparent 1.2px)`,
          backgroundSize: '36px 36px',
          opacity: gridOpacity,
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.1) 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0.1) 85%)',
        }}
      />

      {/* Smooth Ambient Floating Micro-Particles (No Teleporting) */}
      {particles.map((p, i) => {
        const floatX = Math.sin((frame * p.floatSpeed + i * 20) / 45) * p.driftRadius;
        const floatY = Math.cos((frame * p.floatSpeed + i * 30) / 55) * p.driftRadius;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x + floatX,
              top: p.y + floatY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#38bdf8' : '#10b981',
              opacity: p.opacity,
              boxShadow: `0 0 8px ${i % 2 === 0 ? '#38bdf8' : '#10b981'}`,
            }}
          />
        );
      })}

      {/* Vignette Edge Shading */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(4, 6, 9, 0.85) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
