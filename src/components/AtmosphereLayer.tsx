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

  // Subtle breathing pulsation
  const pulse1 = Math.sin(frame / 45) * 0.05 + 1;
  const pulse2 = Math.cos(frame / 60) * 0.05 + 1;

  // Floating particles (35 deterministic particles)
  const particles = React.useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      x: random(`p-x-${i}`) * 1920,
      baseY: random(`p-y-${i}`) * 1080,
      size: random(`p-s-${i}`) * 3 + 1.5,
      speed: random(`p-sp-${i}`) * 0.6 + 0.3,
      opacity: random(`p-op-${i}`) * 0.4 + 0.2,
      driftX: (random(`p-dx-${i}`) - 0.5) * 40,
    }));
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Primary Radial Glow 1 (Top Left / Center) */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '10%',
          width: '75vw',
          height: '75vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor1} 0%, transparent 65%)`,
          transform: `scale(${pulse1})`,
          filter: 'blur(70px)',
          opacity: 0.8,
        }}
      />

      {/* Secondary Radial Glow 2 (Bottom Right) */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20%',
          right: '5%',
          width: '65vw',
          height: '65vw',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor2} 0%, transparent 65%)`,
          transform: `scale(${pulse2})`,
          filter: 'blur(80px)',
          opacity: 0.7,
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

      {/* Floating Ambient Particles */}
      {particles.map((p, i) => {
        const yOffset = (frame * p.speed * 1.2) % 1150;
        const currentY = (p.baseY - yOffset + 1150) % 1150;
        const xOffset = Math.sin((frame + i * 10) / 40) * p.driftX;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.x + xOffset,
              top: currentY,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: i % 2 === 0 ? '#38bdf8' : '#10b981',
              opacity: p.opacity * interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
              filter: 'blur(0.5px)',
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
