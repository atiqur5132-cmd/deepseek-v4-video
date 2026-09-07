import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Architecture } from './scenes/Scene2Architecture';
import { Scene3Benchmarks } from './scenes/Scene3Benchmarks';
import { Scene4Outro } from './scenes/Scene4Outro';

export const MainVideo: React.FC = () => {
  // 100% Whisper-Synchronized Timeline (Total: 6,382 frames / 212.73s @ 30fps)
  // Scene 1 (Hook & Disruption): frames 0 to 1488 (0.0s - 49.6s)
  // Scene 2 (Architecture & MoE): frames 1488 to 3537 (49.6s - 117.9s)
  // Scene 3 (2026 Benchmarks & 10x Pricing): frames 3537 to 5148 (117.9s - 171.6s)
  // Scene 4 (MIT Moat Evaporation & Outro): frames 5148 to 6382 (171.6s - 212.73s)

  return (
    <div style={{ flex: 1, backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Master Voiceover Audio */}
      <Audio src={staticFile('Deepseek.m4a')} />

      <Sequence from={0} durationInFrames={1488}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={1488} durationInFrames={2049}>
        <Scene2Architecture />
      </Sequence>

      <Sequence from={3537} durationInFrames={1611}>
        <Scene3Benchmarks />
      </Sequence>

      <Sequence from={5148} durationInFrames={1234}>
        <Scene4Outro />
      </Sequence>
    </div>
  );
};
