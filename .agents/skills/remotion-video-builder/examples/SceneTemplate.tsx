import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Img } from 'remotion';

interface SceneProps {
  title: string;
  subtitle: string;
  imageSrc?: string;
  accentColor?: string;
}

export const SceneTemplate: React.FC<SceneProps> = ({
  title,
  subtitle,
  imageSrc,
  accentColor = '#38bdf8',
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Entrance spring animation for title
  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  // Fade out near the end of the scene
  const opacity = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Ken Burns zoom effect on image if provided
  const imgScale = interpolate(frame, [0, durationInFrames], [1, 1.12], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        flex: 1,
        backgroundColor: '#0d0f12',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 80,
        opacity,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Dynamic Title Header */}
      <div
        style={{
          transform: `translateY(${(1 - titleEntrance) * -50}px)`,
          opacity: titleEntrance,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        <span
          style={{
            color: accentColor,
            fontSize: 24,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: 4,
          }}
        >
          {subtitle}
        </span>
        <h1
          style={{
            color: '#ffffff',
            fontSize: 72,
            fontWeight: 900,
            margin: '16px 0 0 0',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h1>
      </div>

      {/* Visual / Screenshot with Ken Burns effect and Glassmorphic frame */}
      {imageSrc && (
        <div
          style={{
            width: '85%',
            height: 550,
            borderRadius: 24,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
            backgroundColor: '#1e232a',
          }}
        >
          <Img
            src={imageSrc}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${imgScale})`,
              transformOrigin: 'center top',
            }}
          />
        </div>
      )}
    </div>
  );
};
