import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { KineticText } from '../components/KineticText';
import { VoxCard } from '../components/VoxCard';
import { DeepSeekOfficialLogo, OpenAIOfficialLogo, AnthropicOfficialLogo } from '../components/RealLogos';

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 100% Whisper-Aligned Frame Boundaries (Total: 1488 frames / 49.6s @ 30fps)
  // Beat 1: 0 to 397 (0.0s - 13.2s) - Frontier Rivalry Bombshell
  // Beat 2: 397 to 775 (13.2s - 25.8s) - 3D Viral Tweet Inspection
  // Beat 3: 775 to 1192 (25.8s - 39.7s) - 3 Core Engineering Pillars
  // Beat 4: 1192 to 1488 (39.7s - 49.6s) - The Context Memory Bottleneck
  const isBeat1 = frame < 397;
  const isBeat2 = frame >= 397 && frame < 775;
  const isBeat3 = frame >= 775 && frame < 1192;
  const isBeat4 = frame >= 1192;

  // Beat 1 animations
  const alertSpring = spring({ frame, fps, config: { damping: 14, stiffness: 120, mass: 0.8 } });

  // Beat 2 animations
  const beat2Frame = Math.max(0, frame - 397);
  const highlighterWidth = interpolate(beat2Frame, [25, 75], [0, 100], { extrapolateRight: 'clamp' });

  // Beat 3 animations
  const beat3Frame = Math.max(0, frame - 775);

  // Beat 4 animations
  const beat4Frame = Math.max(0, frame - 1192);
  const bottleneckScale = spring({ frame: beat4Frame, fps, config: { damping: 14, stiffness: 110 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere with Crimson Alert Glow */}
      <AtmosphereLayer
        glowColor1="rgba(239, 68, 68, 0.18)"
        glowColor2="rgba(56, 189, 248, 0.15)"
        gridOpacity={0.35}
      />

      <CameraRig durationInFrames={1488} zoomFrom={1.0} zoomTo={1.10} swayIntensity={5}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1 (0 - 13.2s): Frontier Rivalry Bombshell            */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Alert Badge */}
              <div
                style={{
                  transform: `scale(${alertSpring})`,
                  backgroundColor: 'rgba(239, 68, 68, 0.16)',
                  border: '1px solid rgba(239, 68, 68, 0.6)',
                  color: '#f87171',
                  padding: '10px 28px',
                  borderRadius: 100,
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 32,
                  boxShadow: '0 0 40px rgba(239, 68, 68, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#ef4444', boxShadow: '0 0 12px #ef4444' }} />
                2026 FRONTIER MODEL DISRUPTION
              </div>

              {/* Kinetic Headline: Strict 3-5 words */}
              <KineticText
                text="The Frontier Moat Broken"
                startFrame={10}
                staggerFrames={4}
                highlightWords={['Moat', 'Broken']}
                highlightColor="#38bdf8"
                fontSize={84}
              />

              {/* 100% Authentic Verified Brand Vectors Display */}
              <div
                style={{
                  marginTop: 52,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 36,
                  opacity: interpolate(frame, [35, 65], [0, 1], { extrapolateRight: 'clamp' }),
                }}
              >
                {/* OpenAI Official Card */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(15, 23, 42, 0.85)', padding: '16px 28px', borderRadius: 20, border: '1px solid rgba(16, 185, 129, 0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  <OpenAIOfficialLogo size={40} />
                  <div>
                    <div style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>OpenAI</div>
                    <div style={{ color: '#10b981', fontSize: 14, fontWeight: 700 }}>GPT-5.6</div>
                  </div>
                </div>

                {/* Anthropic Official Card */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(15, 23, 42, 0.85)', padding: '16px 28px', borderRadius: 20, border: '1px solid rgba(217, 119, 6, 0.4)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  <AnthropicOfficialLogo size={40} />
                  <div>
                    <div style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>Anthropic</div>
                    <div style={{ color: '#f59e0b', fontSize: 14, fontWeight: 700 }}>Claude Fable 5.1</div>
                  </div>
                </div>

                <span style={{ color: '#f87171', fontSize: 26, fontWeight: 900, textShadow: '0 0 20px rgba(239, 68, 68, 0.6)' }}>VS</span>

                {/* DeepSeek Official Card */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(15, 23, 42, 0.85)', padding: '16px 28px', borderRadius: 20, border: '1px solid rgba(77, 107, 254, 0.6)', boxShadow: '0 0 35px rgba(77, 107, 254, 0.25)' }}>
                  <DeepSeekOfficialLogo size={40} />
                  <div>
                    <div style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>DeepSeek</div>
                    <div style={{ color: '#38bdf8', fontSize: 14, fontWeight: 700 }}>V4 Open-Weights</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2 (13.2 - 25.8s): 3D Tweet Inspection                */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  THE VIRAL REVELATION ON X
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, margin: '6px 0 0 0' }}>
                  1.6T MoE Architecture
                </h2>
              </div>

              <VoxCard startFrame={397} width="84%" height={480} rotateX={7} rotateY={-5} borderColor="rgba(56, 189, 248, 0.4)">
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  <Img
                    src={staticFile('screenshots/s1_tweet.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      transform: `scale(${interpolate(beat2Frame, [0, 378], [1.02, 1.12], { extrapolateRight: 'clamp' })})`,
                    }}
                  />

                  {/* Animated Neon Cyan Highlighter */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '46%',
                      left: '8%',
                      width: `${highlighterWidth * 0.84}%`,
                      height: 42,
                      backgroundColor: 'rgba(56, 189, 248, 0.35)',
                      mixBlendMode: 'screen',
                      borderRadius: 8,
                      boxShadow: '0 0 30px rgba(56, 189, 248, 0.8)',
                      borderBottom: '2px solid #38bdf8',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </VoxCard>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 3 (25.8 - 39.7s): 3 Core Architecture Pillars        */}
          {/* ========================================================= */}
          {isBeat3 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#10b981', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  ARCHITECTURAL LEAP
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '6px 0 0 0' }}>
                  1/10th Cost Frontier Reasoning
                </h2>
              </div>

              <div style={{ display: 'flex', gap: 32, width: '92%', justifyContent: 'center' }}>
                {[
                  { title: 'Total MoE Weights', metric: '1.6T', sub: '49B Active / Token', color: '#38bdf8', delay: 0 },
                  { title: 'Hybrid Attention', metric: '1M', sub: 'Compressed Sparse CSA', color: '#10b981', delay: 15 },
                  { title: 'Engram Memory', metric: '10x', sub: 'Instant Hash Recall', color: '#a855f7', delay: 30 },
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
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.95))',
                        border: `1px solid ${item.color}55`,
                        borderRadius: 24,
                        padding: '40px 32px',
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

          {/* ========================================================= */}
          {/* BEAT 4 (39.7 - 49.6s): The Bottleneck Breakdown           */}
          {/* ========================================================= */}
          {isBeat4 && (
            <div
              style={{
                width: '100%',
                maxWidth: 1280,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${bottleneckScale})`,
                opacity: bottleneckScale,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#ef4444', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  THE CORE PROBLEM SOLVED
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '6px 0 0 0' }}>
                  Context Memory & Active Compute
                </h2>
              </div>

              {/* Dual Bottleneck Solvers Visualizer */}
              <div style={{ display: 'flex', gap: 40, width: '90%' }}>
                <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: 24, padding: 36 }}>
                  <span style={{ color: '#ef4444', fontSize: 18, fontWeight: 800 }}>BOTTLENECK #1</span>
                  <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '8px 0' }}>GPU VRAM Memory Wall</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, margin: 0 }}>
                    1M token context windows normally require massive $100K+ enterprise clusters just to hold KV cache.
                  </p>
                </div>

                <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: 24, padding: 36 }}>
                  <span style={{ color: '#10b981', fontSize: 18, fontWeight: 800 }}>DEEPSEEK SOLUTION</span>
                  <h3 style={{ color: '#fff', fontSize: 28, fontWeight: 900, margin: '8px 0' }}>Hybrid Attention + Engram</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, margin: 0 }}>
                    Slashes active memory by 85% and retrieves static facts via instant lookups.
                  </p>
                </div>
              </div>
            </div>
          )}

        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
