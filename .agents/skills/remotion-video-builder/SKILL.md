---
name: remotion-video-builder
description: Comprehensive mastery for building code-driven, high-retention YouTube videos using Remotion, React, dynamic typography, Ken Burns pan/zoom, and glassmorphic UI cards.
---

# Remotion Video Builder Skill

This skill provides comprehensive instructions, patterns, and best practices for creating stunning, high-retention YouTube tech commentary videos using **Remotion (`remotion`)**.

## 1. Core Principles & Architecture
- **Composition-Driven:** Organize every video scene as a modular React component (`Scene1Hook.tsx`, `Scene2Architecture.tsx`, etc.).
- **Frame-Accurate Timing:** Use `useCurrentFrame()` and `useVideoConfig()` (`fps = 30` or `60`) to precisely calculate animations and transitions.
- **Dynamic Aesthetics:** 
  - Use high-contrast dark mode palettes (`#0d0f12` backgrounds, `#1e232a` glassmorphic cards, `#38bdf8` or `#10b981` accents).
  - Use premium typography from Google Fonts (e.g., `@remotion/google-fonts/Inter` or `Outfit`).
  - Add micro-animations using Remotion's `spring()` and `interpolate()`.

## 2. Essential Visual Techniques for AI Model Comparisons

### A. Ken Burns Pan & Zoom on Screenshots
When displaying downloaded X (Twitter) screenshots or benchmark tables:
```tsx
import { useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';

export const ZoomScreenshot: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [0, durationInFrames], [0, -30], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{ overflow: 'hidden', borderRadius: 20, boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
      <Img
        src={src}
        style={{
          width: '100%',
          transform: `scale(${scale}) translateY(${translateY}px)`,
          transformOrigin: 'center top',
        }}
      />
    </div>
  );
};
```

### B. Glassmorphic Stat Cards (For Benchmarks & Specs)
```tsx
import React from 'react';

export const StatCard: React.FC<{ label: string; value: string; accent?: string }> = ({
  label,
  value,
  accent = '#38bdf8',
}) => {
  return (
    <div
      style={{
        background: 'rgba(30, 35, 42, 0.6)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 24,
        padding: '32px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 24, fontFamily: 'Inter' }}>{label}</span>
      <span style={{ color: accent, fontSize: 64, fontWeight: '800', fontFamily: 'Outfit', marginTop: 12 }}>
        {value}
      </span>
    </div>
  );
};
```

### C. Video Demo Embeds with Audio Sync
When showing downloaded short video clips (`<Video />` component):
```tsx
import { Video, staticFile } from 'remotion';

export const DemoVideoClip: React.FC<{ clipName: string; startFrom?: number }> = ({ clipName, startFrom = 0 }) => {
  return (
    <div style={{ borderRadius: 16, overflow: 'hidden', border: '2px solid rgba(56, 189, 248, 0.4)' }}>
      <Video
        src={staticFile(`clips/${clipName}`)}
        startFrom={startFrom}
        style={{ width: '100%', display: 'block' }}
      />
    </div>
  );
};
```

## 3. Scene Sequencing & Audio Layering
In the root Composition (`Composition.tsx` or `Video.tsx`), sequence scenes using `<Sequence>`:
```tsx
import { Sequence, Audio, staticFile } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Specs } from './scenes/Scene2Specs';

export const MainVideo: React.FC<{ audioDurationInFrames: number }> = ({ audioDurationInFrames }) => {
  return (
    <div style={{ flex: 1, backgroundColor: '#0a0c10' }}>
      {/* Background Voiceover Audio */}
      <Audio src={staticFile('voiceover.mp3')} />

      {/* Scene 1: Hook (e.g. 0 to 10 seconds -> 0 to 300 frames at 30fps) */}
      <Sequence from={0} durationInFrames={300}>
        <Scene1Hook />
      </Sequence>

      {/* Scene 2: Specs (300 to 900 frames) */}
      <Sequence from={300} durationInFrames={600}>
        <Scene2Specs />
      </Sequence>
    </div>
  );
};
```

## 4. Quality & Performance Checklist
1. All assets (`images`, `videos`, `audio`) must reside inside the `public/` folder so `staticFile()` can access them.
2. Use `@remotion/google-fonts` or CSS font loading so custom typography never flashes default fonts.
3. Keep animations smooth using spring configurations with damping (`spring({ frame, fps, config: { damping: 15 } })`).
