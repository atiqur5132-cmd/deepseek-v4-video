import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { KineticText } from '../components/KineticText';
import { VoxCard } from '../components/VoxCard';
import { DeepSeekLogo, OpenAILogo, AnthropicLogo } from '../components/RealLogos';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-Beat Timings (Total: 1050 frames / 35 seconds @ 30fps)
  // Beat 1: 0 - 360 (0s - 12s) - The Bombshell Announcement
  // Beat 2: 360 - 720 (12s - 24s) - The 3D Tweet & 10x Cost Advantage
  // Beat 3: 720 - 1050 (24s - 35s) - Under The Hood Pillars
  const isBeat1 = frame < 360;
  const isBeat2 = frame >= 360 && frame < 720;
  const isBeat3 = frame >= 720;

  // Beat 1 Animations
  const alertBadgeSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120, mass: 0.8 },
  });

  // Beat 2 Animations
  const beat2Frame = Math.max(0, frame - 360);
  const highlighterWidth = interpolate(beat2Frame, [30, 80], [0, 100], {
    extrapolateRight: 'clamp',
  });

  // Beat 3 Animations
  const beat3Frame = Math.max(0, frame - 720);

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere */}
      <AtmosphereLayer
        glowColor1="rgba(239, 68, 68, 0.18)"
        glowColor2="rgba(56, 189, 248, 0.15)"
        gridOpacity={0.3}
      />

      {/* Camera Rig wrapping all foreground beats */}
      <CameraRig durationInFrames={1050} zoomFrom={1.0} zoomTo={1.09} swayIntensity={5}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1 (0 - 12s): Bombshell Revelation & Kinetic Headline */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Top Alert Badge */}
              <div
                style={{
                  transform: `scale(${alertBadgeSpring})`,
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.5)',
                  color: '#f87171',
                  padding: '10px 28px',
                  borderRadius: 100,
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 32,
                  boxShadow: '0 0 40px rgba(239, 68, 68, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
                FRONTIER MODEL DISRUPTION
              </div>

              {/* Kinetic Headline Reveal */}
              <KineticText
                text="Did DeepSeek V4 Just Dethrone Silicon Valley Frontier Models?"
                startFrame={10}
                staggerFrames={3}
                highlightWords={['DeepSeek', 'V4', 'Dethrone']}
                highlightColor="#38bdf8"
                fontSize={80}
              />

              {/* Brand Rivalry Badges */}
              <div
                style={{
                  marginTop: 48,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 32,
                  opacity: interpolate(frame, [40, 70], [0, 1], { extrapolateRight: 'clamp' }),
                  transform: `translateY(${interpolate(frame, [40, 70], [20, 0], { extrapolateRight: 'clamp' })}px)`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.05)', padding: '12px 24px', borderRadius: 16, border: '1px solid rgba(255,255,255,0.1)' }}>
                  <OpenAILogo size={28} />
                  <span style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>OpenAI GPT-5</span>
                </div>

                <span style={{ color: '#f87171', fontSize: 24, fontWeight: 900 }}>VS</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(56, 189, 248, 0.12)', padding: '12px 24px', borderRadius: 16, border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                  <DeepSeekLogo size={28} />
                  <span style={{ color: '#38bdf8', fontSize: 20, fontWeight: 800 }}>DeepSeek V4</span>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2 (12 - 24s): 3D Vox Perspective Card + Tweet Proof   */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  THE VIRAL REVELATION ON X
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, margin: '8px 0 0 0' }}>
                  1.6 Trillion Parameters at 1/10th the Cost
                </h2>
              </div>

              <VoxCard startFrame={360} width="84%" height={460} rotateX={7} rotateY={-5} borderColor="rgba(56, 189, 248, 0.4)">
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  <Img
                    src={staticFile('screenshots/s1_tweet.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      transform: `scale(${interpolate(beat2Frame, [0, 360], [1.02, 1.12], { extrapolateRight: 'clamp' })})`,
                    }}
                  />

                  {/* Animated Neon Cyan Highlighter Strip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '46%',
                      left: '8%',
                      width: `${highlighterWidth * 0.84}%`,
                      height: 38,
                      backgroundColor: 'rgba(56, 189, 248, 0.35)',
                      mixBlendMode: 'screen',
                      borderRadius: 6,
                      boxShadow: '0 0 25px rgba(56, 189, 248, 0.7)',
                      borderBottom: '2px solid #38bdf8',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </VoxCard>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 3 (24 - 35s): The 3 Engineering Pillars              */}
          {/* ========================================================= */}
          {isBeat3 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span style={{ color: '#10b981', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  UNDER THE HOOD ROADMAP
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  How Did Open-Weights Close the Moat?
                </h2>
              </div>

              {/* 3 Staggered Metric Cards */}
              <div style={{ display: 'flex', gap: 32, width: '92%', justifyContent: 'center' }}>
                {[
                  { title: 'MoE Scaled', metric: '1.6T', sub: '49B Active / Token', color: '#38bdf8', delay: 0 },
                  { title: 'Hybrid Attention', metric: '1M', sub: 'Compressed Sparse CSA', color: '#10b981', delay: 15 },
                  { title: 'Engram Memory', metric: '10x', sub: 'Static Lookup Recall', color: '#a855f7', delay: 30 },
                ].map((item, i) => {
                  const cardSpring = spring({
                    frame: beat3Frame - item.delay,
                    fps,
                    config: { damping: 14, stiffness: 120, mass: 0.8 },
                  });

                  return (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
                        border: `1px solid ${item.color}55`,
                        borderRadius: 24,
                        padding: '40px 30px',
                        textAlign: 'center',
                        backdropFilter: 'blur(20px)',
                        boxShadow: `0 20px 50px rgba(0,0,0,0.6), 0 0 35px ${item.color}22`,
                        transform: `translateY(${(1 - cardSpring) * 60}px) scale(${cardSpring})`,
                        opacity: cardSpring,
                      }}
                    >
                      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 20, fontWeight: 600 }}>{item.title}</span>
                      <div style={{ color: item.color, fontSize: 72, fontWeight: 900, margin: '14px 0', fontFamily: 'monospace' }}>
                        {item.metric}
                      </div>
                      <span style={{ color: '#ffffff', fontSize: 18, fontWeight: 700 }}>{item.sub}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
