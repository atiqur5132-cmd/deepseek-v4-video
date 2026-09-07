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

  // Very gentle cinematic breathing drift (smoothed to avoid subpixel jitter)
  const driftX = Math.round(Math.sin(frame / 60) * (swayIntensity * 0.5) + panX);
  const driftY = Math.round(Math.cos(frame / 75) * (swayIntensity * 0.3) + panY);

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${currentScale.toFixed(4)}) translate3d(${driftX}px, ${driftY}px, 0px)`,
        transformOrigin: 'center center',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
