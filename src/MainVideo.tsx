import React from 'react';
import { Sequence, Audio, staticFile } from 'remotion';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Architecture } from './scenes/Scene2Architecture';
import { Scene3Benchmarks } from './scenes/Scene3Benchmarks';
import { Scene4Outro } from './scenes/Scene4Outro';

export const MainVideo: React.FC = () => {
  // Total Frames: 6382 (212.73s @ 30fps) synced to Deepseek.m4a
  // Scene 1 (Hook): 0 to 1050 frames (0:00 - 0:35)
  // Scene 2 (Architecture): 1050 to 3000 frames (0:35 - 1:40)
  // Scene 3 (Benchmarks & Pricing): 3000 to 4950 frames (1:40 - 2:45)
  // Scene 4 (Outro): 4950 to 6382 frames (2:45 - 3:32)

  return (
    <div style={{ flex: 1, backgroundColor: '#090a0f', overflow: 'hidden' }}>
      {/* Voiceover Audio Track */}
      <Audio src={staticFile('Deepseek.m4a')} />

      <Sequence from={0} durationInFrames={1050}>
        <Scene1Hook />
      </Sequence>

      <Sequence from={1050} durationInFrames={1950}>
        <Scene2Architecture />
      </Sequence>

      <Sequence from={3000} durationInFrames={1950}>
        <Scene3Benchmarks />
      </Sequence>

      <Sequence from={4950} durationInFrames={1432}>
        <Scene4Outro />
      </Sequence>
    </div>
  );
};
