import React from 'react';
import { Composition } from 'remotion';
import { MainVideo } from './MainVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={6382} // Exact duration of Deepseek.m4a (212.73 seconds @ 30 fps)
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
