import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { VoxCard } from '../components/VoxCard';
import { DeepSeekOfficialLogo, OpenAIOfficialLogo, AnthropicOfficialLogo } from '../components/RealLogos';

export const Scene3Benchmarks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 100% Whisper-Aligned Frame Boundaries (Total: 1611 frames / 53.7s @ 30fps)
  // Beat 1: 0 to 660 (Audio: 3537 - 4197) - 2026 Frontier Coding & Math Showdown
  // Beat 2: 660 to 1402 (Audio: 4197 - 4939) - 3D Benchmark Proof Inspection
  // Beat 3: 1402 to 1611 (Audio: 4939 - 5148) - 10x API Pricing Bar Showdown
  const isBeat1 = frame < 660;
  const isBeat2 = frame >= 660 && frame < 1402;
  const isBeat3 = frame >= 1402;

  // Beat 1 frames
  const beat1Frame = frame;

  // Beat 2 frames
  const beat2Frame = Math.max(0, frame - 660);
  const highlighterWidth = interpolate(beat2Frame, [25, 75], [0, 100], { extrapolateRight: 'clamp' });

  // Beat 3 frames
  const beat3Frame = Math.max(0, frame - 1402);
  const deepseekBarWidth = interpolate(beat3Frame, [12, 50], [0, 110], { extrapolateRight: 'clamp' });
  const gptBarWidth = interpolate(beat3Frame, [12, 50], [0, 950], { extrapolateRight: 'clamp' });
  const badgeSpring = spring({ frame: beat3Frame - 30, fps, config: { damping: 12, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere with Amber / Violet Glow */}
      <AtmosphereLayer
        glowColor1="rgba(245, 158, 11, 0.16)"
        glowColor2="rgba(56, 189, 248, 0.14)"
        gridOpacity={0.35}
      />

      <CameraRig durationInFrames={1611} zoomFrom={1.0} zoomTo={1.10} swayIntensity={4.5}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1: 2026 Frontier Benchmark Showdown                  */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ width: '100%', maxWidth: 1300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#f59e0b', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  2026 FRONTIER EVALUATIONS
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  DeepSeek V4 vs Claude Fable 5.1 & GPT-5.6
                </h2>
              </div>

              {/* Models Comparison Bar */}
              <div style={{ display: 'flex', gap: 24, marginBottom: 28, width: '92%', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15,23,42,0.8)', padding: '10px 20px', borderRadius: 14, border: '1px solid rgba(217, 119, 6, 0.4)' }}>
                  <AnthropicOfficialLogo size={28} />
                  <span style={{ color: '#f59e0b', fontSize: 16, fontWeight: 800 }}>Claude Fable 5.1</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15,23,42,0.8)', padding: '10px 20px', borderRadius: 14, border: '1px solid rgba(16, 185, 129, 0.4)' }}>
                  <OpenAIOfficialLogo size={28} />
                  <span style={{ color: '#10b981', fontSize: 16, fontWeight: 800 }}>OpenAI GPT-5.6</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15,23,42,0.8)', padding: '10px 20px', borderRadius: 14, border: '1px solid rgba(77, 107, 254, 0.6)' }}>
                  <DeepSeekOfficialLogo size={28} />
                  <span style={{ color: '#38bdf8', fontSize: 16, fontWeight: 800 }}>DeepSeek V4 Pro</span>
                </div>
              </div>

              {/* 3 Benchmark Cards */}
              <div style={{ width: '92%', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { benchmark: 'LiveCodeBench (Autonomous Software Engineering)', status: 'Neck-to-neck with US Frontier Models', color: '#10b981', lead: 'TIED #1', delay: 0 },
                  { benchmark: 'PhD-Level Mathematics (MATH-500 & AIME 2026)', status: 'Deep Extended Reasoning Dominance', color: '#38bdf8', lead: '94.2%', delay: 15 },
                  { benchmark: 'Multi-Step Long Horizon Agentic Autonomy', status: 'Claude Fable 5.1 leads by ~3-6 weeks', color: '#f59e0b', lead: 'GAP: WEEKS', delay: 30 },
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
                        background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.75), rgba(15, 23, 42, 0.95))',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderLeft: `5px solid ${item.color}`,
                        borderRadius: 20,
                        padding: '22px 36px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transform: `translateY(${(1 - cardEntrance) * 40}px)`,
                        opacity: cardEntrance,
                        boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                      }}
                    >
                      <div>
                        <div style={{ color: '#ffffff', fontSize: 22, fontWeight: 800 }}>{item.benchmark}</div>
                        <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, marginTop: 4 }}>{item.status}</div>
                      </div>

                      <div style={{ background: `${item.color}22`, border: `1px solid ${item.color}66`, color: item.color, padding: '8px 22px', borderRadius: 12, fontSize: 18, fontWeight: 900, fontFamily: 'monospace' }}>
                        {item.lead}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2: 3D Benchmark Proof Inspection                     */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <span style={{ color: '#38bdf8', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  INDEPENDENT EVALUATION AUDIT
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 52, fontWeight: 900, margin: '6px 0 0 0' }}>
                  The Gap Has Shrunk to Just Weeks
                </h2>
              </div>

              <VoxCard startFrame={660} width="88%" height={470} rotateX={6} rotateY={-4} borderColor="rgba(245, 158, 11, 0.4)">
                <div style={{ padding: '32px 40px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  {/* Table Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: 16 }}>
                    <div>
                      <span style={{ color: '#f59e0b', fontSize: 14, fontWeight: 900, letterSpacing: '0.15em' }}>
                        2026 FRONTIER LEADERBOARD
                      </span>
                      <div style={{ color: '#ffffff', fontSize: 24, fontWeight: 900 }}>
                        Independent AI Benchmark Audit
                      </div>
                    </div>
                    <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 800 }}>
                      VERIFIED AUDIT
                    </div>
                  </div>

                  {/* Benchmark Comparison Rows */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '14px 0' }}>
                    {/* Header Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: 800, textTransform: 'uppercase' }}>
                      <span>Benchmark</span>
                      <span>Claude Fable 5.1</span>
                      <span>GPT-5.6</span>
                      <span style={{ color: '#38bdf8' }}>DeepSeek V4 Pro</span>
                    </div>

                    {/* Row 1 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12 }}>
                      <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 18 }}>LiveCodeBench (Coding)</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontFamily: 'monospace' }}>74.8%</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontFamily: 'monospace' }}>75.1%</span>
                      <span style={{ color: '#10b981', fontWeight: 900, fontSize: 20, fontFamily: 'monospace' }}>75.4% (WIN)</span>
                    </div>

                    {/* Row 2: Swept by Neon Highlighter */}
                    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', alignItems: 'center', background: 'rgba(56, 189, 248, 0.08)', padding: '12px 16px', borderRadius: 12, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 18 }}>MATH-500 (PhD Olympiad)</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontFamily: 'monospace' }}>93.1%</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontFamily: 'monospace' }}>93.8%</span>
                      <span style={{ color: '#38bdf8', fontWeight: 900, fontSize: 20, fontFamily: 'monospace' }}>94.2% (WIN)</span>
                      
                      {/* Animated Neon Amber Highlighter */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: `${highlighterWidth}%`,
                          height: 3,
                          backgroundColor: '#f59e0b',
                          boxShadow: '0 0 20px #f59e0b',
                        }}
                      />
                    </div>

                    {/* Row 3 */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.2fr', alignItems: 'center', background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: 12 }}>
                      <span style={{ color: '#ffffff', fontWeight: 800, fontSize: 18 }}>SWE-bench Verified</span>
                      <span style={{ color: '#f59e0b', fontSize: 18, fontFamily: 'monospace' }}>68.4% (Lead)</span>
                      <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, fontFamily: 'monospace' }}>67.9%</span>
                      <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, fontFamily: 'monospace' }}>66.2% (-3 wks)</span>
                    </div>
                  </div>

                  {/* Footer Conclusion */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 14 }}>
                    <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16 }}>Autonomous Reasoning Margin:</span>
                    <span style={{ color: '#10b981', fontWeight: 900, fontSize: 18 }}>GAP REDUCED FROM YEARS TO WEEKS</span>
                  </div>
                </div>
              </VoxCard>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 3: 10x - 18x API Pricing Comparison                   */}
          {/* ========================================================= */}
          {isBeat3 && (
            <div style={{ width: '100%', maxWidth: 1240, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#ef4444', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  UNIT ECONOMICS DISRUPTION
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '6px 0 0 0' }}>
                  API Cost Per 1-Million Tokens
                </h2>
              </div>

              <div
                style={{
                  width: '92%',
                  background: '#111827',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 24,
                  padding: 38,
                  boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
                }}
              >
                {/* DeepSeek Bar */}
                <div style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <DeepSeekOfficialLogo size={24} />
                      <span>DeepSeek V4 Pro</span>
                    </div>
                    <span style={{ color: '#10b981', fontWeight: 900, fontFamily: 'monospace' }}>$0.55 / 1M Tokens</span>
                  </div>
                  <div style={{ width: '100%', background: '#1e293b', height: 38, borderRadius: 10, overflow: 'hidden', padding: 4 }}>
                    <div style={{ width: `${deepseekBarWidth}px`, background: '#10b981', height: '100%', borderRadius: 8, boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)' }} />
                  </div>
                </div>

                {/* US Frontier Bar */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <AnthropicOfficialLogo size={24} />
                      <span>US Frontier APIs (Claude Fable 5.1 / GPT-5.6)</span>
                    </div>
                    <span style={{ color: '#ef4444', fontWeight: 900, fontFamily: 'monospace' }}>$10.00 / 1M Tokens</span>
                  </div>
                  <div style={{ width: '100%', background: '#1e293b', height: 38, borderRadius: 10, overflow: 'hidden', padding: 4 }}>
                    <div style={{ width: `${gptBarWidth}px`, background: '#ef4444', height: '100%', borderRadius: 8, boxShadow: '0 0 20px rgba(239, 68, 68, 0.6)' }} />
                  </div>
                </div>

                {/* 10x - 18x Advantage Badge */}
                <div
                  style={{
                    marginTop: 36,
                    display: 'flex',
                    justifyContent: 'center',
                    transform: `scale(${badgeSpring.toFixed(4)})`,
                    opacity: badgeSpring,
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(90deg, rgba(245, 158, 11, 0.2), rgba(239, 68, 68, 0.2))',
                      border: '2px solid #f59e0b',
                      color: '#f59e0b',
                      padding: '12px 34px',
                      borderRadius: 100,
                      fontSize: 22,
                      fontWeight: 900,
                      letterSpacing: 2,
                      boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
                    }}
                  >
                    🔥 10X - 18X COST ADVANTAGE FOR OPEN-WEIGHTS
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
