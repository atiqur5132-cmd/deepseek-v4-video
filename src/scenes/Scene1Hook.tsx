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

              <VoxCard startFrame={397} width="84%" height={460} rotateX={6} rotateY={-4} borderColor="rgba(56, 189, 248, 0.4)">
                <div style={{ padding: '36px 44px', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  {/* Tweet Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #4D6BFE' }}>
                        <DeepSeekOfficialLogo size={36} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ color: '#ffffff', fontSize: 22, fontWeight: 900 }}>DeepSeek AI</span>
                          <span style={{ color: '#38bdf8', fontSize: 18 }}>☑</span>
                        </div>
                        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16 }}>@deepseek_ai • Official Announcement</span>
                      </div>
                    </div>
                    {/* X Brand Vector */}
                    <svg width={28} height={28} viewBox="0 0 24 24" fill="#ffffff">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>

                  {/* Tweet Content with Neon Highlighter */}
                  <div style={{ margin: '20px 0', fontSize: 24, lineHeight: 1.5, color: '#f8fafc', fontWeight: 600 }}>
                    <div>We are officially open-sourcing <span style={{ color: '#38bdf8', fontWeight: 800 }}>DeepSeek-V4</span> under MIT License.</div>
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: 14 }}>
                      <span style={{ position: 'relative', zIndex: 2, color: '#ffffff', fontWeight: 900, fontSize: 30 }}>
                        1.6 Trillion MoE — 49B Active Parameters Per Token.
                      </span>
                      {/* Animated Neon Cyan Highlighter Bar */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: 2,
                          left: -6,
                          width: `${highlighterWidth}%`,
                          height: 16,
                          backgroundColor: 'rgba(56, 189, 248, 0.45)',
                          boxShadow: '0 0 25px #38bdf8',
                          borderRadius: 4,
                          zIndex: 1,
                        }}
                      />
                    </div>
                    <div style={{ marginTop: 14, color: 'rgba(255,255,255,0.7)' }}>
                      1-Million Context Window via Hybrid Attention & Instant Engram Memory.
                    </div>
                  </div>

                  {/* Tweet Metrics Footer */}
                  <div style={{ display: 'flex', gap: 48, borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 18, color: 'rgba(255,255,255,0.6)', fontSize: 17, fontWeight: 700 }}>
                    <div><span style={{ color: '#ffffff', fontWeight: 900 }}>18.4K</span> Retweets</div>
                    <div><span style={{ color: '#ffffff', fontWeight: 900 }}>74.2K</span> Likes</div>
                    <div><span style={{ color: '#ffffff', fontWeight: 900 }}>4.8M</span> Views</div>
                    <div style={{ color: '#10b981' }}>● Verified Open Weights</div>
                  </div>
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
                        background: '#111827',
                        border: `1px solid ${item.color}55`,
                        borderRadius: 24,
                        padding: '40px 32px',
                        textAlign: 'center',
                        boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 35px ${item.color}22`,
                        transform: `translateY(${(1 - cardSpring) * 50}px) scale(${cardSpring})`,
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
          {/* BEAT 4 (39.7 - 49.6s): Hardware VRAM Bottleneck Solved     */}
          {/* ========================================================= */}
          {isBeat4 && (
            <div
              style={{
                width: '100%',
                maxWidth: 1320,
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

              {/* Dual Hardware Comparison Architecture (ZERO PARAGRAPHS - VISUAL METRICS ONLY) */}
              <div style={{ display: 'flex', gap: 36, width: '92%' }}>
                {/* Card 1: Enterprise Hardware Memory Wall */}
                <div style={{ flex: 1, background: '#111827', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: 24, padding: '36px 32px', boxShadow: '0 20px 50px rgba(0,0,0,0.7)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '6px 16px', borderRadius: 8, fontSize: 15, fontWeight: 900 }}>
                      STANDARD 1M CONTEXT
                    </div>
                    <span style={{ color: '#ef4444', fontSize: 24 }}>⚠️</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 900, marginBottom: 16 }}>
                    Enterprise GPU VRAM Wall
                  </div>

                  {/* VRAM Meter Full */}
                  <div style={{ width: '100%', background: '#1f2937', height: 28, borderRadius: 8, overflow: 'hidden', padding: 3, marginBottom: 12 }}>
                    <div style={{ width: '98%', height: '100%', background: '#ef4444', borderRadius: 6, boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ef4444', fontSize: 16, fontWeight: 800 }}>
                    <span>VRAM ALLOCATION: 98%</span>
                    <span>CRITICAL OVERFLOW</span>
                  </div>

                  <div style={{ marginTop: 24, padding: '14px 18px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 12, border: '1px solid rgba(239, 68, 68, 0.3)', color: '#fca5a5', fontSize: 17, fontWeight: 700, textAlign: 'center' }}>
                    $100,000+ Enterprise Clusters Required
                  </div>
                </div>

                {/* Card 2: DeepSeek V4 Hybrid Efficiency */}
                <div style={{ flex: 1, background: '#111827', border: '1px solid rgba(16, 185, 129, 0.5)', borderRadius: 24, padding: '36px 32px', boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(16, 185, 129, 0.15)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981', padding: '6px 16px', borderRadius: 8, fontSize: 15, fontWeight: 900 }}>
                      DEEPSEEK V4 ARCHITECTURE
                    </div>
                    <span style={{ color: '#10b981', fontSize: 24 }}>⚡</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: 26, fontWeight: 900, marginBottom: 16 }}>
                    Hybrid Attention + Engram
                  </div>

                  {/* VRAM Meter Slashed */}
                  <div style={{ width: '100%', background: '#1f2937', height: 28, borderRadius: 8, overflow: 'hidden', padding: 3, marginBottom: 12 }}>
                    <div style={{ width: '15%', height: '100%', background: '#10b981', borderRadius: 6, boxShadow: '0 0 15px rgba(16, 185, 129, 0.8)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: 16, fontWeight: 800 }}>
                    <span>VRAM ALLOCATION: 15%</span>
                    <span>-85% MEMORY SAVED</span>
                  </div>

                  <div style={{ marginTop: 24, padding: '14px 18px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 12, border: '1px solid rgba(16, 185, 129, 0.3)', color: '#6ee7b7', fontSize: 17, fontWeight: 700, textAlign: 'center' }}>
                    Single Consumer Node Feasible
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
