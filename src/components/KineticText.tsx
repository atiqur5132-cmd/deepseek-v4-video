import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

interface KineticTextProps {
  text: string;
  startFrame?: number;
  staggerFrames?: number;
  highlightWords?: string[];
  highlightColor?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right';
  maxWidth?: number;
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  startFrame = 0,
  staggerFrames = 4,
  highlightWords = [],
  highlightColor = '#38bdf8', // Neon Cyan
  fontSize = 72,
  fontWeight = 900,
  lineHeight = 1.25,
  textAlign = 'center',
  maxWidth = 1450,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
        maxWidth,
        margin: '0 auto',
        lineHeight,
      }}
    >
      {words.map((word, i) => {
        const wordDelay = startFrame + i * staggerFrames;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 14, stiffness: 130, mass: 0.7 },
        });

        const translateY = interpolate(progress, [0, 1], [45, 0]);
        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const blur = interpolate(progress, [0, 1], [8, 0]);

        // Clean punctuation for highlight matching
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const isHighlight = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord || word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              fontSize,
              fontWeight,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              letterSpacing: '-0.01em',
              marginRight: '0.34em',
              marginBottom: '0.15em',
              color: isHighlight ? highlightColor : '#ffffff',
              textShadow: isHighlight ? `0 0 35px ${highlightColor}88` : 'none',
              transform: `translateY(${translateY}px)`,
              opacity,
              filter: `blur(${blur}px)`,
              willChange: 'transform, opacity, filter',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
