import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { VoxCard } from '../components/VoxCard';

export const Scene3Benchmarks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Sub-Beat Timings (Total: 1950 frames / 65 seconds @ 30fps)
  // Beat 1: 0 - 650 (0s - 21.6s) - Coding & Math Capability Showdown
  // Beat 2: 650 - 1300 (21.6s - 43.3s) - 3D Vox Benchmark Inspection
  // Beat 3: 1300 - 1950 (43.3s - 65s) - 10x Pricing Bar Showdown
  const isBeat1 = frame < 650;
  const isBeat2 = frame >= 650 && frame < 1300;
  const isBeat3 = frame >= 1300;

  // Beat 1 animations
  const beat1Frame = frame;

  // Beat 2 animations
  const beat2Frame = Math.max(0, frame - 650);
  const highlighterWidth = interpolate(beat2Frame, [30, 80], [0, 100], { extrapolateRight: 'clamp' });

  // Beat 3 animations
  const beat3Frame = Math.max(0, frame - 1300);
  const deepseekBarWidth = interpolate(beat3Frame, [15, 60], [0, 120], { extrapolateRight: 'clamp' });
  const gptBarWidth = interpolate(beat3Frame, [15, 60], [0, 960], { extrapolateRight: 'clamp' });
  const badgeSpring = spring({ frame: beat3Frame - 40, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere with Amber / Cyan Glow */}
      <AtmosphereLayer
        glowColor1="rgba(245, 158, 11, 0.15)"
        glowColor2="rgba(56, 189, 248, 0.12)"
        gridOpacity={0.3}
      />

      <CameraRig durationInFrames={1950} zoomFrom={1.0} zoomTo={1.10} swayIntensity={4.5}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1 (0 - 21.6s): Benchmark Showdown                    */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ width: '100%', maxWidth: 1300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  COMPETITIVE BENCHMARKS
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  Frontier Coding & Math Showdown
                </h2>
              </div>

              <div style={{ width: '92%', display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { benchmark: 'LiveCodeBench (Engineering & Complex Coding)', status: 'Neck-to-neck with US Frontier Models', color: '#10b981', lead: 'TIED #1', delay: 0 },
                  { benchmark: 'PhD-Level Mathematics (MATH-500 & AIME)', status: 'Deep Extended Reasoning Dominance', color: '#38bdf8', lead: '94.2%', delay: 15 },
                  { benchmark: 'Multi-Step Agentic Workflow Horizon', status: 'US Proprietary Models lead by ~3-6 weeks', color: '#f59e0b', lead: 'CLOSING FAST', delay: 30 },
                ].map((item, i) => {
                  const cardEntrance = spring({
                    frame: beat1Frame - item.delay,
                    fps,
                    config: { damping: 14, stiffness: 120, mass: 0.8 },
                  });

                  return (
                    <div
                      key={i}
                      style={{
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderLeft: `5px solid ${item.color}`,
                        borderRadius: 20,
                        padding: '24px 36px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transform: `translateY(${(1 - cardEntrance) * 40}px)`,
                        opacity: cardEntrance,
                        boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div>
                        <div style={{ color: '#ffffff', fontSize: 24, fontWeight: 800 }}>{item.benchmark}</div>
                        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 18, marginTop: 6 }}>{item.status}</div>
                      </div>

                      <div style={{ background: `${item.color}22`, border: `1px solid ${item.color}66`, color: item.color, padding: '10px 24px', borderRadius: 12, fontSize: 20, fontWeight: 900, fontFamily: 'monospace' }}>
                        {item.lead}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2 (21.6 - 43.3s): 3D Vox Benchmark Inspection        */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  OFFICIAL EVALUATION AUDIT
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, margin: '8px 0 0 0' }}>
                  The Gap Has Shrunk to Just Weeks
                </h2>
              </div>

              <VoxCard startFrame={650} width="88%" height={480} rotateX={6} rotateY={-4} borderColor="rgba(245, 158, 11, 0.4)">
                <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
                  <Img
                    src={staticFile('screenshots/s2_benchmark.png')}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      transform: `scale(${interpolate(beat2Frame, [0, 650], [1.02, 1.14], { extrapolateRight: 'clamp' })})`,
                    }}
                  />

                  {/* Animated Neon Amber Highlighter Strip */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '52%',
                      left: '10%',
                      width: `${highlighterWidth * 0.8}%`,
                      height: 42,
                      backgroundColor: 'rgba(245, 158, 11, 0.35)',
                      mixBlendMode: 'screen',
                      borderRadius: 6,
                      boxShadow: '0 0 30px rgba(245, 158, 11, 0.8)',
                      borderBottom: '2px solid #f59e0b',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </VoxCard>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 3 (43.3 - 65s): 10x API Pricing Comparison           */}
          {/* ========================================================= */}
          {isBeat3 && (
            <div style={{ width: '100%', maxWidth: 1200, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <span style={{ color: '#ef4444', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  UNIT ECONOMICS DISRUPTION
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  API Cost Per 1-Million Tokens
                </h2>
              </div>

              <div
                style={{
                  width: '92%',
                  background: 'rgba(15, 23, 42, 0.8)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 24,
                  padding: 44,
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                }}
              >
                {/* DeepSeek Bar */}
                <div style={{ marginBottom: 36 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                    <span>DeepSeek V4 Pro</span>
                    <span style={{ color: '#10b981', fontWeight: 900, fontFamily: 'monospace' }}>$0.55 / 1M Tokens</span>
                  </div>
                  <div style={{ width: '100%', background: '#1e293b', height: 40, borderRadius: 10, overflow: 'hidden', padding: 4 }}>
                    <div style={{ width: `${deepseekBarWidth}px`, background: '#10b981', height: '100%', borderRadius: 8, boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }} />
                  </div>
                </div>

                {/* US Frontier Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                    <span>Proprietary US APIs (GPT-5 / Claude 3.5 Opus)</span>
                    <span style={{ color: '#ef4444', fontWeight: 900, fontFamily: 'monospace' }}>$5.00+ / 1M Tokens</span>
                  </div>
                  <div style={{ width: '100%', background: '#1e293b', height: 40, borderRadius: 10, overflow: 'hidden', padding: 4 }}>
                    <div style={{ width: `${gptBarWidth}px`, background: '#ef4444', height: '100%', borderRadius: 8, boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' }} />
                  </div>
                </div>

                {/* 10x Punch Badge */}
                <div
                  style={{
                    marginTop: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    transform: `scale(${badgeSpring})`,
                    opacity: badgeSpring,
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))',
                      border: '2px solid #f59e0b',
                      color: '#f59e0b',
                      padding: '14px 36px',
                      borderRadius: 100,
                      fontSize: 24,
                      fontWeight: 900,
                      letterSpacing: 2,
                      boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    🔥 10X COST ADVANTAGE FOR OPEN-WEIGHTS
                  </div>
                </div>
              </div>
            </div>
          )}

        </AbsoluteFill>
      </CameraRig>
    </AbsoluteFill>
  );
};
