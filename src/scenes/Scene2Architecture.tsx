import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate, AbsoluteFill } from 'remotion';
import { AtmosphereLayer } from '../components/AtmosphereLayer';
import { CameraRig } from '../components/CameraRig';
import { MoENodeGraph } from '../components/MoENodeGraph';

export const Scene2Architecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 100% Whisper-Aligned Frame Boundaries (Total: 2049 frames / 68.3s @ 30fps)
  // Beat 1: 0 to 539 (Audio: 1488 - 2027) - MoE Dynamic Token Routing Simulation
  // Beat 2: 539 to 1302 (Audio: 2027 - 2790) - Hybrid Attention (CSA + HCA) 1M Context
  // Beat 3: 1302 to 2049 (Audio: 2790 - 3537) - Engram Memory Structure
  const isBeat1 = frame < 539;
  const isBeat2 = frame >= 539 && frame < 1302;
  const isBeat3 = frame >= 1302;

  // Beat 2 frames
  const beat2Frame = Math.max(0, frame - 539);
  const contextProgress = interpolate(beat2Frame, [20, 120], [128, 1000], { extrapolateRight: 'clamp' });
  const memoryBarWidth = interpolate(beat2Frame, [30, 110], [12, 90], { extrapolateRight: 'clamp' });

  // Beat 3 frames
  const beat3Frame = Math.max(0, frame - 1302);
  const engramEntrance = spring({
    frame: beat3Frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#07090e', overflow: 'hidden' }}>
      {/* Layer 0: Ambient Atmosphere with Emerald / Cyan Glow */}
      <AtmosphereLayer
        glowColor1="rgba(16, 185, 129, 0.16)"
        glowColor2="rgba(56, 189, 248, 0.14)"
        gridOpacity={0.35}
      />

      <CameraRig durationInFrames={2049} zoomFrom={1.0} zoomTo={1.10} swayIntensity={4.5}>
        <AbsoluteFill style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 80px' }}>

          {/* ========================================================= */}
          {/* BEAT 1: Mixture of Experts Simulation (49B Active)        */}
          {/* ========================================================= */}
          {isBeat1 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MoENodeGraph startFrame={0} />
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 2: Hybrid Attention & 1M Context Window              */}
          {/* ========================================================= */}
          {isBeat2 && (
            <div style={{ width: '100%', maxWidth: 1300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#10b981', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  BREAKTHROUGH #2: MEMORY SCALING
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  Hybrid Attention: 1-Million Tokens
                </h2>
              </div>

              {/* Context Progress Gauge */}
              <div
                style={{
                  width: '90%',
                  background: '#111827',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  borderRadius: 24,
                  padding: 36,
                  boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
                  marginBottom: 28,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                  <span style={{ color: '#ffffff', fontSize: 24, fontWeight: 700 }}>Active Context Capacity</span>
                  <span style={{ color: '#10b981', fontSize: 48, fontWeight: 900, fontFamily: 'monospace' }}>
                    {Math.round(contextProgress)}K TOKENS
                  </span>
                </div>

                <div style={{ width: '100%', height: 38, background: '#1e293b', borderRadius: 12, overflow: 'hidden', padding: 4 }}>
                  <div
                    style={{
                      width: `${memoryBarWidth}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #38bdf8, #10b981)',
                      borderRadius: 8,
                      boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, color: 'rgba(255,255,255,0.45)', fontSize: 16, fontWeight: 600 }}>
                  <span>128K Standard</span>
                  <span>512K Extended</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>1,000,000 (1M) Horizon</span>
                </div>
              </div>

              {/* Dual Visual Hardware Chips (NO PARAGRAPHS - METRICS ONLY) */}
              <div style={{ display: 'flex', gap: 32, width: '90%' }}>
                {/* CSA Chip */}
                <div style={{ flex: 1, background: '#111827', border: '1px solid rgba(56, 189, 248, 0.35)', borderRadius: 22, padding: '28px 32px', boxShadow: '0 15px 40px rgba(0,0,0,0.6)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ background: 'rgba(56, 189, 248, 0.18)', color: '#38bdf8', padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 900 }}>
                      ATTENTION PRUNING
                    </div>
                    <span style={{ color: '#38bdf8', fontSize: 22 }}>⚡</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: 24, fontWeight: 900 }}>Compressed Sparse (CSA)</div>
                  <div style={{ color: '#38bdf8', fontSize: 44, fontWeight: 900, fontFamily: 'monospace', margin: '12px 0 6px 0' }}>
                    -60%
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 700 }}>
                    Redundant Token Elimination
                  </div>
                </div>

                {/* HCA Chip */}
                <div style={{ flex: 1, background: '#111827', border: '1px solid rgba(16, 185, 129, 0.35)', borderRadius: 22, padding: '28px 32px', boxShadow: '0 15px 40px rgba(0,0,0,0.6)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.18)', color: '#10b981', padding: '6px 14px', borderRadius: 8, fontSize: 14, fontWeight: 900 }}>
                      KV-CACHE MATRIX
                    </div>
                    <span style={{ color: '#10b981', fontSize: 22 }}>📉</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: 24, fontWeight: 900 }}>Heavily Compressed (HCA)</div>
                  <div style={{ color: '#10b981', fontSize: 44, fontWeight: 900, fontFamily: 'monospace', margin: '12px 0 6px 0' }}>
                    -85%
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, fontWeight: 700 }}>
                    VRAM Footprint Slashed
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BEAT 3: Engram Memory Architecture (ZERO PARAGRAPHS)      */}
          {/* ========================================================= */}
          {isBeat3 && (
            <div
              style={{
                width: '100%',
                maxWidth: 1320,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transform: `scale(${engramEntrance.toFixed(4)})`,
                opacity: engramEntrance,
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: 36 }}>
                <span style={{ color: '#a855f7', fontSize: 18, fontWeight: 800, letterSpacing: '0.15em' }}>
                  BREAKTHROUGH #3: ZERO-OVERHEAD MEMORY
                </span>
                <h2 style={{ color: '#ffffff', fontSize: 56, fontWeight: 900, margin: '8px 0 0 0' }}>
                  Engram Memory Architecture
                </h2>
              </div>

              {/* Dual Core Visual Architecture */}
              <div style={{ display: 'flex', gap: 36, width: '92%', justifyContent: 'center' }}>
                {/* Engram Table Engine */}
                <div
                  style={{
                    flex: 1,
                    background: '#111827',
                    border: '1px solid rgba(168, 85, 247, 0.45)',
                    borderRadius: 24,
                    padding: '36px 32px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(168, 85, 247, 0.15)',
                  }}
                >
                  <div style={{ display: 'inline-block', background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    STATIC KNOWLEDGE ENGINE
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, margin: 0 }}>Engram Hash Table</h3>
                  <div style={{ color: '#c084fc', fontSize: 44, fontWeight: 900, fontFamily: 'monospace', margin: '16px 0 8px 0' }}>
                    O(1) Recall
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, fontWeight: 700 }}>
                    Instant Lookups Without Attention Compute
                  </div>
                  <div style={{ marginTop: 24, padding: '10px 16px', background: 'rgba(168, 85, 247, 0.12)', borderRadius: 10, border: '1px solid rgba(168, 85, 247, 0.3)', color: '#d8b4fe', fontSize: 15, fontWeight: 800, textAlign: 'center' }}>
                    ⚡ Slashing Latency & Hallucinations
                  </div>
                </div>

                {/* Dynamic Logic Core */}
                <div
                  style={{
                    flex: 1,
                    background: '#111827',
                    border: '1px solid rgba(56, 189, 248, 0.45)',
                    borderRadius: 24,
                    padding: '36px 32px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 0 35px rgba(56, 189, 248, 0.15)',
                  }}
                >
                  <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '6px 16px', borderRadius: 8, fontSize: 14, fontWeight: 800, marginBottom: 16 }}>
                    DYNAMIC REASONING ENGINE
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: 28, fontWeight: 900, margin: 0 }}>Neural Attention Core</h3>
                  <div style={{ color: '#38bdf8', fontSize: 44, fontWeight: 900, fontFamily: 'monospace', margin: '16px 0 8px 0' }}>
                    100% Active
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, fontWeight: 700 }}>
                    Dedicated Multi-Step Logic & Math
                  </div>
                  <div style={{ marginTop: 24, padding: '10px 16px', background: 'rgba(56, 189, 248, 0.12)', borderRadius: 10, border: '1px solid rgba(56, 189, 248, 0.3)', color: '#7dd3fc', fontSize: 15, fontWeight: 800, textAlign: 'center' }}>
                    🧠 Pure Algorithmic Compute Allocation
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
