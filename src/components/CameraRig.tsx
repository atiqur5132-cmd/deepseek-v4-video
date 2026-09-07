import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';

interface CameraRigProps {
  children: React.ReactNode;
  durationInFrames: number;
  zoomFrom?: number;
  zoomTo?: number;
  swayIntensity?: number;
  panX?: number;
  panY?: number;
}

export const CameraRig: React.FC<CameraRigProps> = ({
  children,
  durationInFrames,
  zoomFrom = 1.0,
  zoomTo = 1.08,
  swayIntensity = 4,
  panX = 0,
  panY = 0,
}) => {
  const frame = useCurrentFrame();

  // Continuous subtle cinematic dolly zoom
  const currentScale = interpolate(frame, [0, durationInFrames], [zoomFrom, zoomTo], {
    extrapolateRight: 'clamp',
  });

  // Organic handheld breathing drift
  const driftX = Math.sin(frame / 35) * swayIntensity + panX;
  const driftY = Math.cos(frame / 42) * (swayIntensity * 0.75) + panY;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${currentScale}) translate3d(${driftX}px, ${driftY}px, 0px)`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
