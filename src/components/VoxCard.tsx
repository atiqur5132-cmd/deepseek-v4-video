import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface VoxCardProps {
  children: React.ReactNode;
  startFrame?: number;
  width?: string | number;
  height?: string | number;
  rotateX?: number;
  rotateY?: number;
  borderColor?: string;
  glowColor?: string;
  highlightProgress?: number; // 0 to 1
}

export const VoxCard: React.FC<VoxCardProps> = ({
  children,
  startFrame = 0,
  width = '82%',
  height = 'auto',
  rotateX = 6,
  rotateY = -4,
  borderColor = 'rgba(56, 189, 248, 0.4)',
  glowColor = 'rgba(56, 189, 248, 0.25)',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 100, mass: 0.9 },
  });

  const translateY = interpolate(entrance, [0, 1], [80, 0]);
  const scale = interpolate(entrance, [0, 1], [0.92, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  // Subtle floating oscillation
  const floatZ = Math.sin((frame - startFrame) / 30) * 8;
  const dynamicRotateX = rotateX + Math.sin((frame - startFrame) / 40) * 1.5;
  const dynamicRotateY = rotateY + Math.cos((frame - startFrame) / 45) * 1.5;

  return (
    <div
      style={{
        perspective: 1400,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        willChange: 'transform, opacity',
      }}
    >
      <div
        style={{
          width,
          height,
          transform: `rotateX(${dynamicRotateX}deg) rotateY(${dynamicRotateY}deg) translateZ(${floatZ}px)`,
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(145deg, rgba(22, 27, 38, 0.85), rgba(11, 14, 20, 0.95))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: `1px solid ${borderColor}`,
          boxShadow: `0 30px 80px rgba(0, 0, 0, 0.7), 0 0 50px ${glowColor}`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Subtle Specular Top Border Light */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '10%',
            right: '10%',
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          }}
        />

        {children}
      </div>
    </div>
  );
};
